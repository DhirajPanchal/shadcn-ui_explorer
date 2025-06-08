"use client";

import { RefreshCw, SettingsIcon } from "lucide-react";
import * as React from "react";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FrameDataGridPagination } from "./FrameDataGridPagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FrameDataGridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSkip: number;
  pageLimit: number;
  total: number;
  onPageChange: (pageIndex: number) => void;
  onPageLimitChange: (pageSize: number) => void;
  onRefresh?: () => void;
  gridHeader?: React.ReactNode;
}

export function FrameDataGrid<TData, TValue>({
  columns,
  data,
  pageSkip,
  pageLimit,
  total,
  onPageChange,
  onPageLimitChange,
  onRefresh,
  gridHeader,
}: FrameDataGridProps<TData, TValue>) {
  const rowHeight = 48;
  const visibleRowCount = data.length > 10 ? 10 : data.length;
  const scrollable = data.length > 10;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* Header controls */}
      <div className="flex items-center justify-between mb-2 gap-4">
        {gridHeader}

        <div className="flex items-center gap-2">
          <Select
            value={pageLimit.toString()}
            onValueChange={(val) => onPageLimitChange(Number(val))}
          >
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 30].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} records per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    className="capitalize"
                    checked={col.getIsVisible()}
                    onCheckedChange={(value) => col.toggleVisibility(!!value)}
                  >
                    {typeof col.columnDef.header === "string"
                      ? col.columnDef.header
                      : col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table header */}
      <div className="rounded-t-md border border-b-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
      </div>

      {/* Scrollable table body */}
      <div
        className={`border-x border-b rounded-b-md ${
          scrollable ? "overflow-y-auto" : ""
        }`}
        style={{ height: scrollable ? `${rowHeight * 10}px` : "auto" }}
      >
        <Table>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between m-1">
        <div className="text-muted-foreground text-sm whitespace-nowrap">
          {table.getFilteredSelectedRowModel().rows.length} of record(s)
          selected. | {data.length}
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
