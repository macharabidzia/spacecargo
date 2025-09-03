// hooks/use-generic-table.ts (or use-table.ts)
import { useState, useMemo, useEffect } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

// No direct import of Parcel or Courier here
// import { Parcel } from "@/types/parcel";
// import { Courier } from "@/types/courier";

// Import the translation hook
import { useClientTranslation } from "@/i18n/i18n-provider";

// Define a type for the column builder function
type ColumnBuilder<TData extends object> = (
  handlers: {
    onEdit?: (item: TData) => void;
    onDelete?: (item: TData) => void;
  },
  t: (key: string) => string
) => ColumnDef<TData>[];

interface UseTableProps<TData extends object> {
  data: TData[]; // Generic data array
  currentPage: number;
  pageSize: number;
  onEdit?: (item: TData) => void; // Generic onEdit handler
  onDelete?: (item: TData) => void; // Generic onDelete handler
  tableId: string; // Unique ID for localStorage
  columnBuilder: ColumnBuilder<TData>; // The function to build columns
  enableRowSelection?: boolean; // Enable row selection
  onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void; // Row selection change handler
}

export const useGenericTable = <TData extends object>({
  data,
  currentPage,
  pageSize,
  onEdit,
  onDelete,
  tableId,
  columnBuilder, // Destructure the columnBuilder
  enableRowSelection = false, // Default to false
  onRowSelectionChange, // Row selection change handler
}: UseTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const { t } = useClientTranslation("common");

  // Construct the unique localStorage key using tableId
  const uniqueLocalStorageKey = useMemo(
    () => `tableColumnVisibility_${tableId}`,
    [tableId]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedVisibility = localStorage.getItem(uniqueLocalStorageKey);
        if (savedVisibility) {
          setColumnVisibility(JSON.parse(savedVisibility));
        }
      } catch (error) {
        console.error(
          `Failed to load column visibility for ${tableId} from localStorage:`,
          error
        );
      } finally {
        setIsHydrated(true);
      }
    } else {
      setIsHydrated(false);
    }
  }, [uniqueLocalStorageKey]);

  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      try {
        localStorage.setItem(
          uniqueLocalStorageKey,
          JSON.stringify(columnVisibility)
        );
      } catch (error) {
        console.error(
          `Failed to save column visibility for ${tableId} to localStorage:`,
          error
        );
      }
    }
  }, [columnVisibility, isHydrated, uniqueLocalStorageKey]);

  // Use the provided columnBuilder function to generate columns
  const columns: ColumnDef<TData>[] = useMemo(
    () =>
      columnBuilder(
        {
          onEdit,
          onDelete,
        },
        t
      ),
    [columnBuilder, onEdit, onDelete, t] // Depend on columnBuilder and handlers
  );

  const table = useReactTable({
    data: data || [], // Use generic 'data'
    columns,
    state: {
      sorting,

      columnVisibility,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      // Handle both functional and direct updates
      const newSelection =
        typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(newSelection);
      // Call the external handler if provided
      if (onRowSelectionChange) {
        onRowSelectionChange(newSelection);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection,
    manualPagination: true,
  });

  return { table, sorting, columnVisibility, rowSelection, isHydrated };
};