"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Dropdown,
  Label,
} from "@heroui/react";
import { MoreVertical } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AllBloodDonationRequestPage() {
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

      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(
        `${API_URL}/donation-requests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
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

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            All Blood Donation Requests
          </h1>

          <p className="text-gray-500">
            Manage all donation requests.
          </p>
        </div>

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

      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">

        <table className="table w-full">

          <thead className="border-b bg-gray-50">

            <tr>

              <th className="px-5 py-4 text-left">
                Recipient
              </th>

              <th className="px-5 py-4 text-left">
                Blood
              </th>

              <th className="px-5 py-4 text-left">
                Location
              </th>

              <th className="px-5 py-4 text-left">
                Hospital
              </th>

              <th className="px-5 py-4 text-left">
                Date
              </th>

              <th className="px-5 py-4 text-left">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {requests.map((request) => (

              <tr
                key={request._id}
                className="border-b"
              >

                <td className="px-5 py-4">
                  {request.recipientName}
                </td>

                <td className="px-5 py-4 font-semibold text-red-600">
                  {request.bloodGroup}
                </td>

                <td className="px-5 py-4">
                  {request.upazila}, {request.district}
                </td>

                <td className="px-5 py-4">
                  {request.hospitalName}
                </td>

                <td className="px-5 py-4">
                  {request.date}
                </td>

                <td className="px-5 py-4">

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

                <td className="px-5 py-4 text-center">

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
                            window.location.href =
                              `/donation-requests/${request._id}`
                          }
                        >
                          <Label>
                            View Details
                          </Label>
                        </Dropdown.Item>

                        {request.status ===
                          "pending" && (
                          <Dropdown.Item
                            id="progress"
                            onPress={() =>
                              updateStatus(
                                request._id,
                                "inprogress"
                              )
                            }
                          >
                            <Label>
                              Mark In Progress
                            </Label>
                          </Dropdown.Item>
                        )}

                        {request.status ===
                          "inprogress" && (
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
                              <Label>
                                Mark Done
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
                              <Label>
                                Cancel
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