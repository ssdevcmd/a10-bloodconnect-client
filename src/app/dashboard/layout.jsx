"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-x-auto p-4 md:p-6">
          {children}
        </main>

      </div>
    </div>
  );
}