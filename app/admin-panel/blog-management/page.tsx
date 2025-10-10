"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author?: {
    username?: string;
  };
  createdAt?: string;
}

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred while fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err: unknown) {
      alert("Error deleting blog");
      console.error(err);
    }
  };

 
  const handleSaveEdit = async () => {
    if (!editingBlog) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/blogs/${editingBlog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingBlog.title,
          content: editingBlog.content,
          image: editingBlog.image,
        }),
      });

      if (!res.ok) throw new Error("Failed to update blog");

      await fetchBlogs();
      setEditingBlog(null);
    } catch (err: unknown) {
      alert("Error updating blog");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading blogs...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Blog Management</h2>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
          >
            {blog.image ? (
              <div className="relative w-full h-48">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.content}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Author:</strong> {blog.author?.username || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Date:</strong>{" "}
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setEditingBlog(blog)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <p className="text-gray-500 mt-4">No blogs available.</p>
      )}

     
      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Blog</h3>

            <input
              type="text"
              value={editingBlog.title}
              onChange={(e) =>
                setEditingBlog({ ...editingBlog, title: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Title"
            />
            <textarea
              value={editingBlog.content}
              onChange={(e) =>
                setEditingBlog({ ...editingBlog, content: e.target.value })
              }
              className="w-full border p-2 rounded mb-3 h-32"
              placeholder="Content"
            />
            <input
              type="text"
              value={editingBlog.image || ""}
              onChange={(e) =>
                setEditingBlog({ ...editingBlog, image: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Image URL"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingBlog(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
