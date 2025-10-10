"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

interface Author {
  _id: string;
  username: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: Author;
  likes: string[];
  dislikes: string[];
  comments: { content: string }[];
  createdAt: string;
}

export default function AllPostsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All Blog Posts</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col bg-white"
            >
              {blog.image && (
                <div className="relative w-full h-52 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-3">
                By {blog.author?.username || "Unknown"} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>

              <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                {blog.content.slice(0, 100)}...
              </p>

           
              <div className="flex items-center gap-5 mb-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{blog.likes.length}</span>
                </div>

                <div className="flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">{blog.dislikes.length}</span>
                </div>

                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{blog.comments.length}</span>
                </div>
              </div>

              
              <Link
                href={`/all-post/${blog._id}`}
                className="mt-auto text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
