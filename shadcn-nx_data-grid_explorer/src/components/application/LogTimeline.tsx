import { renderStatus } from "./mdl-columns"; // reuse capsule styles
import { Card } from "@/components/ui/card";

interface LogItem {
  user_role: string;
  action: string;
  comments: string;
}

interface LogTimelineProps {
  logItems: LogItem[];
}

export function LogTimeline({ logItems }: LogTimelineProps) {
  return (
    <Card className="p-4">
      <div className="relative">
        {/* Vertical line in center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-600" />

        <div className="space-y-6">
          {logItems.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4">
              {/* Left side: User role */}
              <div className="w-1/2 flex justify-end pr-4 text-right">
                <div className="text-xs font-semibold text-muted-foreground">
                  {item.user_role}
                </div>
              </div>

              {/* Dot */}
              <div className="relative z-10 w-4 flex justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-gray-900" />
              </div>

              {/* Right side: Action + comments */}
              <div className="w-1/2 flex flex-col pl-4">
                <div>{renderStatus(item.action)}</div>
                <div className="mt-1 italic text-sm text-gray-700 dark:text-gray-300">
                  “{item.comments}”
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
