"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  User,
  PlusCircle,
  Droplets,
  Users,
  Shield,
  LogOut,
  HeartPulse,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const role = user?.role || "donor";

  const isActive = (href) =>
    pathname === href
      ? "bg-red-600 text-white"
      : "text-gray-700 hover:bg-red-50 hover:text-red-600";

  const handleLogout = async () => {
    await authClient.signOut();

    window.location.href = "/";
  };

  if (isPending) {
    return (
      <aside className="min-h-screen w-72 border-r bg-white p-6">
        Loading...
      </aside>
    );
  }

  return (
    <aside className="min-h-screen w-56 border-r bg-white shadow-sm">

      {/* Logo */}
      <div className="border-b p-6">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="rounded-full bg-red-600 p-2 text-white">
            <HeartPulse size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-red-600">
              BloodConnect
            </h2>

            <p className="text-xs text-gray-500">
              Dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* User */}
      <div className="border-b p-6">
        <h3 className="font-semibold">
          {user?.name}
        </h3>

        <p className="text-sm text-gray-500">
          {user?.email}
        </p>

        <span className="mt-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase text-red-600">
          {role}
        </span>
      </div>

      {/* Menu */}
      <nav className="space-y-2 p-4">

        {/* Dashboard */}
        <Link
          href={`/dashboard/${role}`}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 ${isActive(`/dashboard/${role}`)}`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {/* Profile */}
        <Link
          href="/dashboard/profile"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 ${isActive("/dashboard/donor/profile")}`}
        >
          <User size={20} />
          Profile
        </Link>

        {/* Donor */}
        {role === "donor" && (
          <>
            <Link
              href="/dashboard/create-request"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${isActive("/dashboard/create-request")}`}
            >
              <PlusCircle size={20} />
              Create Request
            </Link>

            <Link
              href="/dashboard/donor/my-donation-requests"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${isActive("/dashboard/donor/my-donation-requests")}`}
            >
              <Droplets size={20} />
              My Requests
            </Link>
          </>
        )}

        {/* Volunteer */}
        {role === "volunteer" && (
          <>
            <Link
              href="/dashboard/create-donation-request"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${isActive("/dashboard/create-donation-request")}`}
            >
              <PlusCircle size={20} />
              Create Request
            </Link>

            <Link
              href="/dashboard/my-donation-requests"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${isActive("/dashboard/my-donation-requests")}`}
            >
              <Droplets size={20} />
              Manage Requests
            </Link>
          </>
        )}

        {/* Admin */}
        {role === "admin" && (
          <>
            <Link
              href="/dashboard/admin/all-users"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${isActive("/dashboard/admin/all-users")}`}
            >
              <Users size={20} />
              All Users
            </Link>

            <Link
              href="/dashboard/admin/all-blood-donation-request"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${isActive("/dashboard/admin/all-blood-donation-request")}`}
            >
              <Droplets size={20} />
              All Requests
            </Link>

            <Link
              href="/dashboard/admin/content-management"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${isActive("/dashboard/admin/content-management")}`}
            >
              <Shield size={20} />
              Content
            </Link>
          </>
        )}

      </nav>

      {/* Logout */}
      <div className="mt-auto border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}