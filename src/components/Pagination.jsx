"use client";

import { Button } from "@heroui/react";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="bordered"
          isDisabled={page === 1}
          onPress={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, index) => {
          const current = index + 1;

          return (
            <Button
              key={current}
              size="sm"
              variant={page === current ? "solid" : "bordered"}
              className={
                page === current
                  ? "bg-red-600 text-white"
                  : ""
              }
              onPress={() => onPageChange(current)}
            >
              {current}
            </Button>
          );
        })}

        <Button
          variant="bordered"
          isDisabled={page === totalPages}
          onPress={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}