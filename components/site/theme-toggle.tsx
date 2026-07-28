"use client"

import { ThemeToggle as BeUIThemeToggle } from "@/components/motion/theme-toggle"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <BeUIThemeToggle
      variant="circle-blur"
      start="center"
      className={cn("theme-toggle", className)}
      iconClassName="size-4"
    />
  )
}
