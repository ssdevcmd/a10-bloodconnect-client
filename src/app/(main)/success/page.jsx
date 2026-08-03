"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function SuccessContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const saveFunding = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) return;

      const { data: tokenData } = await authClient.token();

      await fetch(`${API_URL}/payments/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({ sessionId }),
      });
    };

    saveFunding();
  }, [searchParams]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-4">Thank you for your donation.</p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}