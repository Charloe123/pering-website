import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import StickyImage from "@/components/StickyImage";

interface Trending {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export const getData = async (): Promise<
  Trending[] | { trendings: Trending[] }
> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 

  const res = await fetch(`${baseUrl}/api/trending`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();
  return res.json();
};

export default async function SecondSection() {
  const data = await getData();
  const trendings: Trending[] = Array.isArray(data)
    ? data
    : data.trendings || [];

  return (
    <div className="px-16 mt-10 w-full">
      <h1 className="text-5xl">Trending</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
        <div className="sticky">
        <StickyImage />
        </div>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {trendings.map((trending) => (
            <div key={trending._id} className="mb-8">
              <div className="flex gap-2">
                <div className="h-px w-40 bg-black mt-2"></div>
                <p className="text-[12px]">{trending.date || "SEP 12, 2023"}</p>
              </div>
              <h3 className="mt-2 font-[outfit] text-[18px] font-semibold pl-2">
                {trending.title}
              </h3>
              <div className="relative w-[280px] h-[350px] mt-9">
                <Link
                  href={`/trending/${trending._id}`}
                  className="block w-full h-full"
                >
                  <Image
                    src={trending.imageUrl}
                    alt={trending.title}
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
