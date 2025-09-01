"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string[];
  isEducation?: boolean; // New prop to identify education cards
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  isEducation = false,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(isEducation); // Auto-expand for education

  const handleClick = (e: React.MouseEvent) => {
    // For education cards, redirect to external link if href exists
    if (isEducation && href) {
      e.preventDefault();
      window.open(href, '_blank');
      return;
    }
    
    // For work cards, toggle expansion if description exists
    if (description && !isEducation) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Card className="flex bg-background cursor-pointer overflow-hidden" onClick={handleClick}>
      <div className="flex-none">
        <Avatar className="border size-16 m-auto">
          <AvatarImage
            src={logoUrl}
            alt={altText}
            className="object-contain"
          />
          <AvatarFallback className="text-lg font-semibold">{altText[0]}</AvatarFallback>
        </Avatar>
      </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h2 className="inline-flex items-center justify-center font-semibold leading-none text-lg md:text-xl">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1 ml-2">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-sm"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={`size-5 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 ml-2 ${
                    isExpanded ? "rotate-90" : "rotate-0"
                  }`}
                />
              </h2>
              <div className="text-sm sm:text-base tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            {subtitle && <div className="font-sans text-base sm:text-lg font-medium">{subtitle}</div>}
            {description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  height: isExpanded ? "auto" : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden"
              >
                {description.map(x => <p key={x} className="text-xs sm:text-sm mb-1 last:mb-0 mt-2">{x}</p>)}
              </motion.div>
            )}
          </CardHeader>
        </div>
      </Card>
    );
};
