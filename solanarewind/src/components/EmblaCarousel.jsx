"use client";
import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "../components/EmblaCarouselAutoplay";
import { useAutoplayProgress } from "../components/EmblaCarouselAutoplayProgress";
import { gsap } from "gsap";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../components/EmblaCarouselArrowButtons";
import { FaPause, FaPlay } from "react-icons/fa";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const progressNode = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 7000 }),
  ]);

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

  const slidesall = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
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
          className={`embla__progress`.concat(
            showAutoplayProgress ? "" : " embla__progress--hidden"
          )}
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

const Slide2 = ({ opacity = 0.5 }) => {
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

const Slide3 = ({ opacity = 0.5 }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="h-full bg-black border relative rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-evenly border-zinc-800"
      style={{ opacity }}
    >
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

const Slide4 = ({ opacity = 0.5 }) => {
  const pathRef = useRef(null);
  useEffect(() => {
    // GSAP Animation for the path
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: "600", strokeDashoffset: "600" }, // Initial state
      {
        strokeDashoffset: 0,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      } // Animation
    );
  }, []);
  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide overflow-hidden border-gray-900"
      style={{ opacity }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="239"
        height="1108"
        viewBox="0 0 239 1108"
        fill="none"
        className="-translate-y-10 translate-x-20 fixed"
      >
        <path
          ref={pathRef}
          d="M209 30L48.9591 257.155C24.148 292.371 24.4037 339.447 49.596 374.391L165.013 534.485C191.116 570.693 190.356 619.741 163.144 655.124L59.1528 790.339C29.2776 829.184 31.5977 883.87 64.6558 920.045L209 1078"
          stroke="url(#paint0_linear_2008_52)"
          strokeWidth="60"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2008_52"
            x1="178.985"
            y1="30"
            x2="178.985"
            y2="1078"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F8CFFF" />
            <stop offset="0.192374" stopColor="#B200F1" />
            <stop offset="0.700173" stopColor="#51005E" />
            <stop offset="1" stopColor="#050005" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Slide5 = ({ opacity = 0.5 }) => {
  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide"
      style={{ opacity }}
    >
      <h1>Slide 5</h1>
    </div>
  );
};

const Slide6 = ({ opacity = 0.5 }) => {
  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide"
      style={{ opacity }}
    >
      <h1>Slide 6</h1>
    </div>
  );
};

const Slide7 = ({ opacity = 0.5 }) => {
  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide"
      style={{ opacity }}
    >
      <h1>Slide 7</h1>
    </div>
  );
};
const Slide8 = ({ opacity = 0.5 }) => {
  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide"
      style={{ opacity }}
    >
      <h1>Slide 8</h1>
    </div>
  );
};
