import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "../components/EmblaCarouselAutoplay";
import { useAutoplayProgress } from "../components/EmblaCarouselAutoplayProgress";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../components/EmblaCarouselArrowButtons";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const progressNode = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 }),
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

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container py-2 z-50 relative px-1 flex gap-4">
          <Slide1 />
          <Slide2 />
          <Slide3 />
          <Slide4 />
          <Slide5 />
          <Slide6 />
          <Slide7 />
        </div>
      </div>

      <div className="embla__controls z-40">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
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

        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;

const Slide1 = () => {
  return (
    <div className="h-[720px] bg-black border-zinc-800 border overflow-hidden rounded-lg embla__slide flex flex-col items-center justify-center">
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

const Slide2 = () => {
  return (
    <div className="h-[720px] bg-white border rounded-lg embla__slide">
      <h1>Slide 2</h1>
    </div>
  );
};

const Slide3 = () => {
  return (
    <div className="h-[720px] bg-white border rounded-lg embla__slide">
      <h1>Slide 3</h1>
    </div>
  );
};

const Slide4 = () => {
  return (
    <div className="h-[720px] bg-white border rounded-lg embla__slide">
      <h1>Slide 4</h1>
    </div>
  );
};

const Slide5 = () => {
  return (
    <div className="h-[720px] bg-white border rounded-lg embla__slide">
      <h1>Slide 5</h1>
    </div>
  );
};

const Slide6 = () => {
  return (
    <div className="h-[720px] bg-white border rounded-lg embla__slide">
      <h1>Slide 6</h1>
    </div>
  );
};

const Slide7 = () => {
  return (
    <div className="h-[720px] bg-white border rounded-lg embla__slide">
      <h1>Slide 7</h1>
    </div>
  );
};
