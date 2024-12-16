'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import axios from 'axios';

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import { fetchAllDigitalAssetWithTokenByOwner } from "@metaplex-foundation/mpl-token-metadata";

import '@solana/wallet-adapter-react-ui/styles.css';

// Utility function for summarizing NFT data
const summarizeNFTData = (nft) => {
  const summary = {
    name: nft.metadata.name || 'Unnamed NFT',
    type: nft.metadata.symbol ? `${nft.metadata.symbol} Collection` : 'Unclassified',
    key_attributes: {}
  };

  try {
    const uriParts = nft.metadata.uri.split('/');
    summary.origin = uriParts[2] || 'Unknown Source';

    const descriptionMatch = nft.metadata.description?.match(/(\w+)/g);
    if (descriptionMatch) {
      summary.key_words = descriptionMatch.slice(0, 5);
    }
  } catch (error) {
    console.error('Summary extraction error', error);
  }

  return summary;
};

class SolanaFeeTracker {
    constructor(rpcUrl = 'https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a') {
        this.RPC_URL = rpcUrl;
        this.AVERAGE_TX_FEE = 0.000005; // 5000 lamports
    }

    async getYearlyTransactionSummary(walletAddress) {
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
                estimatedTotalFees: signatures.length * this.AVERAGE_TX_FEE,
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

const NFTDataDisplay = () => {
    const { publicKey: walletPublicKey } = useWallet();
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState('nfts');
    const [nftDetailView, setNftDetailView] = useState('summary');
    const [transactionData, setTransactionData] = useState(null);

    const fetchNFTs = async () => {
        if (!walletPublicKey) return;

        setIsLoading(true);
        setError(null);

        try {
            const umi = createUmi("https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a");
            const ownerPublicKey = publicKey(walletPublicKey.toBase58());
            const allNFTs = await fetchAllDigitalAssetWithTokenByOwner(umi, ownerPublicKey);
            
            setNfts(allNFTs);
        } catch (err) {
            console.error("Error fetching NFTs:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTransactions = async () => {
        if (!walletPublicKey) return;

        setIsLoading(true);
        setError(null);

        try {
            const feeTracker = new SolanaFeeTracker();
            const summary = await feeTracker.getYearlyTransactionSummary(walletPublicKey.toBase58());
            
            setTransactionData(summary);
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (walletPublicKey) {
            if (activeView === 'nfts') {
                fetchNFTs();
            } else if (activeView === 'transactions') {
                fetchTransactions();
            }
        }
    }, [walletPublicKey, activeView]);

    const nftSummaries = useMemo(() => 
        nfts.map(nft => summarizeNFTData(nft)),
        [nfts]
    );

    return (
        <div className="flex min-h-screen text-black bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white p-4 shadow-md space-y-4">
                <WalletMultiButton />
                
                {/* Main View Selector */}
                <div className="space-y-2">
                    <h3 className="font-bold text-lg">Data Views</h3>
                    <button
                        onClick={() => setActiveView('nfts')}
                        className={`w-full p-2 rounded ${
                            activeView === 'nfts' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        NFT Collection
                    </button>
                    <button
                        onClick={() => setActiveView('transactions')}
                        className={`w-full p-2 rounded ${
                            activeView === 'transactions' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        Transaction History
                    </button>
                </div>

                {/* NFT View Selector (Only show when NFTs view is active) */}
                {activeView === 'nfts' && (
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">NFT Views</h3>
                        <button
                            onClick={() => setNftDetailView('summary')}
                            className={`w-full p-2 rounded ${
                                nftDetailView === 'summary' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            Summarized View
                        </button>
                        <button
                            onClick={() => setNftDetailView('full')}
                            className={`w-full p-2 rounded ${
                                nftDetailView === 'full' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            Full Details
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 overflow-y-auto">
                {activeView === 'nfts' && (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-200 font-bold">
                            NFTs Found: {nfts.length}
                        </div>

                        {isLoading && (
                            <div className="text-center text-xl mt-4">Loading NFTs...</div>
                        )}

                        {error && (
                            <div className="bg-red-100 text-red-600 p-4 rounded mt-4">
                                Error: {error}
                            </div>
                        )}

                        {nfts.length > 0 && nftDetailView === 'summary' && (
                            <div className="grid grid-cols-2 gap-4 p-4">
                                {nftSummaries.map((summary, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-gray-100 p-3 rounded shadow-sm"
                                    >
                                        <h3 className="font-bold mb-2">{summary.name}</h3>
                                        <p>Type: {summary.type}</p>
                                        {summary.key_words && (
                                            <div>
                                                <strong>Key Words:</strong>
                                                <p>{summary.key_words.join(', ')}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {nfts.length > 0 && nftDetailView === 'full' && (
                            <div className="max-h-[600px] overflow-y-auto">
                                {nfts.map((nft, index) => (
                                    <div
                                        key={nft.publicKey.toString()}
                                        className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition"
                                    >
                                        <div className="font-semibold mb-2">
                                            NFT #{index + 1}
                                        </div>
                                        <div className="bg-gray-100 p-3 rounded">
                                            <pre className="text-xs overflow-x-auto">
                                                {JSON.stringify(
                                                    {
                                                        mintAddress: nft.publicKey.toString(),
                                                        name: nft.metadata.name,
                                                        symbol: nft.metadata.symbol,
                                                        uri: nft.metadata.uri
                                                    },
                                                    null,
                                                    2
                                                )}
                                            </pre>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {walletPublicKey && nfts.length === 0 && !isLoading && (
                            <div className="text-center text-gray-600 mt-4">
                                No NFTs found in this wallet.
                            </div>
                        )}
                    </div>
                )}

                {activeView === 'transactions' && (
                    <div className="bg-white text-black p-4 rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-bold mb-4">Transaction Summary</h2>
                        {isLoading && <p>Loading transaction data...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        
                        {transactionData && (
                            <div className="space-y-3">
                                <div className="bg-gray-100 p-3 rounded">
                                    <h3 className="font-semibold mb-2">Overview</h3>
                                    <p>Total Transactions (Last Year): {transactionData.totalTransactions}</p>
                                    <p>Estimated Total Fees: {transactionData.estimatedTotalFees.toFixed(4)} SOL</p>
                                </div>

                                {transactionData.firstTransaction && (
                                    <div className="bg-gray-100 p-3 rounded">
                                        <h3 className="font-semibold mb-2">First Transaction</h3>
                                        <p>Signature: {transactionData.firstTransaction.signature}</p>
                                        <p>Timestamp: {transactionData.firstTransaction.timestamp}</p>
                                        <p>Fee: {transactionData.firstTransaction.fee} SOL</p>
                                    </div>
                                )}

                                {transactionData.lastTransaction && (
                                    <div className="bg-gray-100 p-3 rounded">
                                        <h3 className="font-semibold mb-2">Last Transaction</h3>
                                        <p>Signature: {transactionData.lastTransaction.signature}</p>
                                        <p>Timestamp: {transactionData.lastTransaction.timestamp}</p>
                                        <p>Fee: {transactionData.lastTransaction.fee} SOL</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {!transactionData && !isLoading && (
                            <div className="text-center text-gray-600">
                                No transaction data available.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NFTDataDisplay;