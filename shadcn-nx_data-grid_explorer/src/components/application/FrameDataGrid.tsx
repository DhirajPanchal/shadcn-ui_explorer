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

interface FrameDataGridProps {
  data: GradeChangeRecord[];
  columns: ColumnDef<GradeChangeRecord>[];
  gridHeader?: React.ReactNode;
  onColumnFilterChange?: (filters: any[]) => void;
  onColumnSortChange?: (sorts: any[]) => void;
  onRefresh: () => void;
  onClearAll: () => void;
}

export function FrameDataGrid({
  data,
  columns,
  gridHeader,
  onColumnFilterChange,
  onColumnSortChange,
  onRefresh,
  onClearAll,
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
    manualFiltering: true,
    manualSorting: true,
  });

  useEffect(() => {
    if (onColumnFilterChange) {
      const filters = columnFilters.map((filter) => {
        const column = columns.find((col) => col.id === filter.id);
        const value = filter.value as { operator: string; value: string }; // 👈 Add this line
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

  const STICKY_LEFT_COLUMNS = 3;

  function getStickyClass(index: number): string {
    const stickyMap: Record<number, string> = {
      0: "sticky left-0 z-10 bg-background",
      1: "sticky left-[40px] z-10 bg-background", // Select column
      2: "sticky left-[190px] z-10 bg-background", // 40 + 150 + spacing
    };
    return stickyMap[index] || "";
  }

  return (
    <Card className="w-full">
      {gridHeader && (
        <CardHeader>
          <CardTitle>{gridHeader}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={getStickyClass(header.index)}
                      style={{ minWidth: 120 }}
                    >
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
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={getStickyClass(cell.column.getIndex())}
                      style={{ minWidth: 120 }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* <FrameDataGridPagination table={table} /> */}
      </CardContent>

      <div className="flex gap-2 ml-auto">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          Refresh
        </Button>
        <Button variant="secondary" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
      </div>
    </Card>
  );
}
