"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings2 } from "lucide-react";

interface FrozenColumnSettingsProps {
  allColumns: { id: string; label: string }[];
  frozenColumnIds: string[];
  onChange: (newFrozen: string[]) => void;
}

export function FrozenColumnSettings({
  allColumns,
  frozenColumnIds,
  onChange,
}: FrozenColumnSettingsProps) {
  const [open, setOpen] = useState(false);

  const toggleColumn = (columnId: string) => {
    const updated = frozenColumnIds.includes(columnId)
      ? frozenColumnIds.filter((id) => id !== columnId)
      : [...frozenColumnIds, columnId];
    onChange(updated);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="w-4 h-4 mr-1" /> Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 space-y-2">
        <div className="font-medium text-sm">Freeze Columns</div>
        {allColumns.map((col) => (
          <div key={col.id} className="flex items-center space-x-2">
            <Checkbox
              id={`freeze-${col.id}`}
              checked={frozenColumnIds.includes(col.id)}
              onCheckedChange={() => toggleColumn(col.id)}
            />
            <label htmlFor={`freeze-${col.id}`} className="text-sm">
              {col.label}
            </label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
