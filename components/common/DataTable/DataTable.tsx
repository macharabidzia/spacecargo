"use client";

import * as React from "react";
import {
  AccessorKeyColumnDef,
  ColumnDef,
  DisplayColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupColumnDef,
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
import NotFoundSvg from "@/public/icons/not_found.svg";
import { cn } from "@/lib/utils";
import Pagination from "../Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  notFoundText?: string;
  rowClassName?: string | ((row: TData) => string);
  cellClassName?: string | ((cell: unknown) => string);
  headerClassName?: string;
  bodyClassName?: string;
}

// DataTable Component
export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  notFoundText = "No data available.",
  rowClassName,
  cellClassName,
  headerClassName,
  bodyClassName,
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


  const labelFor = <TData, TValue>(col: ColumnDef<TData, TValue>): string => {
    if (typeof col.header === "string") {
      return col.header;
    }

    if ((col as AccessorKeyColumnDef<TData, TValue>).accessorKey !== undefined) {
      return String((col as AccessorKeyColumnDef<TData, TValue>).accessorKey);
    }

    if ((col as DisplayColumnDef<TData, TValue>).id !== undefined) {
      return String((col as DisplayColumnDef<TData, TValue>).id);
    }

    if ((col as GroupColumnDef<TData, TValue>).id !== undefined) {
      return String((col as GroupColumnDef<TData, TValue>).id);
    }

    return "";
  };
  return (
    <div className="rounded-lg overflow-hidden">
      <Table className="rounded-lg">
        <TableHeader
          className={cn(
            "bg-background rounded-t-lg hidden md:table-header-group",
            headerClassName
          )}
        >
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead
                  key={h.id}
                  className="p-4 text-white justify-items-center font-extrabold"
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

        <TableBody className={cn("space-y-4", bodyClassName)}>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  "block mb-4 p-4 border border-gray-200 rounded-lg md:table-row md:mb-0 md:p-0 md:border-b md:border-none",
                  typeof rowClassName === "function"
                    ? rowClassName(row.original as TData)
                    : rowClassName
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    data-label={labelFor(cell.column.columnDef)}
                    className={cn(
                      "flex justify-between px-0 py-1 text-gray-700 md:p-4 md:table-cell before:float-left before:font-medium before:content-[attr(data-label)] md:before:content-[''] md:justify-items-center",
                      typeof cellClassName === "function"
                        ? cellClassName(cell)
                        : cellClassName
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex flex-col gap-4 items-center justify-center min-h-[300px] h-fit">
                  <NotFoundSvg className="w-36 h-36" />
                  <h1 className="text-lg font-extralight text-foreground/70">
                    {notFoundText}
                  </h1>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getPageCount() > 1 && (
        <React.Suspense>
          <Pagination totalPages={table.getTotalSize()} />
        </React.Suspense>

      )}
    </div>
  );
}
