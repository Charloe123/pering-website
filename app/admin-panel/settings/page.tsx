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
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4 max-w-md">
        {settings.map(setting => (
          <div key={setting.id} className="flex flex-col gap-2">
            <label className="font-semibold text-sm sm:text-base">{setting.label}</label>
            <input
              type="text"
              value={setting.value}
              onChange={(e) => handleChange(setting.id, e.target.value)}
              className="border p-2 rounded w-full text-sm sm:text-base"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
