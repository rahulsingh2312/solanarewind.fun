'use client'
import "@fontsource/inter";
import "@fontsource/dm-sans";
import "@fontsource/poppins";

import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
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
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <main>
      
        {/* // Render the rest of the content when the Navbar is closed */}
        <>
          {isOpen && (
<div className="bg-black h-screen">
        {/* // Only render the Navbar when it is open */}
        <div
        ref={navbarRef}
        className={`fixed top-0 right-0 w-64 h-full bg-black text-white z-50 p-6 shadow-lg transition-transform duration-1000 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
          <div className="flex justify-end">
            <button onClick={toggleNavbar}>&times;</button>
          </div>
          <ul className="mt-8 space-y-4">
            <li><a href="/sports/home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="https://docs.purebet.io/">Docs</a></li>
            <li><a href="/onboarding">Onboarding</a></li>
          </ul>
        </div>
        </div>
      )}
          {/* All the other content goes here */}
          <div className="w-full md:hidden">
            <div className="absolute w-full z-40 top-[12%]">
              <Image alt="alt" src={ellipse2_mob} className="w-full h-[195px] pointer-events-none" />
            </div>
          </div>
          <div className="hidden md:block">
            <Image alt="alt" src={football} className="absolute bottom-[6%] right-0 z-50 pointer-events-none" />
          </div>
          <div className="hidden md:block">
            <Image alt="alt" src={basketball} className="absolute bottom-[12%] left-[4%] z-50 pointer-events-none" />
          </div>
          <div  className="md:hidden">
            <Image alt="alt" src={basketball_mob} className="absolute bottom-[44%] left-0 z-50 pointer-events-none" />
          </div>
          <div className="md:hidden">
            <Image alt="alt" src={football_mob} className="absolute bottom-[49%] right-0 z-40 pointer-events-none" />
          </div>
          <div className="md:hidden">
            <Image alt="alt" src={baseball_mob} className="absolute top-[11%] left-0 z-50 pointer-events-none" />
          </div>
          <div onClick={toggleNavbar} className="md:hidden">
            <Image alt="alt" src={rugby_mob} className="absolute top-[8%] right-0 z-40 pointer-events-none" />
          </div>
          <div className="absolute hidden md:block bottom-[-7%] w-full z-30">
            <Image alt="alt" src={ellipse3} className="w-full pointer-events-none" />
          </div>
          <div className="absolute hidden md:block bottom-[-22%] w-full z-30">
            <Image alt="alt" src={ellipse4} className="w-full pointer-events-none" />
          </div>
          <div className="absolute md:hidden bottom-[54%] w-full z-30">
            <Image alt="alt" src={ellipse3_mob} className="w-full pointer-events-none" />
          </div>

          {/* dot elements */}
          <div className="z-30 absolute top-[7%] left-[-4%] md:top-[4%] md:left-[15%]">
            < Image  className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute top-[6%] left-[60%] md:top-[15%] md:left-[10%]">
            < Image  className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute top-[9%] left-[97%] md:top-[18%] md:left-[4%]">
            < Image  className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute top-[57%] left-[1%]">
            < Image  className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute bottom-[50%] left-[30%] md:bottom-[3%] md:left-[34%]">
            < Image  className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute bottom-[55%] right-[34%] md:bottom-[6%] md:right-[37%]">
            <Image className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute bottom-[45%] right-[13%] md:bottom-[20%] md:right-[20%]">
            <Image className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute bottom-[2%] right-[10%] hidden md:block">
            <Image className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute bottom-[52%] right-[8%] hidden md:block">
            <Image className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute bottom-[70%] right-[6%] hidden md:block">
            <Image className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute top-[16%] right-[27%] hidden md:block">
            <Image className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>
          <div className="z-30 absolute bottom-[-14%] left-[8%] hidden md:block">
            <Image className='pointer-events-none' alt="alt" src={hero_dot} />
          </div>

          {/* main section with padding */}
          <div className="px-6 pt-10 sm:px-12 md:px-20 md:pb-12 lg:px-28">
        <div className="flex justify-center md:hidden">
          <div className="absolute z-40 top-[18%] h-[100px] ">
            <Image className='pointer-events-none'  alt="alt" src={ellipse1_mob}></Image>
          </div>
        </div>

        <div className="justify-center hidden md:flex">
          <div className="absolute z-40 top-[48%] h-[231px] ">
            <Image className='pointer-events-none'  alt="alt" src={ellipse1}></Image>
          </div>
        </div>
        <div className="justify-center hidden md:flex">
          <div className="absolute z-40 top-[42%] h-[347px]">
            <Image className='pointer-events-none'  alt="alt" src={ellipse2}></Image>
          </div>
        </div>
        <Image
          src={hero_bg}
          className="absolute hidden md:block right-0 top-0 z-10 md:w-full md:h-[130vh]"
        ></Image>
        <Image
          src={center_bg}
          className="absolute top-0 right-0 z-40 hidden w-full h-full md:block"
        ></Image>
        <Image
          src={hero_bg_mob}
          className="absolute top-0 right-0 z-10 block w-full md:hidden"
        ></Image>
        <Image
          src={center_bg_mob}
          className="absolute top-[6%] right-0 z-30 w-full md:hidden"
        ></Image>
        <Image
          src={noise}
          className="absolute right-0 top-0 z-20 w-full h-full md:h-[130vh]"
        ></Image>


       {/* <Navbar /> */}
        <div className="relative z-50 flex items-center justify-between text-sm">
          <Image alt="alt" src={logo} className="w-16 h-10"></Image>

          <div className="items-center justify-center hidden gap-8 md:flex">
         <a href="/sports/home">   <p className="text-white cursor-pointer font-poppins">Home</p> </a>
         <a href="#features">   <div className="flex gap-1 features_div">
              <p className="text-white cursor-pointer font-poppins">Features</p>
              <Image alt="alt" src={arrow} className="arrow_img" />
            </div> </a>
          <a href="#about">  <p className="text-white cursor-pointer font-poppins">About</p> </a>
          <a href="https://docs.purebet.io/">  <p className="text-white cursor-pointer font-poppins">Docs</p> </a>
          <a href="/onboarding">  <p className="text-white cursor-pointer font-poppins">Onboarding</p> </a>
          </div>

          <div className="items-center justify-center hidden gap-6 md:flex">
            {/* <p className="text-white cursor-pointer font-poppins">Login</p> */}
          <a href="/sports/home">
            <button className="px-3 py-[5px] text-black bg-white rounded-3xl font-poppins font-medium">
              Get started
            </button>
            </a>
          </div>
          
          <>
      <button className="md:hidden" onClick={toggleNavbar}>
        <Image alt="alt" src={burger} className="h-[17px] z-[9999] w-[25px]" />
      </button>
      {isOpen && (
        <div
          ref={navbarRef}
          className="fixed top-0 right-0 w-64 h-full bg-black text-white z-50 p-6 shadow-lg transition-transform transform translate-x-0"
        >
          <div className="flex justify-end">
            <button onClick={toggleNavbar}>&times;</button>
          </div>
          <ul className="mt-8 space-y-4">
          <li><a href="/sports/home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="https://docs.purebet.io/">Docs</a></li>
            <li><a href="/onboarding">Onboarding</a></li>
          </ul>
        </div>
      )}
    </>
        
        </div>
        <div className="relative z-40 flex gap-8 md:gap-12 flex-col items-center justify-center h-[35vh] md:h-[75vh] text-center">
          <div className="relative">
            <p className="font-bold text-black font-dmSans text-[28px] md:text-7xl max-w-[326px] md:max-w-[970px]">
              The sports betting experience you deserve
            </p>
            <div className="absolute hidden md:block md:bottom-[25%] lg:bottom-[20%] lg:left-0 w-[72px] h-[72px] z-50">
              <Image alt="alt" src={baseball} className="" />
            </div>
            <div className="absolute hidden md:block md:bottom-[25%] lg:bottom-[20%] right-[1%] w-[72px] h-[72px] z-50">
              <Image alt="alt" src={rugby} className="" />
            </div>
          </div>
          <a className="z-[999999]" href="/sports/home">
          <button className="flex items-center gap-2 text-black py-[10px] font-poppins font-[600] text-[12px] md:text-base px-[20px] rounded-full bg-white hero_btn_shadow">
            Start Betting
            <Image
              src={cursor}
              className="w-[14px] h-[14px] md:w-[15px] md:h-[15px]"
            />
          </button>
          </a>
        </div>
        <div className="relative z-40 flex justify-center mt-24 md:mt-16">
  <div className="flex flex-col items-center justify-center relative">
    <Image alt="alt" src={connect} />
    <p className="font-poppins text-[10px] md:text-[14px] text-white absolute top-[100%]">
      Connect
    </p>
  </div>
  <div className="mt-[1.1rem] relative">
    <Image alt="alt" src={line}  />
  </div>
  <div className="flex flex-col items-center justify-center relative">
    <Image alt="alt" src={select} />
    <p className="font-poppins text-[10px] md:text-[14px] text-white absolute top-[100%]">
      Select
    </p>
  </div>
  <div className="relative mt-[1.1rem]">
    <Image alt="alt" src={line} className="" />
  </div>
  <div className="flex flex-col items-center justify-center relative">
    <Image alt="alt" src={bet} />
    <p className="font-poppins text-[10px] md:text-[14px] text-white absolute top-[100%]">
      Bet
    </p>
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
        <div className="relative  z-40 flex items-center justify-center gap-4 mt-10">
          {/* <div className="border-[#707070] border-[1px] items-center pl-3 rounded-xl flex gap-4 ">
            <p className="font-inter text-[10px] ">Join Our Discord Community</p>
            <Image alt="alt" src={discord} className="rounded-r-xl" />
          </div> */}
<a href="https://discord.com/invite/AG7J2kzkpV">
<div
      className="group relative z-[999999] flex items-center w-[200px] h-[39px] border border-[#707070] backdrop-blur-sm rounded-[10px] box-border overflow-hidden"
      onClick={() => setIsClicked(!isClicked)}
    >
      <div
        className={`absolute inset-0 bg-[#321EAE] transform transition-transform duration-300 ease-in-out ${
          isClicked ? 'translate-x-0' : 'translate-x-full'
        } group-hover:translate-x-0 group-focus:translate-x-0`}
      ></div>
      <div className="relative flex-grow pl-[13px] text-white z-10">
        <div className="font-inter font-semibold text-[10px] leading-[12px] text-center">
          Join Our Discord Community
        </div>
      </div>
      <div className="relative flex items-center justify-center w-[35px] rounded-md mr-[0.1px] my-[0.4px] h-full bg-[#321EAE] z-10">
        <FaDiscord color="white" />
      </div>
    </div>
    </a>
        </div>
        <div className="absolute left-[60%] md:left-[53%] mt-4 flex gap-1 items-start">
          <Image alt="alt" src={green_cursor} />
          <div className="px-4 py-[5px] rounded-full glow_btn border-[#00C2C2] border-[1px]">
            <p className="font-poppins text-[10px] md:text-[14px] font-medium">
              Pure
            </p>
          </div>
        </div>
      </div>
      </>
     
    </main>
  );
}
