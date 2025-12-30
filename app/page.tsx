"use client";

import { useState, useCallback, useRef } from "react";
import { useLaunches, useLaunch } from "@/hooks/useLaunches";
import { SearchBar } from "@/components/SearchBar";
import { LaunchList } from "@/components/LaunchList";
import { LaunchDetails } from "@/components/LaunchDetails";
import { PaginationControls } from "@/components/PaginationControls";
import type { Launch, LaunchesQueryResponse } from "@/lib/types";
import { ModeToggle } from "@/components/ModeToogle";

const LAUNCHES_PER_PAGE = 20;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLaunchId, setSelectedLaunchId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const listContainer = useRef<HTMLDivElement>(null);

  const { data: launchesData, isLoading, error } = useLaunches({
    page,
    limit: LAUNCHES_PER_PAGE,
    search: searchTerm,
  });

  const { data: selectedLaunch, isLoading: isLoadingDetails } =
    useLaunch(selectedLaunchId);

  // Reset to page 1 when search term changes
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setPage(1);
  }, []);

  const handleSelectLaunch = (launch: Launch) => {
    setSelectedLaunchId(launch.id);
  };

  const handleCloseDetails = () => {
    setSelectedLaunchId(null);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when page changes
    if (listContainer.current) {
      listContainer.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Mission Control</h1>
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b p-4">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>

        <div className="flex-1 overflow-y-auto" ref={listContainer}>
          <LaunchList
            launches={launchesData?.docs || []}
            selectedLaunchId={selectedLaunchId}
            onSelectLaunch={handleSelectLaunch}
            isLoading={isLoading}
            error={error}
          />
        </div>

        <PaginationControls
          currentPage={launchesData?.page || 1}
          totalPages={launchesData?.totalPages || 1}
          hasNextPage={launchesData?.hasNextPage || false}
          hasPrevPage={launchesData?.hasPrevPage || false}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />

        <LaunchDetails
          launch={selectedLaunch || null}
          onClose={handleCloseDetails}
          isLoading={isLoadingDetails}
        />
      </main>
    </div>
  );
}
