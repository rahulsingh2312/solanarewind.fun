"use client";
import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "../components/EmblaCarouselAutoplay";
import { useAutoplayProgress } from "../components/EmblaCarouselAutoplayProgress";
import { gsap } from "gsap";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../components/EmblaCarouselArrowButtons";
import { FaPause, FaPlay } from "react-icons/fa";

const EmblaCarousel = (props) => {
  const { options } = props;
  const { publicKey } = useWallet();
  const [slides, setSlides] = useState([]);
  const progressNode = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 7000 }),
  ]);
  useEffect(() => {
    if (publicKey) {
      const storedData = localStorage.getItem(publicKey.toString());
      if (storedData) {
        const analysisPoints = JSON.parse(storedData).split("\n\n");
        setSlides(
          analysisPoints.map((point) => ({
            content: point.replace(/^\d+\.\s\*\*([^*]+)\*\*:\s/, "$1: "),
          }))
        );
        console.log(
          "Slides:",
          slides,
          analysisPoints.map((point) => ({
            content: point.replace(/^\d+\.\s\*\*([^*]+)\*\*:\s/, "$1: "),
          }))
        );
      }
    }
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
    (props) => <Slide3 {...props} slideData={slides[1]} />,
    (props) => <Slide4 {...props} slideData={slides[2]} />,
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

const Slide2 = ({ opacity = 0.5, slideData }) => {
  // Split content at the first colon to separate title and description
  const [title, description] = (slideData?.content || ":").split(/:(.*)/s);

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
  const container = useRef(null);
  const tl = useRef(null);
  const winnerTableRef = useRef(null);

  const toggleTimeline = () => {
    if (tl.current) {
      tl.current.reversed(!tl.current.reversed());
    }

    // Animate the winnerTable image
    gsap.to(winnerTableRef.current, {
      opacity: 1,
      y: -50,
      duration: 2, // 2 seconds
    });
  };

  React.useEffect(() => {
    const boxes = gsap.utils.toArray(".box1");
    tl.current = gsap
      .timeline()
      .to(boxes[0], { x: 120, rotation: 360 })
      .to(boxes[1], { x: -120, y: 10, rotation: -360 }, "<")
      .to(boxes[2], { y: -120 })
      .reverse();

    // Initialize the winnerTable with hidden state
    gsap.set(winnerTableRef.current, { opacity: 0, y: 0 });
  }, []);

  return (
    <div className="h-[90vh] w-[440px] bg-[#00ADF1] border rounded-lg embla__slide overflow-hidden flex flex-col items-center justify-center border-gray-900">
      <img
        src="./redBar.png"
        alt=""
        className="fixed top-0 mix-blend-color-dodge select-none"
      />
      <img
        ref={winnerTableRef}
        src="./winnerTable.png"
        className="fixed -bottom-12 select-none"
        alt=""
      />
      <button
        onClick={toggleTimeline}
        className="bg-white text-black rounded-full px-4 py-2 fixed bottom-12 hover:bg-gray-500 shadow-xl border border-gray-400"
      >
        Reveal The Winner
      </button>
      <h2 className="top-32 text-xl font-medium fixed ">
        Press the Button to reveal the winner!
      </h2>

      <div>
        <div className="boxes-container" ref={container}>
          <div className="box1 gradient-blue border shadow-2xl rounded-full">
            <img
              className="img"
              src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
            />
          </div>
          <div className="box1 gradient-blue border shadow-2xl overflow-hidden object-cover">
            <img
              src="https://techpoint.africa/crypto/wp-content/uploads/2024/11/Turbo-surges-as-top-meme-coin.jpg"
              className="object-cover h-20"
              alt=""
            />
          </div>
          <div className="box1 gradient-blue border shadow-2xl overflow-hidden">
            <img
              src="https://static.news.bitcoin.com/wp-content/uploads/2023/04/pepes.jpg"
              className="object-cover h-20"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Slide5 = ({ opacity = 0.5, slideData }) => {
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

const Slide6 = ({ opacity = 0.5, slideData }) => {
  const [title, description] = (slideData?.content || ":").split(/:(.*)/s);

  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide"
      style={{ opacity }}
    >
      <h1> {title}</h1>
      <h1> {description}</h1>
    </div>
  );
};
const Slide7 = ({ opacity = 0.5, slideData }) => {
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

const Slide8 = ({ opacity = 0.5, slideData }) => {
  const [title, description] = (slideData?.content || ":").split(/:(.*)/s);

  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide"
      style={{ opacity }}
    >
      <h1> {title}</h1>
      <h1> {description}</h1>
    </div>
  );
};
const Slide9 = ({ opacity = 0.5, slideData }) => {
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

const Slide10 = ({ opacity = 0.5, slideData }) => {
  const [title, description] = (slideData?.content || ":").split(/:(.*)/s);

  return (
    <div
      className="h-full bg-black border rounded-lg embla__slide"
      style={{ opacity }}
    >
      <h1> {title}</h1>
      <h1> {description}</h1>
    </div>
  );
};
const Slide11 = ({ opacity = 0.5, slideData }) => {
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
