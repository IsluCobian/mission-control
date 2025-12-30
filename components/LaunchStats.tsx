"use client"

import { useLaunchStats } from "@/hooks/useLaunchStats"
import { cn } from "@/lib/utils"

export function LaunchStats() {
  const { data: stats, isLoading, error } = useLaunchStats()

  if (error) {
    return null
  }

  const statCards = [
    {
      label: "Successful",
      value: stats?.successful ?? 0,
      color: "bg-green-500",
    },
    {
      label: "Failed",
      value: stats?.failed ?? 0,
      color: "bg-destructive",
    },
    {
      label: "Upcoming",
      value: stats?.upcoming ?? 0,
      color: "bg-blue-500",
    },
  ]

  return (
    <div className="grid grid-cols-3 justify-items-center gap-3 md:justify-items-end">
      {statCards.map((stat) => {
        return (
          <div key={stat.label} className="flex items-center gap-3">
            <div className={cn("size-1 rounded-full", stat.color)} />
            <div className="min-w-0 flex-1">
              <p className="text-xl leading-[1.2] font-bold md:text-2xl">
                {isLoading ? "..." : stats ? stat.value : "0"}
              </p>
              <p className="text-muted-foreground text-xs">{stat.label}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
