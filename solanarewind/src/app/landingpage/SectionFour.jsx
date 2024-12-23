  import Image from "next/image";
import gradient from "../../../public/sec_4_grad.svg";
import gradient_mob from "../../../public/sec_4_grad_mob.svg";
import arrow from "../../../public/onboarding_arrow.svg";
import left from "../../../public/sec_4_left.svg";
import right from "../../../public/sec_4_right.svg";

export default function SectionFour() {
  return (
    <main id="about" className="relative mt-16">
      <div className="absolute top-[45%] left-0 hidden md:block z-20">
        <Image alt="alt" src={left} className="" />
      </div>
      <div className="absolute top-[45%] right-0 hidden md:block z-20">
        <Image alt="alt" src={right} className="" />
      </div>
      <div className="absolute top-0 right-0 hidden w-full h-full lg:block -z-9">
        <Image alt="alt" src={gradient} className="w-full h-[659px]" />
      </div>
      <div className="absolute top-0 right-0 w-full h-full md:hidden -z-9">
        <Image alt="alt" src={gradient_mob} className="w-full h-[659px]" />
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center px-6 pt-10 sm:px-12 md:px-20 md:pb-12 lg:px-28">
        <p className="font-poppins text-[72px] md:text-[160px] about_grd whitespace-nowrap">
          About Us
        </p>
        <div className="text-justify max-w-[696px] text-[12px] md:text-base relative top-[-40px] md:top-[-80px]">
          <span className="font-bold">Purebet </span>
          is built by a team passionate about revolutionizing sports betting
          through blockchain technology. With a focus on transparency, security,
          and user empowerment, we aim to create the ultimate destination for
          sports betting enthusiasts. We are a team of professional sports
          traders, blockchain developers, and crypto-defi enthusiasts dedicated
          to building a seamless and rewarding sports betting experience.
        </div>
        <div className="text-justify max-w-[696px] text-[12px] md:text-base mt-4 md:mt-8 relative top-[-40px] md:top-[-80px]">
          At
          <span className="font-bold"> Purebet, </span>
          enjoy hassle-free sports betting without needing to sign up, and
          access the best odds available. Through partnerships with top
          blockchain-based sports betting protocols, we bring together their top
          offers all in one convenient platform. Elevate your sports betting
          experience across any blockchain with us!
        </div>
        <div className="relative md:top-[-40px] p-[1px] rounded-[3px] bg-gradient-to-r from-[#00a3ff] via-[#cc4c4c] to-[#7000ff]">
          <div className="bg-[#3D3D3D] p-1 rounded-[3px] ">
            <a href="/onboarding">
            <button className="rounded-[3px]">
              <div className="flex items-center gap-2 bg-white text-[#434343] px-2 py-[6px] rounded-[3px]">
                <p className="font-poppins">Onboarding</p>
                <Image alt="alt" src={arrow} />
              </div>
            </button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
