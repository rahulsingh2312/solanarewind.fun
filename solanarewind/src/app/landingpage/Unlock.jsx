import React from 'react';
import Slider from 'react-slick';
import Card from './Card';
import SmallCard from './SmallCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Unlock = () => {
  const cards = [
    {
      title: "Highest Odds",
      description: "Purebet combines the highest odds among blockchain-based sports betting applications, ensuring maximum returns for bettors.",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f67c2049d46b430453636e3cf71c00c537a09080ae16cb2df67ff6b8ae08134f?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853",
      className: "flex-grow"
    },
    {
      title: "YOU ARE IN CONTROL",
      description: "By utilizing blockchain technology, you are always the owner of your funds. There is no need to deposit or to request withdrawals. Winnings are sent directly to your wallet.",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/1b24eddd5a44a8d63a7cafc1c4356bcd21c81ff647a6fc5201705c041d0f5065?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853",
      className: "bg-gray-950 flex-grow"
    }
  ];

  const smallCards = [
    {
      title: "Winners Welcome",
      description: "Purebet is designed to be resilient to profitable bettors, ensuring fair play and continuous access to our services. Winning bettors are always welcome.",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d35b02ffd428f6d2335bdf26feca632ec6698d6b6af2f3dac57645649d4814b1?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853"
    },
    {
      title: "Deep Liquidity",
      description: "Through our cross-chain liquidity aggregation, Purebet ensures user get the optimal betting experiences, no matter their size.",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7816ec150e7930314ca80328892b8cab3985cb1c257dbd40f76125748218e946?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,  // Disable arrows
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <main className="flex md:pl-20 pl-10 mt-20 flex-col">
      <header className="w-full   md:text-4xl  text-[28px] font-thin text-white max-md:max-w-full">
        Unlock the Power <br/><div> of Betting with
        <span className="font-semibold ml-2">PUREBET</span></div>
      </header>
      <div className="hidden md:block">
        <div
        className='unlockgrd'
        >
          </div>
        <section className="mt-11 w-full max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex  w-[43%]  min-h-[100%] flex-grow max-md:w-full">
              <Card {...cards[0]} />
            </div>
            <div className="flex flex-col ml-5 w-[57%] md:pr-20 pr-10 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-8 max-md:max-w-full">
                <Card {...cards[1]} />
                <div className="mt-8 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    {smallCards.map((card, index) => (
                      <div key={index} className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                        <SmallCard {...card} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="block md:hidden">
        <Slider {...settings}>
          {[...cards, ...smallCards].map((card, index) => (
            <div key={index} className="py-10 pl-2 pr-10">
             <SmallCard {...card} />
            </div>
          ))}
        </Slider>
      </div>
    </main>
  );
};

export default Unlock;
