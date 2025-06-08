"use client";

import { useEffect, useState } from "react";
import { loadDashboardSummary } from "./external-interface";
import { DashboardSummary } from "./model";
import { Loader2 } from "lucide-react";

export function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    loadDashboardSummary().then(setSummary);
  }, []);

  if (!summary) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  const cards = [
    {
      label: "Total Records",
      value: summary.total_records,
      color: "text-blue-600",
    },
    {
      label: "Initial",
      value: summary.initial_count,
      color: "text-yellow-700",
    },
    {
      label: "Pending Review",
      value: summary.pending_review_count,
      color: "text-orange-700",
    },
    {
      label: "Approved",
      value: summary.approved_count,
      color: "text-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-4 mt-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-2xl shadow-md border p-6  transition-transform hover:scale-[1.02]`}
        >
          <div className="text-sm font-medium text-muted-foreground">
            {card.label}
          </div>
          <div className={`text-4xl font-bold tracking-tight ${card.color}`}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
