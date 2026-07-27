"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/auth/signin");
      return;
    }

    const role = session.user.role;

    if (role === "admin") {
      router.replace("/dashboard/admin");
    } else if (role === "volunteer") {
      router.replace("/dashboard/volunteer");
    } else {
      router.replace("/dashboard/donor");
    }
  }, [session, isPending, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  );
}