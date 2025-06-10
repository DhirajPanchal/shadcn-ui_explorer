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
  const [dateOperator, setDateOperator] = useState("GT");
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-1 px-2">
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
                <Filter className="h-4 w-4 text-gray-400 dark:text-gray-400" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="overflow-hidden p-0" align="end">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-md space-y-2">
                {columnType === "text" && (
                  <Input
                    className="h-8"
                    placeholder="Filter..."
                    value={textValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTextValue(val);
                      column.setFilterValue({
                        operator: "TEXT_IN",
                        value: val,
                      });
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
                    <SelectTrigger className="h-8 w-full">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="min-w-[200px] ml-auto">
                      {(enumValues ?? []).map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {columnType === "date" && (
                  <>
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
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EQ">=</SelectItem>
                        <SelectItem value="GT">&gt;</SelectItem>
                        <SelectItem value="GTE">&gt;=</SelectItem>
                        <SelectItem value="LT">&lt;</SelectItem>
                        <SelectItem value="LTE">&lt;=</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="rounded-md border bg-popover p-2 shadow-md">
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
                        className="rounded-md"
                      />
                    </div>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
