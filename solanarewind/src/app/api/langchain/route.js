export const maxDuration = 60; 


import { ChatXAI } from "@langchain/xai";
import dotenv from 'dotenv';

dotenv.config();

const llm = new ChatXAI({
  model: "grok-beta",
  temperature: 0.7,
  maxTokens: 1000,
  maxRetries: 2
});

const systemPrompt = `You are an Indian crypto expert but the roaster like the elon musk. Analyze the provided wallet data and give a detailed but concise roast of the wallet's activity. 
Be witty, darket, roasting, fun and dark humor with no limit but maintain technical accuracy. Do relate it with some indian memes or blockchain memes. Roast to hard and one liner concise. Provide in 10 pointers
Showcase the numerical values also in the roast. share in a proper markdown format.
At the end, do troll the wallet owner, by providing the one short liner defining a character from the cult, the format as title:`;

export async function POST(req) {
  try {
    const { walletAddress } = await req.json();

    if (!walletAddress) {
      return new Response(
        JSON.stringify({ success: false, error: "walletAddress is required" }),
        { status: 400 }
      );
    }

    // Fetch wallet summary from the external API
    const apiResponse = await fetch(
      `https://solanarewind.vercel.app/api/final?walletAddress=${walletAddress}`
    );

    if (!apiResponse.ok) {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to fetch wallet summary" }),
        { status: apiResponse.status }
      );
    }

    const walletSummary = await apiResponse.json();

    // Prepare the wallet data
    const walletData = {
      summary: walletSummary, // Use the fetched summary
      raw_data: {
        address: walletAddress,
        ...walletSummary // Include additional raw data fields if necessary
      }
    };

    // Generate roast analysis using LangChain
    const response = await llm.invoke([
      ["system", systemPrompt],
      ["human", `Please analyze this wallet data: ${JSON.stringify(walletData)}`]
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        analysis: response.content,
        metadata: {
          tokenUsage: response.response_metadata.tokenUsage,
          modelFingerprint: response.response_metadata.system_fingerprint
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
