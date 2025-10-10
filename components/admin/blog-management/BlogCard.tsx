import React from "react";

type BlogCardProps = {
  blog: {
    id: string;
    title: string;
    author: string;
    date: string;
    content: string;
  };
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg border hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{blog.title}</h3>
      <p className="text-sm text-gray-500">
        {blog.author} — {new Date(blog.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mt-2 line-clamp-3">{blog.content}</p>
      <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm">
        Edit
      </button>
    </div>
  );
}
