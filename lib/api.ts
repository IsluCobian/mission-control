import {
  Launch,
  LaunchPad,
  LaunchesQueryResponse,
  LaunchesQueryOptions,
} from "./types"

const BASE_URL = "https://api.spacexdata.com/v4"

export async function fetchLaunches(
  options: LaunchesQueryOptions = {}
): Promise<LaunchesQueryResponse> {
  const { page = 1, limit = 20, search = "" } = options

  const query: any = {}
  const optionsPayload: any = {
    page,
    limit,
    sort: { date_utc: "desc" },
  }

  // Build search query if search term is provided
  if (search.trim()) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { details: { $regex: search, $options: "i" } },
    ]
  }

  const res = await fetch(`${BASE_URL}/launches/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      options: optionsPayload,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to fetch launches")
  }

  return res.json()
}

export async function fetchLaunchById(id: string): Promise<Launch> {
  const res = await fetch(`${BASE_URL}/launches/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch launch details")
  }

  return res.json()
}

export async function fetchAllLaunches(): Promise<Launch[]> {
  const res = await fetch(`${BASE_URL}/launches`)

  if (!res.ok) {
    throw new Error("Failed to fetch launch details")
  }

  return res.json()
}

export async function fetchLaunchpadById(id: string): Promise<LaunchPad> {
  const res = await fetch(`${BASE_URL}/launchpads/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch launchpad details")
  }

  return res.json()
}
