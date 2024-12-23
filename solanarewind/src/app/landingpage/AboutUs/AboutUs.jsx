import '../landing.css'
import Image from 'next/image';
import { IoIosArrowRoundForward } from "react-icons/io";

export default function AboutUs() {
    return (
       <div >
         <div className='flex mt-20 justify-center items-center'>
            <div className='orbit3  rounded-md'>
            <div className='orbit4  rounded-md' />

            </div>
            </div>
            <div className='flex '>
                    {/* pi */}
<div className=''><Image className='' src={"/ph_infinity.png"} alt="infinity" width={1500} height={10}/></div>
             <div className="flex-row  justify-center items-center">

            <div
                className="
                    aboutus
                    text-center 
                    bg-none
                    bg-transparent
                    bg-clip-text 
                    font-semibold
                    tracking-[-0.02em]
                    text-[72px] 
                    md:text-[160px] 
                    w-[20rem] 
                    md:w-[44.3rem] 
                    
                    flex 
                    justify-center 
                    items-center
                "
            >
                About Us
            </div>
            <div>
{/* content */}
<div className='text-[#ADADAD] -mt-10 md:-mt-14 text-[16px] font-[500px] text-justify leading-6 font-poppins'>
<span className='font-semibold text-white'>Purebet</span> is built by a team passionate about revolutionizing sports betting through blockchain technology. With a focus on transparency, security, and user empowerment, we aim to create the ultimate destination for sports betting enthusiasts. We are a team of professional sports traders, blockchain developers, and crypto-defi enthusiasts dedicated to building a seamless and rewarding sports betting experience.
<br/><br/>
<br/>
At <span className='font-semibold text-white'>Purebet</span>, enjoy hassle-free sports betting without needing to sign up, and access the best odds available. Through partnerships with top blockchain-based sports betting protocols, we bring together their top offers all in one convenient platform. Elevate your sports betting experience across any blockchain with us!

</div>
{/* button */}

<div className='flex justify-center items-center md:mt-8 mt-5'>
    <div className=' w-[154px] rainborder h-[42px] flex items-center justify-center   bg-[#3D3D3D] rounded-[3px]'>
<div className=" w-[146px] h-[34px]   bg-white rounded-[3px] flex items-center justify-center p-[8px_6px]">
    <span className="w-[98px] h-[24px] font-poppins font-medium text-[16px] leading-[24px] text-justify capitalize text-[#434343]">
        Onboarding    

    </span>
    <span className='-ml-2'>
    <IoIosArrowRoundForward size={30} color="black" />
    </span>
</div>
</div>
</div>

</div>
        </div>
         {/* pi */}
<div><Image className=' ml-5' src={"/ph_infinity.png"} alt="infinity" width={1500} height={100}/></div>
        </div>
  
        </div>
    );
}
