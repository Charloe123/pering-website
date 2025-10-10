"use client";

import React, { useEffect, useState } from "react";
import ChartCard from "./ChartCard";

interface Post {
  _id: string;
  title: string;
  description: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function AnalyticsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/users"), // make sure this route exists
        ]);

        if (!postsRes.ok || !usersRes.ok)
          throw new Error("Failed to fetch posts or users");

        const postsData = await postsRes.json();
        const usersData = await usersRes.json();

        setPosts(postsData);
        setUsers(usersData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading analytics...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  const analyticsData = [
    { title: "Total Users", value: users.length, description: "Registered users" },
    { title: "Total Blogs", value: posts.length, description: "Published blogs" },
    { title: "Daily Visits", value: 540, description: "Visits today" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2>
  <button
    type="button"
    className="text-xl font-semibold focus:outline-none hover:underline"
    onClick={() => {
      // Add your click behavior here
      console.log("Analytics Overview clicked");
    }}
  >
    Analytics Overview
  </button>
</h2>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsData.map((metric, idx) => (
          <ChartCard
            key={idx}
            title={metric.title}
            value={metric.value}
            description={metric.description}
          />
        ))}
      </div>
    </div>
  );
}
