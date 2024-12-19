"use client";

import React, { useState, useMemo, useEffect } from "react";
import Starfield from "../../components/starField";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useRef } from "react";
import { gsap } from "gsap";

import TransactionTracker from "../test";
import EmblaCarousel from "../../components/EmblaCarousel";
import "./carousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Page = () => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  const OPTIONS = { loop: false };
  const SLIDE_COUNT = 7;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const item = document.querySelector(".item");
    if (item) {
      setItemWidth(item.offsetWidth); // Get the width of an item
    }
  }, []); // Runs only once when the component mounts

  const handleNext = () => {
    const list = document.querySelector(".list");
    if (list) {
      list.scrollBy({ left: 440, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    const list = document.querySelector(".list");
    if (list) {
      list.scrollBy({ left: -440, behavior: "smooth" });
    }
  };

  const slides1 = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7];

  return (
    <div className="h-screen w-screen">
      <div className="md:hidden">
        <EmblaCarousel slides2={SLIDES} options={OPTIONS} />
      </div>
      <div className="max-md:hidden">
        <div className="list-wrapper px-16 z-40" style={{ overflow: "hidden" }}>
          <ul
            className="list"
            style={{
              display: "flex",
              overflowX: "auto",
              padding: "10px",
              gap: "48px",
            }}
          >
            {slides1.map((SlideComponent, index) => (
              <li
                className="embla__slide"
                key={index}
                style={{
                  // Adjust width to fit nicely
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <SlideComponent />
              </li>
            ))}
          </ul>
          <button
            className="button button--previous bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border"
            type="button"
            onClick={handlePrev}
          >
            <FaChevronLeft className="rotate-180" />
          </button>
          <button
            className="button button--next bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border"
            type="button"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="#0B0C0E"
      />
    </div>
  );
};

export default Page;

const Slide1 = () => {
  return (
    <div className="h-[90vh] w-[440px] bg-black border-zinc-800 border overflow-hidden rounded-lg flex flex-col items-center justify-center">
      <img
        src="./bluebars.png"
        className="fixed -top-24 select-none "
        draggable="false"
        alt=""
      />

      <h1
        className="font-semibold text-5xl leading-tight"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0%, #FFF 49.83%, rgba(255, 255, 255, 0.18) 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Ready for your <br /> <span className="">Solana Rewind?</span>{" "}
      </h1>
      <p className="text-white/40 font-light text-lg mt-2">
        The year of memecoins!
      </p>
      <img
        src="./yellowbars.png"
        className="fixed -bottom-24 rotate-180 select-none"
        draggable="false"
        alt=""
      />
    </div>
  );
};

const Slide2 = () => {
  return (
    <div className="h-[90vh] bg-[#FEF102] w-[440px] rounded-lg embla__slide p-6 overflow-hidden flex flex-col items-center justify-center">
      <img
        src="./bluehalfbars.png"
        className="fixed -top-6 -left-6 h-2/5 animate-pulse select-none"
        draggable="false"
        alt=""
      />
      <h1 className="text-black text-4xl font-semibold">
        You made <span>303</span> Transactions from this wallet!{" "}
      </h1>
      <p className="text-black/70 text-lg mt-2">
        Sorry to say but you are such a pussy, most of the transactions were
        USDC
      </p>

      <img
        src="./bluehalfbars.png"
        className="fixed -bottom-6 rotate-180 -right-6 h-2/5 animate-pulse select-none"
        draggable="false"
        alt=""
      />
    </div>
  );
};

const Slide3 = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-[90vh] w-[440px] bg-[#161616] p-2 border relative rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-evenly border-zinc-800">
      <div className="text-center text-xl font-medium">
        Hover the box to know your favourite token!
        <div
          style={{ transition: "opacity 2s", opacity: hover ? 1 : 0 }}
          className="text-gray-500"
        >
          USDC was your most Traded token
        </div>
      </div>

      <div className="container flex items-center justify-center">
        <div className="row">
          <div className="col-12">
            <img
              className="img z-50 absolute h-48 -translate-y-8"
              src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
              style={{ transition: "opacity 5s", opacity: hover ? 1 : 0 }}
            />
          </div>
          <div className="col-12 mt-5 d-flex justify-content-center">
            <div className="box" onMouseOver={() => setHover(true)}>
              <div className="box-body">
                <img
                  className="img"
                  src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                />
                <div className="box-lid">
                  <div className="box-bowtie"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

if (typeof window !== "undefined") {
  gsap.registerPlugin();
}
const Slide4 = () => {
  const container = useRef(null);
  const tl = useRef(null);
  const winnerTableRef = useRef(null);
  const isRevealed = useRef(false);

  const toggleTimeline = () => {
    if (!isRevealed.current) {
      if (tl.current) {
        tl.current.play();
      }

      // Animate the winnerTable image
      gsap.to(winnerTableRef.current, {
        opacity: 1,
        y: -50,
        duration: 2,
      });

      isRevealed.current = true;
    } else {
      if (tl.current) {
        tl.current.reverse();
      }

      gsap.to(winnerTableRef.current, {
        opacity: 0,
        y: 0,
        duration: 2,
      });

      isRevealed.current = false;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray(".box1");

      // Initialize starting positions
      gsap.set(boxes, { clearProps: "all" });

      tl.current = gsap
        .timeline({ paused: true })
        .to(boxes[0], {
          x: 120,
          rotation: 360,
          duration: 1.5,
        })
        .to(
          boxes[1],
          {
            x: -120,
            y: 10,
            rotation: -360,
            duration: 1.5,
          },
          "<"
        )
        .to(
          boxes[2],
          {
            y: -120,
            duration: 1.5,
          },
          "<"
        );
    }, container);

    // Initialize the winnerTable with hidden state
    gsap.set(winnerTableRef.current, { opacity: 0, y: 0 });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div className="h-[90vh] w-[440px] bg-[#00ADF1] border rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900 relative">
      <img
        src="./redBar.png"
        alt=""
        className="absolute top-0 mix-blend-color-dodge select-none"
      />
      <img
        ref={winnerTableRef}
        src="./winnerTable.png"
        className="absolute -bottom-12 select-none"
        alt=""
      />
      <button
        onClick={toggleTimeline}
        className="absolute bottom-12 z-50 bg-white text-black rounded-full px-4 py-2 hover:bg-gray-500 shadow-xl border border-gray-400"
      >
        {isRevealed.current ? "Reset Animation" : "Reveal The Winner"}
      </button>
      <h2 className="absolute top-32 text-xl font-medium">
        Press the Button to reveal the winner!
      </h2>

      <div ref={container} className="relative">
        <div className="boxes-container">
          <div className="box1 gradient-blue border shadow-2xl rounded-full w-20 h-20">
            <img
              className="w-full h-full object-cover"
              src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
              alt="USDC"
            />
          </div>
          <div className="box1 gradient-blue border shadow-2xl overflow-hidden w-20 h-20">
            <img
              src="https://techpoint.africa/crypto/wp-content/uploads/2024/11/Turbo-surges-as-top-meme-coin.jpg"
              className="w-full h-full object-cover"
              alt="Turbo"
            />
          </div>
          <div className="box1 gradient-blue border shadow-2xl overflow-hidden w-20 h-20">
            <img
              src="https://static.news.bitcoin.com/wp-content/uploads/2023/04/pepes.jpg"
              className="w-full h-full object-cover"
              alt="Pepe"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const Slide5 = () => {
  return (
    <div className="h-[90vh] w-[440px] bg-black border rounded-lg embla__slide">
      <h1>Slide 5</h1>
    </div>
  );
};

const Slide6 = () => {
  return (
    <div className="h-[90vh] w-[440px] bg-black border rounded-lg embla__slide">
      <h1>Slide 6</h1>
    </div>
  );
};

const Slide7 = () => {
  return (
    <div className="h-[90vh] w-[440px] bg-black border rounded-lg embla__slide">
      <h1>Slide 7</h1>
    </div>
  );
};
const Slide8 = () => {
  return (
    <div className="h-[90vh] w-[440px] bg-black border rounded-lg embla__slide">
      <h1>Slide 8</h1>
    </div>
  );
};
