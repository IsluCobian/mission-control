import { Launch, LaunchPad } from "./types";

const BASE_URL = "https://api.spacexdata.com/v4";

export async function fetchLaunches(): Promise<Launch[]> {
  const res = await fetch(`${BASE_URL}/launches`);

  if (!res.ok) {
    throw new Error("Failed to fetch launches");
  }

  return res.json();
}

export async function fetchLaunchById(id: string): Promise<Launch> {
  const res = await fetch(`${BASE_URL}/launches/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch launch details");
  }

  return res.json();
}

export async function fetchLaunchpadById(id: string): Promise<LaunchPad> {
  const res = await fetch(`${BASE_URL}/launchpads/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch launchpad details");
  }

  return res.json();
}
