"use client"

import { LaunchStatusBadge } from "@/components/LaunchStatusBadge"
import { useImageModal } from "@/contexts/ImageModalContext"
import { useLaunchpad } from "@/hooks/useLaunches"
import { Launch } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ExternalLink, MapPin } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Skeleton } from "./ui/skeleton"

interface LaunchDetailsProps {
  launch: Launch | null
  onClose: () => void
  isLoading?: boolean
}

export function LaunchDetails({
  launch,
  onClose,
  isLoading,
}: LaunchDetailsProps) {
  const { data: launchpad, isLoading: isLoadingLaunchpad } = useLaunchpad(
    launch?.launchpad || null
  )
  const { openModal } = useImageModal()

  const launchDate = launch?.date_utc ? new Date(launch.date_utc) : null
  const formattedDate = launchDate
    ? launchDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBD"
  const formattedTime = launchDate
    ? launchDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null

  return (
    <Sheet open={!!launch || isLoading} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Launch Details</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <LaunchDetailsSkeleton />
        ) : launch ? (
          <div className="flex-1 overflow-y-auto p-6 py-5">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex w-full min-w-0 flex-1 items-center gap-2">
                {launch.links?.patch?.small && (
                  <button
                    onClick={() => {
                      const patchUrl =
                        launch.links?.patch?.large || launch.links?.patch?.small
                      if (patchUrl) {
                        openModal(patchUrl, `${launch.name} patch`)
                      }
                    }}
                    className="border-border bg-card relative size-12 cursor-pointer rounded-lg border p-1.5 transition-opacity hover:opacity-80"
                  >
                    <img
                      src={launch.links.patch.small}
                      alt={`${launch.name} patch`}
                      className="object-contain"
                    />
                  </button>
                )}
                <h1 className="flex-1 truncate text-xl font-bold">
                  {launch.name}
                </h1>
              </div>
              <LaunchStatusBadge
                success={launch.success}
                upcoming={launch.upcoming}
              />
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-0.5">
                <p className="text-muted-foreground text-xs font-medium">
                  Launch Date
                </p>
                <p className="mt-0.5 text-sm font-semibold">{formattedDate}</p>
                {formattedTime && (
                  <p className="text-muted-foreground text-xs">
                    {formattedTime}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs font-medium">
                  Flight Number
                </span>
                <span className="text-sm font-semibold">
                  {launch.flight_number?.toString() || "N/A"}
                </span>
              </div>
            </div>

            {launch.details && (
              <div className="mb-6">
                <h3 className="mb-2 font-semibold">Description</h3>
                <p className="text-muted-foreground text-sm">
                  {launch.details}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h3 className="mb-3 font-semibold">Launchpad</h3>
              {isLoadingLaunchpad ? (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-400" />
                  Loading launchpad details...
                </div>
              ) : launchpad ? (
                <div className="bg-muted/70 rounded-lg border p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {launchpad.full_name}
                      </p>
                      {launchpad.name !== launchpad.full_name && (
                        <p className="text-muted-foreground text-xs">
                          {launchpad.name}
                        </p>
                      )}
                    </div>
                    {(launchpad.locality || launchpad.region) && (
                      <div className="flex items-start gap-2">
                        <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                        <div>
                          {launchpad.locality && (
                            <p className="text-sm">{launchpad.locality}</p>
                          )}
                          {launchpad.region && (
                            <p className="text-muted-foreground text-xs">
                              {launchpad.region}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {launchpad.latitude && launchpad.longitude && (
                      <div className="text-muted-foreground text-xs">
                        Coordinates: {launchpad.latitude.toFixed(4)},{" "}
                        {launchpad.longitude.toFixed(4)}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Launchpad information not available
                </p>
              )}
            </div>

            {launch.links && (
              <div className="mb-6">
                <h3 className="mb-3 font-semibold">Links</h3>
                <div className="flex flex-wrap gap-2">
                  {launch.links.article && (
                    <a
                      href={launch.links.article}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "border-border bg-card flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                        "hover:bg-accent transition-colors"
                      )}
                    >
                      <ExternalLink className="size-4" />
                      Article
                    </a>
                  )}
                  {launch.links.wikipedia && (
                    <a
                      href={launch.links.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "border-border bg-card flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                        "hover:bg-accent transition-colors"
                      )}
                    >
                      <ExternalLink className="size-4" />
                      Wikipedia
                    </a>
                  )}
                  {launch.links.youtube_id && (
                    <a
                      href={`https://www.youtube.com/watch?v=${launch.links.youtube_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "border-border bg-card flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                        "hover:bg-accent transition-colors"
                      )}
                    >
                      <ExternalLink className="size-4" />
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            )}

            {launch.failures && launch.failures.length > 0 && (
              <>
                <h3 className="text-destructive mb-2 font-semibold">
                  Failures
                </h3>
                <div className="space-y-2">
                  {launch.failures.map((failure, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-900/20"
                    >
                      {failure.reason && (
                        <p className="text-sm text-red-800 dark:text-red-300">
                          {failure.reason}
                        </p>
                      )}
                      {failure.time !== undefined && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          Time: {failure.time}s
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

function LaunchDetailsSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto p-6 py-5">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex w-full min-w-0 flex-1 items-center gap-2">
          <Skeleton className="size-12 rounded-lg" />
          <Skeleton className="h-7 flex-1" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-1 h-5 w-32" />
          <Skeleton className="mt-1 h-3 w-20" />
        </div>
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-1 h-5 w-16" />
        </div>
      </div>

      <div className="mb-6">
        <Skeleton className="mb-2 h-5 w-24" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="mb-6">
        <Skeleton className="mb-3 h-5 w-28" />
        <Skeleton className="h-36 rounded-lg p-4" />
      </div>

      <div className="mb-6">
        <Skeleton className="mb-3 h-5 w-16" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
