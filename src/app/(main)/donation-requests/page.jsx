"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  Clock,
  Droplets,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Pagination from "@/components/Pagination";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${API_URL}/donation-requests?page=${page}&limit=${limit}`
        );

        const data = await res.json();

        console.log('data:', data);

        setRequests(data.requests || []);
        setTotalPages(data.totalPages || 1);

        setRequests(data.requests);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [page]);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
            <HeartPulse size={34} />
          </div>

          <h1 className="text-4xl font-bold md:text-5xl">
            Blood Donation Requests
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-red-100">
            Find people who urgently need blood and help save a life.
          </p>
        </div>
      </section>

      {/* Requests */}
      <section className="mx-auto max-w-7xl px-5 py-14">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Pending Requests
          </h2>

          <p className="mt-1 text-gray-500">
            These people are currently looking for blood donors.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <Droplets
              size={50}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              No pending requests
            </h3>

            <p className="mt-2 text-gray-500">
              There are currently no active blood donation requests.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {requests.map((request) => (
              <div
                key={request._id}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Top */}
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Recipient
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {request.recipientName}
                    </h3>
                  </div>

                  {/* Blood Group */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-600">
                    {request.bloodGroup}
                  </div>
                </div>

                {/* Location */}
                <div className="mt-6 flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <div>
                    <p className="text-sm text-gray-500">
                      Location
                    </p>

                    <p className="font-medium text-gray-800">
                      {request.district}
                      {request.upazila
                        ? `, ${request.upazila}`
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="mt-4 flex items-center gap-3">
                  <CalendarDays
                    size={20}
                    className="text-red-500"
                  />

                  <div>
                    <p className="text-sm text-gray-500">
                      Date
                    </p>

                    <p className="font-medium text-gray-800">
                      {request.date}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="mt-4 flex items-center gap-3">
                  <Clock
                    size={20}
                    className="text-red-500"
                  />

                  <div>
                    <p className="text-sm text-gray-500">
                      Time
                    </p>

                    <p className="font-medium text-gray-800">
                      {request.time}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-6">
                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Pending
                  </span>
                </div>

                {/* View Button */}
                <Link
                  href={`/donation-requests/${request._id}`}
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  View Details
                  <ArrowRight size={18} />
                </Link>

              </div>
            ))}

          </div>
        )}
      </section>
      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}