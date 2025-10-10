"use client";

import React, { useState } from "react";

type SettingItemType = {
  id: string;
  label: string;
  value: string;
};

const initialSettings: SettingItemType[] = [
  { id: "1", label: "Site Title", value: "Pering Website" },
  { id: "2", label: "Admin Email", value: "admin@pering.com" },
  { id: "3", label: "Theme", value: "Light" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingItemType[]>(initialSettings);

  const handleChange = (id: string, value: string) => {
    setSettings(settings.map(s => s.id === id ? { ...s, value } : s));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        {settings.map(setting => (
          <div key={setting.id} className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-40 font-semibold">{setting.label}</label>
            <input
              type="text"
              value={setting.value}
              onChange={(e) => handleChange(setting.id, e.target.value)}
              className="border p-2 rounded w-full md:w-1/2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
