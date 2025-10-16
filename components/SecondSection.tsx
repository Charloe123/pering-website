import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
      <div className="px-16 mt-10 w-full h-[270vh] md:block hidden">
        <h1 className="text-5xl">Trending</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">

          <div className=" h-[650px] sticky top-10">
            <Link href={"/"}>
              <Image
                src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1757318317/lPLq5LYGPKma7GvuNLZnBfIvdow_1_icbjbh.jpg"
                alt="image"
                fill
                className="object-cover"
                priority
              />
            </Link>

            <div className="bg-white w-[510px] h-[220px] z-20 relative mt-[445px]">
              <div className="flex flex-col">
            <div className="flex items-center">
                      <div className="bg-[#ffbd3a4b] px-4 mt-10">
                        <Link
                          href="/technology"
                          className="hover:underline text-[12px]"
                        >
                          BUSINESS
                        </Link>
                      </div>
                      <div className="flex-1 h-px bg-black ml-1 mt-10"></div>
                      <p className="text-[12px] mt-10">SEP 12, 2023</p>
                      <hr className="w-4 mt-10" />
                      </div>
                      <h2 className="text-3xl font-semibold mt-7 ">The Benefits of Professional Development Programs</h2>
                   
                    </div>
            </div>
          </div>
  
         
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trendings.map((trending) => (
              <div key={trending._id} className="mb-8">
                <div className="flex gap-2">
                  <div className="h-px w-20 bg-black mt-2"></div>
                  <p className="text-[12px]">{trending.date || "SEP 12, 2023"}</p>
                </div>
                <h3 className="mt-2 font-[outfit] text-[16px] font-semibold pl-2">
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