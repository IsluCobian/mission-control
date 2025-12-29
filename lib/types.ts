// SpaceX API v4 Launch type definition
export interface Launch {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  tbd?: boolean;
  net?: boolean;
  window?: number;
  rocket?: string;
  success?: boolean;
  failures?: LaunchFailure[];
  upcoming: boolean;
  details?: string;
  launchpad?: string;
  links?: LaunchLinks;
}

export interface LaunchFailure {
  time?: number;
  altitude?: number;
  reason?: string;
}

export interface LaunchLinks {
  patch?: {
    small?: string;
    large?: string;
  };
  reddit?: {
    campaign?: string;
    launch?: string;
    media?: string;
    recovery?: string;
  };
  flickr?: {
    small?: string;
    original?: string;
  };
  presskit?: string;
  webcast?: string;
  youtube_id?: string;
  article?: string;
  wikipedia?: string;
}

export interface LaunchPad {
  id: string;
  name: string;
  full_name: string;
  locality?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  details?: string;
  status?: string;
}
