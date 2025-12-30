"use client";

import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  return (
    <div className="border-t p-4 py-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (hasPrevPage && !isLoading) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={cn(
                (!hasPrevPage || isLoading) && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {(() => {
            const pages: (number | "ellipsis")[] = [];
            const current = currentPage;
            const total = totalPages;

            // Determine which pages to show
            if (total <= 7) {
              // Show all pages if 7 or fewer
              for (let i = 1; i <= total; i++) {
                pages.push(i);
              }
            } else {
              // Show ellipsis and selected pages
              if (current <= 4) {
                // Near the start
                for (let i = 1; i <= 5; i++) {
                  pages.push(i);
                }
                pages.push("ellipsis");
                pages.push(total);
              } else if (current >= total - 3) {
                // Near the end
                pages.push(1);
                pages.push("ellipsis");
                for (let i = total - 4; i <= total; i++) {
                  pages.push(i);
                }
              } else {
                // In the middle
                pages.push(1);
                pages.push("ellipsis");
                for (let i = current - 1; i <= current + 1; i++) {
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
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoading && page !== currentPage) {
                        onPageChange(page);
                      }
                    }}
                    isActive={page === currentPage}
                    className={cn(
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
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (hasNextPage && !isLoading) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={cn(
                (!hasNextPage || isLoading) && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

