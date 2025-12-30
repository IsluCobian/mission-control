"use client";

import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LaunchStatusBadgeProps {
  success?: boolean;
  upcoming?: boolean;
}

export function LaunchStatusBadge({
  success,
  upcoming,
}: LaunchStatusBadgeProps) {
  if (upcoming) {
    return (
      <Badge className="gap-2 px-3 py-1 text-sm font-medium">
        <Clock className="h-4 w-4" />
        Upcoming
      </Badge>
    );
  }

  if (success === true) {
    return (
      <Badge variant="success" className="gap-2 px-3 py-1 text-sm font-medium">
        <CheckCircle2 className="h-4 w-4" />
        Successful
      </Badge>
    );
  }

  if (success === false) {
    return (
      <Badge
        variant="destructive"
        className="gap-2 px-3 py-1 text-sm font-medium"
      >
        <XCircle className="h-4 w-4" />
        Failed
      </Badge>
    );
  }

  return null;
}
