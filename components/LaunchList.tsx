"use client"

import { Launch } from "@/lib/types"
import { cn } from "@/lib/utils"
import {
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Rocket,
  XCircle,
} from "lucide-react"

interface LaunchListProps {
  launches: Launch[]
  selectedLaunchId: string | null
  onSelectLaunch: (launch: Launch) => void
  isLoading?: boolean
  error?: Error | null
}

export function LaunchList({
  launches,
  selectedLaunchId,
  onSelectLaunch,
  isLoading,
  error,
}: LaunchListProps) {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="text-muted-foreground size-8 animate-spin" />
          <p className="text-muted-foreground text-sm">Loading launches...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <XCircle className="text-destructive size-12" />
          <div>
            <h3 className="font-semibold">Error loading launches</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {error.message ||
                "Failed to fetch launches. Please try again later."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (launches.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Rocket className="text-muted-foreground size-12" />
          <div>
            <h3 className="font-semibold">No launches found</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Try adjusting your search criteria.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid flex-1 grid-cols-1 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4">
      {launches.map((launch) => {
        const isSelected = selectedLaunchId === launch.id
        const launchDate = launch.date_utc ? new Date(launch.date_utc) : null
        const formattedDate = launchDate
          ? launchDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "TBD"

        return (
          <button
            key={launch.id}
            onClick={() => onSelectLaunch(launch)}
            className={cn(
              "group ring-primary/50 relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-lg border p-4 text-left ring-0 transition-all ease-in-out",
              "hover:shadow-sm hover:ring-1",
              "bg-linear-to-bl from-transparent from-60%",
              launch.success ? "to-green-500/10" : "to-destructive/10",
              launch.upcoming && "to-blue-500/10",
              isSelected && "border-accent ring-2"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold">{launch.name}</h3>
                <div className="text-muted-foreground mt-1 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {formattedDate}
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                {launch.success === true && (
                  <CheckCircle2 className="size-5 text-green-500" />
                )}
                {launch.success === false && (
                  <XCircle className="text-destructive size-5" />
                )}
                {launch.upcoming && (
                  <Clock className="size-4.5 text-blue-500" />
                )}
              </div>
            </div>
            {launch.details && (
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {launch.details}
              </p>
            )}
            {/* <div
              className={cn(
                "absolute top-1/3 left-0 h-full w-1/4 -translate-x-1/2 rounded-2xl opacity-10 blur-lg dark:opacity-10",
                launch.success ? "bg-green-400" : "bg-destructive",
                launch.upcoming && "bg-blue-500"
              )}
            /> */}
          </button>
        )
      })}
    </div>
  )
}
