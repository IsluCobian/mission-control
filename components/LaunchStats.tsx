"use client"

import { useLaunchStats } from "@/hooks/useLaunchStats"

export function LaunchStats() {
  const { data: stats, isLoading, error } = useLaunchStats()

  if (error) {
    return null
  }

  const statCards = [
    {
      label: "Successful",
      value: stats?.successful ?? 0,
    },
    {
      label: "Failed",
      value: stats?.failed ?? 0,
    },
    {
      label: "Upcoming",
      value: stats?.upcoming ?? 0,
    },
  ]

  return (
    <div className="grid grid-cols-1 justify-items-end gap-3 sm:grid-cols-3">
      {statCards.map((stat) => {
        return (
          <div key={stat.label}>
            <div className="min-w-0 flex-1">
              <p className="text-xl font-bold">
                {isLoading ? "..." : stats ? stat.value : "0"}
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                {stat.label}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
