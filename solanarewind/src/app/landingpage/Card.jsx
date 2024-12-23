import React from 'react';

const Card = ({ title, description, imageSrc, className }) => (
  <div className={`flex flex-col grow justify-center rounded-2xl overflow-hidden ${className}`}>
    <div className="flex relative flex-col pb-12 w-full min-h-[340px] h-full">
      <img loading="lazy" src={imageSrc} alt="" className="object-cover absolute inset-0 w-full h-full" />
      <div className="relative flex flex-col pl-7 mt-60 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="text-4xl font-bold uppercase max-md:max-w-full text-white">{title}</h2>
        <p className="mt-6 text-2xl text-stone-500 max-md:max-w-full">{description}</p>
      </div>
    </div>
  </div>
);

export default Card;
