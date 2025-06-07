import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx"; // optional, for cleaner class management

interface FrameDataGridPaginationProps {
  total: number;
  pageSkip: number;
  pageLimit: number;
  onPageChange: (pageIndex: number) => void;
}

export function FrameDataGridPagination({
  total,
  pageSkip,
  pageLimit,
  onPageChange,
}: FrameDataGridPaginationProps) {
  const isFirstPage = pageSkip === 0;
  const isLastPage = pageSkip + pageLimit >= total;

  const startRecord = total === 0 ? 0 : pageSkip + 1;
  const endRecord = Math.min(pageSkip + pageLimit, total);

  return (
    <Pagination className="w-full">
      <PaginationContent className="justify-start items-center gap-2">
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={isFirstPage}
            className={clsx(isFirstPage && "pointer-events-none opacity-50")}
            onClick={() => {
              if (!isFirstPage) onPageChange(pageSkip - pageLimit);
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <span className="text-sm text-muted-foreground">
            {startRecord} - {endRecord} of {total}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            aria-disabled={isLastPage}
            className={clsx(isLastPage && "pointer-events-none opacity-50")}
            onClick={() => {
              if (!isLastPage) onPageChange(pageSkip + pageLimit);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
