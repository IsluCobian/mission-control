import { useQuery } from "@tanstack/react-query";
import { fetchLaunches, fetchLaunchById, fetchLaunchpadById } from "@/lib/api";
import type { Launch, LaunchPad, LaunchesQueryOptions, LaunchesQueryResponse } from "@/lib/types";

export function useLaunches(options: LaunchesQueryOptions = {}) {
  return useQuery<LaunchesQueryResponse>({
    queryKey: ["launches", options.page, options.limit, options.search],
    queryFn: () => fetchLaunches(options),
  });
}

export function useLaunch(id: string | null) {
  return useQuery<Launch>({
    queryKey: ["launch", id],
    queryFn: () => fetchLaunchById(id!),
    enabled: !!id,
  });
}

export function useLaunchpad(id: string | null) {
  return useQuery<LaunchPad>({
    queryKey: ["launchpad", id],
    queryFn: () => fetchLaunchpadById(id!),
    enabled: !!id,
  });
}
