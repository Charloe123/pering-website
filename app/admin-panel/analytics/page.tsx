"use client";

import React, { useEffect, useState } from "react";
import ChartCard from "@/components/admin/analytics/ChartCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Blog {
  _id: string;
  title: string;
  content: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function AnalyticsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, usersRes] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/users"), 
        ]);

        if (!blogsRes.ok) throw new Error("Failed to fetch blogs");
        if (!usersRes.ok) throw new Error("Failed to fetch users");

        const blogsData: Blog[] = await blogsRes.json();
        const usersDataJson: { users: User[] } | User[] = await usersRes.json();

        setBlogs(blogsData);

       
        if (Array.isArray(usersDataJson)) setUsers(usersDataJson);
        else setUsers(usersDataJson.users);

      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
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
    { title: "Total Blogs", value: blogs.length, description: "Published blogs" },
    { title: "Daily Visits", value: 540, description: "Visits today" },
  ];

  
  const pieData = [
    { name: "Blogs", value: blogs.length },
    { name: "Users", value: users.length },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="p-6 space-y-6">
      <button className="text-xl font-semibold px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Analytics Overview
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {analyticsData.map((metric, idx) => (
          <ChartCard
            key={idx}
            title={metric.title}
            value={metric.value}
            description={metric.description}
          />
        ))}
      </div>

      <div className="mt-6 bg-[#FFFDFA] p-4 border rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Blogs vs Users</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
