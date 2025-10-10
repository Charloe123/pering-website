"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";

interface DailyInspiration {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export default function DailyInspiration() {
  const [dailyInspiration, setDailyInspiration] = useState<DailyInspiration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/daily");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: DailyInspiration[] = await res.json();
        setDailyInspiration(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="px-14 mt-16">Loading...</p>;
  if (!dailyInspiration.length)
    return <p className="px-14 mt-16">No daily inspirations available.</p>;

  const leftCards = dailyInspiration.slice(0, 2);
  const rightCard = dailyInspiration[2] ?? null;

  return (
    <section className="px-14 mt-16 w-full">
      <h2 className="text-5xl mb-12">Daily Inspiration</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="flex flex-col gap-6 lg:col-span-1">
          {leftCards.map((inspiration) => (
            <Link
              href={`/daily/${inspiration._id}`}
              key={inspiration._id}
              className="block duration-300"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={inspiration.imageUrl}
                  alt={inspiration.title ?? "Daily Inspiration"}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-2 text-xl font-semibold hover:underline">
                {inspiration.title}
              </h3>
              

              <div className="flex items-center justify-between mt-3">
              <Play className="w-6 h-6 text-black border-black border-2" />
                <div className="h-px flex-1 bg-black mr-2"></div>
                <button className="border border-black hover:bg-black hover:text-white px-3 py-1 text-[12px]">
                  LISTEN
                </button>
              </div>
            </Link>
          ))}
        </div>

       
        {rightCard && (
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 w-full">
            <Play className="w-6 h-6 text-black border-black border-2" />
             
              <a
                href="/technology"
                className="hover:underline text-[12px] bg-[#ffbd3a4b] px-2"
              >
                Lifestyle
              </a>
              <div className="h-px w-[620px] bg-black"></div>
              <p className="text-[12px] ml-1">
                {new Date(rightCard.date).toLocaleDateString()}
              </p>
            </div>

            <Link
              href={`/daily/${rightCard._id}`}
              className="block duration-300 mt-2"
            >
              <div className="relative w-full aspect-[8/5] overflow-hidden">
                <Image
                  src={rightCard.imageUrl}
                  alt={rightCard.title ?? "Daily Inspiration"}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-2xl font-bold hover:underline">
                {rightCard.title}
              </h3>
              <p className="text-gray-600 mt-2">
                {new Date(rightCard.date).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700 text-lg">
                {rightCard.description}
              </p>
            </Link>

            <div className="flex items-center justify-between mt-3">
              <Play className="w-6 h-6 text-black border-black border-2" />
                <div className="h-px flex-1 bg-black mr-2"></div>
                <button className="border border-black hover:bg-black hover:text-white px-3 py-1 text-[12px]">
                  LISTEN
                </button>
              </div>
          </div>
        )}
      </div>

      {/* HR line at the bottom */}
      <hr className="mt-12 border-t " />
    </section>
  );
}
