"use client";

import { useEffect, useState } from "react";

import { FrameDataGrid } from "@/components/application/FrameDataGrid";
import {
  DataGridRequest,
  DataGridResponse,
  GradeChangeRecord,
  GRID_DAFAULT_DATA,
  VIEWER_GRID_DAFAULT_PAYLOAD,
} from "@/components/application/model";
import { MDL_VIEWER_COLUMNS } from "@/components/application/mdl-columns";
import {
  GRID_ACTION_CLEAR_ALL,
  GRID_ACTION_PAGE_NUMBER_CHANGE,
  GRID_ACTION_PAGE_SIZE_CHANGE,
} from "@/components/application/constants";
import { loadGradeRecords } from "@/components/application/external-interface";
import { GridHeader } from "@/components/application/GridHeader";

export default function Page() {
  const [gridPayload, setGridPayload] = useState<DataGridRequest>(
    VIEWER_GRID_DAFAULT_PAYLOAD
  );

  const [gridData, setGridData] =
    useState<DataGridResponse<GradeChangeRecord>>(GRID_DAFAULT_DATA);

  const processGridPayload = (action: string = "", value: number = 0) => {
    if (action === GRID_ACTION_PAGE_SIZE_CHANGE) {
      setGridPayload((existing) => {
        return { ...existing, skip: 0, limit: value };
      });
    } else if (action === GRID_ACTION_PAGE_NUMBER_CHANGE) {
      setGridPayload((existing) => {
        return { ...existing, skip: value };
      });
    } else if (action === GRID_ACTION_CLEAR_ALL) {
      setGridPayload(VIEWER_GRID_DAFAULT_PAYLOAD);
    }
  };

  const loadGrid = async () => {
    const response = await loadGradeRecords(gridPayload);
    setGridData(response);
  };

  useEffect(() => {
    loadGrid();
  }, [gridPayload]);

  return (
    <section className="m-4">
      <h1 className="text-2xl font-bold mb-4">VIEWER PAGE</h1>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="rounded-md border bg-card text-card-foreground shadow p-6">
          <div className="text-sm font-medium text-muted-foreground">Queue</div>
          <div className="text-4xl font-bold text-purple-600">4</div>
        </div>
        <div className="rounded-md border bg-card text-card-foreground shadow p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Pending
          </div>
          <div className="text-4xl font-bold text-orange-600">7</div>
        </div>
      </div>

      <FrameDataGrid
        columns={MDL_VIEWER_COLUMNS}
        data={gridData.data}
        pageSkip={gridData.skip}
        pageLimit={gridData.limit}
        total={gridData.total}
        onPageChange={(newPage) =>
          processGridPayload(GRID_ACTION_PAGE_NUMBER_CHANGE, newPage)
        }
        onPageLimitChange={(newSize) =>
          processGridPayload(GRID_ACTION_PAGE_SIZE_CHANGE, newSize)
        }
        onRefresh={loadGrid}
        gridHeader={<GridHeader />}
      />
    </section>
  );
}
