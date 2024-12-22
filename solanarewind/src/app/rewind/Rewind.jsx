"use client";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import html2canvas from "html2canvas";
import ShareButton from "../sharebutton";
import React, { useState, useMemo, useEffect, useRef } from "react";
import Starfield from "../../components/starField";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import TransactionTracker from "../test";
import EmblaCarousel from "../../components/EmblaCarousel";
import { exportComponentAsPNG } from "react-component-export-image";
import "./carousel.css";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { FaMusic, FaVolumeMute } from "react-icons/fa";
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
// import { useRef } from "react";
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
  measurementId: "G-D654LZE41V",
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

  const audioRef = useRef(null); // Add audio reference
  const [isPlaying, setIsPlaying] = useState(true);

  // Audio toggle function
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Use the play promise to handle autoplay restrictions
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };
  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/audio.mp3");
    audioRef.current.loop = true;

    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log("Audio playback failed:", error);
          setIsPlaying(false);
        });
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

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
  
          if (docSnap.exists()) {
            const analysis = docSnap.data().analysis;
            console.log(analysis , "anal") // Assuming this is a JSON string
            const parsedAnalysis = extractContent(analysis); // Extract content
            console.log("Parsed analysis:", parsedAnalysis);
            // Transform extracted content into slide objects
            const slidesData = parsedAnalysis.map((point) => ({
              title: point.title,
              description: point.description,
            }));
  
            setSlides(slidesData);
          } else {
            console.log("No document found for this wallet.");
          }
        } catch (error) {
          console.error("Error in fetchFirestoreData:", error);
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
          const topTokens =
            response?.data?.data?.currentHoldings?.top_tokens || [];

          const tokenData = {
            mostTraded: {
              symbol: response?.data.data.bagholder?.symbol,
              icon: response?.data.data.bagholder?.icon,
            },
            topThreeTokens: topTokens.slice(0, 3).map((token) => ({
              symbol: token.symbol,
              icon: token.icon,
              address: token.address,
            })),
          };

          setTokenData({
            symbol: response?.data.data.bagholder?.symbol,
            icon: response?.data.data.bagholder?.icon,
          });
          setTopToken(response?.data?.data?.currentHoldings?.top_tokens || []);

          // Get existing document
          const docRef = doc(db, "walletData", publicKey?.toString());
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Update existing document with token data
            await updateDoc(docRef, {
              tokenData: tokenData,
              lastUpdated: new Date().toISOString(),
            });
          } else {
            // Create new document with both analysis and token data
            await setDoc(docRef, {
              tokenData: tokenData,
              lastUpdated: new Date().toISOString(),
            });
          }

          // Prepare token data
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
    (props) => (
      <Slide12
        {...props}
        slideData={slides[10]}
        notslide={tokenData}
        publicKey={publicKey?.toString()}
        topToken={topToken}
        slides={slides}
      />
    ),
  ];

  return (
    <div className="h-screen w-screen">
      <div className="md:hidden">
        <EmblaCarousel slides2={slides} options={OPTIONS} />
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
            onClick={toggleAudio}
            className="fixed  flex items-center justify-center mx-auto gap-3 bottom-4 text-2xl right-14 z-50 bg-black/50 px-4 py-1 hover:bg-blue-800 rounded-full backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-colors duration-200"
          >
            Music
            {isPlaying ? <FaMusic /> : <FaVolumeMute />}
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
  const containerRef = useRef();

  const { title, description } = extractContent(slideData?.content);

  return (
    <div
      ref={containerRef}
      className="h-[90vh] bg-[#FEF102] w-[440px] rounded-lg embla__slide p-6 overflow-hidden flex flex-col items-center justify-center"
    >
      <ShareButton containerRef={containerRef} />
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
  const containerRef = useRef();

  const [hover, setHover] = useState(false);
  const { symbol, icon } = notslide || { symbol: "", icon: "" };
  {
    console.log(notslide);
  }

  return (
    <div
      ref={containerRef}
      className="h-[90vh] w-[440px] bg-[#161616] p-2 border relative rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-evenly border-zinc-800"
    >
      <ShareButton containerRef={containerRef} />
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
  const containerRef = useRef();

  const { title, description } = extractContent(slideData?.content);

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
    <div
      ref={containerRef}
      className="h-[90vh] w-[440px] bg-[#00ADF1] border rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900 relative"
    >
      {/* <ShareButton containerRef={containerRef} /> */}
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
  const containerRef = useRef();

  const { title, description } = extractContent(slideData?.content);

  return (
    <div
      ref={containerRef}
      className="h-[90vh] w-[440px] bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide"
    >
      <ShareButton containerRef={containerRef} />
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
  const containerRef = useRef();

  const { title, description } = extractContent(slideData?.content);

  return (
    <div
      ref={containerRef}
      className="h-[90vh] w-[440px] bg-[#F50000] border px-2 rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900"
    >
      <ShareButton containerRef={containerRef} />
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
  const containerRef = useRef();
  const { title, description } = extractContent(slideData?.content);

  return (
    <div
      ref={containerRef}
      className="h-[90vh] w-[440px] bg-black borderborder border-gray-900 overflow-hidden flex flex-col items-center justify-center rounded-lg embla__slide"
    >
      <ShareButton containerRef={containerRef} />
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
  const containerRef = useRef();
  const { title, description } = extractContent(slideData?.content);

  return (
    <div
      ref={containerRef}
      className="h-[90vh] w-[440px] bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide"
    >
      <ShareButton containerRef={containerRef} />
      <img src="./greenbars.png" className="fixed top-0" alt="" />

      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./greenbars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};

const Slide9 = ({ slideData }) => {
  const containerRef = useRef();

  const { title, description } = slideData || { title: "", description: "" };

  return (
    <div
      ref={containerRef}
      className="h-[90vh] w-[440px] bg-[#00f500] border px-2 rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900"
    >
      <ShareButton containerRef={containerRef} />

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
  const containerRef = useRef();

 // Add console logs to see what data we're receiving
 console.log("Raw slideData:", slideData);
 console.log("slideData.content:", slideData?.content);
 
 const { title, description } = extractContent(slideData?.content);
 
 // Log the extracted content
 console.log("Extracted title:", title);
 console.log("Extracted description:", description);

  return (
    <div
      ref={containerRef}
      className="h-[90vh] w-[440px] bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide"
    >
      <ShareButton containerRef={containerRef} />
      <img src="./greenbars.png" className="fixed top-0" alt="" />

      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./greenbars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};
const Slide11 = ({ slideData }) => {
  const containerRef = useRef();
  const { title, description } = extractContent(slideData?.content);

  return (
    <div
      ref={containerRef}
      className="h-[90vh]  w-[440px] bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide"
    >
      <ShareButton containerRef={containerRef} />

      <img src="./bluebars.png" className="fixed top-0" alt="" />

      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./bluebars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};

const Slide12 = ({ slideData, slides, notslide, publicKey, topToken }) => {
  const componentRef = useRef();
  const contentRef = useRef();
  const [isExporting, setIsExporting] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // ... keeping getConclusionContent and other existing functions ...
  const getConclusionContent = (slides) => {
    // ... existing conclusion content logic ...
    if (slides && slides.length > 0) {
      const lastSlide = slides[slides.length - 1];
      if (lastSlide?.content) {
        if (lastSlide.content.includes("Conclusion:")) {
          const conclusionPart = lastSlide.content
            .split("Conclusion:")[1]
            .trim();
          const titleMatch = conclusionPart.match(/\*\*([^*]+)\*\*\s*-\s*(.+)/);
          if (titleMatch) {
            return {
              title: titleMatch[1].trim(),
              description: titleMatch[2].trim(),
            };
          }
        }
      }
    }

    const conclusionSlide = slides?.find(
      (slide) =>
        slide?.content?.includes("### Conclusion:") ||
        slide?.content?.includes("Conclusion:")
    );

    if (conclusionSlide?.content) {
      const content = conclusionSlide.content;
      const titleMatch = content.match(/\*\*([^*]+)\*\*\s*-\s*(.+)/);

      if (titleMatch) {
        return {
          title: titleMatch[1].trim(),
          description: titleMatch[2].trim(),
        };
      }
    }

    const titleSlide = slides?.find(
      (slide) =>
        slide?.content?.includes("Title:") ||
        slide?.content?.includes("**Title:")
    );

    if (titleSlide?.content) {
      const titleMatch = titleSlide.content.match(/Title:\s*(.+?)\s*(?:-|$)/);
      if (titleMatch) {
        return {
          title: titleMatch[1].trim(),
          description:
            titleSlide.content.split("-")[1]?.trim() ||
            "Your year in review on Solana",
        };
      }
    }

    return {
      title: "The Wallet of Woe",
      description:
        "Your saga of crypto adventures, featuring missed opportunities, questionable decisions, and a collection of tokens that tell quite a story.",
    };
  };

  const { title, description } = getConclusionContent(slides);
  const { symbol, icon } = notslide || { symbol: "", icon: "" };

  const handleShare = async () => {
    if (isExporting) return;

    try {
      setIsExporting(true);

      // Temporarily hide the button for screenshot
      const shareButton = componentRef.current.querySelector("#share-button");
      const originalDisplay = shareButton.style.display;
      shareButton.style.display = "none";

      // Show all content for screenshot
      const elements = componentRef.current.querySelectorAll(
        ".token-data, .content-element"
      );
      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
      });

      // Wait for images to load
      const images = componentRef.current.getElementsByTagName("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      // Create canvas
      const canvas = await html2canvas(componentRef.current, {
        backgroundColor: "#000000",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 440,
        height: Math.max(600, componentRef.current.offsetHeight),
        logging: false,
      });

      // Restore button display
      shareButton.style.display = originalDisplay;

      // Convert to blob and share
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            // Create file from blob
            const file = new File([blob], "solana-rewind.png", {
              type: "image/png",
            });

            // Share text
            const shareText =
              "bruh, solana rewind roasted me hard, try only if you got guts.\nhttps://solanarewind.fun/";
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "solana-rewind.png";
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);

            // Fallback to X share
            // const url = URL.createObjectURL(blob);
            const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareText
            )}`;
            if (typeof window !== "undefined") {
              window.open(tweetUrl, "_blank");
            }
            // URL.revokeObjectURL(url);

            setIsShared(true);
          } catch (error) {
            console.error("Error sharing:", error);
          }
        }
      }, "image/png");
    } catch (error) {
      console.error("Error exporting image:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      ref={componentRef}
      id="roast-slide"
      className="relative h-[90vh] bg-black w-[440px] rounded-lg p-6 flex flex-col items-center justify-center content-element"
      style={{ minHeight: "600px" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="./bluehalfbars.png"
          className="absolute -top-6 -left-6 h-1/3 animate-pulse select-none"
          draggable="false"
          alt=""
        />
        <img
          src="./bluehalfbars.png"
          className="absolute -bottom-6 -right-6 h-1/3 animate-pulse select-none rotate-180"
          draggable="false"
          alt=""
        />
      </div>

      {/* Share button - positioned higher in the slide */}
      <div className="absolute top-4 right-4 z-20">
        <button
          id="share-button"
          onClick={handleShare}
          disabled={isExporting}
          className={`bg-[#1DA1F2] text-white px-6 py-2 rounded-full text-sm transition-colors duration-200 ${
            isExporting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1a91da]"
          }`}
        >
          {isExporting ? "Processing..." : "Share on X"}
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center w-full px-6" ref={contentRef}>
        <h1 className="text-2xl font-bold mb-4 text-white">{title}</h1>
        <p className="text-lg mb-6 text-white/80">{description}</p>

        {icon && (
          <img
            src={icon}
            alt={`${symbol} logo`}
            className="token-data h-32 w-32 mx-auto rounded-full border-4 border-white/20 mb-6"
            crossOrigin="anonymous"
          />
        )}

        {/* Token information */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-left token-data">
            <h2 className="font-bold text-xl text-white mb-3">Top Tokens</h2>
            <ul className="text-base font-medium text-white/60 space-y-2">
              {topToken?.slice(0, 3).map((token, index) => (
                <li key={index} className="flex items-center gap-2">
                  {token.icon && (
                    <img
                      src={token.icon}
                      alt={token.symbol}
                      className="w-6 h-6 rounded-full"
                      crossOrigin="anonymous"
                    />
                  )}
                  <span>{token.symbol}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-right token-data">
            <h2 className="font-bold text-xl text-white mb-3">Most Traded</h2>
            <div className="flex items-center gap-2 justify-end">
              {icon && (
                <img
                  src={icon}
                  alt={symbol}
                  className="w-6 h-6 rounded-full"
                  crossOrigin="anonymous"
                />
              )}
              <span className="text-white/60">{symbol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const extractContent = (content) => {
  console.log("Raw content:", content);
  if (!content) return [];

  try {
    const parsed = JSON.parse(content);
    const roastPoints = parsed.roastPoints || [];
    return roastPoints.map(({ title, description }) => ({
      title: title || "Untitled",
      description: description || "No description provided.",
    }));
  } catch (error) {
    console.error("Failed to parse JSON content:", error);
    return [];
  }
};
