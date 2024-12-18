import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  const endpoints = {
    summary: `http://localhost:3000/api/summary?walletAddress=${walletAddress}`,
    nfts: `http://localhost:3000/api/nfts?walletAddress=${walletAddress}`,
    tokensTransactions: `http://localhost:3000/api/tokens?walletAddress=${walletAddress}&type=transactions`,
    tokensOwned: `http://localhost:3000/api/tokens?walletAddress=${walletAddress}&type=tokens`
  };

  try {
    // Perform parallel API calls
    const [
      summaryResponse, 
      nftsResponse, 
      transactionsResponse, 
      tokensResponse
    ] = await Promise.all([
      axios.get(endpoints.summary),
      axios.get(endpoints.nfts),
      axios.get(endpoints.tokensTransactions),
      axios.get(endpoints.tokensOwned)
    ]);

    const combinedResponse = {
      summary: summaryResponse.data,
      nfts: nftsResponse.data,
      transactions: transactionsResponse.data,
      tokens: tokensResponse.data
    };

    // Additional derived insights
    combinedResponse.insights = {
      totalEcosystemEngagement: {
        nftCount: combinedResponse.nfts.totalNFTs,
        tokenCount: combinedResponse.tokens.totalTokens,
        transactionCount: combinedResponse.transactions.totalTransactions
      },
      tradingProfile: {
        mostProfitableToken: combinedResponse.summary.mostProfitableToken,
        mostLossToken: combinedResponse.summary.mostLossToken,
        totalProfitLoss: combinedResponse.summary.totalProfitLossSummary
      },
      transactionTimeline: {
        firstTransaction: combinedResponse.transactions.firstTransaction,
        lastTransaction: combinedResponse.transactions.lastTransaction,
        transactionSpan: calculateTransactionSpan(
          combinedResponse.transactions.firstTransaction.timestamp,
          combinedResponse.transactions.lastTransaction.timestamp
        )
      }
    };

    return NextResponse.json(combinedResponse, { status: 200 });
  } catch (error) {
    console.error('Error aggregating wallet data:', error);
    return NextResponse.json({ 
      error: 'Failed to aggregate wallet data', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

// Utility function to calculate transaction timeline
function calculateTransactionSpan(firstTimestamp, lastTimestamp) {
  const first = new Date(firstTimestamp);
  const last = new Date(lastTimestamp);
  
  const diffMs = last.getTime() - first.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${diffDays} days, ${diffHours} hours`;
}