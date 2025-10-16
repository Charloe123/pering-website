"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Popular() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="w-[100%]">
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type something..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
        >
          Search
        </button>
      </form>
      <hr className="mt-8" />
      <div className="mt-12">
        <h4 className="text-[28px]">Popular Posts</h4>
      </div>
      <Image
        src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1757318301/WiTpEdcY8ihHOeZ09AJSMJ0csY_1_midjyo.jpg"
        alt="Technology"
        width={500}
        height={390}
        className="object-cover  shadow-md mt-4"
      />
      <div className="flex items-center mt-5">
        <div className="bg-[#ffbd3a4b] px-4 ">
          <Link href="/technology" className="hover:underline text-[12px]">
            BUSINESS
          </Link>
        </div>
        <div className="flex-1 h-px bg-black ml-1"></div>
        <p className="text-[12px]">SEP 12, 2023</p>
        <hr className="w-4" />
      </div>
      <h1 className="text-[20px] font-semibold mt-4">The Importance of Corporate Social Responsibility</h1>

      <p>
        The real test is not whether you avoid this failure, because you won’t.
        It’s whether you let it harden{" "}
      </p>

      <div className="flex items-center justify-between mt-3">
        <div className="h-px flex-1 bg-black mr-2"></div>
        <Link href={`/`}>
          <button className="border border-black hover:bg-black hover:text-white px-3 py-1 text-[12px]">
            READ MORE
          </button>
        </Link>
      </div>
      <div className="flex items-center mt-5">
        <div className="bg-[#ffbd3a4b] px-4 ">
          <Link href="/technology" className="hover:underline text-[12px]">
            FASHION
          </Link>
        </div>
        <div className="flex-1 h-px bg-black ml-1"></div>
        <p className="text-[12px]">SEP 12, 2023</p>
        <hr className="w-4" />
      </div>

      <h3 className="text-[20px] font-semibold mt-4">
        The Rise of Fashion Blogging: The Role of Influencers in the Industry
      </h3>
      <div className="flex items-center mt-5">
        <div className="bg-[#ffbd3a4b] px-4 ">
          <Link href="/technology" className="hover:underline text-[12px]">
            BUSINESS
          </Link>
        </div>
        <div className="flex-1 h-px bg-black ml-1"></div>
        <p className="text-[12px]">SEP 12, 2023</p>
        <hr className="w-4" />
      </div>

      <h4 className="text-[20px] font-semibold mt-4">The Benefits of Professional Development Programs</h4>

      <div className="flex items-center mt-5">
        <div className="bg-[#ffbd3a4b] px-4 ">
          <Link href="/technology" className="hover:underline text-[12px]">
            ECONOMY
          </Link>
        </div>
        <div className="flex-1 h-px bg-black ml-1"></div>
        <p className="text-[12px]">SEP 12, 2023</p>
        <hr className="w-4" />
      </div>
      <h5 className="text-[20px] font-semibold mt-4">Leveraging Social Media to Build Relationships and Drive Sales</h5>
      <div className="flex-1 h-px bg-black ml-1 mt-12"></div>

      <div>
        <h3 className="text-[22px] font-semibold mt-4">Explore Topics</h3>
      </div>

      <div className="flex gap-4 mt-16">
      <Image
        src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1760357788/NZlETPCYmMveeIq3JHMUobXLOQ_h1djgf.webp"
        alt="Technology"
        width={40}
        height={50}
        className="object-cover  h-[50px] w-[50px]"
      /> 
      <p className="text-[22px]">Fashion</p>
      </div>
      <div className="flex-1 h-px bg-black ml-1 mt-3"></div>

      <div className="flex gap-4 mt-5">
      <Image
        src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1760357694/xjGhwgytVh7tga5H0ACXVonldrM_1_d8po18.webp"
        alt="Technology"
        width={40}
        height={50}
        className="object-cover  h-[50px] w-[50px]"
      /> 
      <p className="text-[22px]">Economy</p>
      </div>
      <div className="flex-1 h-px bg-black ml-1 mt-3"></div>


      <div className="flex gap-4 mt-5">
      <Image
        src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1760357871/code_itim6i.webp"
        alt="Technology"
        width={40}
        height={50}
        className="object-cover  h-[50px] w-[50px]"
      /> 
      <p className="text-[22px]">Technology</p>
      </div>
      <div className="flex-1 h-px bg-black ml-1 mt-3"></div>

      <div className="flex gap-4 mt-5">
      <Image
        src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1760357695/J9Xbvek1eVhPa8MKhPTvxhJ0c_yfbngx.webp"
        alt="Technology"
        width={40}
        height={50}
        className="object-cover h-[50px] w-[50px]"
      /> 
      <p className="text-[22px]">Business</p>
      </div>
      <div className="flex-1 h-px bg-black ml-1 mt-3"></div>
    </div>
  );
}
