import Image from "next/image"
import { DM_Sans } from 'next/font/google'
import { PiPlugsConnectedLight } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { FaHive } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";



const dmsans = DM_Sans({
    weight: '700',
    subsets: ['latin'],
  })
export default function Main(){
    return(
    <>
    <div className={`${dmsans.className} z-[0] `}>
        <div className="md:flex hidden  justify-center items-center">
        <div className="md:-mr-20 z-[0]">
    <Image  src="/baseball.png" width={150} height={150} alt="baseball"/>
    </div>
    <div className="text-black z-[0] hidden md:block text-[74px] text-center linehghtcss w-[970px] h-[192px] font-bold">The sports betting experience you deserve</div>
    <div className="text-black z-[0] md:hidden   text-[74px] text-center linehghtcss w-[970px] h-[192px] font-bold">{"    "}</div>

    <div className="md:-ml-20 mt-10 z-[99999]">
    <Image  src="/rugby.png" width={267} height={280} alt="rubgby"/>
    </div>

    </div>





    <div className="flex md:hidden  justify-center items-center">
        <div className="md:-mr-20 z-[50]">
    <Image  src="/baseball.png" width={150} height={350} alt="baseball"/>
    </div>
    <div className="text-black z-[10] md:hidden   text-[74px] text-center  w-[270px]  font-bold">{"    "}</div>

    <div className="md:-ml-20  z-[50]">
    <Image  src="/rugby.png" width={167} height={280} alt="rubgby"/>
    </div>

    </div>






    <div className="flex  justify-center items-center">
    <div className=" flex z-[10] text-black mt-6 mx-4 md:hidden linehghtcsssm text-center   font-bold">The sports betting experience you deserve</div>
</div>
<a href="/sports/home"><div className="flex mt-10 md:mt-0 justify-center items-center">


    <div className="CTA w-44 z-[50] gap-1">Start Betting <span className="ml-2"> <Image  width={15} height={20} src="/cursornormal.png" alt="cursor" /> </span></div>
   
    </div>
    </a>
<div className="flex md:hidden ">
        <div className="-mr-40 z-[50]">
    <Image  src="/Basketball.png" width={650} height={650} alt="baseball"/>
    </div>
    <div className="text-black z-[10] md:hidden   text-[74px] w-[1070px]  font-bold">{"    "}</div>

    <div className="-ml-20 z-[50]">
    <Image  src="/Soccer.png" width={667} height={680} alt="rubgby"/>
    </div>

    </div>
    <div className="orbit1 z-[]"></div>
    <div className="orbit2 z-[]"></div>

    <div className="flex justify-between items-center">
  <div className="md:block relative hidden z-[99999]">
    <Image  src="/Basketball.png" width={270} height={270} alt="basketball" />
  </div>
  <div className="flex-grow text-center">
            {/* Group 29 */}
            <div className="hidden md:block w-[284px] h-[61px]">
              {/* Add content here */}
            </div>

            {/* Group 28 */}
            <div className="w-[284px] h-[61px]">
              {/* Add content here */}
            </div>

            {/* Frame 14 */}
            <div className="flex flex-row justify-center items-center w-[270px] h-[36px] mx-auto">
              {/* Line 1 */}
              <div className="box-border w-[36px] h-[36px] border border-white rounded-[39px] flex-none flex-grow-0">
                <div className="flex justify-center items-center mt-2">
                  <PiPlugsConnectedLight color="white" />
                </div>
                <div className="font-poppins font-normal mt-4 -ml-2 text-[14px] leading-[21px] text-white">
                  Connect
                </div>
              </div>
              <div className="w-[82px] h-0 border border-white/38 flex-none flex-grow-0"></div>

              {/* ep:select */}
              <div className="box-border w-[36px] h-[36px] border border-white rounded-[39px] flex-none flex-grow-0">
                <div className="flex justify-center items-center mt-[10px]">
                  <FaCheck color="white" />
                </div>
                <div className="font-poppins font-normal mt-4 -ml-1 text-[14px] leading-[21px] text-white">
                  Select
                </div>
              </div>

              {/* Line 2 */}
              <div className="w-[82px] h-0 border border-white/38 flex-none flex-grow-0"></div>

              {/* pixelarticons:coin */}
              <div className="box-border w-[36px] h-[36px] text-white border border-white rounded-[34px] flex-none flex-grow-0">
                <div className="flex justify-center items-center mt-[10px]">
                  <FaHive color="white" />
                </div>
                <div className="font-poppins font-normal mt-4 ml-2 text-[14px] leading-[21px] text-white">
                  Bet
                </div>
              </div>
            </div>
          </div>
  <div className=" hidden md:block relative z-[99999]">
    <Image src="/Soccer.png" width={295} height={292} alt="soccer" style={{ marginTop: '10px' }} />
  </div>
</div>
<div className="flex mt-20 md:mt-0 justify-center items-center">
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
    </div>
    </div>
    </>
    )
}