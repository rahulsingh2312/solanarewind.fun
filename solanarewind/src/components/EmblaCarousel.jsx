"use client";
import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "../components/EmblaCarouselAutoplay";
import { useAutoplayProgress } from "../components/EmblaCarouselAutoplayProgress";
import { gsap } from "gsap";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../components/EmblaCarouselArrowButtons";
import { FaPause, FaPlay } from "react-icons/fa";

const EmblaCarousel = (props) => {
  const { slides2, options } = props;
  const { publicKey } = useWallet();
  const [slides, setSlides] = useState([]);
  const progressNode = useRef(null);
  const [tokenData, setTokenData] = useState({ symbol: "", icon: "" });

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 7000 }),
  ]);
  useEffect(() => {
    if (publicKey) {
      const storedData = localStorage.getItem(publicKey.toString());
      if (storedData) {
        const analysisPoints = JSON.parse(storedData).split("\n\n");

        const filteredPoints = analysisPoints.filter(
          (point) => /^\d+\.\s\*\*[^*]+/.test(point) // Matches only lines starting with "number. **text"
        );

        const cleanedSlides = filteredPoints.map((point) => ({
          content: point.replace(/^\d+\.\s\*\*([^*]+)\*\*:\s/, "$1: "), // Removes extra `**` from title and keeps the structure.
        }));

        setSlides(cleanedSlides);

        console.log("Slides:", cleanedSlides);
      }
    }
  }, [publicKey]);

  const [topToken, setTopToken] = useState([]);
  useEffect(() => {
    const fetchTokenData = async () => {
      if (publicKey) {
        try {
          const response = await axios.get(
            `/api/summary?walletAddress=${publicKey.toString()}`
          );
          console.log("API response:", response.data.data.bagholder); // Debugging
          const { bagholder } = response.data.data.bagholder;

          setTokenData({
            symbol: response?.data.data.bagholder?.symbol,
            icon: response?.data.data.bagholder?.icon,
          });
          setTopToken(response?.data?.data?.currentHoldings?.top_tokens || []);
          console.log(topToken);
          console.log(tokenData);
        } catch (error) {
          console.error("Error fetching token data:", error);
        }
      }
    };

    fetchTokenData();
  }, [publicKey]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);
  const [slidesInView, setSlidesInView] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const updateSlidesInView = () => {
      const inView = emblaApi.slidesInView();
      const currentIndex = emblaApi.selectedScrollSnap();

      setSlidesInView(inView);
      setCurrentSlideIndex(currentIndex);

      console.log("Current Slide Index:", currentIndex);
      console.log("Slides In View:", inView);
    };

    emblaApi.on("select", updateSlidesInView);
    updateSlidesInView(); // Initial update

    return () => emblaApi.off("select", updateSlidesInView);
  }, [emblaApi]);

  // In your slidesall mapping
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
    (props) => <Slide12 {...props} slideData={slides[10]} />,
    (props) => <Slide13 {...props} slideData={slides[11]} />,
  ];

  //when user presses space bar it should trigger the pause function and when left arrow then prev when right arrow then next
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        onAutoplayButtonClick(onPrevButtonClick);
      } else if (e.key === "ArrowRight") {
        onAutoplayButtonClick(onNextButtonClick);
      } else if (e.key === " ") {
        toggleAutoplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    onAutoplayButtonClick,
    onPrevButtonClick,
    onNextButtonClick,
    toggleAutoplay,
  ]);

  return (
    <div className="embla w-[100vh] h-screen flex flex-col justify-around mx-auto">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container py-2 z-50 relative px-1 flex gap-4">
          {slidesall.map((SlideComponent, index) => (
            <SlideComponent
              key={index}
              opacity={currentSlideIndex === index ? 1 : 0.2}
            />
          ))}

          {/* {slides.map((slide, index) => (
            <div
              key={index}
              className="h-full bg-black border-zinc-800 border overflow-hidden rounded-lg embla__slide flex flex-col items-center justify-center p-8"
              style={{ opacity: currentSlideIndex === index ? 1 : 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                {slide.content.split(':')[0]}
              </h2>
              <p className="text-white/80 text-lg text-center">
                {slide.content.split(':')[1]}
              </p>
            </div>
          ))} */}
        </div>
      </div>

      <div className="flex flex-col-reverse items-center justify-center gap-2">
        <div className="flex">
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <button
            className="embla__play"
            onClick={toggleAutoplay}
            type="button"
          >
            {autoplayIsPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <div
          className={`embla__progress`.concat(showAutoplayProgress ? "" : "")}
        >
          <div className="embla__progress__bar" ref={progressNode} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;

const Slide1 = ({ opacity = 1 }) => {
  return (
    <div
      className="h-full bg-black border-zinc-800 border overflow-hidden rounded-lg embla__slide flex flex-col items-center justify-center"
      style={{ opacity }}
    >
      <img
        src="./bluebars.png"
        className="fixed -top-24 select-none"
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

const Slide2 = ({ opacity = 0.5, slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  return (
    <div
      className="h-full bg-[#FEF102] rounded-lg embla__slide p-6 overflow-hidden flex flex-col items-center justify-center"
      style={{ opacity }}
    >
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
const Slide3 = ({ opacity = 0.5, notslide }) => {
  const [hover, setHover] = useState(false);
  const { symbol, icon } = notslide || { symbol: "", icon: "" };
  {
    console.log(notslide);
  }
  return (
    <div
      className="h-full bg-black border relative rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-evenly border-zinc-800"
      style={{ opacity }}
    >
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

const Slide4 = ({ opacity = 0.5, slideData, topToken }) => {
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
    <div
      className="h-full w-[440px] bg-[#00ADF1] border rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900 relative"
      style={{ opacity }}
    >
      <img
        src="/redBar.png"
        alt=""
        className="absolute top-0 mix-blend-color-dodge select-none"
        draggable="false"
      />

      <img
        ref={winnerTableRef}
        src="/winnerTable.png"
        className="absolute -bottom-12 select-none"
        alt="Winner podium"
        draggable="false"
      />

      <div className="absolute top-32 text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
        <p className="text-white/80">{description}</p>
      </div>

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

      <button
        onClick={toggleTimeline}
        className="absolute bottom-12 z-10 bg-white text-black rounded-full px-6 py-2 font-medium hover:bg-gray-100 transition-colors shadow-xl border border-gray-200"
      >
        {isRevealed.current ? "Reset Animation" : "Reveal The Winner"}
      </button>
    </div>
  );
};

const Slide5 = ({ opacity = 0.5, slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();
  console.log(slideData);
  return (
    <div
      className="h-full bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide"
      style={{ opacity }}
    >
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

const Slide6 = ({ opacity = 0.5, slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  return (
    <div
      className="h-full bg-[#F50000] border px-2 rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900"
      style={{ opacity }}
    >
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
const Slide7 = ({ opacity = 0.5, slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  return (
    <div
      className="h-full bg-black border border-gray-900 overflow-hidden flex flex-col items-center justify-center rounded-lg embla__slide"
      style={{ opacity }}
    >
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

const Slide8 = ({ opacity = 0.5, slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  return (
    <div
      className="h-full bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide"
      style={{ opacity }}
    >
      <img src="./greenbars.png" className="fixed top-0" alt="" />

      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./greenbars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};
const Slide9 = ({ opacity = 0.5, slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  return (
    <div
      className="h-full bg-[#00f500] border px-2 rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900"
      style={{ opacity }}
    >
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

const Slide10 = ({ opacity = 0.5, slideData }) => {
  const [rawTitle, rawDescription] = (slideData?.content || ":").split(
    /:(.*)/s
  );
  // Remove leading '**' from title and description if they exist
  const title = rawTitle?.replace(/^\*\*/, "").trim();
  const description = rawDescription?.replace(/^\*\*/, "").trim();

  return (
    <div
      className="h-full bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide"
      style={{ opacity }}
    >
      <img src="./greenbars.png" className="fixed top-0" alt="" />

      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./greenbars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};
const Slide11 = ({ opacity = 0.5, slideData }) => {
  const [title, description] = (slideData?.content || ":").split(/:(.*)/s);

  return (
    <div
      className="h-full bg-black flex flex-col justify-center items-center border border-gray-800 overflow-hidden rounded-lg embla__slide"
      style={{ opacity }}
    >
      <img src="./bluebars.png" className="fixed top-0" alt="" />

      <h1 className="font-bold text-5xl mb-2 mt-4 text-white">{title}</h1>
      <p className="text-white/80 text-md">{description}</p>
      <img src="./bluebars.png" className="fixed bottom-0 rotate-180" alt="" />
    </div>
  );
};

const Slide12 = ({ opacity = 0.5, slideData }) => {
  const [title, description] = (slideData?.content || ":").split(/:(.*)/s);

  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide"
      style={{ opacity }}
    >
      <h1>{title}</h1>
      {description}
    </div>
  );
};
const Slide13 = ({ opacity = 0.5, slideData }) => {
  const [title, description] = (slideData?.content || ":").split(/:(.*)/s);

  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide"
      style={{ opacity }}
    >
      <h1>{title}</h1>
      {description}
    </div>
  );
};
