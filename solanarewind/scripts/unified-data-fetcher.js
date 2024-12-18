import { publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { fetchAllDigitalAssetWithTokenByOwner } from "@metaplex-foundation/mpl-token-metadata";
import axios from 'axios';


function getCollectionStats(nfts) {
    const collections = {};
    nfts.forEach(nft => {
        const collectionId = nft.grouping?.find(g => g.group_key === 'collection')?.group_value;
        if (collectionId) {
            if (!collections[collectionId]) {
                collections[collectionId] = {
                    count: 0,
                    name: nft.content?.metadata?.symbol || 'Unknown Collection'
                };
            }
            collections[collectionId].count++;
        }
    });
    
    return Object.entries(collections)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, 5)
        .map(([id, data]) => ({
            id,
            name: data.name,
            count: data.count
        }));
}

function getCreatorStats(nfts) {
    const creators = {};
    nfts.forEach(nft => {
        nft.creators?.forEach(creator => {
            if (!creators[creator.address]) {
                creators[creator.address] = {
                    count: 0,
                    verified: creator.verified
                };
            }
            creators[creator.address].count++;
        });
    });

    return Object.entries(creators)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, 5)
        .map(([address, data]) => ({
            address,
            count: data.count,
            verified: data.verified
        }));
}

export async function fetchUnifiedWalletData(walletAddress) {
    try {
        const umi = createUmi('https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a').use(dasApi());
        const ownerPublicKey = publicKey(walletAddress);

        const [compressedAssets, allNFTs] = await Promise.all([
            umi.rpc.getAssetsByOwner({ owner: ownerPublicKey }),
            fetchAllDigitalAssetWithTokenByOwner(umi, ownerPublicKey)
        ]);

        const currentTimestamp = Date.now();
        const oneYearAgo = Math.floor((currentTimestamp - (365 * 24 * 60 * 60 * 1000)) / 1000);
        const transactionResponse = await axios.post(
            "https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a",
            {
                jsonrpc: "2.0",
                id: 1,
                method: "getSignaturesForAddress",
                params: [walletAddress, { limit: 1000, before: null, after: oneYearAgo }]
            }
        );

        const nftItems = [...(compressedAssets.items || []), ...(allNFTs || [])];

        const walletSummary = {
            address: walletAddress,
            activity: {
                total_transactions: transactionResponse.data.result.length,
                transactions_last_24h: transactionResponse.data.result.filter(tx => 
                    (Date.now() / 1000) - tx.blockTime < 24 * 60 * 60
                ).length,
                last_activity: transactionResponse.data.result[0]?.blockTime 
                    ? new Date(transactionResponse.data.result[0].blockTime * 1000).toISOString()
                    : null
            },
            nft_stats: {
                total_nfts: nftItems.length,
                compressed_nfts: compressedAssets.items.length,
                regular_nfts: allNFTs.length,
                delegated_nfts: nftItems.filter(nft => nft.ownership?.delegated).length,
                top_collections: getCollectionStats(nftItems),
                top_creators: getCreatorStats(nftItems)
            },
            interesting_facts: {
                has_verified_nfts: nftItems.some(nft => 
                    nft.creators?.some(creator => creator.verified)
                ),
                favorite_collection: getCollectionStats(nftItems)[0]?.name || 'None',
                is_active_trader: transactionResponse.data.result.length > 100,
                burnt_nfts: nftItems.filter(nft => nft.burnt).length
            }
        };

        return walletSummary;
    } catch (error) {
        console.error('Error in unified data fetch:', error);
        throw error;
    }
}