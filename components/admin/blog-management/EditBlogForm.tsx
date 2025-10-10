"use client";

import React, { useState, useEffect } from "react";
export type Blog = {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
};

type EditBlogFormProps = {
  blog: Blog;  
  onUpdate: (updatedBlog: Blog) => void;
  onCancel?: () => void; 
};

export default function EditBlogForm({ blog, onUpdate, onCancel }: EditBlogFormProps) {
  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [content, setContent] = useState(blog.content);

  useEffect(() => {
    setTitle(blog.title);
    setAuthor(blog.author);
    setContent(blog.content);
  }, [blog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBlog: Blog = {
      ...blog,
      title,
      author,
      content,
      date: new Date().toISOString(),
    };

    onUpdate(updatedBlog);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 border rounded shadow-sm space-y-3"
    >
      <h3 className="text-lg font-semibold">Edit Blog</h3>

      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={5}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Update Blog
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
