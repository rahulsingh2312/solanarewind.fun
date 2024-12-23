"use client";
import "@fontsource/inter";
import "@fontsource/dm-sans";
import "@fontsource/poppins";

import Image from "next/image";
import "@splidejs/react-splide/css";
import card1_cir from "../../../public/card1_circle.svg";
import gradient from "../../../public/sec_2_bg_gradient.svg";
import gradient_mob from "../../../public/sec_2_gradient_mob.svg";
import card2_cir from "../../../public/card2_circle.svg";
import card3_cir from "../../../public/card3_circle.svg";
import card4_cir from "../../../public/card4_circle.svg";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function SectionTwo() {
  return (
    <main className="relative z-40 mt-14">
      <div className="hidden md:block absolute top-[-5%] left-0 -z-10">
        <Image alt="alt" src={gradient} className="relative -z-10" />
      </div>
      <div className="md:hidden absolute top-[-60%] left-0 -z-10">
        <Image alt="alt" src={gradient_mob} />
      </div>
      <div className="px-6 pt-10 sm:px-12 md:px-20 md:pb-12 lg:px-28">
        <div className="text-[28px] md:text-4xl font-extralight max-w-[393px]">
          Unlock the Power of Betting with
          <span className="font-normal"> PUREBET</span>
        </div>

        <div className="mt-10 md:hidden">
          <Splide
            options={{
              pagination: true,
              arrows: false,
              autoplay: false,
            }}
          >
            <SplideSlide>
              <div className="relative w-full h-[418px] rounded-[14px] card1 p-5 card_border">
                <div className="absolute z-10 right-0 top-[-5%]">
                  <Image alt="alt" src={card1_cir} className="h-[250px]" />
                </div>
                <div className="relative z-20 flex flex-col justify-between h-full">
                  <p className="mb-3 text-4xl font-bold font-poppins">
                    HIGHEST ODDS
                  </p>
                  <p className="text-xl text-[#676767] font-poppins">
                    Purebet combines the highest odds among blockchain-based
                    sports betting applications, ensuring maximum returns for
                    bettors.
                  </p>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="relative w-full h-[418px] rounded-[14px] card3 p-5 card_border">
                <div className="absolute top-0 left-0 z-10">
                  <Image alt="alt" src={card3_cir} className="h-[250px]" />
                </div>
                <div className="relative z-20 flex flex-col justify-between h-full">
                  <p className="mb-3 text-4xl font-bold font-poppins">
                    WINNERS WELCOME
                  </p>
                  <p className="text-xl text-[#676767] font-poppins">
                    Purebet is designed to be resilient to profitable bettors,
                    ensuring fair play and continuous access to our services.
                    Winning bettors are always welcome.
                  </p>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="relative w-full h-[418px] rounded-[14px] card2 p-5 card_border">
                <div className="absolute z-10 top-0 left-[2%]">
                  <Image alt="alt" src={card2_cir} className="h-[250px]" />
                </div>
                <div className="relative z-20 flex flex-col justify-between h-full">
                  <p className="mb-3 text-4xl font-bold font-poppins">
                    YOU ARE IN CONTROL
                  </p>
                  <p className="text-xl text-[#676767] font-poppins">
                    By utilizing blockchain technology, you are always the owner
                    of your funds. There is no need to deposit or to request
                    withdrawals. Winnings are sent directly to your wallet.
                  </p>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="relative w-full h-[418px] rounded-[14px] card4 p-5 card_border">
                <div className="absolute top-0 right-0 z-10">
                  <Image alt="alt" src={card4_cir} className="h-[250px]" />
                </div>
                <div className="relative z-20 flex flex-col justify-between h-full">
                  <p className="mb-3 text-4xl font-bold font-poppins">
                    DEEP LIQUIDITY
                  </p>
                  <p className="text-xl text-[#676767] font-poppins">
                    Through our cross-chain liquidity aggregation, Purebet
                    ensures user get the optimal betting experiences, no matter
                    their size.
                  </p>
                </div>
              </div>
            </SplideSlide>
          </Splide>
        </div>

        <div className="hidden md:flex gap-6 mt-10 h-[788px]">
          <div className="relative w-[40%] rounded-[14px] card1 p-5 card_border">
            <div className="absolute right-0 top-[-2%]">
              <Image alt="alt" src={card1_cir} />
            </div>
            <div className="flex flex-col justify-end h-full">
              <p className="mb-3 text-4xl font-bold font-poppins">
                HIGHEST ODDS
              </p>
              <p className="text-2xl text-[#676767] font-poppins">
                Purebet combines the highest odds among blockchain-based sports
                betting applications, ensuring maximum returns for bettors.
              </p>
            </div>
          </div>
          <div className="w-[60%] flex flex-col gap-6">
            <div className="h-[340px] relative card2 p-5 card_border rounded-[14px]">
              <div className="absolute top-0 left-[2%]">
                <Image alt="alt" src={card2_cir} />
              </div>
              <div className="flex flex-col justify-end h-full">
                <p className="mb-3 text-4xl font-bold font-poppins">
                  YOU ARE IN CONTROL
                </p>
                <p className="text-xl text-[#676767] font-poppins">
                  By utilizing blockchain technology, you are always the owner
                  of your funds. There is no need to deposit or to request
                  withdrawals. Winnings are sent directly to your wallet.
                </p>
              </div>
            </div>
            <div className="flex gap-6 h-[418px] w-full">
              <div className="relative w-1/2 p-5 card_border rounded-[14px] card3">
                <div className="absolute top-0 left-[3%] z-20">
                  <Image alt="alt" src={card3_cir} />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <p className="relative z-30 mt-5 mb-3 text-4xl font-bold font-poppins">
                    WINNERS WELCOME
                  </p>
                  <p className="text-xl text-[#676767] font-poppins">
                    Purebet is designed to be resilient to profitable bettors,
                    ensuring fair play and continuous access to our services.
                    Winning bettors are always welcome.
                  </p>
                </div>
              </div>
              <div className="relative w-1/2 p-5 card_border rounded-[14px] card4">
                <div className="absolute right-0 top-[2%]">
                  <Image alt="alt" src={card4_cir} />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <p className="mt-5 mb-3 text-4xl font-bold font-poppins">
                    DEEP LIQUIDITY
                  </p>
                  <p className="text-xl text-[#676767] font-poppins">
                    Through our cross-chain liquidity aggregation, Purebet
                    ensures user get the optimal betting experiences, no matter
                    their size.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
