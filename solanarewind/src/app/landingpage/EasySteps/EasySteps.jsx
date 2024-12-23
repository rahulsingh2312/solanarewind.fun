import React from 'react';
import BettingStep from './BettingStep';
import DocsCard from './DocsCard';
import RoundedImage from './RoundedImage';

const steps = [
  {
    title: "Connect-Wallet",
    description: "Simply connect your funded Solana blockchain wallet to the website.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab5715b7fef826efb723244093f905de9ac3941d338c67b4e2aa9ef213e50cd3?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853",

  },
  {
    title: "Select-Market",
    description: "Choose the event and market you wish to bet on from our comprehensive selection.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab5715b7fef826efb723244093f905de9ac3941d338c67b4e2aa9ef213e50cd3?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853",

  },
  {
    title: "Place-Bet",
    description: "Adjust your stake and odds, then confirm the transaction through your blockchain wallet.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab5715b7fef826efb723244093f905de9ac3941d338c67b4e2aa9ef213e50cd3?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853",
  },
  {
    title: "Enjoy-Winnings",
    description: "Once the event is over and the market is settled, your winnings are automatically sent back to your wallet.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab5715b7fef826efb723244093f905de9ac3941d338c67b4e2aa9ef213e50cd3?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853",

  },
];

function EasySteps() {
  return (
    <main className="pt-9 md:pl-20 pl-10 bg-none">
      <div className="flex gap-5 max-md:flex-col">
        <section className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mt-20 max-md:mt-10 max-md:max-w-full">
            <h1 className="text-5xl font-semibold text-white max-md:max-w-full max-md:text-4xl">
              <span className="text-white font-[275]">Easy Steps to Bet on </span>
              <span className="font-medium bluetext">Sports</span>
            </h1>
            <p className="mt-3.5 text-base text-stone-500 max-md:max-w-full">
              Purebet simplifies sports betting with simple steps
            </p>
            <div className="mt-16 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                {steps.slice(0, 2).map((step, index) => (
                  <BettingStep key={index} {...step} />
                ))}
              </div>
            </div>
            <div className="mt-12 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                {steps.slice(2).map((step, index) => (
                  <BettingStep key={index + 2} {...step} />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="flex bg-none absolute right-40 flex-col ml-5 max-md:ml-0 max-md:w-full">
          
          <div className="px-16 pt-20 mt-9 rounded-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 bg-black max-md:flex-col">
            <RoundedImage />
              
            </div>
          </div>
        </section>
        <section className="flex bg-none flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
          
          <div className="px-16 pt-20 mt-9 rounded-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 bg-black max-md:flex-col">
            
            
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default EasySteps;