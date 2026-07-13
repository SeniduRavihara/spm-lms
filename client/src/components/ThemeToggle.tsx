"use client"

import { IcoSun, IcoMoon } from "@/components/icons/LmsIcons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-8 h-8 flex items-center justify-center rounded-md border border-white/20 dark:border-[#1e1f26]/20 hover:bg-white/10 dark:hover:bg-[#1e1f26]/10 transition-all"
    >
      {theme === "light" ? (
        <IcoSun size={16} />
      ) : (
        <IcoMoon size={16} />
      )}
    </button>
  )
}
