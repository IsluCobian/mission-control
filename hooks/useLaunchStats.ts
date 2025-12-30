import { useQuery } from "@tanstack/react-query"
import { fetchAllLaunches, fetchLaunches } from "@/lib/api"
import type { Launch } from "@/lib/types"

interface LaunchStats {
  successful: number
  failed: number
  upcoming: number
}

export function useLaunchStats() {
  return useQuery<LaunchStats>({
    queryKey: ["launchStats"],
    queryFn: async () => {
      const response = await fetchAllLaunches()

      const launches: Launch[] = response

      const stats: LaunchStats = {
        successful: launches.filter(
          (launch) => launch.success === true && !launch.upcoming
        ).length,
        failed: launches.filter(
          (launch) => launch.success === false && !launch.upcoming
        ).length,
        upcoming: launches.filter((launch) => launch.upcoming === true).length,
      }

      return stats
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })
}
