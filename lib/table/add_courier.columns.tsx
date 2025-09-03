"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, Column } from "@tanstack/react-table";
import { Tag, MapPin, Scale, DollarSign, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { CourierMinimal } from "@/types/courier";
import { ActionButton } from "@/components/common/ActionButton";

/** Centered Header */
const CenteredHeader = <TData, TValue>(
    titleKey: string,
    column: Column<TData, TValue>,
    t: (key: string) => string,
    Icon: React.ReactNode,
    className?: string
) => (
    <Button
        variant="ghost"
        disableAnimation
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={`flex items-center justify-center gap-2 p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300 ${className} px-4 cursor-pointer`}
    >
        {Icon}
        {t("tableHeader." + titleKey)}
        {column.getIsSorted() === "asc" && <ChevronUp className="h-4 w-4" />}
        {column.getIsSorted() === "desc" && <ChevronDown className="h-4 w-4" />}
    </Button>
);

/** Centered Cell */
const CenteredCell = (content: React.ReactNode, className?: string) => (
    <div className={`flex items-center flex-1 w-full justify-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 border-r border-gray-200 ${className}`}>
        {content}
    </div>
);

/** Actions column factory */
function makeActionsColumn<T extends { id?: string | null; canEdit?: boolean; canDelete?: boolean; invoiceUrl?: string }>(
    handlers: {
        onEdit?: (row: T) => void;
        onDelete?: (row: T) => void;
        onInvoiceClick?: (id: string | null) => void;
    },
    t: (key: string) => string
): ColumnDef<T> {
    return {
        id: "actions",
        header: () => (
            <div className="flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("tableHeader.actions")}
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
            const original = row.original;
            const showEdit = handlers.onEdit && original.canEdit !== false;
            const showDelete = handlers.onDelete && original.canDelete !== false;
            const showInvoice = handlers.onInvoiceClick;

            return (
                <div className="flex items-center justify-center gap-2">
                    {showEdit && (
                        <ActionButton
                            icon={Tag}
                            label="Edit courier"
                            item={original}
                            onClick={() => handlers.onEdit?.(original)}
                        />
                    )}
                    {showDelete && (
                        <ActionButton
                            icon={FileText}
                            label="Delete courier"
                            item={original}
                            onClick={() => handlers.onDelete?.(original)}
                            colorClass="text-red-600 dark:text-red-400"
                        />
                    )}
                    {showInvoice && (
                        <ActionButton
                            icon={FileText}
                            label="See Invoice"
                            item={original}
                            onClick={() => handlers.onInvoiceClick?.(original.id!)}
                        />
                    )}
                </div>
            );
        },
    };
}

/** Build full Courier table with optional select column and actions */
export function buildAddCourierTable(
    t: (key: string) => string,
    handlers: {
        onEdit?: (courier: CourierMinimal) => void;
        onDelete?: (courier: CourierMinimal) => void;
        onInvoiceClick?: (id: string | null) => void;
    } = {},
    options: { showSelectColumn?: boolean } = { showSelectColumn: true }
): ColumnDef<CourierMinimal>[] {
    const columns: ColumnDef<CourierMinimal>[] = [];

    // --- SELECT COLUMN ---
    if (options.showSelectColumn) {
        columns.push({
            id: "select",
            header: ({ table }) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => {
                const courier = row.original;
                const isSelectable = courier.deliveryDesc !== "Delivered"; // use your condition

                return (
                    <div className="flex items-center justify-center">
                        {isSelectable ? (
                            <Checkbox
                                checked={row.getIsSelected()}
                                onCheckedChange={(value) => row.toggleSelected(!!value)}
                                aria-label="Select row"
                            />
                        ) : (
                            <span className="text-muted-foreground dark:text-gray-500 text-xs select-none">—</span>
                        )}
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        });
    }

    // --- DATA COLUMNS ---
    columns.push(
        {
            accessorKey: "tdsCode",
            header: ({ column }) =>
                CenteredHeader("tdsCode", column, t, <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
            cell: ({ row }) => CenteredCell(row.original.tdsCode || t("tableCell.na")),
        },
        {
            accessorKey: "declaredAmount",
            header: ({ column }) =>
                CenteredHeader("declaredAmount", column, t, <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
            cell: ({ row }) => CenteredCell(row.original.declaredAmount),
        },
        {
            accessorKey: "deliveryDesc",
            header: ({ column }) =>
                CenteredHeader("deliveryDesc", column, t, <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
            cell: ({ row }) => CenteredCell(row.original.deliveryDesc),
        },
        {
            accessorKey: "weight",
            header: ({ column }) =>
                CenteredHeader("weight", column, t, <Scale className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
            cell: ({ row }) => CenteredCell(row.original.weight),
        },
        {
            accessorKey: "id",
            header: ({ column }) =>
                CenteredHeader("id", column, t, <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
            cell: ({ row }) => CenteredCell(row.original.id),
        }
    );

    // --- ACTIONS ---
    columns.push(makeActionsColumn<CourierMinimal>(handlers, t));

    return columns;
}
