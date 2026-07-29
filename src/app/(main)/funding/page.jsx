"use client";

import { useEffect, useState } from "react";
import {
    Card,
    Button,
    Avatar,
    Input,
} from "@heroui/react";
import {
    HeartHandshake,
    DollarSign,
    Users,
    Building2,
    HeartPulse,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const amounts = [5, 10, 20, 50, 100, 200, 300, 500];

export default function FundingPage() {
    const [selectedAmount, setSelectedAmount] = useState(10);
    const [customAmount, setCustomAmount] = useState("");
    const [supporters, setSupporters] = useState([]);
    const [stats, setStats] = useState({
        totalDonors: 0,
        totalFunding: 0,
    });

    const { data: session } = authClient.useSession();

    useEffect(() => {
        const fetchFundingData = async () => {
            try {
                const [fundingsRes, statsRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/fundings`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics`),
                ]);

                const fundings = await fundingsRes.json();
                const statistics = await statsRes.json();

                setSupporters(fundings);
                setStats(statistics);
            } catch (error) {
                console.error("Failed to load funding data:", error);
            }
        };

        fetchFundingData();
    }, []);

    const handleDonate = async () => {
        const amount = Number(customAmount || selectedAmount);

        const res = await fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image,
                role: session?.user?.role,
            }),
        });

        const data = await res.json();

        window.location.href = data.url;
    };


    return (
        <div className="mx-auto max-w-7xl px-4 py-14">

            {/* Hero */}

            <div className="text-center">

                <HeartHandshake
                    className="mx-auto text-red-600"
                    size={70}
                />

                <h1 className="mt-5 text-5xl font-bold">
                    Support BloodConnect
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                    Every contribution helps us maintain our platform,
                    connect donors with recipients, and save more lives.
                </p>

            </div>

            {/* Donation Card */}

            <Card className="mx-auto mt-12 max-w-2xl">

                <div className="p-8">

                    <h2 className="text-2xl font-bold">
                        Choose Your Contribution
                    </h2>

                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

                        {amounts.map((amount) => (
                            <Button
                                key={amount}
                                color={
                                    selectedAmount === amount
                                        ? "danger"
                                        : "default"
                                }
                                variant={
                                    selectedAmount === amount
                                        ? "solid"
                                        : "bordered"
                                }
                                onClick={() => {
                                    setSelectedAmount(amount);
                                    setCustomAmount("");
                                }}
                            >
                                ${amount}
                            </Button>
                        ))}

                    </div>

                    <Input
                        className="mt-6"
                        label="Custom Amount"
                        type="number"
                        value={customAmount}
                        onChange={(e) =>
                            setCustomAmount(e.target.value)
                        }
                        startContent={<DollarSign size={18} />}
                    />

                    <Button
                        color="danger"
                        className="mt-6 w-full"
                        onClick={handleDonate}
                    >
                        Fund Now
                    </Button>

                </div>

            </Card>

            {/* Statistics */}

            <div className="mt-16 grid gap-6 md:grid-cols-4">

                <Card>
                    <div className="p-6 text-center">

                        <HeartPulse
                            className="mx-auto text-red-600"
                            size={40}
                        />

                        <h2 className="mt-4 text-3xl font-bold">
                            0
                        </h2>

                        <p className="text-gray-500">
                            Donations Completed
                        </p>

                    </div>
                </Card>

                <Card>
                    <div className="p-6 text-center">

                        <Users
                            className="mx-auto text-red-600"
                            size={40}
                        />

                        <h2 className="mt-4 text-3xl font-bold">
                            {stats.totalDonors}
                        </h2>

                        <p className="text-gray-500">
                            Registered Donors
                        </p>

                    </div>
                </Card>

                <Card>
                    <div className="p-6 text-center">

                        <Building2
                            className="mx-auto text-red-600"
                            size={40}
                        />

                        <h2 className="mt-4 text-3xl font-bold">
                            180
                        </h2>

                        <p className="text-gray-500">
                            Hospitals Connected
                        </p>

                    </div>
                </Card>

                <Card>
                    <div className="p-6 text-center">

                        <DollarSign
                            className="mx-auto text-red-600"
                            size={40}
                        />

                        <h2 className="mt-4 text-3xl font-bold">
                            ${stats.totalFunding}
                        </h2>

                        <p className="text-gray-500">
                            Funds Raised
                        </p>

                    </div>
                </Card>

            </div>

            {/* Supporters */}

            <div className="mt-20">

                <h2 className="mb-8 text-3xl font-bold">
                    Recent Supporters
                </h2>

                <div className="grid gap-6 md:grid-cols-3">

                    {supporters.map((supporter) => (
                        <Card key={supporter.name}>

                            <div className="flex items-center gap-4 p-6">

                                <img
                                    src={supporter.image}
                                    alt={supporter.name}
                                    className="h-16 w-16 rounded-full"
                                />

                                <div>

                                    <h3 className="font-bold">
                                        {supporter.name}
                                    </h3>

                                    <p className="text-red-600">
                                        Donated ${supporter.amount}
                                    </p>

                                </div>

                            </div>

                        </Card>
                    ))}

                </div>

            </div>

        </div>
    );
}