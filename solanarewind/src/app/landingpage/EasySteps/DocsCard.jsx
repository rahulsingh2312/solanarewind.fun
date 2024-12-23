import React from 'react';
import Image from 'next/image';
function DocsCard() {
  return (


    <div  className="flex cursor-pointer flex-col w-[42%] md:mt-32  max-md:ml-0 max-md:w-full">
      <div className="flex relative flex-col pb-3.5 pl-3.5 md:mt-24 rounded-xl aspect-[0.9] max-md:mt-10">
        
        <img src={"/Nrds.png"} alt="" className="object-cover absolute inset-0 size-full" />
        
      
       
      </div>
    </div>


// <div className="flex flex-col w-[72%] max-md:ml-0 max-md:w-full">
//       <div className="flex relative flex-col pb-3.5 pl-3.5 mt-24 rounded-xl aspect-[0.9] max-md:mt-10">
//         <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb6ce65b08dcd49b5393906b45bc37bddf9dafa5998413409b252a843fd95c80?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853" alt="" className="object-cover absolute inset-0 size-full" />
//         <div className="flex relative">
//           <div className="z-10 grow self-end mt-5 text-base font-semibold text-zinc-600">DOCS</div>
//           <div className="flex flex-col grow shrink-0 items-start px-14 pb-8 rounded-full basis-0 w-fit">
//             <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9fcb904dbbd58f48ef70fbf3aafe12c6921c1f3970a30bd43bf5eb330dd3f77?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853" alt="" className="aspect-[1.14] w-[217px]" />
//           </div>
//         </div>
//         <h2 className="relative mt-12 text-xl font-medium text-white max-md:mt-10">Docs for the nerds!</h2>
//         <div className="flex relative gap-1.5 pr-9 mt-2 text-sm text-neutral-400 max-md:pr-5">
//           <div>Read Now</div>
//           <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/acaa94a4efa17dd4992575471551f920a3df03be4df912d5dc5c0c25d371f915?apiKey=d1ee9f6275604677bd2583ecebeab853&&apiKey=d1ee9f6275604677bd2583ecebeab853" alt="" className="shrink-0 my-auto w-3.5 aspect-square" />
//         </div>
//       </div>
//     </div>
//     <>
//          <div className="flex flex-col w-[72%] max-md:ml-0 max-md:w-full">
//          <div className="flex relative flex-col pb-3.5 pl-3.5 mt-24 rounded-xl aspect-[0.9] max-md:mt-10">

// <Image src={"/Nrds.png"} alt="nerds" width={100} height={100} />

// </div>
// </div>

//    </>
  );
}

export default DocsCard;