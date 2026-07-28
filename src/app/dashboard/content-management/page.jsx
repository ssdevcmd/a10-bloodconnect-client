"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Dropdown, Label } from "@heroui/react";
import { MoreVertical, FileText, Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ContentManagementPage() {
  const { data: session } = authClient.useSession();

  const role = session?.user?.role;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs`);
      const data = await res.json();

      setBlogs(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;

    await fetch(`${API_URL}/blogs/${id}`, {
      method: "DELETE",
    });

    fetchBlogs();
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/blogs/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    fetchBlogs();
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Content Management
          </h1>

          <p className="text-gray-500">
            Manage all blogs of BloodConnect.
          </p>
        </div>

        <Link href="/dashboard/content-management/add-blog">
          <Button
            startContent={<Plus size={18} />}
            className="bg-red-600 text-white"
          >
            Add Blog
          </Button>
        </Link>

      </div>

      <div className="overflow-x-auto rounded-2xl border bg-white">

        <table className="table min-w-[900px]">

          <thead>

            <tr>

              <th>Title</th>

              <th>Thumbnail</th>

              <th>Author</th>

              <th>Status</th>

              <th>Published</th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {blogs.map((blog) => (

              <tr key={blog._id}>

                <td className="font-medium">
                  {blog.title}
                </td>

                <td>

                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="h-14 w-20 rounded-lg object-cover"
                  />

                </td>

                <td>

                  <div>

                    <p>{blog.authorName}</p>

                    <p className="text-xs text-gray-500">
                      {blog.authorEmail}
                    </p>

                  </div>

                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {blog.status}
                  </span>

                </td>

                <td>

                  {new Date(
                    blog.createdAt
                  ).toLocaleDateString()}

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

                        <Dropdown.Item
                          id="view"
                          href={`/blog/${blog._id}`}
                        >
                          <Label>View</Label>
                        </Dropdown.Item>

                        <Dropdown.Item
                          id="edit"
                          href={`/dashboard/content-management/edit-blog/${blog._id}`}
                        >
                          <Label>Edit</Label>
                        </Dropdown.Item>

                        {blog.status === "draft" ? (

                          <Dropdown.Item
                            id="publish"
                            onPress={() =>
                              updateStatus(
                                blog._id,
                                "published"
                              )
                            }
                          >
                            <Label>
                              Publish
                            </Label>
                          </Dropdown.Item>

                        ) : (

                          <Dropdown.Item
                            id="unpublish"
                            onPress={() =>
                              updateStatus(
                                blog._id,
                                "draft"
                              )
                            }
                          >
                            <Label>
                              Unpublish
                            </Label>
                          </Dropdown.Item>

                        )}

                        {role === "admin" && (

                          <Dropdown.Item
                            id="delete"
                            onPress={() =>
                              deleteBlog(blog._id)
                            }
                          >
                            <Label className="text-red-600">
                              Delete
                            </Label>
                          </Dropdown.Item>

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

      {!blogs.length && (
        <div className="rounded-2xl border border-dashed py-20 text-center">

          <FileText
            className="mx-auto text-gray-400"
            size={60}
          />

          <h3 className="mt-4 text-xl font-semibold">
            No Blogs Found
          </h3>

          <p className="mt-2 text-gray-500">
            Create your first blog to educate donors.
          </p>

        </div>
      )}

    </div>
  );
}