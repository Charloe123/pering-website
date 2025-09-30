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

interface Motivation {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
}

export default function MotivationSection() {
  const [motivations, setMotivations] = useState<Motivation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotivations = async () => {
      try {
        const res = await fetch("/api/motivation", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch motivations");
        const data = await res.json();
        setMotivations(Array.isArray(data) ? data : data.motivations || []);
      } catch (err) {
        console.error(err);
        setMotivations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMotivations();
  }, []);

  if (loading) return <p className="px-4 sm:px-14">Loading...</p>;
  if (!motivations.length)
    return <p className="px-4 sm:px-14">No motivations available.</p>;

  const items = motivations.slice(0, 4);

  return (
    <div className="px-4 sm:px-14 mt-16 w-full md:h-[100vh] h-[120vh]">
      <h2 className="text-4xl sm:text-5xl mb-8">Motivation</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-16">
        {items.map((motivation) => (
          <div
            key={motivation._id}
            className="flex flex-col sm:flex-row gap-4 items-start cursor-pointer w-full"
          >
           
            <Link
              href={`/motivation/${motivation._id}`}
              className="flex flex-col w-full sm:w-[200px]"
            >
              <div className="relative w-full md:w-[200px] h-[200px] sm:h-[200px] overflow-hidden">
                <Image
                  src={motivation.imageUrl}
                  alt={motivation.title || "Motivation"}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="flex items-center mt-2">
                <div className="flex-1 h-px bg-black mr-2"></div>
                <button className="border border-black hover:bg-black hover:text-white px-3 py-1 text-[12px]">
                  LISTEN
                </button>
              </div>
            </Link>

           
            <div className="flex flex-col w-full">
              <div className="flex mt-2 items-center w-full flex-wrap">
                <div className="flex gap-3 flex-wrap items-center">
                  <span className="hover:underline text-[14px] bg-[#ffbd3a4b] px-4 cursor-pointer">
                    motivation
                  </span>
                  <div className="h-px w-40 mt-2 bg-black"></div>
                  <ClientDate date={motivation.date} />
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-[outfit] text-[18px] font-semibold line-clamp-1 hover:underline">
                  {motivation.title || "Untitled"}
                </h3>
                <p className="text-gray-600 text-xs"></p>
                <p className="text-[16px] mt-1 text-gray-700 text-sm line-clamp-2 hover:underline">
                  {motivation.description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
