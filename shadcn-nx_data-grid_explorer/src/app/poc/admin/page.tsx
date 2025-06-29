"use client";

import MdlUserGrid from "./user-grid";

export default function AdminPage() {
  return (
    <div className="p-6 space-y-4">
      <div className="text-2xl font-semibold">User Management</div>
      <MdlUserGrid />
    </div>
  );
}
