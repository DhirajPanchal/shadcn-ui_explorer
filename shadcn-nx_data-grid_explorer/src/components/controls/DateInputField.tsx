"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DateInputField() {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const validateDate = (value: string) => {
    const regex = /^\d{4}(-\d{2}(-\d{2})?)?$/;
    if (!value) {
      return "Date is required";
    }
    if (!regex.test(value)) {
      return "Enter date in YYYY or YYYY-MM or YYYY-MM-DD format";
    }
    return "";
  };

  const handleBlur = () => {
    const err = validateDate(date);
    setError(err);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="dateInput">Date</Label>
      <Input
        id="dateInput"
        placeholder="YYYY or YYYY-MM or YYYY-MM-DD"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onBlur={handleBlur}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
