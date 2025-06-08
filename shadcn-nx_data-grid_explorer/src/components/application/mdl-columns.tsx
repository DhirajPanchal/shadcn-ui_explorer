"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, FileEdit, Menu, Dot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GradeChangeRecord } from "./model";
import { format } from "date-fns";

export function buildTextColumn<T>(
  accessorKey: keyof T,
  label: string,
  size: number = 180
): ColumnDef<T> {
  //bg-blue-200
  const columnBaseClass =
    "min-w-[140px] max-w-[200px] px-4 py-2 truncate whitespace-nowrap text-sm ";

  return {
    accessorKey: accessorKey as string,
    meta: { label: label },
    header: () => <div className={`${columnBaseClass}`}>{label}</div>,
    cell: ({ row }) => {
      const val = row.getValue(accessorKey as string);
      const strValue =
        val !== undefined && val !== null && val !== "" ? String(val) : "-";
      return <div className={`${columnBaseClass}`}>{strValue}</div>;
    },
    size,
  };
}

export function buildDateColumn<T>(
  accessorKey: keyof T,
  label: string,
  size: number = 160
): ColumnDef<T> {
  return {
    accessorKey: accessorKey as string,
    meta: { label: label },
    header: () => <div className="px-4 py-2">{label}</div>,
    cell: ({ row }) => {
      const val = row.getValue(accessorKey as string);
      if (!val) return <div className="text-muted-foreground">-</div>;

      const date = new Date(val as string);
      const formatted = !isNaN(date.getTime())
        ? format(date, "MM/dd/yyyy")
        : "INVALID";

      return (
        <div
          className="min-w-[120px] max-w-[180px] px-4 py-2 whitespace-nowrap text-sm"
          title={String(val)}
        >
          {formatted}
        </div>
      );
    },
    size,
  };
}

export function buildCheckboxColumn<T>(): ColumnDef<T, unknown> {
  return {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center ml-2 mr-4">
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center ml-2 mr-4 mt-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(!!val)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 48,
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

const statusColorMap: Record<string, string> = {
  INITIAL: "bg-gray-100 text-gray-800",
  "PENDING REVIEW": "bg-blue-100 text-blue-800",
  "PENDING APPROVAL": "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export function buildStatusColumn(
  accessorKey: keyof GradeChangeRecord,
  label: string
): ColumnDef<GradeChangeRecord> {
  return {
    accessorKey,
    meta: { label },
    header: () => <div className="text-left">{label}</div>,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <span
          className={`inline-block min-w-[10rem] px-2 py-0.5 text-center text-xs font-medium rounded-full ${
            statusColorMap[value] ?? "bg-gray-200 text-gray-800"
          }`}
        >
          {value}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  };
}

// safelist: [
//   "bg-gray-100", "text-gray-800",
//   "bg-blue-100", "text-blue-800",
//   "bg-yellow-100", "text-yellow-800",
//   "bg-green-100", "text-green-800",
//   "bg-red-100", "text-red-800",
//   "bg-gray-200", "text-gray-800",
// ]

export const MDL_COMMON_COLUMNS: ColumnDef<GradeChangeRecord>[] = [
  buildCheckboxColumn<GradeChangeRecord>(),
  buildTextColumn("grade_customer_id", "Customer ID"),
  buildTextColumn("grade_customer_name", "Customer Name"),
  buildTextColumn("grade_gedu_legal_name", "Customer Legal Name"),
  buildTextColumn("grade_region", "Region"),
  buildTextColumn("grade_site", "Site"),
  buildTextColumn("grade_method", "Method"),
  buildStatusColumn("status", "Status"),
  buildDateColumn("grade_default_date", "Default Date"),
  buildDateColumn("grade_resolution_date", "Resolution Date"),
  buildTextColumn("grade_grp_default_reason_desc", "Default Reason"),
  buildActionColumn<GradeChangeRecord>(),
];

export const MDL_VIEWER_COLUMNS: ColumnDef<GradeChangeRecord>[] = [
  ...MDL_COMMON_COLUMNS,
];

export const MDL_REVIEWER_COLUMNS: ColumnDef<GradeChangeRecord>[] = [
  ...MDL_COMMON_COLUMNS,
];

export const MDL_APPROVER_COLUMNS: ColumnDef<GradeChangeRecord>[] = [
  ...MDL_COMMON_COLUMNS,
];

export const MDL_ADMIN_COLUMNS: ColumnDef<GradeChangeRecord>[] = [
  ...MDL_COMMON_COLUMNS,
];
