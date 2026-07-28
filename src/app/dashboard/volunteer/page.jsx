"use client";

import Link from "next/link";
import {
  Activity,
  Droplets,
  FileText,
  HeartHandshake,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function VolunteerDashboardPage() {

     const { data: session } = authClient.useSession();
     const user = session?.user;


  const cards = [
    {
      title: "Blood Requests",
      description: "Manage all blood donation requests.",
      icon: Droplets,
      href: "/dashboard/volunteer/all-blood-donation-request",
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Content Management",
      description: "Manage blogs and published content.",
      icon: FileText,
      href: "/dashboard/volunteer/content-management",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Funding",
      description: "View funding history and donations.",
      icon: HeartHandshake,
      href: "/dashboard/volunteer/funding",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <Activity size={36} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {user?.name} 👋
            </h1>

            <p className="mt-2 text-red-100">
              Thank you for supporting BloodConnect. Manage donation
              requests, blogs and funding from your dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color}`}
              >
                <Icon size={28} />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                {card.title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {card.description}
              </p>

              <div className="mt-6 text-sm font-semibold text-red-600">
                Open →
              </div>
            </Link>
          );
        })}
      </div>

      {/* Information */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">
          Volunteer Responsibilities
        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
          <li>Manage blood donation requests.</li>
          <li>Create, edit and publish blogs.</li>
          <li>View funding information.</li>
          <li>Help keep donation information up to date.</li>
        </ul>
      </div>
    </div>
  );
}