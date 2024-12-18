'use client';

import { useEffect, useState } from 'react';
import model from '../lib/model';

export default function TestPage() {
  const [walletData, setWalletData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {

        const response = await fetch('/api/final?walletAddress=0x123...'); 
        const data = await response.json();
    
        model.setResponse(data);

        const storedContext = model.getContext();
        
        const prompt = model.generatePrompt();
        console.log('Generated Prompt:', prompt);

        const analysisResult = await model.getAnalysis();
        setAnalysis(analysisResult);

        setWalletData(storedContext);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Wallet Analysis Test Page</h1>
      
      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}

      {walletData && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Raw Wallet Data</h2>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(walletData, null, 2)}
            </pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Generated Prompt</h2>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(model.generatePrompt(), null, 2)}
            </pre>
          </div>

          {analysis && (
            <div>
              <h2 className="text-xl font-semibold">AI Analysis</h2>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(analysis, null, 2)}
              </pre>
            </div>
          )}

          <button 
            onClick={async () => {
              try {
                const newAnalysis = await model.getAnalysis();
                setAnalysis(newAnalysis);
              } catch (err) {
                setError(err.message);
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Regenerate Analysis
          </button>

          <button 
            onClick={() => {
              model.clear();
              setWalletData(null);
              setAnalysis(null);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear Data
          </button>
        </div>
      )}
    </div>
  );
}