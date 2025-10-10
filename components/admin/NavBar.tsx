"use client";

import Link from "next/link";

export default function AdminNavbar() {
  return (
    <header className="w-full bg-white shadow-sm h-16 flex items-center justify-between px-8">
      <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>

      <nav className="flex gap-4">
        <Link href="/admin-panel/dashboard" className="text-gray-700 hover:text-black">
          Dashboard
        </Link>
        <Link href="/admin-panel/blog-management" className="text-gray-700 hover:text-black">
          Blogs
        </Link>
        <Link href="/admin-panel/members" className="text-gray-700 hover:text-black">
          Members
        </Link>
        <Link href="/admin-panel/settings" className="text-gray-700 hover:text-black">
          Settings
        </Link>
        <Link href="/admin-panel/analytics" className="text-gray-700 hover:text-black">
          Analytics
        </Link>
      </nav>
    </header>
  );
}
