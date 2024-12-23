import React from 'react';

function RoundedImage() {
  return (
    <div className="flex absolute flex-col ml-5 w-40 md:w-[100%] max-md:ml-0 max-md:w-full">
      <div className="flex relative flex-col justify-center items-start self-stretch px-5 py-1 my-auto rounded-none aspect-[1.15] w-[200%] max-md:pl-5 max-md:mt-10">
        <img src="/SunBall.png" alt="" className="object-cover absolute inset-0 size-full" />
        {/* <div className="relative shrink-0 w-full bg-amber-200 rounded-full shadow-2xl h-[100px]" /> */}
      </div>
    </div>
  );
}

export default RoundedImage;