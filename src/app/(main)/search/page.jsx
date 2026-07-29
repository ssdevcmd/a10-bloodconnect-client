"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Avatar,
    Chip,
    Spinner,
} from "@heroui/react";
import { Search, MapPin, Droplets, Eye } from "lucide-react";

import { districts, upazilasOfDistrict } from "@/lib/bdLocations";

const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
];

export default function SearchPage() {
    const [bloodGroup, setBloodGroup] = useState("");
    const [district, setDistrict] = useState("");
    const [upazila, setUpazila] = useState("");

    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);

    const availableUpazilas = upazilasOfDistrict[district] || [];

    const handleSearch = async () => {
        if (!bloodGroup || !district || !upazila) return;

        setLoading(true);

        try {
            const params = new URLSearchParams({
                bloodGroup,
                district,
                upazila,
            });

            const url = `${process.env.NEXT_PUBLIC_API_URL}/search?${params.toString()}`;

            console.log(url);

            const res = await fetch(url);
            const data = await res.json();

            console.log(data);

            setDonors(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="mx-auto max-w-7xl px-4 py-12">

            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-red-600">
                    Find Blood Donors
                </h1>

                <p className="mt-3 text-gray-500">
                    Search active blood donors in your area.
                </p>
            </div>

            {/* Search Box */}

            <Card className="mb-10 p-6 shadow-lg">

                <div className="grid gap-5 md:grid-cols-4">

                    <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="rounded-xl border p-3"
                    >
                        <option value="">Blood Group</option>

                        {bloodGroups.map((group) => (
                            <option key={group}>{group}</option>
                        ))}
                    </select>

                    <select
                        value={district}
                        onChange={(e) => {
                            setDistrict(e.target.value);
                            setUpazila("");
                        }}
                        className="rounded-xl border p-3"
                    >
                        <option value="">District</option>

                        {districts.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>

                    <select
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        className="rounded-xl border p-3"
                        disabled={!district}
                    >
                        <option value="">
                            {district ? "Select Upazila" : "Choose District"}
                        </option>

                        {availableUpazilas.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>

                    <Button
                        color="danger"
                        startContent={<Search size={18} />}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>

                </div>

            </Card>

            {/* Loading */}

            {loading && (
                <div className="flex justify-center py-16">
                    <Spinner size="lg" color="danger" />
                </div>
            )}

            {/* Empty */}

            {!loading && donors.length === 0 && (
                <div className="rounded-2xl border border-dashed py-20 text-center">

                    <Droplets className="mx-auto mb-4 text-red-500" size={60} />

                    <h2 className="text-2xl font-bold">
                        No donors found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Try another blood group or location.
                    </p>

                </div>
            )}

            {/* Donor Cards */}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {donors.map((donor) => (
                    <Card
                        key={donor._id}
                        className="shadow-lg hover:-translate-y-1 transition"
                    >
                        <div className="p-6">

                            <div className="flex items-center gap-4">

                                <img
                                    src={donor.image}
                                    alt={donor.name}
                                    className="h-16 w-16 rounded-full border-2 border-white"
                                />

                                <div>

                                    <h2 className="text-xl font-bold">
                                        {donor.name}
                                    </h2>

                                    <Chip
                                        color="danger"
                                        variant="flat"
                                        className="mt-2"
                                    >
                                        {donor.bloodGroup}
                                    </Chip>

                                </div>

                            </div>

                            <div className="mt-6 space-y-3">

                                <div className="flex items-center gap-2 text-gray-600">

                                    <MapPin size={18} />

                                    {donor.district}, {donor.upazila}

                                </div>

                                <Chip
                                    color="success"
                                    variant="dot"
                                >
                                    Active
                                </Chip>

                            </div>

                            <Button
                                color="danger"
                                variant="flat"
                                startContent={<Eye size={18} />}
                                className="mt-6"
                            >
                                View Profile
                            </Button>

                        </div>
                    </Card>
                ))}

            </div>

        </div>
    );
}