'use client';

import { useState } from 'react';

export default function TestPage() {
    const [walletAddress, setWalletAddress] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyzeWallet = async () => {
        setLoading(true);
        setError(null);

        try {
            // First, fetch and store wallet data
            const fetchResponse = await fetch(`http://localhost:3001/fetch-wallet/${walletAddress}`, {
                method: 'POST'
            });
            const fetchData = await fetchResponse.json();

            if (!fetchResponse.ok) {
                throw new Error(fetchData.error || 'Failed to fetch wallet data');
            }

            // Then get AI analysis
            const analysisResponse = await fetch('http://localhost:3001/analyze-wallet', {
                method: 'POST'
            });
            const analysisData = await analysisResponse.json();

            if (!analysisResponse.ok) {
                throw new Error(analysisData.error || 'Failed to get analysis');
            }

            setAnalysis(analysisData);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Wallet Analysis Test</h1>

                <div className="space-y-4">
                    <input
                        type="text"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="Enter wallet address"
                        className="w-full p-2 border rounded"
                    />

                    <button
                        onClick={analyzeWallet}
                        disabled={loading || !walletAddress}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Wallet'}
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded">
                        Error: {error}
                    </div>
                )}

                {analysis && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Analysis Result</h2>
                        <pre className="p-4 bg-gray-50 rounded overflow-auto">
                            {JSON.stringify(analysis, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
