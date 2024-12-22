import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Connection } from '@solana/web3.js';
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import Starfield from "../starField";

const firebaseConfig = {
  apiKey: "AIzaSyAQqa0KjFo9OBH95G03fsTGNjUbEoU5JbA",
  authDomain: "emoji-buy.firebaseapp.com",
  projectId: "emoji-buy",
  storageBucket: "emoji-buy.firebasestorage.app",
  messagingSenderId: "329260816313",
  appId: "1:329260816313:web:34527cb53f22a512254868",
  measurementId: "G-D654LZE41V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cleanAnalysisText = (analysisText) => {
  return analysisText
    .replace(/\*\*/g, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\[|\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#0B0C0E] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
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

export const TransitionLink = ({ children, href, ...props }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // console.log(process.env.NEXT_PUBLIC_HELIUS);
  const connection = new Connection(process.env.NEXT_PUBLIC_HELIUS);
  const { publicKey, sendTransaction } = useWallet();

  const fetchRewindData = async (walletAddress) => {
    try {
      const response = await fetch('/api/langchain', {
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

  const checkExistingData = async (walletAddress) => {
    try {
      const docRef = doc(db, "walletData", walletAddress);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('Failed to check existing data:', error);
      throw error;
    }
  };

  const saveDataToFirestore = async (walletAddress, data) => {
    try {
      const docRef = doc(db, "walletData", walletAddress);
      await setDoc(docRef, { analysis: data });
    } catch (error) {
      console.error('Failed to save data to Firestore:', error);
      throw error;
    }
  };

  const handleTransition = async (e) => {
    e.preventDefault();

    if (!publicKey) {
      alert("Please connect your wallet first");
      return;
    }

    setIsLoading(true);

    try {
      // Check if data exists in Firestore
      const existingData = await checkExistingData(publicKey.toString());
      
      if (existingData) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Brief loading for better UX
        router.push(href);
        return;
      }

      // Start fetching rewind data immediately
      const rewindDataPromise = fetchRewindData(publicKey.toString());

      // Setup and send transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey("aiUMLwsAhMA7iL8DdGvXNzpCru76ne1GYtyL2ndm1oe"),
          lamports: 0.005 * LAMPORTS_PER_SOL
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

      if (data.success) {
        // const cleanedAnalysis = cleanAnalysisText(data.analysis);
        await saveDataToFirestore(publicKey.toString(), JSON.stringify(data.analysis));
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