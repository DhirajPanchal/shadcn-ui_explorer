// MdlPageGridWrapper now receives filter/sort updates from FrameDataGrid

import React, { useEffect, useState } from "react";
import { FrameDataGrid } from "./FrameDataGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataGridRequest, GradeChangeRecord } from "./model";

import { FrozenColumnSettings } from "./FrozenColumnSettings";
import { recordListingAPI } from "./external-interface";

interface Props {
  title: string;
  columns: ColumnDef<GradeChangeRecord>[];
  initialPayload: DataGridRequest;
}

export function MdlPageGridWrapper({ title, columns, initialPayload }: Props) {
  const [frozenColumnIds, setFrozenColumnIds] = useState<string[]>([
    "select",
    "grade_customer_name",
  ]);

  const [records, setRecords] = useState<GradeChangeRecord[]>([]);
  const [globalSearch, setGlobalSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [columnSorts, setColumnSorts] = useState<any[]>([]);

  function buildPayload(): DataGridRequest {
    const globalFilters = globalSearch
      ? ["grade_region", "grade_customer_name", "status"].map((name) => ({
          name,
          type: "TEXT_LIKE",
          str_value: globalSearch,
        }))
      : [];

    return {
      ...initialPayload,
      filter_by_list: [
        ...(initialPayload.filter_by_list || []),
        ...globalFilters,
        ...columnFilters,
      ],
      sort_by_list: [...(initialPayload.sort_by_list || []), ...columnSorts],
    };
  }

  function loadGrid(triggerer: string = "") {
    console.log("*LOAD : " + triggerer);
    const payload = buildPayload();
    // Mock logic – replace with actual API call
    const result: GradeChangeRecord[] = recordListingAPI(payload);
    setRecords(result);
  }

  useEffect(() => {
    loadGrid("SELF");
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Input
            value={globalSearch}
            placeholder="Search Region / Customer / Status"
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-[300px]"
          />
          <Button onClick={() => loadGrid("GLOBAL_SEARCH")}>Go</Button>
        </div>

        <FrozenColumnSettings
          allColumns={columns.map((col) => ({
            id: col.id!,
            label: col.meta?.label || col.id!,
          }))}
          frozenColumnIds={frozenColumnIds}
          onChange={setFrozenColumnIds}
        />
      </div>

      <FrameDataGrid
        columns={columns.map((col) => ({
          ...col,
          enableSorting: true,
          enableColumnFilter: true,
          meta: col.meta, // preserve column type info
        }))}
        data={records}
        gridHeader={title}
        onColumnFilterChange={(filters) => {
          setColumnFilters(filters);
          loadGrid("FILTER");
        }}
        onColumnSortChange={(sorts) => {
          setColumnSorts(sorts);
          loadGrid("SORT");
        }}
        onRefresh={() => {
          loadGrid("REFRESH");
        }}
        onClearAll={() => {
          setColumnFilters([]);
          setColumnSorts([]);
          loadGrid("CLEAR_ALL");
        }}
        frozenColumnIds={frozenColumnIds}
      />
    </div>
  );
}
