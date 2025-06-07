"use client";

import { Input } from "@/components/ui/input";

export function GridHeader() {
  return (
    <Input
      placeholder="Filter across columns"
      className="max-w-sm text-sm"
    />
  );
}
