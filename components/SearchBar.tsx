"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search launches...",
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "bg-input/30 w-full rounded-lg border px-10 py-2 text-sm",
          "placeholder:text-muted-foreground",
          "focus:ring-ring focus:ring-2 focus:outline-none"
        )}
      />
    </div>
  )
}
