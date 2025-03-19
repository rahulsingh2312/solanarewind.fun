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

const getSystemPrompt = (country) => {
  return `You are a ${country} crypto expert but the roaster like the elon musk. Analyze the provided wallet data and give a detailed but concise roast of the wallet's activity. Be witty, darket, roasting, fun and dark humor with no limit but maintain technical accuracy. Do relate it with some ${country} memes or blockchain memes. Roast to hard and one liner concise. Provide in 10 pointers Showcase the numerical values also in the roast and they will mostly be dollars. share in a proper markdown format. At the end, do troll the wallet owner, by providing the one short liner defining a character, the format as title:`;
};

export async function POST(req) {
  try {
    console.log('API Request Started');
    const { walletAddress, location } = await req.json();
    console.log('Request Data:', { walletAddress, location });

    if (!walletAddress) {
      console.log('Missing wallet address');
      return new Response(
        JSON.stringify({ success: false, error: "walletAddress is required" }),
        { status: 400 }
      );
    }

    // Fetch wallet summary from the external API
    console.log('Fetching wallet summary');
    const apiResponse = await fetch(
      `https://solanarewind.vercel.app/api/summary?walletAddress=${walletAddress}`
    );

    if (!apiResponse.ok) {
      console.log('Wallet summary fetch failed:', apiResponse.status);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to fetch wallet summary" }),
        { status: apiResponse.status }
      );
    }

    const walletSummary = await apiResponse.json();
    console.log('Wallet Summary:', walletSummary);

    // Prepare the wallet data
    const walletData = {
      summary: walletSummary,
      raw_data: {
        address: walletAddress,
        ...walletSummary
      }
    };

    console.log('Prepared Wallet Data:', walletData);

    // Use location-based system prompt
    const country = location?.country || 'Unknown';
    const systemPrompt = getSystemPrompt(country);
    console.log('Using System Prompt for country:', country);

    // Generate roast analysis using LangChain
    console.log('Generating analysis');
    const response = await llm.invoke([
      ["system", systemPrompt],
      ["human", `Please analyze this wallet data: ${JSON.stringify(walletData)}`]
    ]);

    console.log('Analysis Response:', {
      success: true,
      tokenUsage: response.response_metadata.tokenUsage,
      modelFingerprint: response.response_metadata.system_fingerprint
    });

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