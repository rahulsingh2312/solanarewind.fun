import { NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'edge';

const generateHeaders = () => ({
    'authority': 'gmgn.ai',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'referer': 'https://gmgn.ai/',
    'origin': 'https://gmgn.ai',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
});

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');
    const type = searchParams.get('type');

    if (!walletAddress) {
        return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    try {
        if (type === 'tokens') {
            // Mock data for tokens
            return NextResponse.json({
                totalTokens: 2,
                holdings: [
                    {
                        symbol: 'SOL',
                        balance: 10.5,
                        value: 1050.0,
                        percentage: 70
                    },
                    {
                        symbol: 'BONK',
                        balance: 1000000,
                        value: 450.0,
                        percentage: 30
                    }
                ]
            });
        } else if (type === 'transactions') {
            // Mock data for transactions
            return NextResponse.json({
                totalTransactions: 25,
                firstTransaction: {
                    hash: '5UYkT...',
                    timestamp: '2023-01-01T00:00:00Z',
                    value: 1.5
                },
                lastTransaction: {
                    hash: '7RtPq...',
                    timestamp: '2024-12-19T00:00:00Z',
                    value: 0.5
                },
                recentTransactions: [
                    {
                        hash: '7RtPq...',
                        timestamp: '2024-12-19T00:00:00Z',
                        type: 'SWAP',
                        value: 0.5,
                        status: 'SUCCESS'
                    }
                ]
            });
        }

        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    } catch (error) {
        console.error('Error fetching token data:', error);
        return NextResponse.json({
            error: 'Failed to fetch token data',
            details: error.message
        }, { status: 500 });
    }
}
