"use client";

import { Launch } from "@/lib/types";
import {
  Rocket,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Loader,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface LaunchListProps {
  launches: Launch[];
  selectedLaunchId: string | null;
  onSelectLaunch: (launch: Launch) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export function LaunchList({
  launches,
  selectedLaunchId,
  onSelectLaunch,
  isLoading,
  error,
}: LaunchListProps) {

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading launches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <XCircle className="h-12 w-12 text-red-500" />
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Error loading launches
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {error.message ||
                "Failed to fetch launches. Please try again later."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (launches.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Rocket className="size-12 text-muted-foreground" />
          <div>
            <h3 className="font-semibold">No launches found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search criteria.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto" ref={scrollContainerRef}>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
          {launches.map((launch) => {
            const isSelected = selectedLaunchId === launch.id;
            const launchDate = launch.date_utc ? new Date(launch.date_utc) : null;
            const formattedDate = launchDate
              ? launchDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "TBD";

            return (
              <button
                key={launch.id}
                onClick={() => onSelectLaunch(launch)}
                className={cn(
                  "group flex flex-col gap-2 rounded-lg border p-4 text-left transition-all",
                  "hover:border-accent",
                  isSelected ? "border-accent" : "border-border"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate font-semibold">{launch.name}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {formattedDate}
                      </span>
                      {launch.upcoming && (
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {launch.success === true && (
                      <CheckCircle2 className="size-5 text-green-500" />
                    )}
                    {launch.success === false && (
                      <XCircle className="size-5 text-red-500" />
                    )}
                  </div>
                </div>
                {launch.details && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {launch.details}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
