"use client";

import { useState } from "react";
import { Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Props<TData> {
  column: Column<TData, unknown>;
  title: string;
}

export function DataTableColumnHeader<TData>({ column, title }: Props<TData>) {
  const isSorted = column.getIsSorted();
  const columnType = column.columnDef.meta?.type;
  const enumValues = column.columnDef.meta?.enumValues;

  const [textValue, setTextValue] = useState("");
  const [enumValue, setEnumValue] = useState("");
  const [dateValue, setDateValue] = useState<Date | undefined>();
  const [dateOperator, setDateOperator] = useState("EQ");
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-1">
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={column.getToggleSortingHandler()}
        >
          <span>{title}</span>
          {isSorted === "asc" && <ArrowUp className="h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="h-4 w-4" />}
        </div>

        {column.getCanFilter() && (
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <Filter className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-2 w-[220px]" align="end">
              {columnType === "text" && (
                <Input
                  className="h-8"
                  placeholder="Filter..."
                  value={textValue}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTextValue(val);
                    column.setFilterValue({ operator: "TEXT_IN", value: val });
                  }}
                />
              )}

              {columnType === "enum" && (
                <Select
                  value={enumValue}
                  onValueChange={(val) => {
                    setEnumValue(val);
                    column.setFilterValue({ operator: "EQUAL", value: val });
                  }}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {(enumValues ?? []).map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {columnType === "date" && (
                <div className="space-y-2">
                  <Select
                    value={dateOperator}
                    onValueChange={(val) => {
                      setDateOperator(val);
                      if (dateValue) {
                        const formatted = format(dateValue, "yyyy-MM-dd");
                        column.setFilterValue({
                          operator: val,
                          value: formatted,
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EQ">=</SelectItem>
                      <SelectItem value="GT">&gt;</SelectItem>
                      <SelectItem value="GTE">&gt;=</SelectItem>
                      <SelectItem value="LT">&lt;</SelectItem>
                      <SelectItem value="LTE">&lt;=</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={dateValue}
                      onSelect={(val: Date | undefined) => {
                        if (val) {
                          setDateValue(val);
                          const formatted = format(val, "yyyy-MM-dd");
                          column.setFilterValue({
                            operator: dateOperator,
                            value: formatted,
                          });
                        }
                      }}
                      initialFocus
                    />
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
