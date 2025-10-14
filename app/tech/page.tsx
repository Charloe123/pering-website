"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Tech {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  date?: string;
}

export default function Tech() {
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
    <div className="min-h-screen w-full bg-[#FFFDFA] px-4 sm:px-18 pt-9">
      <div className="flex gap-4">
        <Link href="/">HOME/Technology</Link>
        <div className="h-px flex-1 bg-black mr-2 mt-3"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <h1 className="font-semibold text-2xl md:text-4xl mt-14">Technology</h1>
          <p className="mt-6">
            Modern technology has become a total phenomenon for civilization, the
            defining force of a new social order in which efficiency is no longer
            an option but a necessity imposed on all human activity.
          </p>
        </div>
        <Image
          src="https://res.cloudinary.com/dpahyb1x9/image/upload/v1760357871/code_itim6i.webp"
          alt="hello"
          width={200}
          height={400}
          className="object-cover h-[200px] mt-14 w-full md:w-auto"
        />
      </div>
      <div className="h-px flex-1 bg-black mr-2 mt-8"></div>

      {loading ? (
        <p className="mt-8">Loading tech articles...</p>
      ) : techs.length === 0 ? (
        <p className="mt-8">No tech articles available.</p>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          {techs.map((tech) => (
            <div key={tech._id} className=" p-4  flex flex-col sm:flex-row gap-4 w-full sm:w-2/3">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{tech.title}</h2>
                <p className="text-gray-600 mb-4">{tech.description}</p>
                {tech.date && (
                  <p className="text-sm text-gray-500">
                    {new Date(tech.date).toLocaleDateString()}
                  </p>
                )}
              </div>
              {tech.imageUrl && (
                <Image
                  src={tech.imageUrl}
                  alt={tech.title}
                  width={300}
                  height={300}
                  className="w-full sm:w-50 h-40 object-cover flex-shrink-0"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
