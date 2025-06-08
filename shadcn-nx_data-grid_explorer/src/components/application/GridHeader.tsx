"use client";

import { Input } from "@/components/ui/input";

interface GridHeaderProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GridHeader({ value, onChange }: GridHeaderProps) {
  return (
    <Input
      placeholder="Filter across columns"
      className="max-w-sm text-sm"
      value={value}
      onChange={onChange}
    />
  );
}
