"use client";

import React from "react";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

interface SecondProps {
  post: Post;
}

export default function Second({ post }: SecondProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="relative w-full h-80 mb-6 rounded-xl overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        {new Date(post.date).toLocaleDateString()}
      </p>

      <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line mb-8">
        {post.description}
      </p>
    </div>
  );
}