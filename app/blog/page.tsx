"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  likes: string[];
  dislikes: string[];
  comments: { author: string; content: string; createdAt: string }[];
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      {blogs.length === 0 ? (
        <p className="text-center">No blogs available.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/all-post/${blog._id}`} className="hover:text-blue-600">
                  {blog.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">
                By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-800 mb-4 line-clamp-3">
                {blog.content.substring(0, 200)}...
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{blog.likes.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" />
                  <span>{blog.dislikes.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{blog.comments.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}