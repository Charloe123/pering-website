"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Post {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export default function Cards() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post", {
        cache: "no-store",
      });
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : data.posts || []);
    };
    fetchPosts();
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!posts.length) return <p className="px-14">No posts available.</p>;

  return (
    <div className="px-14 relative ">
      <h2 className="text-5xl mb-8">Editors Pick</h2>

     
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800"
      >
        <FaChevronRight size={20} />
      </button>

     
      <div className="overflow-x-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {posts.map((post) => (
            <div key={post._id} className=" w-[380px]">
              <div className="flex flex-col gap-2">
                <div className="relative w-[355px] h-[200px] ">
                  <Link
                    href={`/posts/${post._id}`}
                    className="block w-[380px] h-full"
                  >
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </div>

                <div className="flex mt-2 items-center gap-2">
                  <a
                    href="/technology"
                    className="hover:underline text-[12px] bg-[#ffbd3a4b] px-2"
                  >
                    BUSINESS
                  </a>
                  <div className="h-px w-24 bg-black"></div>
                  <p className="text-[12px] ml-1">{post.date}</p>
                </div>

                <h1 className="hover:underline text-[18px] font-semibold">
                  {post.title}
                </h1>
                <p className="text-[16px] text-gray-600">{post.description}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="h-px flex-1 bg-black mr-2"></div>
                  <button className="border border-black hover:bg-black hover:text-white px-3 py-1 text-[12px]">
                    READ MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-[5vh] mt-10 border-b border-px w-[100%] "></div>
      </div>
    </div>
  );
}
