"use client";

import React, { useState } from "react";
import BlogCard from "./BlogCard";
import NewBlogForm from "./NewBlogForm";

export interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Welcome to Our Blog",
      author: "Admin",
      date: "2025-10-06",
      content: "Sample post...",
    },
    {
      id: "2",
      title: "Next.js Tips",
      author: "Charlotte",
      date: "2025-09-20",
      content: "Learn about SSR...",
    },
  ]);

  const handleAddBlog = (newBlog: Blog) => {
    setBlogs((prev) => [...prev, newBlog]);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        📝 Blog Management
      </h2>

      <NewBlogForm onAdd={handleAddBlog} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
