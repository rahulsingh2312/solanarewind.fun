import React from 'react';

function BettingStep({ title, description, image }) {
  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pt-9 text-base max-md:mt-10">
        {/* {title && (
          <div className="px-4 py-1.5 font-medium text-white uppercase whitespace-nowrap bg-black border border-solid border-white border-opacity-30 rounded-[35px]">
            {title}
          </div>
        )} */}
        {image && (
          <img src={image} alt="" className="max-w-full rounded-none aspect-[1.61] w-[118px]" />
        )}
        <p className="mt-2 text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

export default BettingStep;