'use client';

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';

const firebaseConfig = {
  apiKey: "AIzaSyAQqa0KjFo9OBH95G03fsTGNjUbEoU5JbA",
  authDomain: "emoji-buy.firebaseapp.com",
  projectId: "emoji-buy",
  storageBucket: "emoji-buy.firebasestorage.app",
  messagingSenderId: "329260816313",
  appId: "1:329260816313:web:34527cb53f22a512254868",
  measurementId: "G-D654LZE41V",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper function to get conclusion content
const getConclusionContent = (analysis) => {
  if (!analysis) return { title: "", description: "" };
  
  const analysisPoints = JSON.parse(analysis).split("\n\n");
  const conclusionPoint = analysisPoints.find(point => 
    point.includes("Conclusion:") || 
    point.includes("### Conclusion:")
  );

  if (conclusionPoint) {
    const match = conclusionPoint.match(/\*\*([^*]+)\*\*\s*-\s*(.+)/);
    if (match) {
      return {
        title: match[1].trim(),
        description: match[2].trim()
      };
    }
  }

  return {
    title: "The Wallet of Woe",
    description: "Your saga of crypto adventures, featuring missed opportunities, questionable decisions, and a collection of tokens that tell quite a story."
  };
};

export default function WalletPage() {
  const params = useParams();
  const walletAddress = params?.walletaddress;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conclusion, setConclusion] = useState({ title: "", description: "" });

  useEffect(() => {
    async function fetchData() {
      if (!walletAddress) {
        setError('Invalid wallet address');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "walletData", walletAddress);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          setError('Wallet not found');
          setLoading(false);
          return;
        }

        const walletData = docSnap.data();
        setData(walletData);
        
        if (walletData.analysis) {
          setConclusion(getConclusionContent(walletData.analysis));
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setError('Error loading wallet data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [walletAddress]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading your Solana Rewind...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">
          {error === 'Wallet not found' 
            ? "This wallet hasn't generated its Solana Rewind yet." 
            : "Please provide a valid Solana wallet address."}
        </div>
      </div>
    );
  }

  const { tokenData } = data || {};
  const { mostTraded, topThreeTokens } = tokenData || {};

  return (
    <>
      <Head>
        {/* <title>{conclusion.title} | Solana Rewind</title>
        <meta name="description" content={conclusion.description} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@solanarewind" />
        <meta name="twitter:title" content={conclusion.title} />
        <meta name="twitter:description" content={conclusion.description} />
        <meta name="twitter:image" content={`/testog.png`} />
        <meta property="og:title" content={conclusion.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://solanarewind.fun/wallet/${walletAddress}`} />
        <meta property="og:image" content='/testog.png' />
        <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />
        <meta property="og:description" content={conclusion.description} />
        <meta property="og:site_name" content="Solana Rewind" /> */}




  <title>{conclusion.title} | Solana Rewind</title>
  <meta name="description" content={conclusion.description} />
  
  {/* Twitter Metadata */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@solanarewind" />
  <meta name="twitter:title" content={conclusion.title} />
  <meta name="twitter:description" content={conclusion.description} />
  <meta name="twitter:image" content="/testog.png" />

  {/* Open Graph Metadata */}
  <meta property="og:title" content={conclusion.title} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://solanarewind.fun/wallet/${walletAddress}`} />
  <meta property="og:image" content="/testog.png" />
  <meta property="og:description" content={conclusion.description} />
  <meta property="og:site_name" content="Solana Rewind" />


      </Head>

      <div className="min-h-screen flex justify-center items-center bg-black">
        <div className="max-w-[440px] mx-auto bg-black rounded-lg p-6 relative overflow-hidden">
          <img
            src="/bluehalfbars.png"
            className="absolute -top-6 -left-6 h-1/3 animate-pulse pointer-events-none"
            draggable="false"
            alt=""
          />
          
          <div className="text-center w-full px-6 z-50 relative">
            <h1 className="text-2xl font-bold mb-4 text-white">{conclusion.title}</h1>
            <p className="text-lg mb-6 text-white/80">{conclusion.description}</p>

            {mostTraded?.icon && (
              <img
                src={mostTraded.icon}
                alt={`${mostTraded.symbol} logo`}
                className="h-32 w-32 mx-auto rounded-full border-4 border-white/20 mb-6"
              />
            )}

            <div className="flex justify-between items-start mb-8">
              <div className="text-left">
                <h2 className="font-bold text-xl text-white mb-3">Top Tokens</h2>
                <ul className="text-base font-medium text-white/60 space-y-2">
                  {topThreeTokens?.map((token, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {token.icon && (
                        <img src={token.icon} alt={token.symbol} className="w-6 h-6 rounded-full" />
                      )}
                      <span>{token.symbol}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <h2 className="font-bold text-xl text-white mb-3">Most Traded</h2>
                <div className="flex items-center gap-2 justify-end">
                  {mostTraded?.icon && (
                    <img src={mostTraded.icon} alt={mostTraded.symbol} className="w-6 h-6 rounded-full" />
                  )}
                  <span className="text-white/60">{mostTraded?.symbol}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
               
                const shareUrl = `https://solanarewind.fun`;
                window.open(shareUrl, "_blank");
              }}
              className="mt-4 bg-white text-black px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-[#1a91da] transition-colors duration-200 mx-auto"
            >
             🔥
              <span className="font-medium ml-3">Check yours?</span>
            </button>
          </div>
          
          <img
            src="/bluehalfbars.png"
            className="absolute -bottom-6 rotate-180 -right-6 h-1/3 animate-pulse pointer-events-none"
            draggable="false"
            alt=""
          />
        </div>
      </div>
    </>
  );
}