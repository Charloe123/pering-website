"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author?: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  const fetchBlogs = useCallback(async () => {
    if (!token || !userId) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/blogs?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      setBlogs(data);
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    if (!token || !userId) {
      setMessage("You must be logged in to view your blogs.");
      setLoading(false);
      return;
    }
    fetchBlogs();
  }, [token, userId, fetchBlogs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadImageToCloudinary = async (): Promise<string | null> => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD!}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!form.title || !form.content) {
      setMessage("Title and content are required!");
      setLoading(false);
      return;
    }

    try {
      let finalImageUrl: string | null = null;
      if (imageFile) finalImageUrl = await uploadImageToCloudinary();

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, image: finalImageUrl, authorId: userId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create blog");

      setMessage("Blog created successfully!");
      setForm({ title: "", content: "" });
      setImageFile(null);
      fetchBlogs();
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete blog");
      setMessage("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/userdashboard/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFDFA] flex flex-col">
      <header className="bg-white border-b-4 border-[#FFBD3A] p-4 flex flex-col sm:flex-row justify-between items-center shadow-sm gap-2 sm:gap-0">
        <h1 className="text-xl font-bold text-[#111111]">My Blog Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
          className="bg-[#0000EE] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        <aside className="w-full lg:w-1/4 bg-white border-r border-[#FFBD3A]/50 p-4 sm:p-6 shadow-md">
          <h2 className="text-lg font-bold text-[#111111] mb-4 text-center">Create New Blog</h2>
          {message && <p className="mb-4 text-center text-[#0000EE] font-medium">{message}</p>}
          <form onSubmit={handleCreate} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-[#333333]/30 rounded-lg focus:ring-2 focus:ring-[#0000EE]"
              required
            />
            <textarea
              name="content"
              placeholder="Blog Content"
              value={form.content}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-[#333333]/30 rounded-lg focus:ring-2 focus:ring-[#0000EE]"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full p-3 border border-[#333333]/30 rounded-lg focus:ring-2 focus:ring-[#FFBD3A]"
            />
            <button
              type="submit"
              className="w-full bg-[#FFBD3A] hover:bg-[#e0a72d] text-[#111111] py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Posting..." : "Post Blog"}
            </button>
          </form>
        </aside>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-[#111111]">Your Blogs</h2>
          {loading ? (
            <p className="text-center text-[#444444]">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center text-[#444444]">No blogs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white border border-[#FFBD3A]/30 rounded-xl shadow hover:shadow-lg transition flex flex-col"
                >
                  {blog.image && (
                    <div className="relative w-full h-40 sm:h-48 rounded-t-xl overflow-hidden">
                      <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-[#111111] mb-2">{blog.title}</h3>
                    <p className="text-[#333333] line-clamp-3 mb-3 flex-1">{blog.content}</p>
                    <p className="text-sm text-[#444444] mb-3">
                      Author: {blog.author?.username || "Unknown"}
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleEdit(blog._id)}
                        className="flex-1 bg-[#0000EE] hover:bg-blue-700 text-white py-1 rounded-lg transition font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex-1 bg-[#FFBD3A] hover:bg-[#e0a72d] text-[#111111] py-1 rounded-lg transition font-medium"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-[#444444]">
                      Posted on {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
