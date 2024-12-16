import { NextRequest, NextResponse } from 'next/server';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { publicKey } from '@metaplex-foundation/umi';

export const runtime = 'nodejs'; // Ensure server-side rendering

export async function GET(request) {
  // Extract wallet address from query parameters
  const searchParams = request.nextUrl.searchParams;
  const walletAddress = searchParams.get('walletAddress');

  // Validate wallet address
  if (!walletAddress) {
    return NextResponse.json(
      { error: 'Wallet address is required' }, 
      { status: 400 }
    );
  }

  try {
    // Initialize Umi with Helius RPC (replace with your API key)
    const umi = createUmi('https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a').use(dasApi());

    // Fetch assets for the specified wallet
    const assets = await umi.rpc.getAssetsByOwner({
      owner: publicKey(walletAddress),
    });

    // Transform assets into a more frontend-friendly format
    const nftDetails = assets.items.map((asset) => ({
      id: asset.id,
      title: asset.content?.metadata?.name || 'Untitled NFT',
      description: asset.content?.metadata?.description || 'No description',
      imageUrl: asset.content?.links?.image || '',
      // collectionName: asset.grouping?.find(g => g.group_key === 'collection')?.group_value || 'Unknown Collection'
    }));

    // Return comprehensive NFT information
    return NextResponse.json({
      totalNFTs: assets.items.length,
      nfts: nftDetails
    });

  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch NFTs', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}