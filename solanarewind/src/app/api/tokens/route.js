import { NextRequest, NextResponse } from 'next/server';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import { fetchAllDigitalAssetWithTokenByOwner } from "@metaplex-foundation/mpl-token-metadata";
import axios from 'axios';
export const runtime = 'edge'; 

// Utility function for fee tracking (similar to the original implementation)
class SolanaFeeTracker {
    constructor(rpcUrl = 'https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a') {
        this.RPC_URL = rpcUrl;
    }

    async getTransactionHistory(walletAddress) {
        try {
            const currentTimestamp = Date.now();
            const oneYearAgo = Math.floor((currentTimestamp - (365 * 24 * 60 * 60 * 1000)) / 1000);

            const response = await axios.post(this.RPC_URL, {
                jsonrpc: "2.0",
                id: 1,
                method: "getSignaturesForAddress",
                params: [
                    walletAddress,
                    { 
                        limit: 1000, 
                        before: null, 
                        after: oneYearAgo 
                    }
                ]
            });

            const signatures = response.data.result || [];

            // Sort signatures by timestamp
            signatures.sort((a, b) => a.blockTime - b.blockTime);

            return {
                totalTransactions: signatures.length,
                firstTransaction: signatures.length > 0 ? {
                    signature: signatures[0].signature,
                    timestamp: new Date(signatures[0].blockTime * 1000).toLocaleString(),
                    fee: signatures[0].fee
                } : null,
                lastTransaction: signatures.length > 0 ? {
                    signature: signatures[signatures.length - 1].signature,
                    timestamp: new Date(signatures[signatures.length - 1].blockTime * 1000).toLocaleString(),
                    fee: signatures[signatures.length - 1].fee
                } : null
            };
        } catch (error) {
            console.error('Transaction tracking error:', error);
            return null;
        }
    }
}

// Helper function to extract token details
const extractTokenDetails = (tokens) => {
    return tokens.map(token => ({
        name: token.metadata.name || 'Unnamed Token',
        symbol: token.metadata.symbol || 'N/A',
        uri: token.metadata.uri || '',
        
    }));
};

export async function GET(request) {
    // Extract wallet address from query parameters
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get('walletAddress');
    const apiType = searchParams.get('type');

    // Validate wallet address
    if (!walletAddress) {
        return NextResponse.json(
            { error: 'Wallet address is required' }, 
            { status: 400 }
        );
    }

    try {
        // Initialize Umi with Helius RPC (replace with your API key)
        const umi = createUmi('https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a');
        const ownerPublicKey = publicKey(walletAddress);

        // Handle different API types
        if (apiType === 'tokens') {
            // Fetch all digital assets (tokens/NFTs)
            const allTokens = await fetchAllDigitalAssetWithTokenByOwner(umi, ownerPublicKey);
            
            // Extract token details
            const tokenDetails = extractTokenDetails(allTokens);

            return NextResponse.json({
                totalTokens: allTokens.length,
                tokens: tokenDetails
            });
        } else if (apiType === 'transactions') {
            // Initialize fee tracker
            const feeTracker = new SolanaFeeTracker();
            
            // Fetch transaction history
            const transactionSummary = await feeTracker.getTransactionHistory(walletAddress);

            return NextResponse.json(transactionSummary || { 
                error: 'No transaction data available' 
            });
        } else {
            return NextResponse.json(
                { error: 'Invalid API type. Use "tokens" or "transactions"' }, 
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to fetch data', 
                details: error instanceof Error ? error.message : 'Unknown error' 
            }, 
            { status: 500 }
        );
    }
}