"use client";
import Image from "next/image";
import blog1 from "../../../public/blog_1.png";
import blog2 from "../../../public/blog_2.png";
import blog3 from "../../../public/blog_3.png";
import noise from "../../../public/noise_bg.png";
import book from "../../../public/book.svg";
import arrow from "../../../public/grey_arrow.svg";
import plus from "../../../public/grey_plus.svg";
import dot from "../../../public/plus_dot.svg";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import blue_line from "../../../public/blue_line.svg";

export default function SectionFive() {
  return (
    <main className="relative">
      <div className="absolute top-[-18%] left-[-2%] rotate-45 md:rotate-0 md:top-[-12%] md:left-[3%] z-30">
        <div className="relative">
          <Image alt="alt" src={plus} />
          <div>
            <Image alt="alt" src={dot} className="absolute top-[21.5%] left-[22.5%]" />
          </div>
        </div>
      </div>
      <div className="relative z-20 px-6 mt-16 bg-black md:mt-0 sm:px-12 md:px-20 md:pb-12 lg:px-28">
        <p className="text-2xl font-poppins md:text-4xl">
          Discover Latest Blogs
        </p>
        <div className="md:hidden mt-6 h-[394px]">
          <Splide
            options={{
              pagination: true,
              autoplay: false,
              arrows: false,
            }}
          >
            <SplideSlide>
              <div className="flex justify-center h-[394px]">
                <div className="relative max-w-[382px] w-full rounded-xl">
                  <Image
                    src={noise}
                    className="absolute bottom-0 left-0 w-full h-full rounded-xl"
                  />
                  <div className="h-1/2">
                    <Image alt="alt" src={blog1} className="h-full rounded-t-xl" />
                  </div>
                  <div className="p-6 blog1 rounded-b-xl h-1/2">
                    <div className="flex gap-2 mt-6">
                      <Image alt="alt" src={book} />
                      <p className="text-sm  text-[#CBCBCB]">10 Mins Read </p>
                    </div>
                    <p className="mt-1 text-xl capitalize">
                      The economic trilemma of onchain sports betting
                    </p>
                    <div className="border-[1px] border-[#5F5F5F] py-1 px-[10px] mt-3 inline-block rounded-md">
                      <div className="flex items-center  gap-2  text-sm text-[#9B9B9B]">
                        <p>Read Now</p>
                        <Image alt="alt" src={arrow} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="flex justify-center h-[394px]">
                <div className="relative max-w-[382px] w-full rounded-xl">
                  <Image
                    src={noise}
                    className="absolute bottom-0 left-0 w-full h-full rounded-xl"
                  />
                  <div className="h-1/2">
                    <Image alt="alt" src={blog2} className="h-full rounded-t-xl" />
                  </div>
                  <div className="p-6 blog2 rounded-b-xl h-1/2">
                    <div className="flex gap-2 mt-6">
                      <Image alt="alt" src={book} />
                      <p className="text-sm  text-[#CBCBCB]">10 Mins Read </p>
                    </div>
                    <p className="mt-1 text-xl capitalize">
                      The economic trilemma of onchain sports betting
                    </p>
                    <div className="border-[1px] border-[#5F5F5F] py-1 px-[10px] mt-3 inline-block rounded-md">
                      <div className="flex items-center  gap-2  text-sm text-[#9B9B9B]">
                        <p>Read Now</p>
                        <Image alt="alt" src={arrow} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="flex justify-center h-[394px]">
                <div className="relative max-w-[382px] w-full rounded-xl">
                  <Image
                    src={noise}
                    className="absolute bottom-0 left-0 w-full h-full rounded-xl"
                  />
                  <div className="h-1/2">
                    <Image alt="alt" src={blog3} className="h-full rounded-t-xl " />
                  </div>
                  <div className="p-6 blog3 rounded-b-xl h-1/2">
                    <div className="flex gap-2 mt-6">
                      <Image alt="alt" src={book} />
                      <p className="text-sm  text-[#CBCBCB]">10 Mins Read </p>
                    </div>
                    <p className="mt-1 text-xl capitalize">
                      The economic trilemma of onchain sports betting
                    </p>
                    <div className="border-[1px] border-[#5F5F5F] py-1 px-[10px] mt-3 inline-block rounded-md">
                      <div className="flex items-center  gap-2  text-sm text-[#9B9B9B]">
                        <p>Read Now</p>
                        <Image alt="alt" src={arrow} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SplideSlide>
          </Splide>
        </div>
        <div className="hidden md:flex justify-between gap-8 mt-6 h-[394px]">
          <div className="relative max-w-[382px] w-full rounded-xl">
            <Image
              src={noise}
              className="absolute bottom-0 left-0 w-full h-full rounded-xl"
            />
            <div className="h-1/2">
              <Image alt="alt" src={blog1} className="h-full rounded-t-xl" />
            </div>
            <div className="p-6 blog1 rounded-b-xl h-1/2">
              <div className="flex gap-2 mt-6">
                <Image alt="alt" src={book} />
                <p className="text-sm  text-[#CBCBCB]">10 Mins Read </p>
              </div>
              <p className="mt-1 text-xl capitalize">
                The economic trilemma of onchain sports betting
              </p>
              <div className="border-[1px] border-[#5F5F5F] py-1 px-[10px] mt-3 inline-block rounded-md">
                <div className="flex items-center  gap-2  text-sm text-[#9B9B9B]">
                  <p>Read Now</p>
                  <Image alt="alt" src={arrow} />
                </div>
              </div>
            </div>
          </div>
          <div className="relative max-w-[382px] w-full rounded-xl">
            <Image
              src={noise}
              className="absolute bottom-0 left-0 w-full h-full rounded-xl"
            />
            <div className="h-1/2">
              <Image alt="alt" src={blog2} className="h-full rounded-t-xl" />
            </div>
            <div className="p-6 blog2 rounded-b-xl h-1/2">
              <div className="flex gap-2 mt-6">
                <Image alt="alt" src={book} />
                <p className="text-sm  text-[#CBCBCB]">10 Mins Read </p>
              </div>
              <p className="mt-1 text-xl capitalize">
                The economic trilemma of onchain sports betting
              </p>
              <div className="border-[1px] border-[#5F5F5F] py-1 px-[10px] mt-3 inline-block rounded-md">
                <div className="flex items-center  gap-2  text-sm text-[#9B9B9B]">
                  <p>Read Now</p>
                  <Image alt="alt" src={arrow} />
                </div>
              </div>
            </div>
          </div>
          <div className="relative max-w-[382px] w-full rounded-xl">
            <Image
              src={noise}
              className="absolute bottom-0 left-0 w-full h-full rounded-xl"
            />
            <div className="h-1/2">
              <Image alt="alt" src={blog3} className="h-full rounded-t-xl " />
            </div>
            <div className="p-6 blog3 rounded-b-xl h-1/2">
              <div className="flex gap-2 mt-6">
                <Image alt="alt" src={book} />
                <p className="text-sm  text-[#CBCBCB]">10 Mins Read </p>
              </div>
              <p className="mt-1 text-xl capitalize">
                The economic trilemma of onchain sports betting
              </p>
              <div className="border-[1px] border-[#5F5F5F] py-1 px-[10px] mt-3 inline-block rounded-md">
                <div className="flex items-center  gap-2  text-sm text-[#9B9B9B]">
                  <p>Read Now</p>
                  <Image alt="alt" src={arrow} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center hidden w-full md:flex">
        <Image alt="alt" src={blue_line} />
      </div>
    </main>
  );
}
