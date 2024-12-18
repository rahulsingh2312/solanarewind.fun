import { NextResponse } from 'next/server';
import { ChatXAI } from "@langchain/xai";
import model from '../../lib/model';

// Initialize xAI model
const llm = new ChatXAI({
    model: "grok-beta",
    temperature: 0.7,
    maxTokens: 1000,
    maxRetries: 2,
});

// System prompt
const systemPrompt = `You are an Indian crypto expert but the roaster like the elon musk. Analyze the provided wallet data and give a detailed but concise roast of the wallet's activity. 
Be witty, darket, roasting, fun and dark humor with no limit but maintain technical accuracy. Do relate it with some indian memes or blockchain memes. Roast to hard and one liner concise. Provide in 10 pointers`;

export async function POST(request) {
    try {
        // Get the context from model
        const context = model.getContext();
        
        if (!context) {
            return NextResponse.json({ error: 'No context available' }, { status: 400 });
        }

        const response = await llm.invoke([
            ["system", systemPrompt],
            ["human", `Please analyze this wallet data: ${JSON.stringify(context)}`]
        ]);

        return NextResponse.json({
            success: true,
            analysis: response.content,
            metadata: {
                tokenUsage: response.response_metadata.tokenUsage,
                modelFingerprint: response.response_metadata.system_fingerprint
            }
        });

    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json({ 
            success: false,
            error: error.message 
        }, { status: 500 });
    }
}