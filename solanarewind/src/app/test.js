'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';

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

const TransactionTracker = () => {
    const { publicKey } = useWallet();
    const [transactionData, setTransactionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTransactionData = async () => {
        if (!publicKey) return;

        setLoading(true);
        setError(null);

        try {
            const feeTracker = new SolanaFeeTracker();
            const summary = await feeTracker.getYearlyTransactionSummary(publicKey.toBase58());
            
            setTransactionData(summary);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactionData();
    }, [publicKey]);

    if (!publicKey) return null;

    return (
        <div className="bg-white text-black p-4 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold mb-4">Transaction Summary</h2>
            {loading && <p>Loading transaction data...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            
            {transactionData && (
                <div className="space-y-3">
                    <div className="bg-gray-100 p-3 rounded">
                        <h3 className="font-semibold mb-2">Overview</h3>
                        <p>Total Transactions (Last Year): {transactionData.totalTransactions}</p>
                        {/* <p>Estimated Total Fees: {transactionData.estimatedTotalFees.toFixed(4)} SOL</p> */}
                    </div>

                    {transactionData.firstTransaction && (
                        <div className="bg-gray-100 p-3 rounded">
                            <h3 className="font-semibold mb-2">First Transaction</h3>
                            {/* <p>Signature: {transactionData.firstTransaction.signature}</p> */}
                            <p>Timestamp: {transactionData.firstTransaction.timestamp}</p>
                            {/* <p>Fee: {transactionData.firstTransaction.fee} SOL</p> */}
                        </div>
                    )}

                    {transactionData.lastTransaction && (
                        <div className="bg-gray-100 p-3 rounded">
                            <h3 className="font-semibold mb-2">Last Transaction</h3>
                            {/* <p>Signature: {transactionData.lastTransaction.signature}</p> */}
                            <p>Timestamp: {transactionData.lastTransaction.timestamp}</p>
                            {/* <p>Fee: {transactionData.lastTransaction.fee} SOL</p> */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TransactionTracker;