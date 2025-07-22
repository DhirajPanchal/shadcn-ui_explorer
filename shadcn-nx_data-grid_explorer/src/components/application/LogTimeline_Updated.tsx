import { DATA_LOGITEMS } from "./dummy";
import { Card } from "@/components/ui/card";
import { LogItem } from "./model";
import { format } from "date-fns";
import { CheckIcon } from "lucide-react";

interface LogTimelineProps {
  logItems?: LogItem[];
}

export function LogTimeline2({ logItems = DATA_LOGITEMS }: LogTimelineProps) {
  return (
    <Card className="p-4 shadow-md dark:shadow-sm">
      <div className="relative">
        {/* Vertical line shifted to 1/3rd */}
        <div className="absolute left-1/3 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-600 transition-all duration-500" />

        <div className="space-y-8 pt-2">
          {logItems.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4 transition-transform hover:scale-[1.01]">
              {/* Left side */}
              <div className="w-1/3 flex flex-col items-end pr-4 text-right space-y-1">
                {item.creation_date && (
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(item.creation_date), "yyyy-MM-dd HH:mm")}
                  </div>
                )}
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {item.user_role}
                </div>
              </div>

              {/* Dot */}
              <div className="relative z-10 w-4 flex justify-center items-start pt-1">
                <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-gray-900 flex items-center justify-center shadow-md">
                  {index < logItems.length - 1 ? (
                    <span className="block w-2 h-2 bg-white dark:bg-gray-900 rounded-full"></span>
                  ) : (
                    <CheckIcon className="w-3 h-3 text-white dark:text-gray-900" />
                  )}
                </div>
              </div>

              {/* Right side */}
              <div className="w-2/3 flex flex-col pl-4 space-y-2">
                <div>{logItemStatus(item.action)}</div>

                {item.comments && (
                  <div className="italic text-sm text-gray-700 dark:text-gray-300">
                    “{item.comments}”
                  </div>
                )}

                {item.action?.toUpperCase() === "MODIFY" &&
                  Array.isArray(item.changes) &&
                  item.changes.length > 0 && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 pt-2">
                      <ul className="list-disc list-inside space-y-1">
                        {item.changes.map((change, i) => (
                          <li key={i}>
                            <strong>{change.field_name}</strong>: “
                            {formatIfDate(change.old_value)}” → “
                            {formatIfDate(change.new_value)}”
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function formatIfDate(value?: string): string {
  if (!value) return "";
  const isoDateMatch = /^\d{4}-\d{2}-\d{2}T/.test(value);
  try {
    return isoDateMatch ? format(new Date(value), "yyyy-MM-dd") : value;
  } catch {
    return value;
  }
}

const logItemStatus = (status?: string | null) => {
  const normalized = (status ?? "").trim().toUpperCase();

  const labelMap: Record<string, string> = {
    INITIAL: "INITIAL",
    SUBMIT_FOR_REVIEW: "SUBMITTED FOR REVIEW",
    SUBMIT_FOR_APPROVAL: "SUBMITTED FOR APPROVAL",
    MODIFY: "MODIFIED",
    REVIEW_REJECT: "REJECTED BY REVIEWER",
    WITHDRAW_REVIEW: "REVIEW WITHDRAWN",
    REVOKE: "REVOKE",
    WITHDRAW_APPROVAL: "APPROVAL WITHDRAWN",
    APPROVAL_REJECT: "REJECTED BY APPROVER",
    APPROVE: "APPROVED",
    NEW: "NEW",
  };

  const classMap: Record<string, string> = {
    INITIAL: "bg-gray-200 text-gray-800 border-gray-400 dark:bg-gray-700 dark:text-gray-200",
    SUBMIT_FOR_REVIEW: "bg-orange-200 text-orange-800 border-orange-400 dark:bg-orange-800 dark:text-orange-200",
    WITHDRAW_REVIEW: "bg-purple-200 text-purple-800 border-purple-400 dark:bg-purple-800 dark:text-purple-200",
    APPROVE: "bg-green-200 text-green-800 border-green-400 dark:bg-green-800 dark:text-green-200",
    REVIEW_REJECT: "bg-red-200 text-red-800 border-red-400 dark:bg-red-800 dark:text-red-200",
  };

  return (
    <span
      className={`inline-block text-xs font-semibold px-2 py-1 rounded-full text-center w-[180px] uppercase whitespace-nowrap tracking-wide border ${
        classMap[normalized] ??
        "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-300"
      }`}
    >
      {labelMap[normalized] ?? "-"}
    </span>
  );
};