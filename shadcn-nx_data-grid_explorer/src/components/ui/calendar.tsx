"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

//import "react-day-picker/dist/style.css";

export function Calendar({
  className,
  classNames,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex justify-between items-center px-2",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-2",
        nav_button:
          "h-7 w-7 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse",
        head_row: "",
        head_cell: "text-muted-foreground text-xs font-normal text-center",
        row: "flex w-full justify-between",
        cell: "text-center text-sm p-1 relative",
        day: cn(
          "h-9 w-9 rounded-md p-0 font-normal transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary/90",
        day_today: "border border-primary font-bold",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
