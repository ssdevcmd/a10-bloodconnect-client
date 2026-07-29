"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Dropdown,
  Label,
} from "@heroui/react";
import { MoreVertical } from "lucide-react";
import Pagination from "@/components/Pagination";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyDonationRequestsPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  // useEffect(() => {
  //   if (!session?.user?.email) return;

  //   fetchRequests();
  // }, [session, status, page]);

  const fetchRequests = async () => {
    setLoading(true);

    try {
      let url = `${API_URL}/my-donation-requests?email=${session.user.email}&page=${page}&limit=${limit}`;

      if (status !== "all") {
        url += `&status=${status}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      setRequests(data.requests);
      setTotalPages(data.totalPages);
      setRequests(data.requests);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session?.user?.email) return;

    fetchRequests();
  }, [session, status, page]);

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
    if (!confirm("Delete this donation request?")) return;

    const res = await fetch(`${API_URL}/donation-requests/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      fetchRequests();
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          My Donation Requests
        </h1>

        <Button
          className="bg-red-600 text-white"
          onPress={() =>
            router.push("/dashboard/create-request")
          }
        >
          Create Request
        </Button>

      </div>

      {/* Filter */}
      <select
        className="rounded-lg border px-4 py-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

        <table className="table w-full">

          <thead className="bg-gray-50">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood</th>
              <th>Status</th>
              <th>Donor</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-500"
                >
                  No donation requests found.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request._id}>

                  <td>{request.recipientName}</td>

                  <td>
                    {request.upazila}, {request.district}
                  </td>

                  <td>{request.date}</td>

                  <td>{request.time}</td>

                  <td>{request.bloodGroup}</td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${request.status === "pending"
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
                        : request.status === "canceled"
                          ? "Canceled"
                          : request.status === "done"
                            ? "Done"
                            : "Pending"}
                    </span>
                  </td>

                  <td>
                    {request.status === "inprogress" ? (
                      <div className="text-sm">
                        <p className="font-medium">
                          {request.donorName}
                        </p>
                        <p className="text-gray-500">
                          {request.donorEmail}
                        </p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="text-center">

                    <Dropdown>

                      <Button
                        isIconOnly
                        variant="light"
                        aria-label="Actions"
                      >
                        <MoreVertical size={18} />
                      </Button>

                      <Dropdown.Popover>
                        <Dropdown.Menu>

                          {/* View for everyone */}
                          <Dropdown.Item
                            id="view"
                            onPress={() =>
                              router.push(
                                `/donation-requests/${request._id}`
                              )
                            }
                          >
                            <Label>View</Label>
                          </Dropdown.Item>

                          {/* Pending */}
                          {request.status === "pending" && (
                            <>
                              <Dropdown.Item
                                id="edit"
                                onPress={() =>
                                  router.push(
                                    `/dashboard/donor/edit-request/${request._id}`
                                  )
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

                          {/* In Progress */}
                          {request.status === "inprogress" && (
                            <>
                              <Dropdown.Item
                                id="done"
                                onPress={() =>
                                  updateStatus(
                                    request._id,
                                    "done"
                                  )
                                }
                              >
                                <Label className="text-green-600">
                                  Mark as Done
                                </Label>
                              </Dropdown.Item>

                              <Dropdown.Item
                                id="cancel"
                                onPress={() =>
                                  updateStatus(
                                    request._id,
                                    "canceled"
                                  )
                                }
                              >
                                <Label className="text-orange-600">
                                  Cancel Request
                                </Label>
                              </Dropdown.Item>

                              <Dropdown.Item
                                id="delete"
                                onPress={() =>
                                  handleDelete(request._id)
                                }
                              >
                                <Label className="text-red-600">
                                  Delete Request
                                </Label>
                              </Dropdown.Item>
                            </>
                          )}

                        </Dropdown.Menu>
                      </Dropdown.Popover>

                    </Dropdown>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      </div>
    </div>
  );
}