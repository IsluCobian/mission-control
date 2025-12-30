"use client"

import { LaunchDetails } from "@/components/LaunchDetails"
import { LaunchList } from "@/components/LaunchList"
import { LaunchStats } from "@/components/LaunchStats"
import { PaginationControls } from "@/components/PaginationControls"
import { SearchBar } from "@/components/SearchBar"
import { Sidebar, SidebarTrigger } from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { useLaunch, useLaunches } from "@/hooks/useLaunches"
import { useScreenSize } from "@/hooks/useScreenSize"
import type { Launch } from "@/lib/types"
import { ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

const LAUNCHES_PER_PAGE = 20
const SEARCH_DEBOUNCE_MS = 300

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [selectedLaunchId, setSelectedLaunchId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const listContainer = useRef<HTMLDivElement>(null)
  const { isMobile } = useScreenSize()

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

  const {
    data: launchesData,
    isLoading,
    error,
  } = useLaunches({
    page,
    limit: LAUNCHES_PER_PAGE,
    search: debouncedSearchTerm,
  })

  const { data: selectedLaunch, isLoading: isLoadingDetails } =
    useLaunch(selectedLaunchId)

  // Reset to page 1 when debounced search term changes
  useEffect(() => {
    setPage(1)
  }, [debouncedSearchTerm])

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handleSelectLaunch = (launch: Launch) => {
    setSelectedLaunchId(launch.id)
  }

  const handleCloseDetails = () => {
    setSelectedLaunchId(null)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    // Scroll to top when page changes
    if (listContainer.current) {
      listContainer.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="flex">
      <Sidebar open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen} />
      <div className="flex h-dvh flex-1 flex-col">
        <header className="flex flex-col justify-between gap-4 border-b px-4 py-4 sm:px-6 md:flex-row">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden"
              >
                <SidebarTrigger />
              </Button>
            )}
            <h1 className="flex items-center gap-1.5 leading-none">
              <span className="text-muted-foreground leading-0">SpaceY</span>
              <ChevronRight className="text-muted-foreground size-4" />
              Mission Control
            </h1>
          </div>
          <span className="max-w-sm">
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
          </span>
        </header>
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-col justify-between gap-4 border-b p-4 md:flex-row md:items-center">
            <h2 className="text-xl font-bold md:flex-1/2">Launches</h2>
            <span className="md:flex-1/2">
              <LaunchStats />
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto" ref={listContainer}>
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
    </div>
  )
}
