"use client";
import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";

interface EducationItem {
  school: string;
  degree: string;
  start: string;
  end: string;
  logoUrl?: string;
  href?: string;
  description?: string[];
}

interface EducationDropdownProps {
  educationData: EducationItem[];
  delay: number;
}

export default function EducationDropdown({ educationData, delay }: EducationDropdownProps) {
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  return (
    <BlurFade delay={delay}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex min-h-0 flex-col gap-y-3 sm:gap-y-4">
        <button
          onClick={() => setIsEducationOpen(!isEducationOpen)}
          className="flex items-center justify-between w-full text-left hover:bg-muted/50 rounded-lg p-4 transition-colors group"
        >
          <h2 className="text-xl sm:text-2xl font-bold">Education</h2>
          <div className={`transition-transform duration-200 ${isEducationOpen ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        
        {isEducationOpen && (
          <div className="space-y-3 sm:space-y-4 mt-4">
            {educationData.map((education, id) => (
              <BlurFade key={education.school} delay={delay + (id + 1) * 0.05}>
                <ResumeCard
                  logoUrl={education.logoUrl || ""}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  href={education.href}
                  period={`${education.start} - ${education.end}`}
                  description={education.description}
                  isEducation={true}
                />
              </BlurFade>
            ))}
          </div>
        )}
      </div>
    </BlurFade>
  );
}
