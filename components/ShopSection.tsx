"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Shop {
  _id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export default function ShopSection() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const res = await fetch("/api/shop", {
        cache: "no-store",
      });
      const data = await res.json();
      setShops(Array.isArray(data) ? data : []);
    };
    fetchShops();
  }, []);

  if (!shops.length) return <p className="px-14">No shops available.</p>;

  return (
    <div className="px-14 pt-20 bg-[#FFFDFA]">
      <h2 className="text-5xl mb-8 font-semibold">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop._id} className="flex flex-col gap-2">
            <div className="relative w-[96%] h-[390px] overflow-hidden">
              <Image
                src={shop.imageUrl}
                alt={shop.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex mt-2 items-center gap-2">
        
             
            </div>
            <h1 className="hover:underline text-[26px] font-semibold text-center">
              {shop.title}
            </h1>
            <p className="text-[16px] text-gray-600 text-center">{shop.description}</p>
            <div className="flex items-center justify-center mt-3">
              
              <Link href={`/shop/${shop._id}`}>
                <button className="border border-black hover:bg-black hover:text-white px-3 py-1 text-[12px]">
                  BUY NOW
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
  
    </div>
  );
}