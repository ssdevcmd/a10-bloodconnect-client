"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Input,
  Chip,
  Avatar,
  Card,
} from "@heroui/react";
import {
  MapPin,
  User,
  Mail,
  Droplets,
  HeartPulse,
  Save,
  Pencil,
} from "lucide-react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bloodGroup: user.bloodGroup || "",
        district: user.district || "",
        upazila: user.upazila || "",
      });
    }
  }, [user]);
  console.log(user);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      console.log(result);

      if (res.ok) {
        toast.success("Profile updated successfully.");
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl">

      {/* Top Buttons */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Profile Settings
          </h1>

          <p className="text-gray-500">
            Manage your BloodConnect profile.
          </p>
        </div>

        {!isEditing ? (
          <Button
            startContent={<Pencil size={18} />}
            className="bg-white text-red-600 border-red-600"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <Button
            startContent={<Save size={18} />}
            className="bg-white text-red-600"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        )}

      </div>

      <Card className="overflow-hidden rounded-3xl shadow-xl">

        {/* Banner */}

        <div className="relative h-52 bg-gradient-to-r from-red-800 via-red-700 to-red-600">

          <div className="absolute -bottom-12 left-10 flex items-end gap-5">

            <img
              src={user?.image}
              alt={user?.name}
              className="h-28 w-28 border-4 rounded-full border-white text-3xl"
            />

            <div className="pb-5 text-white">

              <h2 className="text-3xl font-bold">
                {formData.name}
              </h2>

              <div className="mt-2 flex items-center gap-3">

                <Chip
                  color="success"
                  variant="flat"
                >
                  Active Donor
                </Chip>

              </div>

            </div>

          </div>

          {/* Blood Group */}

          <div className="absolute right-10 bottom-8 rounded-2xl bg-white/90 p-5 shadow-lg">

            <p className="text-xs font-semibold uppercase text-red-500">
              Blood Group
            </p>

            <h2 className="mt-2 text-center text-4xl font-extrabold text-red-600">
              {formData.bloodGroup}
            </h2>

          </div>

        </div>

        <div className="mt-16 grid gap-8 p-8 lg:grid-cols-3">

          {/* Left */}

          <div className="space-y-8 lg:col-span-2">

            {/* Personal */}

            <div>

              <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">

                <User className="text-red-600" />

                Personal Information

              </h3>

              <div className="grid gap-5 md:grid-cols-2">

                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  isDisabled={!isEditing}
                  onChange={handleChange}
                />

                <Input
                  label="Email"
                  value={formData.email}
                  readOnly
                  startContent={<Mail size={16} />}
                />

              </div>

            </div>

            {/* Address */}

            <div>

              <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">

                <MapPin className="text-red-600" />

                Address Details

              </h3>

              <div className="grid gap-5 md:grid-cols-2">

                <Input
                  label="District"
                  name="district"
                  value={formData.district}
                  isDisabled={!isEditing}
                  onChange={handleChange}
                />

                <Input
                  label="Upazila"
                  name="upazila"
                  value={formData.upazila}
                  isDisabled={!isEditing}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <div>

              <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">

                <HeartPulse className="text-red-600" />

                Medical Profile

              </h3>

              <Input
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                isDisabled={!isEditing}
                onChange={handleChange}
                startContent={<Droplets size={16} />}
              />

            </div>

            <Card className="border border-green-200 bg-green-50">

              <div>

                <h4 className="font-bold text-green-700">
                  Eligible to Donate
                </h4>

                <p className="mt-2 text-sm text-gray-600">
                  Your account is active and ready to receive
                  blood donation requests. Thank you for
                  supporting BloodConnect.
                </p>

              </div>

            </Card>

          </div>

        </div>

      </Card>

    </div>
  );
}