'use client'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import html2canvas from 'html2canvas';
import React, { useState, useMemo, useEffect } from "react";
import Starfield from "../../components/starField";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import TransactionTracker from "../test";
import EmblaCarousel from "../../components/EmblaCarousel";
import "./carousel.css";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import axios from "axios";
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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQqa0KjFo9OBH95G03fsTGNjUbEoU5JbA",
  authDomain: "emoji-buy.firebaseapp.com",
  projectId: "emoji-buy",
  storageBucket: "emoji-buy.firebasestorage.app",
  messagingSenderId: "329260816313",
  appId: "1:329260816313:web:34527cb53f22a512254868",
  measurementId: "G-D654LZE41V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
  const [slides, setSlides] = useState([]);
  const [topToken, setTopToken] = useState([]);
  const [tokenData, setTokenData] = useState({ symbol: "", icon: "" });
  const { publicKey } = useWallet();

  useEffect(() => {
    const item = document.querySelector(".item");
    if (item) {
      setItemWidth(item.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const fetchFirestoreData = async () => {
      if (publicKey) {
        try {
          const docRef = doc(db, "walletData", publicKey.toString());
          const docSnap = await getDoc(docRef);
console.log(docSnap.data().analysis , "hi");
          if (docSnap.exists()) {
            const analysis = docSnap.data().analysis;
            const analysisPoints = JSON.parse(analysis).split("\n\n");

            const filteredPoints = analysisPoints.filter(
              (point) => /^\d+\.\s\*\*[^*]+/.test(point) // Matches only lines starting with "number. **text"
            );

            const cleanedSlides = filteredPoints.map((point) => ({
              content: point.replace(/^\d+\.\s\*\*([^*]+)\*\*:\s/, "$1: "), // Removes extra `**` from title and keeps the structure.
            }));

            setSlides(cleanedSlides);
            console.log("Slides from Firestore:", cleanedSlides);
          }
        } catch (error) {
          console.error("Error fetching Firestore data:", error);
        }
      }
    };

    fetchFirestoreData();
  }, [publicKey]);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (publicKey) {
        try {
          const response = await axios.get(
            `/api/summary?walletAddress=${publicKey.toString()}`
          );
          const { bagholder } = response.data.data.bagholder;

          setTokenData({
            symbol: response?.data.data.bagholder?.symbol,
            icon: response?.data.data.bagholder?.icon,
          });
          setTopToken(response?.data?.data?.currentHoldings?.top_tokens || []);
        } catch (error) {
          console.error("Error fetching token data:", error);
        }
      }
    };

    fetchTokenData();
  }, [publicKey]);

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

  const slidesall = [
    Slide1,
    (props) => <Slide2 {...props} slideData={slides[0]} />,
    (props) => <Slide3 {...props} notslide={tokenData} />,
    (props) => <Slide4 {...props} slideData={slides[2]} topToken={topToken} />,
    (props) => <Slide5 {...props} slideData={slides[3]} />,
    (props) => <Slide6 {...props} slideData={slides[4]} />,
    (props) => <Slide7 {...props} slideData={slides[5]} />,
    (props) => <Slide8 {...props} slideData={slides[6]} />,
    (props) => <Slide9 {...props} slideData={slides[7]} />,
    (props) => <Slide10 {...props} slideData={slides[8]} />,
    (props) => <Slide11 {...props} slideData={slides[9]} />,
    (props) => <Slide12 {...props} slideData={slides[10]} slides={slides} />,
  ];

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
            {slidesall.map((SlideComponent, index) => (
              <li
                className="embla__slide"
                key={index}
                style={{
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

const Slide2 = ({ slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();
  return (
    <div className="h-[90vh] bg-[#FEF102] w-[440px] rounded-lg embla__slide p-6 overflow-hidden flex flex-col items-center justify-center">
      <img
        src="./bluehalfbars.png"
        className="fixed -top-6 -left-6 h-2/5 animate-pulse select-none"
        draggable="false"
        alt=""
      />

      <h1 className="text-black text-4xl font-semibold text-center">{title}</h1>

      <p className="text-black/70 text-lg mt-2 text-center">{description}</p>

      <img
        src="./bluehalfbars.png"
        className="fixed -bottom-6 rotate-180 -right-6 h-2/5 animate-pulse select-none"
        draggable="false"
        alt=""
      />
    </div>
  );
};

const Slide3 = ({ notslide }) => {
  const [hover, setHover] = useState(false);
  const { symbol, icon } = notslide || { symbol: "", icon: "" };
  {
    console.log(notslide);
  }

  return (
    <div className="h-[90vh] w-[440px] bg-[#161616] p-2 border relative rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-evenly border-zinc-800">
      <div className="text-center text-xl font-medium">
        Hover the box to know your favorite token!
        <div
          style={{ transition: "opacity 2s", opacity: hover ? 1 : 0 }}
          className="text-gray-500"
        >
          {symbol} was your most Traded token
        </div>
      </div>

      <div className="container flex items-center justify-center">
        <div className="row">
          <div className="col-12">
            {icon && (
              <img
                className="img z-50 absolute h-48 -translate-y-8"
                src={icon}
                alt={`${symbol} logo`}
                style={{ transition: "opacity 5s", opacity: hover ? 1 : 0 }}
              />
            )}
          </div>
          <div className="col-12 mt-5 d-flex justify-content-center">
            <div className="box" onMouseOver={() => setHover(true)}>
              <div className="box-body">
                {icon && (
                  <img className="img" src={icon} alt={`${symbol} logo`} />
                )}
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
const Slide4 = ({ slideData, topToken }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  const container = useRef(null);
  const tl = useRef(null);
  const winnerTableRef = useRef(null);
  const isRevealed = useRef(false);

  const toggleTimeline = () => {
    if (!isRevealed.current) {
      if (tl.current) {
        tl.current.play();
      }

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
      const boxes = gsap.utils.toArray(".token-box");

      gsap.set(boxes, { clearProps: "all" });

      tl.current = gsap
        .timeline({ paused: true })
        .to(boxes[0], {
          x: 120,
          y: 10,
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
            y: -150,
            duration: 1.5,
          },
          "<"
        );
    }, container);

    gsap.set(winnerTableRef.current, { opacity: 0, y: 0 });

    return () => ctx.revert();
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
      <div className="absolute top-32 text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
        <p className="text-white/80">{description}</p>
      </div>
      <button
        onClick={toggleTimeline}
        className="absolute bottom-12 z-50 bg-white text-black rounded-full px-4 py-2 hover:bg-gray-500 shadow-xl border border-gray-400"
      >
        {isRevealed.current ? "Reset Animation" : "Reveal The Winner"}
      </button>

      <div
        ref={container}
        className="relative flex justify-center items-center h-48"
      >
        <div className="flex flex-col gap-8">
          {topToken?.map((token, index) => (
            <div
              key={token.address}
              className="token-box w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white overflow-hidden"
            >
              {token.icon ? (
                <img
                  src={token.icon}
                  alt={token.symbol || "Token"}
                  className="w-16 h-16 object-contain"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const Slide5 = ({ slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();
  return (
    <div className="h-[90vh] w-[440px] bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide">
      <img src="./greenbars.png" className="fixed top-0" alt="" />
      <div className="h-40 w-40 bg-white rounded-xl flex items-center justify-center overflow-hidden ">
        <img src="https://c.tenor.com/CNI1fSM1XSoAAAAd/tenor.gif" alt="" />
      </div>
      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./greenbars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};

const Slide6 = ({ slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();
  return (
    <div className="h-[90vh] w-[440px] bg-[#F50000] border px-2 rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900">
      <img src="./bluebars.png" className="fixed -top-20" alt="" />
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzZtMndqYzNvazd1eG94Zmd2bHl1NDh6dXVpaHMyb2J2enJteWJvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wr7oA0rSjnWuiLJOY5/giphy.gif
"
        alt=""
        className="h-40 w-40 rounded-xl shadow-xl"
      />
      <h1 className="font-bold text-5xl mb-2 mt-4 text-black"> {title}</h1>
      <p className="text-black/80 text-md"> {description}</p>
      <img
        src="./bluebars.png"
        className="fixed -bottom-20 rotate-180  "
        alt=""
      />
    </div>
  );
};

const Slide7 = ({ slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  return (
    <div className="h-[90vh] w-[440px] bg-black borderborder border-gray-900 overflow-hidden flex flex-col items-center justify-center rounded-lg embla__slide">
      <img src="./yellowbars.png" className="fixed -top-20  " alt="" />
      <h1 className="font-bold text-5xl mb-2 mt-4 text-white ">{title}</h1>
      <p className="text-white/80 text-md max-w-80">{description}</p>
      <img
        src="./yellowbars.png"
        className="fixed -bottom-20 rotate-180  "
        alt=""
      />
    </div>
  );
};
const Slide8 = ({ slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();
  return (
    <div className="h-[90vh] w-[440px] bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide">
      <img src="./greenbars.png" className="fixed top-0" alt="" />

      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./greenbars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};

const Slide9 = ({ slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  return (
    <div className="h-[90vh] w-[440px] bg-[#00f500] border px-2 rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900">
      <img src="./bluebars.png" className="fixed -top-20" alt="" />
      <img
        src="https://s3.coinmarketcap.com/static-gravity/image/4dc5810324c74688a5a1b805f7506ec5.jpg
"
        alt=""
        className="h-40 w-40 rounded-xl shadow-xl"
      />
      <h1 className="font-bold text-5xl mb-2 mt-4 text-black"> {title}</h1>
      <p className="text-black/80 text-md"> {description}</p>
      <img
        src="./bluebars.png"
        className="fixed -bottom-20 rotate-180  "
        alt=""
      />
    </div>
  );
};

const Slide10 = ({ slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  return (
    <div className="h-[90vh] w-[440px] bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide">
      <img src="./greenbars.png" className="fixed top-0" alt="" />

      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./greenbars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};
const Slide11 = ({ slideData }) => {
  const [title, description] = (slideData?.content || ":").split(/:(.*)/s);

  return (
    <div className="h-[90vh] w-[440px] bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide">
      <img src="./bluebars.png" className="fixed top-0" alt="" />

      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./bluebars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};
const Slide12 = ({ slideData , slides }) => {
  // Function to take screenshot and share
  const handleShare = async () => {
    try {
      // Take screenshot using html2canvas
      const slideElement = document.querySelector('#roast-slide');
      const canvas = await html2canvas(slideElement);
      const screenshotUrl = canvas.toDataURL('image/png');

      // Convert base64 to blob
      const response = await fetch(screenshotUrl);
      const blob = await response.blob();

      // Create FormData to send to Twitter
      const formData = new FormData();
      formData.append('media', blob, 'screenshot.png');

      const text = "bruh solanarewind.fun burned me 🔥";
      const url = "https://solanarewind.fun";
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, '_blank');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="h-[90vh] bg-[#] w-[440px] rounded-lg embla__slide p-6 overflow-hidden flex flex-col items-center justify-center">
      <img
        src="./bluehalfbars.png"
        className="fixed -top-6 -left-6 h-2/5 animate-pulse select-none"
        draggable="false"
        alt=""
      />
      <div className="text-center w-full px-6">
        <h1 className="font-semibold text-4xl mb-6 text-white">
          SOUL burning roasts 🔥🔥
        </h1>
        
        <div className="">
          {/* Display content from slides 5 and 6 with ellipsis */}
          <div className="backdrop-blur-sm rounded-xl p-2">
            <p className="text-white/80 text-xl">
              {slides?.[4]?.content}
            </p>
          </div>
          
          <div className=" backdrop-blur-sm rounded-xl p-2 ">
            <p className="text-white/80 text-xl">
              {slides?.[5]?.content} ..................... 
              {/* <br /> get urs on solanarewind.fun */}
            </p>
          </div>

          
        </div>

        <button
          onClick={handleShare}
          className="mt-8 bg-[#1DA1F2] text-white px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-[#1a91da] transition-colors duration-200 mx-auto"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="font-medium">Share on X</span>
        </button>
        <img
        src="./bluehalfbars.png"
        className="fixed -bottom-6 rotate-180 -right-6 h-2/5 animate-pulse select-none"
        draggable="false"
        alt=""
      />
    </div>
    </div>
  );
};

