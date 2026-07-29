"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function SuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const saveFunding = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) return;

      await fetch(
        `${API_URL}/payments/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
          }),
        }
      );
    };

    saveFunding();
  }, [searchParams]);


  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="mt-4">
        Thank you for your donation.
      </p>
    </div>
  );
}