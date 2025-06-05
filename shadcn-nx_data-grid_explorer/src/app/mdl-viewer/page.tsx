"use client";

import { useEffect, useState } from "react";

import { mdlColumns } from "./mdl-viewer-metadata";
import { GradeChangeRecord } from "./mdl-viewer-metadata";
import { fetchGradeRecords } from "./api-interface";
import { FrameDataGrid } from "@/components/frame-datagrid/FrameDataGrid";

export default function Page() {
  const [data, setData] = useState<GradeChangeRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(10); // initial page size

  const loadData = async (index: number, size: number) => {
    const res = await fetchGradeRecords({
      index: index + 1, // server expects 1-based index
      size,
      filter: [],
      sort: [],
    });
    setData(res.data);
    setTotal(res.total);
  };

  useEffect(() => {
    loadData(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  return (
    <section className="m-4">
      <h1 className="text-2xl font-bold mb-4">Master Default List</h1>
      <FrameDataGrid
        columns={mdlColumns}
        data={data}
        pageIndex={pageIndex}
        pageSize={pageSize}
        total={total}
        onPageChange={(newPage) => setPageIndex(newPage)}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageIndex(0); // reset to first page on size change
        }}
      />
    </section>
  );
}
