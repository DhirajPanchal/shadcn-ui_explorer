// MdlPageGridWrapper now receives filter/sort updates from FrameDataGrid

import React, { useEffect, useState } from "react";
import { FrameDataGrid } from "./FrameDataGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataGridRequest,
  DEFAULT_INPUT_STATE,
  DEFAULT_OUTPUT_STATE,
  GradeChangeRecord,
  InputState,
  OutputState,
} from "./model";

import { FrozenColumnSettings } from "./FrozenColumnSettings";
import { recordListingAPI } from "./external-interface";
import { log } from "console";
import { DUMMY_RECORDS } from "./dummy";

interface Props {
  title: string;
  columns: ColumnDef<GradeChangeRecord>[];
  initialPayload: DataGridRequest;
}

export function MdlPageGridWrapper({ title, columns, initialPayload }: Props) {
  //
  // INPUT STATE
  const [inputState, setInputState] = useState<InputState>(DEFAULT_INPUT_STATE);

  // OUTPUT
  const [outputState, setOutputState] =
    useState<OutputState<GradeChangeRecord>>(DEFAULT_OUTPUT_STATE);

  // FIRST CALL
  useEffect(() => {
    triggerAPI("SELF");
  }, []);

  // MONITOR - INPUT STATE
  useEffect(() => {
    console.log("INPUT CHANGED");
    triggerAPI("INPUT");
  }, [inputState]);

  // TRIGGER API
  const triggerAPI = (triggerer: string = "") => {
    console.log("TRIGGER API < " + triggerer + " > ***");
    console.log(inputState);

    const result: GradeChangeRecord[] = recordListingAPI({
      ...inputState,
    });
    console.log("result LEN : " + result.length);

    setOutputState({
      skip: inputState.skip,
      limit: inputState.limit,
      total: DUMMY_RECORDS.length, // adjust if filtering is added
      data: result,
    });
  };

  // FILTER
  const handleFilterChange = (filters: any[]) => {
    console.log("FILTER : ");
    console.log(filters);
    setInputState((existing) => {
      return { ...existing, filters: filters };
    });
  };

  // SORT
  const handleSortChange = (sorts: any[]) => {
    console.log("SORT : ");
    console.log(sorts);
    setInputState((existing) => {
      return { ...existing, sorts: sorts };
    });
  };

  // CLEAR ALL
  const handleClearAll = () => {
    console.log("CLEAR ALL");
    setInputState(DEFAULT_INPUT_STATE);
  };

  const handleRefresh = () => {
    console.log("REFRESH");
  };

  //
  //
  //
  //
  //

  const [frozenColumnIds, setFrozenColumnIds] = useState<string[]>([
    "select",
    "grade_customer_id",
  ]);

  const handlePageLimitChange = (newLimit: number) => {
    setInputState((prev) => ({ ...prev, limit: newLimit, skip: 0 }));
  };

  const handlePageChange = (newSkip: number) => {
    setInputState((prev) => ({ ...prev, skip: newSkip }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>

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
        data={outputState.data ? outputState.data : []}
        gridHeader={title}
        onColumnFilterChange={(filters) => {
          handleFilterChange(filters);
        }}
        onColumnSortChange={(sorts) => {
          handleSortChange(sorts);
        }}
        onRefresh={handleRefresh}
        onClearAll={handleClearAll}
        frozenColumnIds={frozenColumnIds}
        pageLimit={inputState.limit ?? 10}
        onPageLimitChange={handlePageLimitChange}
        pageSkip={inputState.skip ?? 0}
        pageTotal={outputState.total ?? 100}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
