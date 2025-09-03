import React from "react";
import Link from "next/link";

const Taskbar: React.FC = () => {

  return (
    <header
      className="fixed top-0 left-0 right-0 h-12 bg-background/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800 flex items-center px-3 sm:px-4 z-50"
      role="banner"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-foreground/10 dark:bg-foreground/20 flex items-center justify-center text-xs sm:text-sm font-semibold text-foreground">
          App
        </div>
        <span className="font-sans text-foreground text-sm sm:text-base hidden sm:block">Random Test Application</span>
        <span className="font-sans text-foreground text-sm sm:text-base sm:hidden">Test App</span>
      </div>

      <nav className="ml-auto flex items-center gap-1 sm:gap-3">
        <Link className="text-foreground/80 hover:text-foreground px-1 sm:px-2 py-1 rounded text-xs sm:text-sm" href="/home">Home</Link>
        <Link className="text-foreground/80 hover:text-foreground px-1 sm:px-2 py-1 rounded text-xs sm:text-sm" href="/about">About</Link>
        <Link className="text-foreground/80 hover:text-foreground px-1 sm:px-2 py-1 rounded text-xs sm:text-sm" href="/blog/">Blog</Link>
        <Link className="text-foreground/80 hover:text-foreground px-1 sm:px-2 py-1 rounded text-xs sm:text-sm hidden sm:inline" href="/experience">Experience</Link>
        <Link className="text-foreground/80 hover:text-foreground px-1 sm:px-2 py-1 rounded text-xs sm:text-sm sm:hidden" href="/experience">Exp</Link>
      </nav>
    </header>
  );
};

export default Taskbar;
