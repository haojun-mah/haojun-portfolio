"use client";

import { useState, useRef, useEffect } from "react";
import { Icons } from "@/components/icons";
import StackIcon from "tech-stack-icons";
import { useTheme } from "next-themes";
import Image from "next/image";

const getTechStack = (isDark: boolean) => [
  { icon: <StackIcon name="nextjs" variant={isDark ? "dark" : "light"} className="w-16 h-16" />, name: "Next.js" },
  { icon: <StackIcon name="react" variant={isDark ? "light" : "dark"} className="w-16 h-16" />, name: "React" },
  { icon: <StackIcon name="tailwindcss" variant={isDark ? "light" : "dark"} className="w-16 h-16" />, name: "Tailwind CSS" },
  { icon: <StackIcon name="typescript" variant={isDark ? "light" : "dark"} className="w-16 h-16" />, name: "TypeScript" },
  { icon: <StackIcon name="expressjs" variant={isDark ? "dark" : "light"} className="w-16 h-16" />, name: "Express.js" },
  { icon: <StackIcon name="postgresql" variant={isDark ? "light" : "dark"} className="w-16 h-16" />, name: "PostgreSQL" },
  { icon: <StackIcon name="aws" variant={isDark ? "light" : "dark"} className="w-16 h-16" />, name: "AWS" },
  { icon: <Image src="/Google Cloud.png" alt="Google Cloud" width={48} height={48} />, name: "Google Cloud" },
  { icon: <StackIcon name="flask" variant={isDark ? "dark" : "light"} className="w-16 h-16" />, name: "Flask" },
  { icon: <Image src="/FastAPI.png" alt="Fast API" width={48} height={48} />, name: "Fast API" },
  { icon: <Image src="/supabase.png" alt="Supabase" width={48} height={48} />, name: "Supabase" },
  { icon: <Image src="/Python.png" alt="Python" width={48} height={48} />, name: "Python" },
  { icon: <StackIcon name="playwright" variant={isDark ? "light" : "dark"} className="w-16 h-16" />, name: "Playwright" },
  { icon: <StackIcon name="docker" variant={isDark ? "light" : "dark"} className="w-16 h-16" />, name: "Docker" },
];

export function TechStackSlider() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : false;
  const techStack = getTechStack(isDark);

  // Initialize slider position to middle section for proper infinite scrolling
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sliderRef.current) {
        const sectionWidth = sliderRef.current.scrollWidth / 3;
        sliderRef.current.scrollLeft = sectionWidth;
      }
    }, 100); // Small delay to ensure DOM is ready
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll || isDragging) return;

    const animate = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft += 0.5; // Increased from 0.1 to 0.5 for more visible movement
        
        // Reset to beginning when we've scrolled past 2/3 of the content
        const maxScroll = (sliderRef.current.scrollWidth / 3) * 2;
        if (sliderRef.current.scrollLeft >= maxScroll) {
          sliderRef.current.scrollLeft = sliderRef.current.scrollWidth / 3;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoScroll, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoScroll(false);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.2; // Reduced sensitivity from 2 to 0.8
    const newScrollLeft = scrollLeft - walk;
    
    sliderRef.current.scrollLeft = newScrollLeft;
    
    // Handle infinite scroll boundaries
    const sectionWidth = sliderRef.current.scrollWidth / 3;
    if (newScrollLeft <= 0) {
      sliderRef.current.scrollLeft = sectionWidth;
      setScrollLeft(sectionWidth);
      setStartX(e.pageX - (sliderRef.current.offsetLeft || 0));
    } else if (newScrollLeft >= sectionWidth * 2) {
      sliderRef.current.scrollLeft = sectionWidth;
      setScrollLeft(sectionWidth);
      setStartX(e.pageX - (sliderRef.current.offsetLeft || 0));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-scroll after a delay
    setTimeout(() => setAutoScroll(true), 2000);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    // Resume auto-scroll after a delay
    setTimeout(() => setAutoScroll(true), 2000);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setAutoScroll(false);
    setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 0.8; // Reduced sensitivity from 2 to 0.8
    const newScrollLeft = scrollLeft - walk;
    
    sliderRef.current.scrollLeft = newScrollLeft;
    
    // Handle infinite scroll boundaries
    const sectionWidth = sliderRef.current.scrollWidth / 3;
    if (newScrollLeft <= 0) {
      sliderRef.current.scrollLeft = sectionWidth;
      setScrollLeft(sectionWidth);
      setStartX(e.touches[0].pageX - (sliderRef.current.offsetLeft || 0));
    } else if (newScrollLeft >= sectionWidth * 2) {
      sliderRef.current.scrollLeft = sectionWidth;
      setScrollLeft(sectionWidth);
      setStartX(e.touches[0].pageX - (sliderRef.current.offsetLeft || 0));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setAutoScroll(true), 2000);
  };

  // Show loading state until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="relative mx-auto max-w-6xl">
        <div className="flex space-x-12 items-center py-8 justify-center">
          <div className="animate-pulse flex space-x-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`loading-${index}`} className="flex flex-col items-center space-y-2 min-w-[120px]">
                <div className="w-16 h-16 bg-muted rounded-lg"></div>
                <div className="w-20 h-4 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-6xl">
      <div
        ref={sliderRef}
        className={`overflow-x-auto scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-12 items-center py-8" style={{ width: 'max-content' }}>
          {/* First set of tech icons */}
          {techStack.map((tech, index) => (
            <div
              key={`first-${index}`}
              className="flex flex-col items-center space-y-2 min-w-[120px] select-none"
            >
              <div className="transition-transform duration-200 hover:scale-110">
                {tech.icon}
              </div>
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
          
          {/* Duplicate set for seamless infinite scroll */}
          {techStack.map((tech, index) => (
            <div
              key={`second-${index}`}
              className="flex flex-col items-center space-y-2 min-w-[120px] select-none"
            >
              <div className="transition-transform duration-200 hover:scale-110">
                {tech.icon}
              </div>
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}

          {/* Third set for extra seamless scrolling */}
          {techStack.map((tech, index) => (
            <div
              key={`third-${index}`}
              className="flex flex-col items-center space-y-2 min-w-[120px] select-none"
            >
              <div className="transition-transform duration-200 hover:scale-110">
                {tech.icon}
              </div>
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
          
    </div>
  );
}
