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

  const canPreviousPage = totalPages > 1;
  const canNextPage = totalPages > 1;

  const prevPageUrl = createPageURL(currentPage === 1 ? totalPages : currentPage - 1);
  const nextPageUrl = createPageURL(currentPage === totalPages ? 1 : currentPage + 1);

  return (
    <div className={cn("mt-8 flex justify-center", className)}>
      <div
        className="
          flex items-center gap-1 sm:gap-2 rounded-2xl shadow-lg
          bg-white border border-space-blue-muted
          dark:bg-gray-800 dark:border-space-blue-muted/60
          px-4 py-3
        "
      >
        {/* Previous */}
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-space-blue-muted/10 dark:hover:bg-space-blue-muted/20 transition disabled:opacity-50"
          disabled={!canPreviousPage}
          asChild
        >
          <Link
            href={prevPageUrl}
            aria-disabled={!canPreviousPage}
            className="text-space-blue-muted dark:text-space-blue-light"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>

        {/* Pages */}
        <div className="hidden sm:flex items-center space-x-1">
          {pages.map((page, i) =>
            typeof page === "string" ? (
              <span
                key={`gap-${i}`}
                className="px-2 py-1 text-space-blue-muted dark:text-space-blue-light"
              >
                …
              </span>
            ) : (
              <Button
                key={page}
                size="icon"
                variant="ghost"
                className={cn(
                  "h-9 w-9 rounded-full transition",
                  page + 1 === currentPage
                    ? "bg-space-blue-muted text-white shadow hover:bg-space-blue-muted/90"
                    : "text-space-blue-muted hover:bg-space-blue-muted/20 dark:text-space-blue-light dark:hover:bg-space-blue-muted/30"
                )}
                asChild
              >
                <Link href={createPageURL(page + 1)}>{page + 1}</Link>
              </Button>
            )
          )}
          {pages.length === 0 && <Button
            size="icon"
            variant="ghost"
            className={cn(
              "h-9 w-9 rounded-full transition",
              1 === currentPage
                ? "bg-space-blue-muted text-white shadow hover:bg-space-blue-muted/90"
                : "text-space-blue-muted hover:bg-space-blue-muted/20 dark:text-space-blue-light dark:hover:bg-space-blue-muted/30"
            )}
            asChild
          >
            <Link href={createPageURL(1)}>{1}</Link>
          </Button>
          }
        </div>

        {/* Mobile-only current page */}
        <div className="sm:hidden text-sm px-2 text-space-blue-muted dark:text-space-blue-light">
          Page {currentPage} / {totalPages}
        </div>

        {/* Next */}
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-space-blue-muted/10 dark:hover:bg-space-blue-muted/20 transition disabled:opacity-50"
          disabled={!canNextPage}
          asChild
        >
          <Link
            href={nextPageUrl}
            aria-disabled={!canNextPage}
            className="text-space-blue-muted dark:text-space-blue-light"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
