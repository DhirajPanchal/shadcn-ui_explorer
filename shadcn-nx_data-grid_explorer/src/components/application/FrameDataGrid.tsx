// FrameDataGrid: pure grid with external filter/sort event handlers

import React, { useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GradeChangeRecord } from "@/components/application/model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FrameDataGridPagination } from "./FrameDataGridPagination";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FrameDataGridProps {
  data: GradeChangeRecord[];
  columns: ColumnDef<GradeChangeRecord>[];
  gridHeader?: React.ReactNode;
  onColumnFilterChange?: (filters: any[]) => void;
  onColumnSortChange?: (sorts: any[]) => void;
  onRefresh?: () => void;
  onClearAll?: () => void;
  frozenColumnIds?: string[];
  pageLimit: number;
  onPageLimitChange: (newLimit: number) => void;
  pageSkip: number;
  //pageLimit: number;
  pageTotal: number;
  onPageChange: (newSkip: number) => void;
}

export function FrameDataGrid({
  data,
  columns,
  gridHeader,
  onColumnFilterChange,
  onColumnSortChange,
  onRefresh,
  onClearAll,
  frozenColumnIds = [],
  pageLimit,
  onPageLimitChange,
  pageSkip,
  pageTotal,
  onPageChange,
}: FrameDataGridProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(pageTotal / pageLimit),
    manualFiltering: true,
    manualSorting: true,
  });

  useEffect(() => {
    if (onColumnFilterChange) {
      const filters = columnFilters.map((filter) => {
        const column = columns.find((col) => col.id === filter.id);
        const value = filter.value as { operator: string; value: string };
        const type =
          column?.meta?.type === "date" ? value.operator : value.operator;
        const key = column?.meta?.type === "date" ? "date_value" : "str_value";
        return {
          name: filter.id,
          type,
          [key]: value.value,
        };
      });

      onColumnFilterChange(filters);
    }
  }, [columnFilters]);

  useEffect(() => {
    if (onColumnSortChange) {
      const sorts = sorting.map((s) => ({
        name: s.id,
        is_asc: s.desc === false,
      }));
      onColumnSortChange(sorts);
    }
  }, [sorting]);

  function getStickyClass(columnId: string): string {
    return frozenColumnIds.includes(columnId)
      ? "sticky z-10 bg-background"
      : "";
  }

  const stickyOffsets: Record<string, number> = {};
  let cumulativeLeft = 0;

  for (const id of frozenColumnIds) {
    let width = 150;
    if (id === "select") width = 40;
    else if (id === "grade_customer_id") width = 75;
    stickyOffsets[id] = cumulativeLeft;
    cumulativeLeft += width;
  }

  const handleClearAll = () => {
    console.log("CLEAR ALL inside");
    setColumnFilters([]);
    setSorting([]);
    if (onClearAll) {
      onClearAll();
    }
  };

  return (
    <Card className="w-full">
      {/* {gridHeader} */}

      <CardContent className="p-0">
        {/* Top control (Page Size dropdown) */}
        <div className="flex justify-end px-4 py-2">
          <Select
            value={String(pageLimit)}
            onValueChange={(value) => onPageLimitChange(Number(value))}
          >
            <SelectTrigger className="w-24 h-8">
              <SelectValue placeholder="Page Size" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Scrollable shared container for both header + body */}

        <div className="relative overflow-auto max-h-[500px]">
          <table className="w-full border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 bg-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const columnId = header.column.id;
                    const isSticky = columnId in stickyOffsets;
                    const left = stickyOffsets[columnId];
                    const columnWidth =
                      columnId === "select"
                        ? 40
                        : columnId === "grade_customer_id"
                        ? 75
                        : 150;
                    return (
                      <th
                        key={header.id}
                        className={`p-2 text-left align-middle font-medium text-sm ${
                          isSticky
                            ? "sticky z-30 bg-background border-b-2 border-blue-600"
                            : ""
                        }`}
                        style={{
                          width: columnWidth,
                          minWidth: columnWidth,
                          maxWidth: columnWidth,
                          ...(isSticky && { left }),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t">
                  {row.getVisibleCells().map((cell) => {
                    const columnId = cell.column.id;
                    const isSticky = columnId in stickyOffsets;
                    const left = stickyOffsets[columnId];
                    const columnWidth =
                      columnId === "select"
                        ? 40
                        : columnId === "grade_customer_id"
                        ? 75
                        : 150;
                    return (
                      <td
                        key={cell.id}
                        className={`p-2 align-middle text-sm ${
                          isSticky ? "sticky z-10 bg-background" : ""
                        }`}
                        style={{
                          width: columnWidth,
                          minWidth: columnWidth,
                          maxWidth: columnWidth,
                          ...(isSticky && { left }),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            Refresh
          </Button>
          <Button variant="secondary" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            disabled={pageSkip === 0}
            onClick={() => onPageChange(0)}
          >
            |&lt; First
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={pageSkip === 0}
            onClick={() => onPageChange(Math.max(0, pageSkip - pageLimit))}
          >
            &lt; Prev
          </Button>

          <span className="text-sm text-muted-foreground px-2">
            {pageTotal === 0
              ? "0"
              : `${pageSkip + 1} - ${Math.min(
                  pageSkip + pageLimit,
                  pageTotal
                )} of ${pageTotal}`}
          </span>

          <Button
            variant="ghost"
            size="sm"
            disabled={pageSkip + pageLimit >= pageTotal}
            onClick={() => onPageChange(pageSkip + pageLimit)}
          >
            Next &gt;
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={pageSkip + pageLimit >= pageTotal}
            onClick={() =>
              onPageChange(Math.floor((pageTotal - 1) / pageLimit) * pageLimit)
            }
          >
            Last &gt;|
          </Button>
        </div>
      </div>
    </Card>
  );
}
