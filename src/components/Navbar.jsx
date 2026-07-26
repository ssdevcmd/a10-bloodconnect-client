"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { BiDonateBlood } from "react-icons/bi";
import { User, Menu, X, LogIn, LayoutDashboard } from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const [profileOpen, setProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Better Auth
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
        setProfileOpen(false);
        setMenuOpen(false);
        router.push("/");
        router.refresh();
    };

    if (isPending) {
        return (
            <nav className="border-b bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
                    <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2">
                        <BiDonateBlood /> BloodConnect
                    </h1>
                </div>
            </nav>
        );
    }

    return (
        <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

                {/* Left Side: Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                        <BiDonateBlood />
                    </div>
                    <span className="text-2xl font-bold text-red-600">
                        BloodConnect
                    </span>
                </Link>

                {/* Center Side: Basic Desktop Navigation Links */}
                <div className="hidden items-center gap-6 md:flex">
                    <Link href="/" className="font-medium transition hover:text-red-600">
                        Home
                    </Link>
                    <Link href="/donation-requests" className="font-medium transition hover:text-red-600">
                        Donation Requests
                    </Link>
                    {user && (
                        <Link href="/funding" className="font-medium transition hover:text-red-600">
                            Funding
                        </Link>
                    )}
                </div>

                {/* Right Side: Desktop Profile Panel / Authentication Primitives */}
                <div className="hidden md:flex items-center gap-4">
                    {!user ? (
                        <Link
                            href="/auth/signin"
                            className="flex items-center gap-2 rounded-xl px-5 py-2 bg-red-600 text-white font-medium hover:bg-red-700 transition shadow-sm"
                        >
                            <LogIn size={18} />
                            Login
                        </Link>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 ring-2 ring-red-500 ring-offset-2 overflow-hidden transition active:scale-95 focus:outline-none"
                            >
                                {user?.image ? (
                                    <img
                                        referrerPolicy="no-referrer"
                                        src={user.image}
                                        alt={user.name || "User"}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User size={20} />
                                )}
                            </button>

                            {/* Custom Dropdown Panel */}
                            {profileOpen && (
                                <>
                                    {/* Invisible backdrop shield to close dropdown when clicking outside */}
                                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                                    
                                    <div className="absolute right-0 mt-3 w-64 rounded-2xl border bg-white shadow-xl z-50 overflow-hidden animate-fade-in">
                                        <div className="border-b p-4 bg-gray-50/50">
                                            <h3 className="font-semibold text-gray-800 truncate">
                                                {user.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 truncate mt-0.5">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="p-2 space-y-0.5">
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                <LayoutDashboard size={16} className="text-gray-400" />
                                                Dashboard
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition text-left"
                                            >
                                                <User size={16} className="rotate-180" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-600 hover:text-red-600 transition md:hidden focus:outline-none"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Navigation Drawer Overlay */}
            {menuOpen && (
                <div className="border-t bg-white md:hidden animate-fade-in">
                    <div className="flex flex-col gap-3 p-5 font-medium text-gray-700">
                        <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-red-600 py-1 transition">
                            Home
                        </Link>
                        <Link href="/donation-requests" onClick={() => setMenuOpen(false)} className="hover:text-red-600 py-1 transition">
                            Donation Requests
                        </Link>
                        
                        {user ? (
                            <>
                                <Link href="/funding" onClick={() => setMenuOpen(false)} className="hover:text-red-600 py-1 transition">
                                    Funding
                                </Link>
                                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-red-600 py-1 transition">
                                    Dashboard
                                </Link>
                                <hr className="my-1 border-gray-100" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-center bg-red-50 text-red-600 rounded-xl py-2.5 font-semibold transition hover:bg-red-100"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <hr className="my-1 border-gray-100" />
                                <Link 
                                    href="/auth/signin" 
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full text-center bg-red-600 text-white rounded-xl py-2.5 font-semibold transition hover:bg-red-700 shadow-sm"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}