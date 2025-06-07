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

const frameCellRenderer = (value: string) => {
  const strValue = value !== undefined && value !== null ? value : "";
  return (
    <div
      className="max-w-[200px] truncate whitespace-nowrap overflow-hidden capitalize"
      title={String(strValue)}
    >
      {String(strValue)}
    </div>
  );
};

const frameDateCellRenderer = (value: string) => {
  if (!value) {
    return <div className="test-gray-400">-</div>;
  }
  const date = new Date(value);
  const isValid = !isNaN(date.getTime());
  return (
    <div>
      {isValid ? (
        format(date, "MM/dd/yyyy")
      ) : (
        <span className="text-red-400">INVALID</span>
      )}
    </div>
  );
};

export const MDL_VIEWER_COLUMNS: ColumnDef<GradeChangeRecord>[] = [
  {
    id: "select",
    header: () => (
      <div className="flex justify-center">
        <Checkbox aria-label="Select all" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 10,
    meta: {
      className: "w-[200px]", // Increased from 60px → 80px
    },
  },
  {
    accessorKey: "grade_customer_id",
    header: () => (
      <div className="capitalize border-l border-muted-foreground/20 pl-4">
        Customer ID
      </div>
    ),
    cell: ({ row }) => frameCellRenderer(row.getValue("grade_customer_id")),
  },

  {
    accessorKey: "grade_customer_name",
    header: "Customer Name",
    cell: ({ row }) => frameCellRenderer(row.getValue("grade_customer_name")),
  },

  {
    accessorKey: "grade_gedu_legal_name",
    header: "Customer Legal Name",
    cell: ({ row }) => frameCellRenderer(row.getValue("grade_gedu_legal_name")),
  },

  {
    accessorKey: "grade_region",
    header: "Region",
    cell: ({ row }) => frameCellRenderer(row.getValue("grade_region")),
  },
  {
    accessorKey: "grade_site",
    header: "Site",
    cell: ({ row }) => frameCellRenderer(row.getValue("grade_site")),
  },
  {
    accessorKey: "grade_method",
    header: "Method",
    cell: ({ row }) => frameCellRenderer(row.getValue("grade_method")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const statusStyleMap: Record<string, string> = {
        INITIAL: "text-blue-700 border-blue-700 bg-blue-700/10",
        PENDING_REVIEW: "text-yellow-700 border-yellow-700 bg-yellow-700/10",
        PENDING_APPROVAL: "text-orange-700 border-orange-700 bg-orange-700/10",
        APPROVED: "text-green-700 border-green-700 bg-green-700/10",
      };

      const baseClasses =
        "inline-flex items-center justify-center min-w-[144px] max-w-full px-3 py-1 text-xs font-semibold rounded-full tracking-wide text-center border";

      return (
        <span className={`${baseClasses} ${statusStyleMap[status] || ""}`}>
          {status.replace(/_/g, " ")}
        </span>
      );
    },
  },

  {
    accessorKey: "grade_default_date",
    header: "Default Date",
    cell: ({ row }) =>
      frameDateCellRenderer(row.getValue("grade_default_date")),
  },

  {
    accessorKey: "grade_resolution_date",
    header: "Resolution Date",
    cell: ({ row }) =>
      frameDateCellRenderer(row.getValue("grade_resolution_date")),
  },

  {
    accessorKey: "grade_grp_default_reason_desc",
    header: "Default Reason",
    cell: ({ row }) =>
      frameCellRenderer(row.getValue("grade_grp_default_reason_desc")),
  },

  {
    id: "actions",
    header: () => (
      <div className="flex items-center justify-center gap-1 text-muted-foreground">
        <Menu className="h-4 w-4" />
        <span className="text-xs font-medium">Actions</span>
      </div>
    ),
    enableHiding: false,
    cell: ({ row }) => {
      return (
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
      );
    },
  },
];
