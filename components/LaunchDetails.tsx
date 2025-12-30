"use client";

import { LaunchStatusBadge } from "@/components/LaunchStatusBadge";
import { useLaunchpad } from "@/hooks/useLaunches";
import { Launch } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Calendar, ExternalLink, MapPin, Rocket, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useImageModal } from "@/contexts/ImageModalContext";

interface LaunchDetailsProps {
  launch: Launch | null;
  onClose: () => void;
  isLoading?: boolean;
}

export function LaunchDetails({
  launch,
  onClose,
  isLoading,
}: LaunchDetailsProps) {
  const { data: launchpad, isLoading: isLoadingLaunchpad } = useLaunchpad(
    launch?.launchpad || null
  );
  const { openModal } = useImageModal();

  const launchDate = launch?.date_utc ? new Date(launch.date_utc) : null;
  const formattedDate = launchDate
    ? launchDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBD";
  const formattedTime = launchDate
    ? launchDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-600 dark:border-zinc-800 dark:border-t-zinc-400" />
        Loading details...
      </div>
    );
  }
  return (
    <Sheet open={!!launch} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 gap-0">
        <SheetHeader className="border-b">
          <SheetTitle>Launch Details</SheetTitle>
        </SheetHeader>

        {launch && (
          <div className="flex-1 p-6 py-5 overflow-y-auto ">
            <div className="mb-6 flex justify-between items-center gap-3">
              <div className="flex w-full items-center gap-2 flex-1 min-w-0">
                {launch.links?.patch?.small && (
                  <button
                    onClick={() => {
                      const patchUrl =
                        launch.links?.patch?.large ||
                        launch.links?.patch?.small;
                      if (patchUrl) {
                        openModal(patchUrl, `${launch.name} patch`);
                      }
                    }}
                    className="relative size-12 rounded-lg border border-border bg-card p-1.5 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <img
                      src={launch.links.patch.small}
                      alt={`${launch.name} patch`}
                      className="object-contain"
                    />
                  </button>
                )}
                <h1 className="text-xl font-bold truncate flex-1">
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
                <p className="text-xs font-medium text-muted-foreground">
                  Launch Date
                </p>
                <p className="mt-0.5 text-sm font-semibold">{formattedDate}</p>
                {formattedTime && (
                  <p className="text-xs text-muted-foreground">
                    {formattedTime}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-muted-foreground">
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
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-400" />
                  Loading launchpad details...
                </div>
              ) : launchpad ? (
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {launchpad.full_name}
                      </p>
                      {launchpad.name !== launchpad.full_name && (
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                          {launchpad.name}
                        </p>
                      )}
                    </div>
                    {(launchpad.locality || launchpad.region) && (
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
                        <div>
                          {launchpad.locality && (
                            <p className="text-sm text-zinc-900 dark:text-zinc-50">
                              {launchpad.locality}
                            </p>
                          )}
                          {launchpad.region && (
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                              {launchpad.region}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {launchpad.latitude && launchpad.longitude && (
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        Coordinates: {launchpad.latitude.toFixed(4)},{" "}
                        {launchpad.longitude.toFixed(4)}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
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
                        "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm",
                        "transition-colors hover:bg-accent"
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
                        "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm",
                        "transition-colors hover:bg-accent"
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
                        "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm",
                        "transition-colors hover:bg-accent"
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
                <h3 className="mb-2 font-semibold text-destructive">
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
        )}
      </SheetContent>
    </Sheet>
  );
}
