"use client";

import * as React from "react";
import {
  Cell,
  ColumnDef,
  flexRender,
  Table as ReactTableType,
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
import { useClientTranslation } from "@/i18n/i18n-provider";

interface DataTableProps<TData> {
  table: ReactTableType<TData>;
  notFoundText?: string;
  rowClassName?: string | ((row: TData) => string);
  cellClassName?: string | ((cell: Cell<TData, unknown>) => string);
  headerClassName?: string;
  bodyClassName?: string;
  isHydrated: boolean;
  isLoading?: boolean;
}

export function DataTable<TData>({
  table,
  rowClassName,
  cellClassName,
  headerClassName,
  bodyClassName,
  isHydrated,
  isLoading = false,
}: DataTableProps<TData>) {
  const { t } = useClientTranslation()

  const labelFor = (col: ColumnDef<TData, unknown>): string => {
    if (typeof col.header === "string") return col.header;
    if ("accessorKey" in col && col.accessorKey) return t(`tableHeader.${String(col.accessorKey)}`);
    if ("id" in col && col.id) return String(col.id);
    return "";
  };

  const colSpanValue = table.getAllColumns().length || 1;
  const hasData = table.getRowModel().rows.length > 0;

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
                  onClick={
                    h.column.getCanSort()
                      ? h.column.getToggleSortingHandler()
                      : undefined
                  }
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
          {hasData ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  "block mb-4 p-4 border border-gray-200 rounded-lg md:table-row md:mb-0 md:p-0 md:border-b md:border-none",
                  typeof rowClassName === "function"
                    ? rowClassName(row.original)
                    : rowClassName
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    data-label={labelFor(cell.column.columnDef)}
                    className={cn(
                      "flex justify-between px-0 py-1 md:p-4 md:table-cell before:float-left before:font-medium before:content-[attr(data-label)] md:before:content-[''] md:justify-items-center",
                      typeof cellClassName === "function"
                        ? cellClassName(cell)
                        : cellClassName
                    )}
                  >
                    {isHydrated && !isLoading ? (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    ) : (
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={colSpanValue} className="h-24 text-center">
                <div className="flex flex-col gap-4 items-center justify-center min-h-[300px] h-fit">
                  {isLoading && !isHydrated ? (
                    <h1 className="text-lg font-extralight text-foreground/70">
                      Loading table content...
                    </h1>
                  ) : (
                    <>
                      <NotFoundSvg className="w-36 h-36" />
                      <h1 className="text-lg font-extralight text-foreground/70">
                        {t('notFoundText')}
                      </h1>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
