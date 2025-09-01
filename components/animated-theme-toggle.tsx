"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AnimatedThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-10 sm:size-12 md:size-14">
        <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-10 sm:size-12 md:size-14 relative overflow-hidden hover:scale-110 active:scale-95 transition-all duration-200"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
        <SunIcon 
          className={`absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-orange-500 transition-all duration-500 transform ${
            isDark 
              ? "rotate-90 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <MoonIcon 
          className={`absolute h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-400 transition-all duration-500 transform ${
            isDark 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </Button>
  );
}
