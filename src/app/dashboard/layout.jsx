"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex max-w-7xl">

        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}