import axios from 'axios';

async function SolanaFeeTracker(walletAddress) {
    try {
        const currentTimestamp = Date.now();
        const oneYearAgo = Math.floor((currentTimestamp - (365 * 24 * 60 * 60 * 1000)) / 1000);

        const response = await axios.post(process.env.NEXT_PUBLIC_HELIUS, {
            jsonrpc: "2.0",
            id: 1,
            method: "get-address-transactions", // Use the correct method based on Helius API
            params: {
                account: walletAddress,
                startDate: oneYearAgo
            }
        });

        const transactions = response.data || [];
        if (transactions.length === 0) {
            return {
                totalTransactions: 0,
                lastTransactionTime: null
            };
        }

        const lastTransaction = transactions[0];
        const lastTransactionTime = new Date(lastTransaction.blockTime * 1000).toISOString();

        return {
            totalTransactions: transactions.length,
            lastTransactionTime
        };
    } catch (error) {
        console.error("Error retrieving transaction data:", error.response?.data || error.message);
        return null;
    }
}

export default SolanaFeeTracker;
