"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;

  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch blog");
        }
        const data: Blog = await res.json();
        setForm({ title: data.title, content: data.content, image: data.image || "" });
      } catch (err: unknown) {
        if (err instanceof Error) setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update blog");

      setMessage("Blog updated successfully!");
      router.push("/userdashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(err.message);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading blog...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Edit Blog</h2>
        {message && <p className="mb-4 text-center text-red-500 font-semibold">{message}</p>}
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
            required
          />
          <textarea
            name="content"
            placeholder="Blog Content"
            value={form.content}
            onChange={handleChange}
            rows={5}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-base font-medium transition duration-200"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}
