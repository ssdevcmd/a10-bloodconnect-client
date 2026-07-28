"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Dropdown, Label } from "@heroui/react";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AllBloodDonationRequestPage() {
  const { data: session } = authClient.useSession();

  const role = session?.user?.role;
  console.log(session?.user);

  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, [status]);

  const fetchRequests = async () => {
    try {
      let url = `${API_URL}/donation-requests`;

      if (status !== "all") {
        url += `?status=${status}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      console.log("Status filter:", status);
console.log("Fetched requests:", data);

      setRequests(data);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`${API_URL}/donation-requests/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    fetchRequests();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this request?")) return;

    await fetch(`${API_URL}/donation-requests/${id}`, {
      method: "DELETE",
    });

    fetchRequests();
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          All Blood Donation Requests
        </h1>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border px-4 py-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">

        <table className="table w-full">

          <thead className="border-b bg-gray-50">

            <tr>

              <th className="px-4 py-3 text-left">Recipient</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Blood</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {requests.map((request) => (

              <tr key={request._id} className="border-b">

                <td className="px-4 py-4">
                  {request.recipientName}
                </td>

                <td className="px-4 py-4">
                  {request.upazila}, {request.district}
                </td>

                <td className="px-4 py-4">
                  {request.bloodGroup}
                </td>

              

                

               

                <td className="px-4 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      request.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : request.status === "inprogress"
                        ? "bg-blue-100 text-blue-700"
                        : request.status === "done"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {request.status === "inprogress"
                      ? "In Progress"
                      : request.status}
                  </span>

                </td>

                <td className="px-4 py-4 text-center">

                  <Dropdown>

                    <Button
                      isIconOnly
                      variant="light"
                    >
                      <MoreVertical size={18} />
                    </Button>

                    <Dropdown.Popover>

                      <Dropdown.Menu>

                        <Dropdown.Item
                          id="view"
                          onPress={() =>
                            window.location.href = `/donation-requests/${request._id}`
                          }
                        >
                          <Label>View</Label>
                        </Dropdown.Item>

                        {(role === "admin" || role === "volunteer") && (
                          <>
                            <Dropdown.Item
                              id="inprogress"
                              onPress={() =>
                                updateStatus(request._id, "inprogress")
                              }
                            >
                              <Label>Mark In Progress</Label>
                            </Dropdown.Item>

                            <Dropdown.Item
                              id="done"
                              onPress={() =>
                                updateStatus(request._id, "done")
                              }
                            >
                              <Label>Mark Done</Label>
                            </Dropdown.Item>

                            <Dropdown.Item
                              id="cancel"
                              onPress={() =>
                                updateStatus(request._id, "canceled")
                              }
                            >
                              <Label>Cancel</Label>
                            </Dropdown.Item>
                          </>
                        )}

                        {role === "admin" && (
                          <>
                            <Dropdown.Item
                              id="edit"
                              onPress={() =>
                                window.location.href =
                                  `/dashboard/edit-request/${request._id}`
                              }
                            >
                              <Label>Edit</Label>
                            </Dropdown.Item>

                            <Dropdown.Item
                              id="delete"
                              onPress={() =>
                                handleDelete(request._id)
                              }
                            >
                              <Label className="text-red-600">
                                Delete
                              </Label>
                            </Dropdown.Item>
                          </>
                        )}

                      </Dropdown.Menu>

                    </Dropdown.Popover>

                  </Dropdown>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}