"use client";

import React, { useEffect, useState } from "react";
import DataTable, { Column } from "@/components/admin/DataTable"; // ✅ make sure you export Column type

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function MembersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const columns: Column<UserType>[] = [
    { key: "_id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Joined" },
  ];

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Members</h1>

      <DataTable<UserType>
        columns={columns}
        data={users}
        actions={(user) => (
          <button
            className="bg-red-600 text-white px-2 py-1 rounded text-sm"
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
        )}
      />
    </div>
  );
}
