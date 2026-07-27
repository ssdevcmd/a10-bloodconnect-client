"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DonorDashboardPage() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `${API_URL}/donation-requests?email=${user.email}`
        );

        const data = await res.json();

        // Latest 3 requests
        setRequests(data.slice(0, 3));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div className="rounded-2xl p-8 shadow">

        <h1 className="text-3xl font-bold">
          Welcome, {user?.name}!
        </h1>

        <p className="mt-2">
          Thank you for being a blood donor. Your contribution saves lives.
        </p>

      </div>

      {/* Recent Requests */}

      {!loading && requests.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Recent Donation Requests
            </h2>

            <Link href="/dashboard/donor/my-donation-requests">
              <Button className="bg-red-600 text-white">
                View My All Requests
              </Button>
            </Link>

          </div>

          <div className="overflow-x-auto">

            <table className="table w-full">

              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {requests.map((request) => (
                  <tr key={request._id} className="[&>td]:py-5 font-semibold">

                    <td>{request.recipientName}</td>

                    <td>
                      {request.upazila}, {request.district}
                    </td>

                    <td>{request.date}</td>

                    <td>{request.time}</td>

                    <td>{request.bloodGroup}</td>

                    <td>
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        {request.status}
                      </span>
                    </td>

                    <td>

                      <div className="flex gap-2">

                        <Link
                          href={`/dashboard/donor/edit-request/${request._id}`}
                        >
                          <Button size="sm">
                            Edit
                          </Button>
                        </Link>

                        <Link
                          href={`/donation-requests/${request._id}`}
                        >
                          <Button
                            size="sm"
                            className="bg-red-600 text-white"
                          >
                            View
                          </Button>
                        </Link>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {!loading && requests.length === 0 && (
        <div className="rounded-2xl border bg-white p-12 text-center shadow">
          <h2 className="text-xl font-semibold">
            You haven't created any donation requests yet.
          </h2>

          <p className="mt-2 text-gray-500">
            Create your first donation request to find blood donors.
          </p>

          <Link href="/dashboard/donor/create-request">
            <Button className="mt-6 bg-red-600 text-white">
              Create Donation Request
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
}