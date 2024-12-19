'use client';

import { useState, useEffect } from 'react';
import model from '../lib/model';

export default function TestAnalysisPage() {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getWalletAnalysis() {
        setLoading(true);
        setError(null);
        try {
 
            const walletResponse = await fetch('/api/final?walletAddress=CZ3u1cVyApTCXsfgbBwhBYeVDbi17PKYLmfuVh3Z9ps9'); // Add Here
            const walletData = await walletResponse.json();

            model.setResponse(walletData);
            
            const analysisResponse = await fetch('/api/test-analysis', {
                method: 'POST'
            });
            
            const analysisData = await analysisResponse.json();
            
            if (!analysisData.success) {
                throw new Error(analysisData.error);
            }
            
            setAnalysis(analysisData);
        } catch (err) {
            setError(err.message);
            console.error('Analysis failed:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Wallet Analysis Test</h1>
            
            <button 
                onClick={getWalletAnalysis}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {loading ? 'Analyzing...' : 'Analyze Wallet'}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                    Error: {error}
                </div>
            )}

            {analysis && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Analysis Result:</h2>
                    <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
                        {JSON.stringify(analysis, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}