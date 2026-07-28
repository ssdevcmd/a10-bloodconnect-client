"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { districts, upazilasOfDistrict } from "@/lib/bdLocations";
import { toast } from "react-toastify";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export default function EditRequestPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    hospitalName: "",
    address: "",
    date: "",
    time: "",
    reason: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/donation-requests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          recipientName: data.recipientName || "",
          bloodGroup: data.bloodGroup || "",
          district: data.district || "",
          upazila: data.upazila || "",
          hospitalName: data.hospitalName || "",
          address: data.address || "",
          date: data.date || "",
          time: data.time || "",
          reason: data.reason || "",
        });

        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setUpdating(true);

    try {
      const res = await fetch(
        `${API_URL}/donation-requests/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success || data.modifiedCount > 0) {
        toast.success("Donation request updated successfully");

        router.push("/dashboard/donor/my-donation-requests");
      } else {
        toast.error("Failed to update request");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }

    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">

      <h1 className="mb-8 text-3xl font-bold">
        Edit Donation Request
      </h1>

      <form
        onSubmit={handleUpdate}
        className="grid gap-6 md:grid-cols-2"
      >

        <div>
          <label className="mb-2 block font-medium">
            Recipient Name
          </label>

          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Blood Group
          </label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            {bloodGroups.map((group) => (
              <option key={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            District
          </label>

          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            {districts.map((district) => (
              <option
                key={district}
                value={district}
              >
                {district}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Upazila
          </label>

          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            {upazilasOfDistrict[formData.district]?.map(
              (upazila) => (
                <option
                  key={upazila}
                  value={upazila}
                >
                  {upazila}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Hospital Name
          </label>

          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Address
          </label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Donation Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Donation Time
          </label>

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Reason
          </label>

          <textarea
            rows={5}
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <Button
            type="submit"
            isDisabled={updating}
            className="w-full bg-red-600 text-white"
          >
            {updating
              ? "Updating..."
              : "Update Donation Request"}
          </Button>
        </div>

      </form>
    </div>
  );
}