import "@fontsource/inter";
import "@fontsource/dm-sans";
import "@fontsource/poppins";

import wallet from "../../../public/wallet.svg";
import market from "../../../public/market.svg";
import bet from "../../../public/place_bet.svg";
import enjoy from "../../../public/enjoy.svg";
import gradient from "../../../public/section_3_gradient.svg";
import ellipse from "../../../public/sec_3_ellipse.svg";
import ball from "../../../public/sec_3_ball.png";
import man from "../../../public/man_sleep.png";
import noise from "../../../public/noise_bg.png";
import grey_arrow from "../../../public/grey_arrow.svg";
import highlight from "../../../public/yellow_highlight.svg";
import plus from "../../../public/grey_plus.svg";
import dot from "../../../public/plus_dot.svg";

import Image from "next/image";
export default function SectionThree() {
  return (
    <main id="features"  className="relative mt-14">
      <div className="absolute top-[0%] w-[53px] h-[53px] md:w-[89px] md:h-[89px] left-[-2%] md:top-[-5%] md:left-[3%] z-30">
        <div className="relative">
          <Image alt="alt" src={plus} />
          <div>
            <Image
              src={dot}
              className="absolute top-[2%] left-[4%] md:top-[21.5%] md:left-[22.5%]"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-2%] right-[0%] md:bottom-[-5%] md:right-[3%] z-30">
        <div className="relative">
          <Image alt="alt" src={plus} />
          <div>
            <Image alt="alt" src={dot} className="absolute top-[21.5%] left-[22.5%]" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[10%] md:top-[-40%] right-0 z-10">
        <Image alt="alt" src={gradient} />
      </div>
      <div className="absolute md:top-[20%] bottom-[25%] right-0 z-10">
        <Image alt="alt" src={ball} />
      </div>
      <div className="absolute md:top-[5%] bottom-[18%] right-0 z-0">
        <Image alt="alt" src={highlight} />
      </div>
      <div className="absolute md:top-[0%] bottom-[15%] right-0 z-10">
        <Image alt="alt" src={ellipse} />
      </div>
      <div className="relative z-20 px-6 pt-10 sm:px-12 md:px-20 md:pb-12 lg:px-28">
        <div className="text-[26px] md:text-5xl font-extralight font-poppins">
          Easy Steps to Bet on
          <span className="font-medium gradient_text"> Sports</span>
        </div>
        <p className="text-[#656565] mt-3">
          Purebet simplifies sports betting with simple steps
        </p>

        <div className="flex flex-col w-full h-full gap-8 mt-10 md:gap-12 md:mt-16 md:flex-row">
          <div className="md:w-2/3">
            <div className="flex flex-col items-center w-full gap-8 md:gap-16 md:flex-row">
              <div className="relative max-w-[322px]">
                <Image alt="alt" src={wallet} className="w-[58px] h-[58px]" />
                <div className="border-[1px] relative top-[-16px] inline-block border-white py-[6px] px-[16px] border-opacity-35 rounded-full">
                  CONNECT-WALLET
                </div>
                <p className="text-[#B5B5B5] font-poppins mt-1">
                  Simply connect your funded Solana blockchain wallet to the
                  website.
                </p>
              </div>
              <div className="relative max-w-[322px]">
                <Image alt="alt" src={market} />
                <div className="border-[1px] relative top-[-16px] inline-block border-white py-[6px] px-[16px] border-opacity-35 rounded-full">
                  SELECT-MARKET
                </div>
                <p className="text-[#B5B5B5] font-poppins mt-1">
                  Choose the event and market you wish to bet on from our
                  comprehensive selection.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center w-full gap-8 mt-8 md:gap-16 md:flex-row ">
              <div className="relative max-w-[322px]">
                <Image alt="alt" src={bet} />
                <div className="inline-block relative top-[-16px] border-[1px] border-white py-[6px] px-[16px] border-opacity-35 rounded-full">
                  PLACE-BET
                </div>
                <p className="text-[#B5B5B5] font-poppins mt-1">
                  Adjust your stake and odds, then confirm the transaction
                  through your blockchain wallet.
                </p>
              </div>
              <div className="relative max-w-[322px]">
                <Image alt="alt" src={enjoy} />
                <div className="inline-block relative top-[-16px] border-[1px] border-white py-[6px] px-[16px] border-opacity-35 rounded-full">
                  ENJOY-WINNING
                </div>
                <p className="text-[#B5B5B5] font-poppins mt-1">
                  Once the event is over and the market is settled, your
                  winnings are automatically sent back to your wallet.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[347px] md:h-[398px] md:w-1/3 sec_3_card rounded-xl">
          <a target="_blank" href="https://docs.purebet.io/">

            <Image alt="alt" src={man} className="absolute right-0 z-20 rounded-xl" />
            <Image
              src={noise}
              className="absolute top-0 left-0 w-full h-full rounded-xl backdrop-blur-sm"
            />
            <div className="relative z-20 flex flex-col justify-between h-full p-5">
              <p className="font-poppins text-[#5E5E5E] font-semibold">DOCS</p>
              <div>
                <p className="text-xl">Docs For The Nerds!</p>
                <div className="flex items-center gap-2 mt-3">
                  <p className="text-sm text-[#9B9B9B]">Read Now</p>
                  <Image alt="alt" src={grey_arrow} />
                </div>
              </div>
            </div>
            </a>
          </div>
          
        </div>
      </div>
    </main>
  );
}
