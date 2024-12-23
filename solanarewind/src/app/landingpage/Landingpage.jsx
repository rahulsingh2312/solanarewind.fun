'use client';
// import { useState } from "react";
// import './landing.css'
// import Navbar from "../compoThe sports betting experience you deservenents/navbar";
// import CustomCursor from "../CustomCursor";
// import Main from './Main'
// import Unlock from "./Unlock";
// import EasySteps from "./EasySteps/EasySteps";
// import AboutUs from "./AboutUs/AboutUs";

import Footer from "./Footer";
import Hero from "./Hero";
import SectionFive from "./SectionFive";
import SectionFour from "./SectionFour";
import SectionThree from "./SectionThree";
import SectionTwo from "./SectionTwo";











export default function Landingpage(){
    return(<>
         {/* <div className='bg-black blueEc -z-[0] flex items-center justify-center text-white landingpagecursor'> */}
       {/* <CustomCursor /> */}
      {/* <div className="whiteEc z-[]"></div>
      </div>
      // <Navbar />
      <Main />
      <div >
      <Unlock/>
      <EasySteps />
      <AboutUs/>
      </div>
   */}

<main>
      <Hero />
      <SectionTwo />
      <SectionThree />
      <SectionFour  />
      <SectionFive />
      <Footer />
    </main>



   
        </>)
}