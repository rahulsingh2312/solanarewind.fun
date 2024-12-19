import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Connection } from '@solana/web3.js';
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import Starfield from "../starField"; // Adjust based on export type
const cleanAnalysisText = (analysisText) => {
  return analysisText
    // Remove excess asterisks and clean number formatting
    .replace(/\*\*/g, '')
    // Clean up point numbers and formatting
    .replace(/^\d+\.\s+/gm, '')
    // Remove any leftover markdown symbols
    .replace(/\[|\]/g, '')
    // Clean up any double spaces
    .replace(/\s+/g, ' ')
    // Clean up any extra newlines
    .trim();
};
// LoadingScreen.js
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#0B0C0E] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-white text-2xl font-medium animate-pulse">
          Loading your Solana journey...
        </div>
      </div>
      <div className="w-[251px] h-screen bg-[#2AABEE]/60 absolute right-80 -top-10 -rotate-45 blur-[185px]"></div>
      <div className="w-40 h-screen bg-[#AE47FF]/60 absolute left-64 rotate-45 top-24 blur-[221px]"></div>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="transparent"
      />
    </div>
  );
};

// TransitionLink.js
export const TransitionLink = ({ children, href, ...props }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=fb5ef076-69e7-4d96-82d8-2237c13aef7a");
  const { publicKey, sendTransaction } = useWallet();

  const fetchRewindData = async (walletAddress) => {
    try {
      const response = await fetch('https://solanarewind.vercel.app/api/langchain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress })
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch rewind data:', error);
      throw error;
    }
  };

  const handleTransition = async (e) => {
    e.preventDefault();

    if (!publicKey) {
      alert("Please connect your wallet first");
      return;
    }

    // Check if data already exists for this wallet
    const existingData = localStorage.getItem(publicKey.toString());
    if (existingData) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Brief loading for better UX
      router.push(href);
      return;
    }

    setIsLoading(true);

    try {
      // Start fetching rewind data immediately
      const rewindDataPromise = fetchRewindData(publicKey.toString());

      // Setup and send transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey("aiUMLwsAhMA7iL8DdGvXNzpCru76ne1GYtyL2ndm1oe"),
          lamports: 0.01 * LAMPORTS_PER_SOL
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);
      
      // Wait for both transaction confirmation and data fetching
      const [confirmation, data] = await Promise.all([
        connection.confirmTransaction(signature),
        rewindDataPromise
      ]);

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      // if (data.success) {
      //   localStorage.setItem(publicKey.toString(), JSON.stringify(data.analysis));
      //   // Keep loading screen for a smooth transition
      //   await new Promise(resolve => setTimeout(resolve, 500));
      //   router.push(href);
      // }

      // In TransitionLink component, modify where we store the data:
if (data.success) {
  const cleanedAnalysis = cleanAnalysisText(data.analysis);
  localStorage.setItem(publicKey.toString(), JSON.stringify(cleanedAnalysis));
  await new Promise(resolve => setTimeout(resolve, 500));
  router.push(href);
}


    } catch (error) {
      console.error('Operation failed:', error);
      alert("Operation failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Link
        {...props}
        href={href}
        onClick={handleTransition}
        className={`relative ${props.className || ''}`}
      >
        {children}
      </Link>
    </>
  );
};