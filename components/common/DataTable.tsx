"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [{ pageIndex }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  /* ---------- helpers ---------- */

  // 1. Text label for stacked cells on mobile
  const labelFor = (col: ColumnDef<any, any>) => {
    /* ✅ 1. explicit string header */
    if (typeof col.header === "string") return col.header;

    /* ✅ 2. accessorKey (most common when you don’t give `id`) */
    //    accessorKey can be string | number | undefined, so cast to string safely
    if (typeof (col as any).accessorKey === "string")
      return (col as any).accessorKey as string;

    /* ✅ 3. id explicitly supplied in the column def */
    if (col.id) return String(col.id);

    /* ❌ 4. nothing useful → return empty, not "Field" */
    return "";
  };

  // 2. Page numbers (sliding window of ±2 around current page)
  const total = table.getPageCount();
  const pages = Array.from({ length: total }, (_, i) => i).filter(
    (n) => Math.abs(n - pageIndex) <= 2 || n === 0 || n === total - 1
  );

  /* ---------- render ---------- */

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <Table>
        {/* header */}
        <TableHeader className="hidden md:table-header-group">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead
                  key={h.id}
                  className="h-12 text-center font-semibold justify-items-center"
                  onClick={h.column.getToggleSortingHandler()}
                >
                  {h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* body */}
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="block md:table-row border-b p-4 md:p-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    data-label={labelFor(cell.column.columnDef)}
                    className="block md:table-cell text-right md:text-center
                               before:float-left before:font-medium
                               before:content-[attr(data-label)]
                               md:before:content-[''] md:justify-items-center justify-items-end"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* pagination */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center space-x-2 rounded-xl border p-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {pages.map((n, i) =>
            i > 0 && n - pages[i - 1] > 1 ? (
              <span key={`gap-${i}`} className="px-2 py-1">
                …
              </span>
            ) : (
              <Button
                key={n}
                size="icon"
                variant="ghost"
                onClick={() => table.setPageIndex(n)}
                className={`h-9 w-9 rounded-full ${
                  n === pageIndex
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {n + 1}
              </Button>
            )
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
