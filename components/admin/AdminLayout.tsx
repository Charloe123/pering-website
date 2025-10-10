"use client";

import React from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
