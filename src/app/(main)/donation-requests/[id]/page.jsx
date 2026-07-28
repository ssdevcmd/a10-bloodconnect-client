"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    MapPin,
    CalendarDays,
    Clock,
    Droplets,
    Hospital,
    ArrowLeft,
    Activity,
    MessageSquareText
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DonationRequestDetailsPage() {
    // React.use() unwraps the params Promise safely in modern Next.js environments
    const unwrappedParams = useParams();
    const requestId = unwrappedParams?.id;

    const router = useRouter();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();


    useEffect(() => {
        if (isPending || !requestId) return;

        // Secure Route Guard Check
        if (!session?.user) {
            router.replace(`/auth/signin?redirectTo=/donation-requests/${requestId}`);
            return;
        }

        const fetchRequest = async () => {
            try {
                const res = await fetch(`${API_URL}/donation-requests/${requestId}`);
                if (!res.ok) throw new Error("Request not found");

                const data = await res.json();
                setRequest(data);
            } catch (error) {
                console.error("Error fetching donation details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
    }, [session, isPending, requestId, router]);

    const handleDonate = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/donation-requests/${request._id}/donate`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        donorName: session.user.name,
                        donorEmail: session.user.email,
                        status: "inprogress",
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("Donation confirmed!");
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Loading State UI
    if (isPending || loading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-200 border-t-red-600" />
                <p className="text-sm font-medium text-gray-500 animate-pulse">
                    Retrieving secure medical file...
                </p>
            </div>
        );
    }

    // Not logged in fallback view (while redirect triggers)
    if (!session?.user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-sm font-medium text-gray-500">Redirecting to login dashboard...</p>
            </div>
        );
    }

    // 404 Fallback View
    if (!request) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
                    <Droplets size={32} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Donation Request Cancelled or Not Found</h1>
                <p className="text-gray-500 text-sm mt-2 max-w-sm">
                    This record may have been fulfilled, removed, or the link provided is invalid.
                </p>
                <Link
                    href="/donation-requests"
                    className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 shadow-md transition"
                >
                    Return to Active Requests
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50/50 px-5 py-12">
            <div className="mx-auto max-w-4xl">

                {/* Navigation Actions */}
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href="/donation-requests"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-red-600 transition group"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                        Back to Donation Requests
                    </Link>
                    <p className="rounded-xl bg-amber-100 border border-amber-200 px-4 py-1.5 text-xs font-bold tracking-wide uppercase text-amber-800">{request.status}</p>
                </div>

                {/* Master Details Frame */}
                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">

                    {/* Header Strip */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-white">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-100">
                                    <Activity size={12} /> Urgent Assistance Required
                                </span>
                                <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                                    {request.recipientName}
                                </h1>
                            </div>

                            {/* Blood Group Display Badge */}
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl font-black text-red-600 shadow-md ring-4 ring-white/20">
                                {request.bloodGroup}
                            </div>
                        </div>
                    </div>

                    {/* Core Structured Info Matrix */}
                    <div className="grid gap-4 p-8 sm:grid-cols-2">

                        {/* Location block */}
                        <div className="rounded-2xl border border-gray-50 bg-gray-50/50 p-5 transition hover:bg-gray-50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <MapPin size={18} />
                            </div>
                            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">Location</p>
                            <p className="mt-1 font-bold text-gray-800">
                                {request.district}
                                {request.upazila ? `, ${request.upazila}` : ""}
                            </p>
                            {request.address && (
                                <p className="mt-1.5 text-sm font-medium text-gray-500 leading-relaxed">
                                    {request.address}
                                </p>
                            )}
                        </div>

                        {/* Clinical Facility Block */}
                        <div className="rounded-2xl border border-gray-50 bg-gray-50/50 p-5 transition hover:bg-gray-50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <Hospital size={18} />
                            </div>
                            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">Medical Name</p>
                            <p className="mt-1 font-bold text-gray-800 truncate">
                                {request.hospitalName || "Not Specified"}
                            </p>
                        </div>

                        {/* Target Date Block */}
                        <div className="rounded-2xl border border-gray-50 bg-gray-50/50 p-5 transition hover:bg-gray-50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <CalendarDays size={18} />
                            </div>
                            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">Required Date</p>
                            <p className="mt-1 font-bold text-gray-800">
                                {request.date}
                            </p>
                        </div>

                        {/* Target Time Block */}
                        <div className="rounded-2xl border border-gray-50 bg-gray-50/50 p-5 transition hover:bg-gray-50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <Clock size={18} />
                            </div>
                            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">Timeline Target</p>
                            <p className="mt-1 font-bold text-gray-800">
                                {request.time}
                            </p>
                        </div>

                        {/* Dynamic Status Metric */}
                        <div className="sm:col-span-2 rounded-2xl border border-amber-100 bg-amber-50/40 p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-amber-600/80">Current Status</p>
                                <p className="text-sm font-medium text-amber-800 mt-0.5">Waiting for an available matching donor contact</p>
                            </div>
                            <span className="rounded-xl bg-amber-100 border border-amber-200 px-4 py-1.5 text-xs font-bold tracking-wide uppercase text-amber-800">
                                {request.status || "Pending"}
                            </span>
                        </div>

                    </div>

                    {/* Conditional Medical Context Message Block */}
                    {request.message && (
                        <div className="mx-8 mb-4 rounded-2xl border border-gray-100 bg-gray-50/30 p-6">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                                <MessageSquareText size={16} className="text-gray-400" /> Case Notes & Instructions
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600 whitespace-pre-line">
                                {request.message}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <ConfirmationModal
                            request={request}
                            onConfirm={handleDonate}
                        >
                            <Button className="bg-red-600 text-white hover:bg-red-700">
                                Donate Now
                            </Button>
                        </ConfirmationModal>
                        </div>
                    </div>

                </div>
        </main>
    );
}

