import React from 'react';

const SmallCard = ({ title, description, imageSrc }) => (
  <div className="flex flex-col grow justify-center w-full rounded-2xl bg-gray-950">
    <div className="flex relative flex-col px-4 pt-3.5 pb-6 w-full aspect-[0.76]">
      <img loading="lazy" src={imageSrc} alt="" className="object-cover absolute inset-0 size-full" />
      <h3 className="relative text-4xl font-bold uppercase text-white">{title}</h3>
      <p className="relative mt-36 text-xl text-zinc-500 max-md:mt-10">{description}</p>
    </div>
  </div>
);

export default SmallCard;