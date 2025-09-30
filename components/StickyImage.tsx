'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function StickyImage() {
  return (
    <div className=" w-full md:w-[560px] h-[650px] mt-16 sticky top-10 ">
     
      <Link href={"/"}>
        <Image
          src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1757318317/lPLq5LYGPKma7GvuNLZnBfIvdow_1_icbjbh.jpg"
          alt="image"
          fill
          className="object-cover  sticky"
          priority
        />
      </Link>

      <div className="absolute bottom-0 left-0 bg-white h-52 w-[90%] max-w-[500px] p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <a
            href="/technology"
            className="hover:underline text-[12px] bg-[#ffbd3a4b] px-2 py-1"
          >
            BUSINESS
          </a>
          <p className="text-[12px] ml-1">Sep 12, 2023</p>
        </div>
      </div>
    </div>
  );
}
