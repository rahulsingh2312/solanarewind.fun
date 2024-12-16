"use client";

import React, { useEffect, useRef } from "react";
import Starfield from "../../components/starField"; // Adjust based on export type
import { gsap } from "gsap";
import Marquee from "react-fast-marquee";

export default function Page() {
  const pathRef = useRef(null); // Ref for the SVG path
  const pathRef2 = useRef(null); // Ref for the SVG path

  useEffect(() => {
    // GSAP Animation for the path
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: "1020", strokeDashoffset: "1020" }, // Initial state
      {
        strokeDashoffset: 0,
        duration: 4,
        repeat: 0,
        yoyo: true,
        ease: "power1.inOut",
      } // Animation
    );
    gsap.fromTo(
      pathRef2.current,
      { strokeDasharray: "1020", strokeDashoffset: "1020" }, // Initial state
      {
        strokeDashoffset: 0,
        duration: 4,
        repeat: 0,
        yoyo: true,
        ease: "power1.inOut",
      } // Animation
    );
  }, []);

  return (
    <div>
      {/* <Marquee autoFill className="">
        <h1 className="text-white font-bold text-6xl">YEAR IN SOL</h1>
        <div className="h-20 w-20 bg-white rounded-full mx-20"></div>
      </Marquee> */}
      <GradientBlob2 />
      <GradientBlob />
      <div className="bg-[#0F1011]/40 backdrop-blur-3xl rounded-xl  mx-auto mt-7 p-4 border border-white/10 w-[878px] h-[728px] z-50 relative"></div>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <div className="container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="940"
          height="535"
          viewBox="0 0 940 535"
          fill="none"
          className="z-10 fixed -bottom-20 right-0 rotate-180"
        >
          <path
            ref={pathRef} // Attach the ref for GSAP
            d="M58.6766 51.1834C50.5228 96.6108 50.3145 145.02 54.9887 190.774C61.807 257.516 79.8436 332.335 122.545 385.934C161.228 434.487 227.199 474.821 289.272 482.07C326.583 486.428 356.992 482.48 393.97 474.846C444.141 464.487 491.105 447.621 531.816 415.859C586.998 372.807 627.681 313.307 685.741 273.468C720.799 249.413 758.746 247.501 799.286 257.238C836.026 266.061 870.67 281.069 888.541 315.011"
            stroke="#B236FF"
            strokeWidth="102"
            strokeLinecap="round"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="517"
          height="928"
          viewBox="0 0 517 928"
          fill="none"
          className="-rotate-45 -top-10 z-10 left-12 fixed"
        >
          <path
            ref={pathRef2}
            d="M52 52C66.2219 58.7723 79.2554 71.8946 91.1308 81.9692C107.196 95.5987 123.582 109.014 138.88 123.507C168.688 151.747 193.408 186.654 200.759 228.088C205.974 257.481 205.728 286.954 205.728 316.676C205.728 361.646 188.463 403.453 176.225 445.947C159.421 504.293 138.883 562.386 139.268 624.055C139.535 666.891 152.399 709.5 180.65 742.301C203.929 769.328 234.561 785.557 267.064 799.056C332.415 826.198 404.491 839.835 465.668 876.541"
            stroke="#2AABEE"
            strokeWidth="102"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

function GradientBlob() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="654"
      height="1024"
      viewBox="0 0 654 1024"
      fill="none"
      className="fixed right-12"
    >
      <g filter="url(#filter0_f_246_169)">
        <path
          d="M466.969 433.364C450.739 223.571 164.241 -35.5095 188.231 -37.3653C212.22 -39.2211 350.842 252.625 367.072 462.419C383.301 672.213 295.563 1171.17 271.573 1173.03C322.136 1169.12 483.198 643.158 466.969 433.364Z"
          fill="url(#paint0_linear_246_169)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_246_169"
          x="0.904938"
          y="-223.274"
          width="653.107"
          height="1582.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="92.95"
            result="effect1_foregroundBlur_246_169"
          />
        </filter>
        <linearGradient
          id="paint0_linear_246_169"
          x1="303.556"
          y1="-46.2868"
          x2="397.13"
          y2="1163.32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.268358" stopColor="#2AABEE" />
          <stop offset="0.356667" stopColor="#2AABEE" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function GradientBlob2() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="635"
      height="1024"
      viewBox="0 0 635 1024"
      fill="none"
      className="fixed left-12"
    >
      <g filter="url(#filter0_f_246_170)">
        <path
          d="M288.773 615.098C276.552 825.164 316.269 1129.65 298.311 1128.61C280.353 1127.56 211.52 821.38 223.74 611.315C235.961 401.25 393.6 -29.3125 411.559 -28.2678C429.517 -27.2231 300.993 405.033 288.773 615.098Z"
          fill="#AE47FF"
          fillOpacity="0.9"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_246_170"
          x="0.696136"
          y="-249.87"
          width="634.18"
          height="1600.08"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="110.8"
            result="effect1_foregroundBlur_246_170"
          />
        </filter>
      </defs>
    </svg>
  );
}
