"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Form,
    TextField,
    Button,
    Label,
    Input,
    FieldError,
    TextArea,
} from "@heroui/react";
import { BiDonateBlood } from "react-icons/bi";
import { districts, upazilasOfDistrict } from "@/lib/bdLocations";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

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

export default function CreateDonationRequestPage() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        const form = e.currentTarget;

        const formData = new FormData(e.currentTarget);

        const donationRequest = {
            requesterName: user?.name,
            requesterEmail: user?.email,

            recipientName: formData.get("recipientName"),
            bloodGroup: formData.get("bloodGroup"),
            district: formData.get("district"),
            upazila: formData.get("upazila"),
            hospitalName: formData.get("hospitalName"),
            address: formData.get("address"),
            date: formData.get("date"),
            time: formData.get("time"),
            reason: formData.get("reason"),

            status: "pending",
        };

        try {
            const { data: tokenData } = await authClient.token();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/donation-requests`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`,
                    },
                    body: JSON.stringify(donationRequest),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create donation request"
                );
            }

            toast.success("Donation request created successfully!");

            form.reset();

            setTimeout(() => {
                router.push("/donation-requests");
            }, 1500);
        } catch (error) {
            console.error(error);
            toast.error(error.message ||"Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <BiDonateBlood
                            size={38}
                            className="text-red-600"
                        />
                    </div>

                    <h1 className="mt-4 text-3xl font-bold text-gray-900">
                        Create Donation Request
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Request blood from donors who can help save a life.
                    </p>
                </div>

                {/* Messages */}
                {error && (
                    <div className="mb-6 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 rounded-xl bg-green-100 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>
                )}

                <Form
                    onSubmit={handleSubmit}
                    className="grid w-full gap-6 md:grid-cols-2"
                >

                    {/* Requester Name */}
                    <TextField className="w-full">
                        <Label className="mb-2 block font-medium">
                            Requester Name
                        </Label>

                        <Input
                            value={user?.name || ""}
                            readOnly
                            className="w-full rounded-lg border p-3 bg-gray-100"
                        />
                    </TextField>

                    {/* Requester Email */}
                    <TextField className="w-full">
                        <Label className="mb-2 block font-medium">
                            Requester Email
                        </Label>

                        <Input
                            value={user?.email || ""}
                            readOnly
                            className="w-full rounded-lg border p-3 bg-gray-100"
                        />
                    </TextField>

                    {/* Recipient Name */}
                    <TextField
                        isRequired
                        name="recipientName"
                        className="w-full"
                    >
                        <Label className="mb-2 block font-medium">
                            Recipient Name
                        </Label>

                        <Input
                            placeholder="Enter recipient name"
                            className="w-full rounded-lg border p-3"
                        />

                        <FieldError className="mt-1 text-sm text-red-500" />
                    </TextField>

                    {/* Blood Group */}
                    <div className="w-full">
                        <label className="mb-2 block font-medium">
                            Blood Group
                        </label>

                        <select
                            name="bloodGroup"
                            required
                            className="w-full rounded-lg border bg-white p-3 outline-none focus:border-red-500"
                        >
                            <option value="">
                                Select blood group
                            </option>

                            {bloodGroups.map((group) => (
                                <option
                                    key={group}
                                    value={group}
                                >
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div className="w-full">
                        <label className="mb-2 block font-medium">
                            District
                        </label>

                        <select
                            name="district"
                            required
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full rounded-lg border bg-white p-3 outline-none focus:border-red-500"
                        >
                            <option value="">Select district</option>

                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div className="w-full">
                        <label className="mb-2 block font-medium">
                            Upazila
                        </label>

                        <select
                            name="upazila"
                            required
                            className="w-full rounded-lg border bg-white p-3 outline-none focus:border-red-500"
                        >
                            <option value="">
                                Select upazila
                            </option>

                            {upazilasOfDistrict[selectedDistrict]?.map((upazila) => (
                                <option key={upazila} value={upazila}>
                                    {upazila}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Hospital */}
                    <TextField
                        isRequired
                        name="hospitalName"
                        className="w-full"
                    >
                        <Label className="mb-2 block font-medium">
                            Hospital Name
                        </Label>

                        <Input
                            placeholder="Enter hospital name"
                            className="w-full rounded-lg border p-3"
                        />

                        <FieldError className="mt-1 text-sm text-red-500" />
                    </TextField>

                    {/* Address */}
                    <TextField
                        isRequired
                        name="address"
                        className="w-full"
                    >
                        <Label className="mb-2 block font-medium">
                            Hospital Address
                        </Label>

                        <Input
                            placeholder="Enter hospital address"
                            className="w-full rounded-lg border p-3"
                        />

                        <FieldError className="mt-1 text-sm text-red-500" />
                    </TextField>

                    {/* Date */}
                    <TextField
                        isRequired
                        name="date"
                        type="date"
                        className="w-full"
                    >
                        <Label className="mb-2 block font-medium">
                            Donation Date
                        </Label>

                        <Input
                            type="date"
                            className="w-full rounded-lg border p-3"
                        />

                        <FieldError className="mt-1 text-sm text-red-500" />
                    </TextField>

                    {/* Time */}
                    <TextField
                        isRequired
                        name="time"
                        type="time"
                        className="w-full"
                    >
                        <Label className="mb-2 block font-medium">
                            Donation Time
                        </Label>

                        <Input
                            type="time"
                            className="w-full rounded-lg border p-3"
                        />

                        <FieldError className="mt-1 text-sm text-red-500" />
                    </TextField>

                    {/* Reason */}
                    <TextField
                        isRequired
                        name="reason"
                        className="w-full md:col-span-2"
                    >
                        <Label className="mb-2 block font-medium">
                            Reason for Blood
                        </Label>

                        <TextArea
                            placeholder="Explain why blood is needed..."
                            className="min-h-32 w-full rounded-lg border p-3"
                        />

                        <FieldError className="mt-1 text-sm text-red-500" />
                    </TextField>

                    {/* Submit */}
                    <div className="mt-4 md:col-span-2">
                        <Button
                            type="submit"
                            isDisabled={isLoading}
                            className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
                        >
                            {isLoading
                                ? "Creating Request..."
                                : "Create Donation Request"}
                        </Button>
                    </div>
                </Form>
            </div>
        </section>
    );
}