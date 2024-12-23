"use client";
import "@fontsource/inter";
import "@fontsource/dm-sans";
import "@fontsource/poppins";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FaChevronRight } from "react-icons/fa";
import { TransitionLink } from "../../components/utils/TransitionLink";
import { FaXTwitter } from "react-icons/fa6";
import { gsap } from "gsap";

// import Link from 'next/link'
import { FaDiscord } from "react-icons/fa";
// import Navbar from "../components/Navbar";
import Navbar from "./NavbarMobile";
import hero_bg from "../../../public/hero_bg.png";
import hero_dot from "../../../public/hero_dot.svg";
import center_bg from "../../../public/center_bg.png";
import hero_bg_mob from "../../../public/hero_bg_mob.png";
import center_bg_mob from "../../../public/center_bg_mob.png";
import noise from "../../../public/noise_bg.png";
import logo from "../../../public/logo.svg";
import arrow from "../../../public/right_arrow.svg";
import cursor from "../../../public/cursor.svg";
import burger from "../../../public/burger.svg";
import ellipse1 from "../../../public/ellipse_1.svg";
import ellipse2 from "../../../public/ellipse_2.svg";
import ellipse2_mob from "../../../public/ellipse_2_mob.svg";
import ellipse1_mob from "../../../public/ellipse_1_mob.svg";
import baseball from "../../../public/baseball.png";
import basketball from "../../../public/Basketball.png";
import rugby from "../../../public/rugby.png";
import football from "../../../public/football.png";
import baseball_mob from "../../../public/baseball_mob.png";
import basketball_mob from "../../../public/basketball_mob.png";
import rugby_mob from "../../../public/rugby_mob.png";
import football_mob from "../../../public/football_mob.png";
import bet from "../../../public/bet.svg";
import connect from "../../../public/connect.svg";
import select from "../../../public/select.svg";
import line from "../../../public/line.svg";
import green_cursor from "../../../public/green_cursor.svg";
import discord from "../../../public/discord.svg";
import ellipse3 from "../../../public/ellipse_3.svg";
import ellipse4 from "../../../public/ellipse_4.svg";
import ellipse3_mob from "../../../public/ellipse_3_mob.svg";
import { Link } from "lucide-react";
import Starfield from "../../components/starField";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const footballRef = useRef(null);
  const basketballRef = useRef(null);
  const rugbyRef = useRef(null);
  const baseballRef = useRef(null);

  useEffect(() => {
    if (footballRef.current && basketballRef.current && rugbyRef.current) {
      // Apply GSAP animation
      gsap.to(footballRef.current, {
        y: -20, // Move up by 20px
        duration: 2, // Duration of the animation
        ease: "power1.inOut", // Smooth ease in and out
        repeat: -1, // Repeat infinitely
        rotate: -20, // Rotate by 20 degrees
        yoyo: true, // Reverse the animation direction
      });
      gsap.to(basketballRef.current, {
        y: -20, // Move up by 20px
        duration: 1, // Duration of the animation
        ease: "power1.inOut", // Smooth ease in and out
        repeat: -1, // Repeat infinitely
        rotate: 10, // Rotate by 20 degrees
        yoyo: true,
      });
      //rugby
      gsap.to(rugbyRef.current, {
        y: -10,
        x: 5,
        rotate: 40,
        duration: 0.7, // Duration of the animation
        ease: "power1.inOut", // Smooth ease in and out
        repeat: -1, // Repeat infinitely
        yoyo: true,
      });
      gsap.to(baseballRef.current, {
        y: -10,
        x: 5,
        rotate: 10,
        duration: 2, // Duration of the animation
        ease: "power1.inOut", // Smooth ease in and out
        repeat: -1, // Repeat infinitely
        yoyo: true,
      });
    }
  }, []);

  return (
    <main>
      {/* // Render the rest of the content when the Navbar is closed */}
      <>
        <div className="absolute top-0 flex items-center justify-center w-full font-black z-10 p-4 text-white/30 max-md:text-9xl max-sm:top-96 select-none pointer-events-none mix-blend-exclusion text-[24rem] font-dmSans">
          2024
        </div>
        <div className="Navbar flex w-full px-24 max-sm:px-4 absolute top-4 z-[999] items-center justify-between">
          <div className="flex items-center gap-4 font-dmSans font-semibold text-white text-xl">
            <img src="/Logo.png" className="h-10" alt="" />
            <h1 className="max-sm:hidden">Solana Rewind</h1>
          </div>
          <WalletMultiButton
            style={{
              background: "#ffffff",
              color: "#292242",
              borderRadius: "15px",
            }}
          />
        </div>
        {/* All the other content goes here */}
        <div className="w-full md:hidden">
          <div className="absolute w-full z-40 top-[12%]">
            <Image
              alt="alt"
              src={ellipse2_mob}
              className="w-full h-[195px] pointer-events-none select-none"
              draggable="false"
            />
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            alt="alt"
            ref={footballRef}
            src={football}
            draggable="false"
            className="absolute bottom-[10%] scale-[40%] right-44 z-50 pointer-events-none select-none"
          />
        </div>
        <div className="hidden md:block">
          <Image
            alt="alt"
            ref={basketballRef}
            src={basketball}
            draggable="false"
            className="absolute bottom-[16%] left-[14%] z-50 scale-75 rotate-12 pointer-events-none select-none"
          />
        </div>
        <div className="md:hidden">
          <Image
            alt="alt"
            src={basketball}
            draggable="false"
            className="absolute bottom-[50%] scale-[30%] rotate-45 z-40 -left-16 pointer-events-none select-none"
          />
        </div>
        <div className="md:hidden">
          <Image
            alt="alt"
            src={football}
            draggable="false"
            className="absolute bottom-[40%] scale-[20%] -right-24 z-30 pointer-events-none select-none"
          />
        </div>
        <div className="md:hidden">
          <Image
            alt="alt"
            ref={baseballRef}
            src={baseball}
            draggable="false"
            className="absolute -top-[2%] -left-32 scale-[10%] z-50 pointer-events-none select-none"
          />
        </div>
        <div onClick={toggleNavbar} className="md:hidden">
          <Image
            alt="alt"
            ref={rugbyRef}
            src={rugby}
            draggable="false"
            className="absolute top-[8%] -right-20 scale-[20%] rotate-12 z-40 pointer-events-none select-none"
          />
        </div>
        <div className="absolute hidden md:block bottom-[-7%] w-full z-30">
          <Image
            alt="alt"
            src={ellipse3}
            draggable="false"
            className="w-full pointer-events-none select-none"
          />
        </div>
        <div className="absolute hidden md:block bottom-[-22%] w-full z-30">
          <Image
            alt="alt"
            src={ellipse4}
            draggable="false"
            className="w-full pointer-events-none select-none"
          />
        </div>
        <div className="absolute md:hidden bottom-[54%] w-full z-30">
          <Image
            alt="alt"
            src={ellipse3_mob}
            draggable="false"
            className="w-full pointer-events-none select-none"
          />
        </div>

        {/* dot elements */}

        {/* main section with padding */}
        <div className="px-6 pt-10 sm:px-12 md:px-20 md:pb-12 lg:px-28">
          <div className="flex justify-center md:hidden">
            <div className="absolute z-40 top-[18%] h-[100px] ">
              <Image
                className="pointer-events-none select-none"
                alt="alt"
                src={ellipse1_mob}
                draggable="false"
              ></Image>
            </div>
          </div>
          <div className="justify-center hidden md:flex">
            <div className="absolute z-40 top-[48%] h-[231px] ">
              <Image
                className="pointer-events-none select-none"
                alt="alt"
                draggable="false"
                src={ellipse1}
              ></Image>
            </div>
          </div>
          <div className="justify-center hidden md:flex">
            <div className="absolute z-40 top-[42%] h-[347px]">
              <Image
                className="pointer-events-none select-none"
                alt="alt"
                draggable="false"
                src={ellipse2}
              ></Image>
            </div>
          </div>
          <Image
            src={hero_bg}
            className="absolute hidden md:block right-0 -top-40 z-10 md:w-full md:h-[130vh] select-none"
            draggable="false"
          ></Image>
          <Image
            src={center_bg}
            className="absolute top-0 right-0 z-40 hidden w-full h-full md:block scale-50 select-none"
            draggable="false"
          ></Image>
          <Image
            src={hero_bg_mob}
            className="absolute top-0 right-0 z-10 block w-full md:hidden select-none"
            draggable="false"
          ></Image>
          <Image
            src={center_bg_mob}
            className="absolute top-[6%] right-0 z-30 w-full md:hidden select-none"
            draggable="false"
          ></Image>
          <Image
            src={noise}
            className="absolute right-0 top-0 z-20 w-full h-full md:h-[130vh] select-none"
            draggable="false"
          ></Image>
          {/* <Navbar /> */}
          <div className="relative z-40 flex gap-8 md:gap-12 flex-col items-center justify-center h-[35vh] md:h-[75vh] text-center">
            <div className="relative">
              <p className="font-bold text-black font-dmSans text-4xl md:text-7xl max-w-[326px] md:max-w-[970px]">
                Ready For your Solana Rewind?
              </p>
              <div className="absolute hidden md:block md:bottom-[25%] -rotate-12 lg:bottom-[20%] lg:left-0 w-[72px] h-[72px] z-50">
                <Image
                  alt="alt"
                  src={baseball}
                  ref={baseballRef}
                  className=""
                />
              </div>
              <div className="absolute hidden md:block md:bottom-[25%] lg:bottom-[20%] right-[1%] w-[72px] h-[72px] z-50">
                <Image
                  alt="alt"
                  src={rugby}
                  ref={rugbyRef}
                  className="rotate-12"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <WalletMultiButton
                style={{
                  background: "#292242",
                  borderRadius: "15px",
                }}
              />

              <TransitionLink
                href="/rewind"
                className="bg-black py-2 px-4 rounded-xl flex justify-center items-center cursor-pointer hover:bg-slate-500 transition-all hover:translate-x-2"
              >
                <FaChevronRight className="text-xl text-white" />
              </TransitionLink>
            </div>
          </div>

          {/* <div className="flex z-[50] mt-20 md:mt-0 justify-center items-center">
      <div className="group relative flex items-center w-[200px] h-[39px] border border-[#707070] backdrop-blur-sm rounded-[10px] box-border overflow-hidden">
        <div className="absolute inset-0 bg-[#321EAE] transform translate-x-full group-hover:translate-x-0 group-focus:translate-x-0 transition-transform duration-300 ease-in-out"></div>
        <div className="relative flex-grow pl-[13px] text-white z-10">
          <div className="font-inter font-semibold text-[10px] leading-[12px] text-center">
            Join Our Discord Community
          </div>
        </div>
        <div className="relative flex items-center justify-center w-[35px] rounded-md mr-[0.1px] my-[0.4px] h-full bg-[#321EAE] z-10">
          <FaDiscord color="white" />
        </div>
      </div>
    </div> */}
          <div className="relative max-sm:absolute max-sm:bottom-10 z-40 flex items-center justify-center gap-4 mt-10">
            {/* <div className="border-[#707070] border-[1px] items-center pl-3 rounded-xl flex gap-4 ">
            <p className="font-inter text-[10px] ">Join Our Discord Community</p>
            <Image alt="alt" src={discord} className="rounded-r-xl" />
          </div> */}
            <a
              href="https://x.com/SolanaRewindAI"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="group relative z-[999999] flex items-center w-[200px] h-[39px] border border-[#707070] backdrop-blur-sm rounded-[10px] box-border overflow-hidden"
                onClick={() => setIsClicked(!isClicked)}
              >
                <div
                  className={`absolute inset-0 bg-[#000000] transform transition-transform duration-300 ease-in-out ${
                    isClicked ? "translate-x-0" : "translate-x-full"
                  } group-hover:translate-x-0 group-focus:translate-x-0`}
                ></div>
                <div className="relative flex-grow pl-[13px] text-white z-10">
                  <div className="font-inter font-semibold text-[10px] leading-[12px] text-center">
                    Follow us on X
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-[35px] rounded-md mr-[0.1px] my-[0.4px] h-full bg-[#000000f] z-10">
                  <FaXTwitter color="white" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.03}
        backgroundColor="#181616"
      />
    </main>
  );
}
