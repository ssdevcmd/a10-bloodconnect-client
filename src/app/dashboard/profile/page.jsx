"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bloodGroup: user?.bloodGroup || "",
    district: user?.district || "",
    upazila: user?.upazila || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    // TODO:
    // Update profile in MongoDB

    console.log(formData);

    setIsEditing(false);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-red-600 text-white"
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            className="bg-green-600 text-white"
          >
            Save Changes
          </Button>
        )}

      </div>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            disabled={!isEditing}
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full rounded-lg border bg-gray-100 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Blood Group
          </label>

          <input
            type="text"
            name="bloodGroup"
            disabled={!isEditing}
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            District
          </label>

          <input
            type="text"
            name="district"
            disabled={!isEditing}
            value={formData.district}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Upazila
          </label>

          <input
            type="text"
            name="upazila"
            disabled={!isEditing}
            value={formData.upazila}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

      </div>

    </div>
  );
}