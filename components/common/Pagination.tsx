"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

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

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(pageNumber));
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const pageIndex = currentPage - 1;
  const arr = Array.from({ length: totalPages }, (_, i) => i);
  const windowSize = 2;

  let pages: (number | string)[];

  if (totalPages <= 5) {
    pages = arr;
  } else {
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
    pages = finalPages;
  }

  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;

  return (
    <div className={cn("mt-6 flex justify-center", className)}>
      <div className="flex items-center space-x-1 sm:space-x-2 rounded-xl border p-1 sm:p-2">
        {/* Previous */}
        <Button size="sm" variant="outline" className="px-2 sm:px-3 py-2" asChild>
          <Link
            href={createPageURL(currentPage - 1)}
            className={!canPreviousPage ? "pointer-events-none opacity-50" : ""}
            aria-disabled={!canPreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Link>
        </Button>

        {/* Numbered pages - hidden on xs screens */}
        <div className="hidden sm:flex items-center space-x-1">
          {pages.map((page, i) =>
            typeof page === "string" ? (
              <span key={`gap-${i}`} className="px-2 py-1 text-gray-500">
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
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                asChild
              >
                <Link href={createPageURL(page + 1)}>{page + 1}</Link>
              </Button>
            )
          )}
        </div>

        {/* Mobile-only current page */}
        <div className="sm:hidden text-sm px-2 text-gray-700 dark:text-gray-200">
          Page {currentPage} / {totalPages}
        </div>

        {/* Next */}
        <Button size="sm" variant="outline" className="px-2 sm:px-3 py-2" asChild>
          <Link
            href={createPageURL(currentPage + 1)}
            className={!canNextPage ? "pointer-events-none opacity-50" : ""}
            aria-disabled={!canNextPage}
          >
            <span className="hidden sm:inline mr-1">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
