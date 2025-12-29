import { useQuery } from "@tanstack/react-query";
import { fetchLaunches, fetchLaunchById, fetchLaunchpadById } from "@/lib/api";
import type { Launch, LaunchPad } from "@/lib/types";

export function useLaunches() {
  return useQuery<Launch[]>({
    queryKey: ["launches"],
    queryFn: fetchLaunches,
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
