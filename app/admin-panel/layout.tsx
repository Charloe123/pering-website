"use client";

import React from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const sidebarLinks = [
    { label: "Dashboard", href: "/admin-panel/dashboard" },
    { label: "Blog Management", href: "/admin-panel/blog-management" },
    { label: "Members", href: "/admin-panel/members" },
    { label: "Settings", href: "/admin-panel/settings" },
    { label: "Analytics", href: "/admin-panel/analytics" },
  ];

  return (
    <div className="flex min-h-screen bg-[#FFFDFA]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FFFDFA] border-r p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
