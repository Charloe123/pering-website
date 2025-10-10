"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ClientDateProps {
  date?: string;
}

function ClientDate({ date }: ClientDateProps) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (date) {
      setFormattedDate(new Date(date).toLocaleDateString());
    } else {
      setFormattedDate("Unknown Date");
    }
  }, [date]);

  return <span className="text-[12px]">{formattedDate}</span>;
}

interface Latest {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
}

export default function LatestSection() {
  const [latests, setLatests] = useState<Latest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatests = async () => {
      try {
        const res = await fetch("/api/latest", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch latests");
        const data = await res.json();
        setLatests(Array.isArray(data) ? data : data.latests || []);
      } catch (err) {
        console.error(err);
        setLatests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLatests();
  }, []);

  if (loading) return <p className="px-4 sm:px-14">Loading...</p>;
  if (!latests.length) return <p className="px-4 sm:px-14">No latests available.</p>;

  const items = latests.slice(0, 6);

  return (
    <section className="px-4 sm:px-14 mt-16 w-full">
      <h2 className="text-4xl sm:text-5xl mb-8">Latest</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
        {items.map((latest) => (
          <div
            key={latest._id}
            className="flex flex-col sm:flex-row gap-4 items-start cursor-pointer w-full"
          >
            {/* Text Section */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center w-full flex-wrap gap-3">
                <span className="hover:underline text-[14px] bg-[#ffbd3a4b] px-3 cursor-pointer">
                  BUSSINESS
                </span>
                <div className="h-px flex-1 bg-black"></div>
                <ClientDate date={latest.date} />
              </div>

              <Link href={`/motivation/${latest._id}`} className="mt-2 block">
                <h3 className="font-[outfit] text-[22px] font-semibold hover:underline">
                  {latest.title || "Untitled"}
                </h3>
                <p className="text-[16px] mt-4 text-gray-700 hover:underline">
                  {latest.description || "No description available."}
                </p>
              </Link>

              <div className="flex items-center mt-3">
                <div className="flex-1 h-px bg-black mr-2"></div>
                <button className="border border-black hover:bg-black hover:text-white px-3 py-1 text-[12px]">
                  READ MORE
                </button>
              </div>
            </div>

            {/* Image Section */}
            <Link href={`/motivation/${latest._id}`} className="w-full sm:w-[200px] sm:h-[200px] relative">
              <div className="relative w-full h-[200px] sm:w-[200px] sm:h-[200px] flex-shrink-0 overflow-hidden">
                <Image
                  src={latest.imageUrl}
                  alt={latest.title || "Latest"}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button className="flex justify-center w-full">
        <Link
          href="/latest"
          className="mt-12 px-4 py-1 border border-black hover:bg-black hover:text-white text-[16px]"
        >
          VIEW MORE
        </Link>
      </button>
    </section>
  );
}
