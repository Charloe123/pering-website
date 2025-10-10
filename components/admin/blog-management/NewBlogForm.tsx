"use client";

import React, { useState } from "react";
import { Blog } from "./BlogList"; // or re-declare Blog type here if needed

interface NewBlogFormProps {
  onAdd: (newBlog: Blog) => void;
}

export default function NewBlogForm({ onAdd }: NewBlogFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog: Blog = {
      id: Date.now().toString(),
      title,
      author,
      date: new Date().toISOString().split("T")[0],
      content,
    };
    onAdd(newBlog);
    setTitle("");
    setAuthor("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded-lg shadow-md space-y-3"
    >
      <input
        type="text"
        placeholder="Blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Author name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Blog content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
      >
        ➕ Add Blog
      </button>
    </form>
  );
}
