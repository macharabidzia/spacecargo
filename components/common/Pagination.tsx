// file: components/common/Pagination.tsx

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The component now takes simple, declarative props.
interface PaginationProps {
  totalPages: number;
  currentPage?: number;
  className?: string;
}

export default function Pagination({
  totalPages,
  currentPage = 1,
  className,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper function to create the URL for a specific page.
  // It preserves existing query parameters (e.g., for filters or sorting).
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  // The core logic for calculating visible pages is excellent and can be reused.
  // We just adapt it to use `currentPage` instead of `pageIndex`.
  const pages = useMemo(() => {
    const pageIndex = currentPage - 1; // Convert to 0-based index for logic
    const arr = Array.from({ length: totalPages }, (_, i) => i);
    const windowSize = 2;

    if (totalPages <= 5) return arr;

    let start = Math.max(0, pageIndex - windowSize);
    let end = Math.min(totalPages - 1, pageIndex + windowSize);

    if (pageIndex < windowSize) {
      end = Math.min(totalPages - 1, 2 * windowSize);
    } else if (pageIndex > totalPages - 1 - windowSize) {
      start = Math.max(0, totalPages - 1 - 2 * windowSize);
    }

    const visiblePages = arr.slice(start, end + 1);

    const showFirstEllipsis = visiblePages[0] > 1;
    const showLastEllipsis =
      visiblePages[visiblePages.length - 1] < totalPages - 2;

    let finalPages: (number | string)[] = [...visiblePages];

    if (showFirstEllipsis) {
      finalPages = [0, "...", ...finalPages];
    } else if (visiblePages[0] === 1) {
      finalPages.unshift(0);
    }

    if (showLastEllipsis) {
      finalPages = [...finalPages, "...", totalPages - 1];
    } else if (visiblePages[visiblePages.length - 1] === totalPages - 2) {
      finalPages.push(totalPages - 1);
    }

    return finalPages;
  }, [currentPage, totalPages]);

  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;

  return (
    <div className={cn("mt-6 flex justify-center", className)}>
      <div className="flex items-center space-x-2 rounded-xl border p-1">
        <Button size="sm" variant="outline" className="px-3 py-2" asChild>
          <Link
            href={createPageURL(currentPage - 1)}
            className={!canPreviousPage ? "pointer-events-none opacity-50" : ""}
            aria-disabled={!canPreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        </Button>

        {pages.map((page, i) =>
          typeof page === "string" ? (
            <span key={`gap-${i}`} className="px-2 py-1">
              …
            </span>
          ) : (
            <Button
              key={page}
              size="icon"
              variant="ghost"
              className={cn(
                "h-9 w-9 rounded-full",
                page + 1 === currentPage
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "hover:bg-gray-100"
              )}
              asChild
            >
              <Link href={createPageURL(page + 1)}>{page + 1}</Link>
            </Button>
          )
        )}

        <Button size="sm" variant="outline" className="px-3 py-2" asChild>
          <Link
            href={createPageURL(currentPage + 1)}
            className={!canNextPage ? "pointer-events-none opacity-50" : ""}
            aria-disabled={!canNextPage}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
