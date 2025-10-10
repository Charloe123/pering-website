"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, Users, FileText, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin-panel/dashboard", icon: Home },
    { name: "Analytics", href: "/admin-panel/dashboard/analytics", icon: BarChart2 },
    { name: "Members", href: "/admin-panel/dashboard/members", icon: Users },
    { name: "Blog", href: "/admin-panel/dashboard/blog-management", icon: FileText },
    { name: "Settings", href: "/admin-panel/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5 flex flex-col space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-green-600 text-white" : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
