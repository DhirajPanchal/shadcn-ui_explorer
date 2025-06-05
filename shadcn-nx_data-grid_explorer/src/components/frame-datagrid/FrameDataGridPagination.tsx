import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FrameDataGridPaginationProps {
  total: number;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function FrameDataGridPagination({
  total,
  pageIndex,
  pageSize,
  pageSizeOptions = [10, 20, 30],
  onPageChange,
  onPageSizeChange,
}: FrameDataGridPaginationProps) {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <Pagination className="w-full">
      <PaginationContent className="justify-start items-center gap-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => pageIndex > 0 && onPageChange(pageIndex - 1)}
            aria-disabled={pageIndex === 0}
            className={pageIndex === 0 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <span className="text-sm text-muted-foreground">
            {pageIndex * pageSize + 1} –{" "}
            {Math.min((pageIndex + 1) * pageSize, total)} of {total}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              (pageIndex + 1) * pageSize < total && onPageChange(pageIndex + 1)
            }
            aria-disabled={(pageIndex + 1) * pageSize >= total}
            className={
              (pageIndex + 1) * pageSize >= total
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
