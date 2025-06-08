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
    header: () => (
      <div className={`${columnBaseClass} bg-gray-200`}>{label}</div>
    ),
    cell: ({ row }) => {
      const val = row.getValue(accessorKey as string);
      const strValue =
        val !== undefined && val !== null && val !== "" ? String(val) : "-";
      return <div className={`${columnBaseClass} bg-blue-200`}>{strValue}</div>;
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
      <div className="flex justify-center ml-2 mr-4">
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

export function buildStatusColumn<T>(
  accessorKey: keyof T,
  label: string,
  size: number = 160
): ColumnDef<T> {
  const statusStyleMap: Record<string, string> = {
    INITIAL: "text-blue-700 border-blue-700 bg-blue-700/10",
    PENDING_REVIEW: "text-yellow-700 border-yellow-700 bg-yellow-700/10",
    PENDING_APPROVAL: "text-orange-700 border-orange-700 bg-orange-700/10",
    APPROVED: "text-green-700 border-green-700 bg-green-700/10",
  };

  const baseClasses =
    "inline-flex items-center justify-center min-w-[120px] max-w-full px-3 py-1 text-xs font-semibold rounded-full tracking-wide text-center border";

  return {
    accessorKey: accessorKey as string,
    header: () => <div className="px-4 py-2">{label}</div>,
    cell: ({ row }) => {
      const val = row.getValue(accessorKey as string) as string;
      const style = statusStyleMap[val] || "bg-gray-100 text-gray-600 border";
      return (
        <span className={`${baseClasses} ${style}`}>
          {val?.replace(/_/g, " ") || "-"}
        </span>
      );
    },
    size,
  };
}

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
