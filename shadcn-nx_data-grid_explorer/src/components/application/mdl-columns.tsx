// Column Definitions for GradeChangeRecord

import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "@/components/application/DataTableRowActions";
import { format } from "date-fns";
import { JSX } from "react";
import { GradeChangeRecord } from "./model";
import { Checkbox } from "../ui/checkbox";
import { Menu, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

export const STATUS_ENUM_VALUES = [
  "INITIAL",
  "PENDING_REVIEW",
  "PENDING_APPROVAL",
  "APPROVED",
  "REJECTED",
];

export const renderStatus = (status?: string | null) => {
  const normalized = (status ?? "").trim().toUpperCase();

  const labelMap: Record<string, string> = {
    INITIAL: "INITIAL",
    PENDING_REVIEW: "PENDING REVIEW",
    PENDING_APPROVAL: "PENDING APPROVAL",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
  };

  const classMap: Record<string, string> = {
    INITIAL:
      "bg-gray-200 text-gray-800 border-gray-400 dark:bg-gray-700 dark:text-gray-200",
    PENDING_REVIEW:
      "bg-orange-200 text-orange-800 border-orange-400 dark:bg-orange-800 dark:text-orange-200",
    PENDING_APPROVAL:
      "bg-purple-200 text-purple-800 border-purple-400 dark:bg-purple-800 dark:text-purple-200",
    APPROVED:
      "bg-green-200 text-green-800 border-green-400 dark:bg-green-800 dark:text-green-200",
    REJECTED:
      "bg-red-200 text-red-800 border-red-400 dark:bg-red-800 dark:text-red-200",
  };

  return (
    <span
      className={`inline-block text-xs font-semibold px-2 py-1 rounded-full text-center w-[150px] uppercase whitespace-nowrap tracking-wide 
        border ${
          classMap[normalized] ??
          "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-300"
        }`}
    >
      {labelMap[normalized] ?? "-"}
    </span>
  );
};
function buildNumberColumn<T extends keyof GradeChangeRecord>(
  key: T,
  label: string
): ColumnDef<GradeChangeRecord> {
  return {
    id: key as string,
    accessorKey: key,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={label} />
    ),
    cell: ({ row }) => <div className="text-right">{row.getValue(key)}</div>,
    meta: { label, type: "number" },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: () => true, // <-- Add this line
  };
}

export function buildStatusColumn<T extends GradeChangeRecord>(
  id: keyof T,
  label: string
): ColumnDef<T> {
  return {
    id: id as string,
    accessorKey: id as string,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={label} />
    ),
    cell: ({ row }) =>
      renderStatus(row.original[id] as string | null | undefined),
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label,
      type: "enum",
      enumValues: STATUS_ENUM_VALUES,
    },
  };
}

function buildTextColumn<T extends keyof GradeChangeRecord>(
  key: T,
  label: string
): ColumnDef<GradeChangeRecord> {
  return {
    id: key as string,
    accessorKey: key,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={label} />
    ), // for sorting
    cell: ({ row }) => (
      <div className="truncate max-w-[180px]">{row.getValue(key)}</div>
    ),
    meta: { label, type: "text" },
    enableSorting: true,
    enableColumnFilter: true,
  };
}

function buildDateColumn<T extends keyof GradeChangeRecord>(
  key: T,
  label: string
): ColumnDef<GradeChangeRecord> {
  return {
    id: key as string,
    accessorKey: key,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={label} />
    ), // for sorting
    cell: ({ row }) => {
      const value = row.getValue<string>(key);
      return value ? format(new Date(value), "MM/dd/yyyy") : "-";
    },
    meta: { label, type: "date" },
    enableSorting: true,
    enableColumnFilter: true,
  };
}

function buildReadonlyTextColumn<T extends keyof GradeChangeRecord>(
  key: T,
  label: string,
  type: "text" | "enum" | "date" = "text"
): ColumnDef<GradeChangeRecord> {
  return {
    id: key as string,
    accessorKey: key,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={label} />
    ), // sorting disabled
    cell: ({ row }) => (
      <div className="truncate max-w-[180px]">{row.getValue(key)}</div>
    ),
    meta: { label, type },
    enableSorting: false,
    enableColumnFilter: false,
  };
}

function buildReadonlyEnumColumn<T extends keyof GradeChangeRecord>(
  key: T,
  label: string,
  enumValues: string[]
): ColumnDef<GradeChangeRecord> {
  return {
    id: key as string,
    accessorKey: key,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={label} />
    ), // sorting disabled
    cell: ({ row }) => renderStatus(row.getValue(key)),
    meta: { label, type: "enum", enumValues },
    enableSorting: false,
    enableColumnFilter: false,
  };
}

function buildSelectColumn(): ColumnDef<GradeChangeRecord> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 40,
    maxSize: 40,
    minSize: 40,
  };
}

export function buildActionColumn<T>(): ColumnDef<T, unknown> {
  return {
    id: "actions",
    meta: { label: "Actions" },
    header: () => (
      <div className="flex items-center justify-center gap-1 text-muted-foreground">
        <Menu className="h-4 w-4" />
        <span className="text-xs font-medium">Actions</span>
      </div>
    ),
    enableHiding: false,
    size: 64,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Changes</DropdownMenuItem>
          <DropdownMenuItem>Update</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  };
}

export const MDL_COMMON_COLUMNS: ColumnDef<GradeChangeRecord>[] = [
  buildSelectColumn(),
  buildNumberColumn("id", "ID"),

  buildReadonlyTextColumn("grade_customer_id", "Customer ID"),
  buildTextColumn("grade_customer_name", "Customer Name"),
  buildStatusColumn("status", "Status"),
  buildDateColumn("grade_default_date", "Default Date"),
  buildDateColumn("grade_resolution_date", "Resolution Date"),
  buildReadonlyTextColumn("grade_method", "Method"),

  buildReadonlyTextColumn("field1", "Field 1"),
  buildReadonlyTextColumn("field2", "Field 2"),
  buildReadonlyTextColumn("field3", "Field 3"),
  buildReadonlyTextColumn("field4", "Field 4"),
  buildReadonlyTextColumn("field5", "Field 5"),
  buildReadonlyTextColumn("field6", "Field 6"),
  buildReadonlyTextColumn("field7", "Field 7"),
  buildReadonlyTextColumn("field8", "Field 8"),
  buildReadonlyTextColumn("field9", "Field 9"),
  buildReadonlyTextColumn("field10", "Field 10"),

  buildActionColumn(),
];

export const MDL_VIEWER_COLUMNS = [...MDL_COMMON_COLUMNS];
export const MDL_REVIEWER_COLUMNS = [...MDL_COMMON_COLUMNS];
export const MDL_APPROVER_COLUMNS = [...MDL_COMMON_COLUMNS];
export const MDL_ADMIN_COLUMNS = [...MDL_COMMON_COLUMNS];
