"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import { FrameDataGrid } from "./FrameDataGrid";
import { GridHeader } from "./GridHeader";
import {
  DataGridRequest,
  DataGridResponse,
  GradeChangeRecord,
  GRID_DAFAULT_DATA,
} from "./model";
import { loadGradeRecords } from "./external-interface";

interface MdlPageGridWrapperProps {
  title: string;
  initialPayload: DataGridRequest;
  columns: ColumnDef<GradeChangeRecord, any>[];
}

export function MdlPageGridWrapper({
  title,
  initialPayload,
  columns,
}: MdlPageGridWrapperProps) {
  const [gridPayload, setGridPayload] =
    useState<DataGridRequest>(initialPayload);
  const [gridData, setGridData] =
    useState<DataGridResponse<GradeChangeRecord>>(GRID_DAFAULT_DATA);

  const [searchText, setSearchText] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Load grid data from API
  const loadGrid = async () => {
    const response = await loadGradeRecords(gridPayload);
    setGridData(response);
  };

  // Compose and update gridPayload whenever sort or searchText changes
  useEffect(() => {
    const composedPayload: DataGridRequest = {
      ...initialPayload,
      skip: gridPayload.skip,
      limit: gridPayload.limit,
      sort_by_list: sorting.map((s) => ({
        name: s.id,
        is_asc: !s.desc,
      })),
      filter_by_list: [
        ...initialPayload.filter_by_list, // status filter
        ...(searchText.trim()
          ? [
              {
                name: "grade_customer_name",
                type: "TEXT_CONTAINS",
                str_value: searchText.trim(),
              },
            ]
          : []),
      ],
    };

    setGridPayload(composedPayload);
  }, [searchText, sorting]);

  useEffect(() => {
    loadGrid();
  }, [gridPayload]);

  // Handle page size or page number changes
  const handlePageChange = (newSkip: number) => {
    setGridPayload((prev) => ({ ...prev, skip: newSkip }));
  };

  const handlePageSizeChange = (newLimit: number) => {
    setGridPayload((prev) => ({ ...prev, skip: 0, limit: newLimit }));
  };

  return (
    <section className="mx-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <FrameDataGrid
        columns={columns}
        data={gridData.data}
        pageSkip={gridData.skip}
        pageLimit={gridData.limit}
        total={gridData.total}
        onPageChange={handlePageChange}
        onPageLimitChange={handlePageSizeChange}
        onRefresh={loadGrid}
        gridHeader={
          <GridHeader
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        }
      />
    </section>
  );
}
