"use client";

import Link from "next/link";
import {
  Activity,
  DollarSign,
  Droplets,
  FileText,
  HeartHandshake,
  Users,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function VolunteerDashboardPage() {

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [stats, setStats] = useState({
    totalRequests: 0,
    totalDonors: 0,
    totalFunding: 0,
  });

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/dashboard-stats`);
      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchStats();
}, []);


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
              Welcome, {user?.name}!
            </h1>

            <p className="mt-2 text-red-100">
              Thank you for supporting BloodConnect. Manage donation
              requests, donors and funding from your dashboard.
            </p>
          </div>
        </div>
      </div>

     <div className="grid gap-6 md:grid-cols-3">
  <div className="rounded-2xl bg-white p-6 shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">Total Requests</p>
        <h2 className="mt-2 text-3xl font-bold">
          {stats.totalRequests}
        </h2>
      </div>

      <div className="rounded-xl bg-red-100 p-4">
        <Droplets className="text-red-600" size={30} />
      </div>
    </div>
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">Total Donors</p>
        <h2 className="mt-2 text-3xl font-bold">
          {stats.totalDonors}
        </h2>
      </div>

      <div className="rounded-xl bg-blue-100 p-4">
        <Users className="text-blue-600" size={30} />
      </div>
    </div>
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">Total Funding</p>
        <h2 className="mt-2 text-3xl font-bold">
          ${stats.totalFunding}
        </h2>
      </div>

      <div className="rounded-xl bg-green-100 p-4">
        <DollarSign className="text-green-600" size={30} />
      </div>
    </div>
  </div>
</div>
    </div>
  );
}