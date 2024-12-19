import { NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'edge';

// Utility Functions
const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateDynamicCookie = () => {
    const timestamp = Date.now();
    return {
        '_ga': `GA1.1.${Math.floor(Math.random() * 1000000000)}.${timestamp}`,
        '_ga_0XM0LYXGC8': `GS1.1.1.${timestamp}.1.1.${timestamp}.0.0.0`,
        'cf_clearance': `${generateRandomString(32)}-${timestamp}-1.2.1.1-${generateRandomString(40)}`,
        '__cf_bm': `${generateRandomString(32)}-${timestamp}-1.0.1.1-${generateRandomString(40)}`
    };
};

const cookieToHeaderString = (cookieObj) => {
    return Object.entries(cookieObj)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
        return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    try {
        const dynamicCookies = generateDynamicCookie();

        // First get NFT holdings from GMGN
        const nftResponse = await axios.get(`https://gmgn.ai/api/v1/wallet_nfts/sol/${walletAddress}`, {
            headers: {
                'authority': 'gmgn.ai',
                'accept': 'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'dnt': '1',
                'priority': 'u=1, i',
                'referer': `https://gmgn.ai/sol/address/${walletAddress}`,
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'cookie': cookieToHeaderString(dynamicCookies),
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const nfts = nftResponse.data.data.nfts;

        // Process NFTs to calculate statistics
        const collections = {};
        nfts.forEach(nft => {
            const collectionName = nft.collection?.name || 'Unknown Collection';
            if (!collections[collectionName]) {
                collections[collectionName] = {
                    count: 0,
                    floorPrice: parseFloat(nft.floor_price || 0),
                    totalValue: 0
                };
            }
            collections[collectionName].count++;
            collections[collectionName].totalValue += parseFloat(nft.price || 0);
        });

        return NextResponse.json({
            totalNFTs: nfts.length,
            collections: Object.entries(collections).map(([name, data]) => ({
                name,
                count: data.count,
                floorPrice: data.floorPrice,
                totalValue: data.totalValue
            })),
            details: nfts.map(nft => ({
                name: nft.name || 'Unnamed NFT',
                collection: nft.collection?.name || 'Unknown Collection',
                price: parseFloat(nft.price || 0),
                lastSale: parseFloat(nft.last_sale_price || 0)
            }))
        });

    } catch (error) {
        console.error('Error fetching NFTs:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch NFTs', 
            details: error.message 
        }, { status: 500 });
    }
}
