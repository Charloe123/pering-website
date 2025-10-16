"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Popular from "@/components/Popular";

interface Tech {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  date?: string;
}

export default function TechPage() {
  const [techs, setTechs] = useState<Tech[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const res = await fetch("/api/tech", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch techs");
        const data = await res.json();
        setTechs(Array.isArray(data) ? data : data.techs || []);
      } catch (err) {
        console.error(err);
        setTechs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTechs();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFA] md:px-15 py-10">
      
      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm text-gray-700 hover:underline">
          HOME / Technology
        </Link>
        <div className="h-px flex-1 bg-black"></div>
      </div>

      
      <div className="flex flex-col md:flex-row justify-between items-start mt-10">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Technology
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            Modern technology has become a total phenomenon for civilization, the defining force of a new social order in which efficiency is no longer an option but a necessity imposed on all human activity.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <Image
            src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1760357871/code_itim6i.webp"
            alt="Technology"
            width={260}
            height={390}
            className="object-cover shadow-md"
          />
        </div>
      </div>

      <div className="h-px bg-black my-10"></div>

     
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        
        <div>
          {loading ? (
            <p className="text-gray-600">Loading technology articles...</p>
          ) : techs.length === 0 ? (
            <p className="text-gray-600">No technology articles found.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {techs.map((tech) => (
                <div
                  key={tech._id}
                  className="flex flex-col sm:flex-row overflow-hidden duration-300 min-h-[220px]"
                >
                  
                  <div className="flex-1 flex flex-col sm:w-3/4 justify-start">
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-2">
                      <div className="bg-[#ffbd3a4b] px-4 py-[1px]">
                        <Link href="/technology" className="hover:underline text-[12px]">
                          UNCATEGORY
                        </Link>
                      </div>
                      <div className="h-px bg-black flex-1"></div>
                      {tech.date && (
                        <p className="text-[12px] text-gray-500 whitespace-nowrap">
                          {new Date(tech.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <h2 className="text-[22px] font-semibold text-gray leading-tight">
                      {tech.title}
                    </h2>
                    <p className="text-[16px] text-gray-700 leading-snug">
                      {tech.description}
                    </p>

                    <div className="flex items-center justify-between mt-8">
                      <div className="h-px flex-1 bg-black"></div>
                      <Link href={`/`}>
                        <button className="border border-black hover:bg-black hover:text-white px-3 py-1 text-[12px]">
                          READ MORE
                        </button>
                      </Link>
                    </div>
                  </div>

                  {tech.imageUrl && (
                    <div className="relative mt-4 sm:mt-0 sm:ml-4 w-full sm:w-[250px] h-[200px]">
                      <Image
                        src={tech.imageUrl}
                        alt={tech.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <Link
              href="/latest"
              className="px-4 py-2 border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition-colors duration-300"
            >
              VIEW ALL POSTS
            </Link>
          </div>
        </div>

        
        <div className="sticky top-10 mt-10 lg:mt-0">
          <Popular />
        </div>
      </div>
    </div>
  );
}
