// FrameDataGrid.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GradeChangeRecord } from "./model";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Settings } from "lucide-react";
import { FrameDataGridPagination } from "./FrameDataGridPagination";

interface FrameDataGridProps {
  columns: ColumnDef<GradeChangeRecord, any>[];
  data: GradeChangeRecord[];
  pageSkip: number;
  pageLimit: number;
  total: number;
  onPageChange: (skip: number) => void;
  onPageLimitChange: (limit: number) => void;
  onRefresh: () => void;
  gridHeader: React.ReactNode;
}

export function FrameDataGrid({
  columns,
  data,
  pageSkip,
  pageLimit,
  total,
  onPageChange,
  onPageLimitChange,
  onRefresh,
  gridHeader,
}: FrameDataGridProps) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / pageLimit),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  const showScroll = data.length > 10;
  const selectedRowCount = Object.keys(rowSelection).length;

  return (
    <div className="rounded-md border bg-card text-card-foreground shadow">
      {/* Grid Header: Search + Controls */}
      <div className="flex flex-wrap items-center justify-between px-2 py-2 gap-2 border-b">
        <div>{gridHeader}</div>

        <div className="flex items-center gap-2">
          {/* Page size dropdown */}
          <select
            value={pageLimit}
            onChange={(e) => onPageLimitChange(Number(e.target.value))}
            className="text-sm border rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          {/* Settings */}
          <div className="relative group">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="Settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px]">
                {table
                  .getAllLeafColumns()
                  .filter((col) => col.id !== "select" && col.id !== "actions")
                  .map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      className="capitalize"
                      checked={col.getIsVisible()}
                      onCheckedChange={(value) => col.toggleVisibility(!!value)}
                    >
                      {col.columnDef.meta?.label ?? col.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className={`w-full overflow-x-auto ${
          showScroll ? "overflow-y-auto" : "overflow-y-hidden"
        }`}
        style={{
          maxHeight: showScroll ? `${48 * 10 + 56}px` : undefined,
        }}
      >
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left px-2 py-1 whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="align-top px-2 py-1 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-muted-foreground py-6"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Selection Info */}
      <div className="px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t text-sm">
        <div className="text-muted-foreground whitespace-nowrap">
          {selectedRowCount} record(s) selected
        </div>

        <FrameDataGridPagination
          total={total}
          pageSkip={pageSkip}
          pageLimit={pageLimit}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
