"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useScreenSize } from "@/hooks/useScreenSize";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function PaginationControls({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  isLoading = false,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null;
  }

  const { isSmall } = useScreenSize();

  return (
    <div className="border-t p-4 py-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (hasPrevPage && !isLoading) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={cn("cursor-pointer",
                (!hasPrevPage || isLoading) && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {(() => {
            const pages: (number | "ellipsis")[] = [];
            const current = currentPage;
            const total = totalPages;
            const maxPagesBeforeEllipsis = isSmall ? 3 : 7;
            const pagesAroundCurrent = isSmall ? 1 : 2;

            // Determine which pages to show
            if (total <= maxPagesBeforeEllipsis) {
              // Show all pages if below threshold
              for (let i = 1; i <= total; i++) {
                pages.push(i);
              }
            } else {
              // Show ellipsis and selected pages
              if (current <= (isSmall ? 2 : 4)) {
                // Near the start
                const endPage = isSmall ? 3 : 5;
                for (let i = 1; i <= endPage; i++) {
                  pages.push(i);
                }
                pages.push("ellipsis");
                pages.push(total);
              } else if (current >= total - (isSmall ? 2 : 3)) {
                // Near the end
                pages.push(1);
                pages.push("ellipsis");
                const startPage = isSmall ? total - 2 : total - 4;
                for (let i = startPage; i <= total; i++) {
                  pages.push(i);
                }
              } else {
                // In the middle
                pages.push(1);
                pages.push("ellipsis");
                for (let i = current - pagesAroundCurrent; i <= current + pagesAroundCurrent; i++) {
                  pages.push(i);
                }
                pages.push("ellipsis");
                pages.push(total);
              }
            }

            return pages.map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoading && page !== currentPage) {
                        onPageChange(page);
                      }
                    }}
                    isActive={page === currentPage}
                    className={cn("cursor-pointer",
                      isLoading && "pointer-events-none opacity-50"
                    )}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            });
          })()}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (hasNextPage && !isLoading) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={cn(
                "cursor-pointer",
                (!hasNextPage || isLoading) && "pointer-events-none opacity-50 cursor-default"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

