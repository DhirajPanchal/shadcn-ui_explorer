"use client";

import { Row } from "@tanstack/react-table";
import { GradeChangeRecord } from "./model";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface Props {
  row: Row<GradeChangeRecord>;
}

export function DataTableRowActions({ row }: Props) {
  const record = row.original;

  return (
    <div className="flex justify-end">
      <Button size="icon" variant="ghost">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
}
