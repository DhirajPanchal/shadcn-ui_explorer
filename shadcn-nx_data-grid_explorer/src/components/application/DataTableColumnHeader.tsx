import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const columnType = column?.columnDef?.meta?.type;
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateOperator, setDateOperator] = useState("DATE_GE");

  const textValueRef = useRef("");
  const enumValueRef = useRef("");
  const dateValueRef = useRef<Date | undefined>(undefined);

  const applyFilter = () => {
    if (columnType === "text") {
      column.setFilterValue({
        operator: "TEXT_LIKE",
        value: textValueRef.current,
      });
    } else if (columnType === "enum") {
      column.setFilterValue({ operator: "EQUAL", value: enumValueRef.current });
    } else if (columnType === "date" && dateValueRef.current) {
      const formatted = format(dateValueRef.current, "yyyy-MM-dd");
      column.setFilterValue({ operator: dateOperator, value: formatted });
    }
    setFilterOpen(false);
  };

  const isFiltered = column.getFilterValue() !== undefined;

  return (
    <div className="flex items-center space-x-1">
      <span>{title}</span>
      {column.getCanSort() && (
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(false)}
            className={cn(
              "px-1",
              column.getIsSorted() === "desc" && "text-blue-600"
            )}
          >
            <ArrowDown size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(true)}
            className={cn(
              "px-1",
              column.getIsSorted() === "asc" && "text-blue-600"
            )}
          >
            <ArrowUp size={14} />
          </Button>
        </div>
      )}

      {column.getCanFilter() && (
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={isFiltered ? "secondary" : "outline"}
              size="sm"
              className={cn(
                "px-1 h-6 text-xs",
                isFiltered && "text-blue-600 border-blue-600"
              )}
            >
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-2 bg-yellow-50 dark:bg-yellow-950"
            align="end"
          >
            <div className="p-2 rounded-md bg-background space-y-2">
              {columnType === "text" && (
                <Input
                  className="h-8"
                  placeholder="Filter..."
                  defaultValue={textValueRef.current}
                  onChange={(e) => (textValueRef.current = e.target.value)}
                />
              )}

              {columnType === "enum" && (
                <Select onValueChange={(val) => (enumValueRef.current = val)}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {column.columnDef?.meta?.enumValues?.map((v: string) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {columnType === "date" && (
                <div className="space-y-2">
                  <Select value={dateOperator} onValueChange={setDateOperator}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DATE_GE">On or After</SelectItem>
                      <SelectItem value="DATE_LE">On or Before</SelectItem>
                    </SelectContent>
                  </Select>

                  <Calendar
                    mode="single"
                    selected={dateValueRef.current}
                    onSelect={(val) => (dateValueRef.current = val)}
                    initialFocus
                    className="rounded-md"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    column.setFilterValue(undefined);
                    setFilterOpen(false);
                  }}
                >
                  <X className="h-3 w-3" /> Clear
                </Button>
                <Button variant="default" size="sm" onClick={applyFilter}>
                  Go
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
