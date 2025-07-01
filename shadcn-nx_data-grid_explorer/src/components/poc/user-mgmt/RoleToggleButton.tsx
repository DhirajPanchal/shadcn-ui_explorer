import { useState } from "react";
import { cn } from "@/lib/utils";

export default function RoleToggleButton({
  role,
  onToggle,
}: {
  role: "REVIEWER" | "APPROVER";
  onToggle: (isActive: boolean) => void;
}) {
  const [active, setActive] = useState(false);

  const isReviewer = role === "REVIEWER";
  const isApprover = role === "APPROVER";

  const activeStyles = isReviewer
    ? "bg-blue-100 text-blue-800 border-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-200"
    : "bg-green-100 text-green-800 border-green-800 dark:bg-green-900 dark:text-green-200 dark:border-green-200";

  const inactiveStyles =
    "bg-transparent text-gray-500 border-gray-400 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800";

  return (
    <button
      onClick={() => {
        const next = !active;
        setActive(next);
        onToggle(next);
      }}
      className={cn(
        "px-4 py-1 rounded-full text-sm font-semibold border transition-all duration-150",
        active ? activeStyles : inactiveStyles
      )}
    >
      {role}
    </button>
  );
}
