export const maxDuration = 60;
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  // Use full URLs
  const baseUrl = 'https://solanarewind.vercel.app/';
  const endpoints = {
    summary: `${baseUrl}/api/summary?walletAddress=${walletAddress}`,
    // nfts: `${baseUrl}/api/nfts?walletAddress=${walletAddress}`,
    // // tokensTransactions: `${baseUrl}/api/tokens?walletAddress=${walletAddress}&type=transactions`,
    // tokensOwned: `${baseUrl}/api/tokens?walletAddress=${walletAddress}&type=tokens`
  };

  try {
    // Execute all requests and handle them individually
    const results = await Promise.allSettled([
      axios.get(endpoints.summary),
      axios.get(endpoints.nfts),
      axios.get(endpoints.tokensTransactions),
      axios.get(endpoints.tokensOwned)
    ]);

    const combinedResponse = {
      summary: results[0].status === 'fulfilled' ? results[0].value.data : { wallet: 'too new' },
      nfts: results[1].status === 'fulfilled' ? results[1].value.data : { wallet: 'too new' },
      transactions: results[2].status === 'fulfilled' ? results[2].value.data : { wallet: 'too new' },
      tokens: results[3].status === 'fulfilled' ? results[3].value.data : { wallet: 'too new' }
    };

    // Construct insights based on actual available data
    const insights = {
      totalEcosystemEngagement: {
        nftCount: combinedResponse.nfts.totalNFTs || 0,
        tokenCount: combinedResponse.tokens.totalTokens || 0,
        transactionCount: combinedResponse.transactions.totalTransactions || 0
      },
      tradingProfile: {
        mostProfitableToken: combinedResponse.summary.mostProfitableToken || '0',
        mostLossToken: combinedResponse.summary.mostLossToken || '0',
        totalProfitLoss: combinedResponse.summary.totalProfitLossSummary || '0'
      }
    };

    // Add transaction timeline if data is available
    if (combinedResponse.transactions.firstTransaction && 
        combinedResponse.transactions.lastTransaction) {
      insights.transactionTimeline = {
        firstTransaction: combinedResponse.transactions.firstTransaction,
        lastTransaction: combinedResponse.transactions.lastTransaction,
        transactionSpan: calculateTransactionSpan(
          combinedResponse.transactions.firstTransaction.timestamp,
          combinedResponse.transactions.lastTransaction.timestamp
        )
      };
    } else {
      insights.transactionTimeline = { wallet: 'too new' };
    }

    // Return the complete data
    return NextResponse.json({
      summary: combinedResponse.summary,
      nfts: {
        totalNFTs: combinedResponse.nfts.totalNFTs || 0,
        nfts: combinedResponse.nfts.nfts || []
      },
      transactions: {
        totalTransactions: combinedResponse.transactions.totalTransactions || 0,
        firstTransaction: combinedResponse.transactions.firstTransaction,
        lastTransaction: combinedResponse.transactions.lastTransaction
      },
      tokens: {
        totalTokens: combinedResponse.tokens.totalTokens || 0,
        tokens: combinedResponse.tokens.tokens || []
      },
      insights
    }, { status: 200 });

  } catch (error) {
    console.error('Error aggregating wallet data:', error);
    return NextResponse.json({
      error: 'Failed to aggregate wallet data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function calculateTransactionSpan(firstTimestamp, lastTimestamp) {
  const first = new Date(firstTimestamp);
  const last = new Date(lastTimestamp);
  
  const diffMs = last.getTime() - first.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${diffDays} days, ${diffHours} hours`;
}