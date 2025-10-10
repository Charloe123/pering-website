"use client";

import React from "react";


export interface Column<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: (item: T) => React.ReactNode;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  actions,
}: DataTableProps<T>) {
  return (
    <table className="min-w-full bg-white border rounded overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className="text-left p-2 border-b">
              {col.label}
            </th>
          ))}
          {actions && <th className="p-2 border-b">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {columns.map((col) => (
              <td key={String(col.key)} className="p-2 border-b">
                {String(row[col.key])}
              </td>
            ))}
            {actions && <td className="p-2 border-b">{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
