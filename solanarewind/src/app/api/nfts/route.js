export const maxDuration = 60; 

import { NextRequest, NextResponse } from 'next/server';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { publicKey } from '@metaplex-foundation/umi';

export const runtime = 'edge';

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
    // Initialize Umi with Helius RPC
    const umi = createUmi('https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a').use(dasApi());

    // Fetch assets for the specified wallet
    const assets = await umi.rpc.getAssetsByOwner({
      owner: publicKey(walletAddress),
    });

    // Transform and analyze assets
    const totalNFTs = assets.items.length;

    // 2. Check if Superteam Member
    const isSuperteamMember = assets.items.some(asset => 
      /superteam member/i.test(asset.content?.metadata?.name || '')
    );

    // 3. Extract name and XP from Superteam Member NFT
    let name = 'N/A';
    let xp = 0;
    const superteamNFT = assets.items.find(asset => 
      /superteam member/i.test(asset.content?.metadata?.name || '')
    );
    
    if (superteamNFT && superteamNFT.content?.links?.image) {
      const nameMatch = superteamNFT.content.links.image.match(/name=([^&]+)/);
      const xpMatch = superteamNFT.content.links.image.match(/xp=(\d+)/);
      
      name = nameMatch ? nameMatch[1] : 'N/A';
      xp = xpMatch ? parseInt(xpMatch[1]) : 0;
    }

    // 4 & 5. Check and Count Ecosystem Calls
    const ecosystemCalls = assets.items.filter(asset => 
      /ecosystem call/i.test(asset.content?.metadata?.name || '')
    );
    const ecosystemCallsAttended = ecosystemCalls.length > 0;
    const ecosystemCallMonths = ecosystemCalls.map(call => {
      const monthMatch = call.content?.metadata?.name?.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i);
      return monthMatch ? monthMatch[1] : 'Unknown';
    });

     // Transform assets into a more frontend-friendly format and limit to 10 NFTs
     const nftDetails = assets.items.map((asset) => ({
      title: asset.content?.metadata?.name || 'Untitled NFT',
      description: asset.content?.metadata?.description || 'No description',
      imageUrl: asset.content?.links?.image || '',
    })).slice(0, 10); // Limit to 10 NFTs


    // Return comprehensive NFT analysis
    return NextResponse.json({
      totalNFTs,
      isSuperteamMember,
      superteamMemberDetails: {
        name,
        xp
      },
      ecosystemCallsAttended,
      ecosystemCallMonths,
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