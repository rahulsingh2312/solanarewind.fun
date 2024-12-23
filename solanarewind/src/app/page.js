// "use client";

// import { useState } from "react";
// import { TransitionLink } from "../components/utils/TransitionLink";

// import {
//   WalletMultiButton,
// } from "@solana/wallet-adapter-react-ui";

// import React, { useEffect, useRef } from "react";
// import Starfield from "../components/starField"; // Adjust based on export type
// import { gsap } from "gsap";

// import { FaChevronRight } from "react-icons/fa";

// export default function Page() {
  


//   const pathRef = useRef(null); // Ref for the SVG path
//   const pathRef2 = useRef(null); // Ref for the SVG path
//   const [loading, setLoading] = useState(true); // State to control loader visibility

//   useEffect(() => {
//     // GSAP Animation for the path
//     gsap.fromTo(
//       pathRef.current,
//       { strokeDasharray: "1020", strokeDashoffset: "1020" }, // Initial state
//       {
//         strokeDashoffset: 0,
//         duration: 4,
//         repeat: 0,
//         yoyo: true,
//         ease: "power1.inOut",
//       } // Animation
//     );
//     gsap.fromTo(
//       pathRef2.current,
//       { strokeDasharray: "1020", strokeDashoffset: "1020" }, // Initial state
//       {
//         strokeDashoffset: 0,
//         duration: 4,
//         repeat: 0,
//         yoyo: true,
//         ease: "power1.inOut",
//       } // Animation
//     );
//   }, []);

//   return (
//     <>

//       <div className="h-screen overflow-y-hidden">
//         {/* <Marquee autoFill className="">
//         <h1 className="text-white font-bold text-6xl">YEAR IN SOL</h1>
//         <div className="h-20 w-20 bg-white rounded-full mx-20"></div>
//       </Marquee> */}
//         <GradientBlob2 />
//         <GradientBlob />
//         {/* <div className="bg-[#0F1011]/40 backdrop-blur-3xl rounded-xl  mx-auto p-4 border border-white/10 w-[878px] max-sm:w-screen max-md:w-10/12 h-screen z-50 relative ">
//         <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#413e3e] text-4xl font-bold">
//           A Year in Sol
//         </h1>
//       </div> */}
//         <div className="planet relative h-screen flex  flex-col z-40 items-center justify-center bg-[url('../../public/planet.svg')] bg-center bg-no-repeat">
//           <h1
//             className="text-transparent text-center z-50 text-[64px] font-medium"
//             style={{
//               background:
//                 "linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0%, #FFF 49.83%, rgba(255, 255, 255, 0.18) 100%)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Ready for your Solana Rewind 2024?
//           </h1>
//           <p className="font-normal text-md text-white/45 ">
//             Get a Solana Wrapped for all your trades made on memecoins!
//           </p>
//           <div className="mt-4 flex gap-4">
          
//                   <WalletMultiButton
//                   style={{
//                     background:"#292242",
//                     borderRadius:"15px",
//                    }}
//                   />
              
//             <TransitionLink
//               href="/rewind"
//               className="bg-white py-2 px-4 rounded-xl flex justify-center items-center cursor-pointer hover:bg-slate-500 transition-all hover:translate-x-2"
//             >
//               <FaChevronRight className="text-xl text-black" />
//             </TransitionLink>
//           </div>
//         </div>

//         <Starfield
//           starCount={1000}
//           starColor={[255, 255, 255]}
//           speedFactor={0.05}
//           backgroundColor="#0B0C0E"
//         />
//         <div className="container">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="940"
//             height="535"
//             viewBox="0 0 940 535"
//             fill="none"
//             className="z-10 fixed -bottom-20 right-0 rotate-180"
//           >
//             <path
//               ref={pathRef} // Attach the ref for GSAP
//               d="M58.6766 51.1834C50.5228 96.6108 50.3145 145.02 54.9887 190.774C61.807 257.516 79.8436 332.335 122.545 385.934C161.228 434.487 227.199 474.821 289.272 482.07C326.583 486.428 356.992 482.48 393.97 474.846C444.141 464.487 491.105 447.621 531.816 415.859C586.998 372.807 627.681 313.307 685.741 273.468C720.799 249.413 758.746 247.501 799.286 257.238C836.026 266.061 870.67 281.069 888.541 315.011"
//               stroke="#B236FF"
//               strokeWidth="102"
//               strokeLinecap="round"
//             />
//           </svg>

//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="517"
//             height="928"
//             viewBox="0 0 517 928"
//             fill="none"
//             className="-rotate-45 -top-20 z-10 left-12 fixed"
//           >
//             <path
//               ref={pathRef2}
//               d="M52 52C66.2219 58.7723 79.2554 71.8946 91.1308 81.9692C107.196 95.5987 123.582 109.014 138.88 123.507C168.688 151.747 193.408 186.654 200.759 228.088C205.974 257.481 205.728 286.954 205.728 316.676C205.728 361.646 188.463 403.453 176.225 445.947C159.421 504.293 138.883 562.386 139.268 624.055C139.535 666.891 152.399 709.5 180.65 742.301C203.929 769.328 234.561 785.557 267.064 799.056C332.415 826.198 404.491 839.835 465.668 876.541"
//               stroke="#2AABEE"
//               strokeWidth="102"
//               strokeLinecap="round"
//             />
//           </svg>
//         </div>
//       </div>
    
//     </>
//   );
// }

// function GradientBlob() {
//   return (
//     <div className="w-[251px] h-screen bg-[#2AABEE]/60 absolute right-80 -top-10 -rotate-45 blur-[185px]"></div>
//   );
// }
// function GradientBlob2() {
//   return (
//     <div className="w-40 h-screen bg-[#AE47FF]/60 absolute left-64 rotate-45 top-24 blur-[221px]"></div>
//   );
// }


import Landing from "./landingpage/page"

export default function Page() {
  return (
    <Landing />
  )
};