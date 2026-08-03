"use client";

import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Label,
} from "@heroui/react";
import { MoreVertical } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [status]);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${API_URL}/user?status=${status}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    const { data: tokenData } = await authClient.token();
    await fetch(`${API_URL}/user/${id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify({ role }),
    });

    fetchUsers();
  };

  const toggleStatus = async (id, banned) => {
    const { data: tokenData } = await authClient.token();
    await fetch(`${API_URL}/user/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify({ banned }),
    });

    fetchUsers();
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

      {/* Header */}

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          All Users
        </h1>

        <select
          className="rounded-lg border px-4 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="blocked">Blocked Users</option>
        </select>

      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

        <table className="table w-full">

          <thead className="bg-gray-50">

            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Blood</th>
              <th>District</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>

                  {/* Avatar + Name */}

                  <td>
                    <div className="flex items-center gap-3">

                      <img
                        src={user?.image}
                        alt={user?.name}
                        className="h-10 w-10 rounded-full border-2 border-white"
                      />

                      <span className="font-medium">
                        {user?.name}
                      </span>

                    </div>
                  </td>

                  <td>{user?.email}</td>

                  <td>{user?.bloodGroup}</td>

                  <td>{user?.district}</td>

                  <td>
                    <span className="capitalize font-medium">
                      {user?.role}
                    </span>
                  </td>

                  <td>
                    {user?.banned ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                        Blocked
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="text-center">

                    <Dropdown>

                      <Button
                        isIconOnly
                        variant="light"
                      >
                        <MoreVertical size={18} />
                      </Button>

                      <Dropdown.Popover>

                        <Dropdown.Menu>

                          {/* Block / Unblock */}

                          {user.banned ? (
                            <Dropdown.Item
                              id="unblock"
                              onPress={() =>
                                toggleStatus(
                                  user._id,
                                  false
                                )
                              }
                            >
                              <Label className="text-green-600">
                                Unblock User
                              </Label>
                            </Dropdown.Item>
                          ) : (
                            <Dropdown.Item
                              id="block"
                              onPress={() =>
                                toggleStatus(
                                  user._id,
                                  true
                                )
                              }
                            >
                              <Label className="text-red-600">
                                Block User
                              </Label>
                            </Dropdown.Item>
                          )}

                          {/* Donor -> Volunteer */}

                          {user.role === "donor" && (
                            <Dropdown.Item
                              id="volunteer"
                              onPress={() =>
                                updateRole(
                                  user._id,
                                  "volunteer"
                                )
                              }
                            >
                              <Label>
                                Make Volunteer
                              </Label>
                            </Dropdown.Item>
                          )}

                          {/* Donor / Volunteer -> Admin */}

                          {user.role !== "admin" && (
                            <Dropdown.Item
                              id="admin"
                              onPress={() =>
                                updateRole(
                                  user._id,
                                  "admin"
                                )
                              }
                            >
                              <Label>
                                Make Admin
                              </Label>
                            </Dropdown.Item>
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

      </div>

    </div>
  );
}