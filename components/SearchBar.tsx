'use client';

import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search launches...' }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg border border-zinc-200 bg-white px-10 py-2.5 text-sm',
          'placeholder:text-zinc-500',
          'focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200',
          'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50',
          'dark:focus:border-zinc-600 dark:focus:ring-zinc-800'
        )}
      />
    </div>
  );
}

