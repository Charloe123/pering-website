"use client";

import React from "react";
import StatsCard from "./StatsCard";

export default function DashboardPage() {
  const stats = [
    { title: "Total Users", value: 245 },
    { title: "Total Blogs", value: 56 },
    { title: "Active Sessions", value: 32 },
    { title: "Revenue", value: "$1,240" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} title={s.title} value={s.value} />
        ))}
      </div>
    </div>
  );
}
