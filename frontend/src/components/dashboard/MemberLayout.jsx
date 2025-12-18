import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";

export default function MemberLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <div className="p-6">
          <h1 className="text-2xl font-semibold">
            Welcome to Life Spark Dashboard 🚀
          </h1>
          <p className="text-slate-400 mt-2">
            Select any option from the sidebar.
          </p>
        </div>
      </DashboardSidebar>

      <div className="fixed top-3 right-4 z-50 flex gap-2">
        <button
          onClick={() => setSidebarOpen(true)}
          className="px-3 py-1 rounded bg-slate-800"
        >
          Menu
        </button>

        <button
          onClick={onLogout}
          className="px-3 py-1 rounded bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
