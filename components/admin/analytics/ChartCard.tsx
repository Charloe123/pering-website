"use client";

import React from "react";

type ChartCardProps = {
  title: string;
  value: number | string;
  description?: string;
  children?: React.ReactNode; // Optional chart or graph
};

export default function ChartCard({
  title,
  value,
  description,
  children,
}: ChartCardProps) {
  return (
    <div className="bg-white p-4 border rounded shadow-sm hover:shadow-md transition-all duration-200">
      {/* Title */}
      <h3 className="text-lg font-semibold">{title}</h3>

      {/* Value */}
      <p className="text-2xl font-bold mt-2">{value}</p>

      {/* Optional description */}
      {description && <p className="text-gray-500 text-sm">{description}</p>}

      {/* Optional chart */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
