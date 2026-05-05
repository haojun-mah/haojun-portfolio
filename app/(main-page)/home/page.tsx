import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { TechStackSlider } from "@/components/TechStackSlider";
import { Icons } from "@/components/icons";
import { educationData, workExperience, projectData } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ClientTweetCard } from "@/components/ui/tweet-card";

export const metadata: Metadata = {
  title: "Hao Jun's Portfolio",
  description: "Hello! I'm Hao Jun. This is my portfolio.",
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    type: "website",
    url: "https://www.haojunmah.app/home",
    siteName: "Haojun Mah Portfolio",
    title: "Hao Jun's Portfolio",
    description: "Hello! I'm Hao Jun. This is my portfolio.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hao Jun's Portfolio",
    description: "Hello! I'm Hao Jun. This is my portfolio.",
  },
};



export default async function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Haojun Mah",
    alternateName: "Hao Jun Mah",
    url: "https://www.haojunmah.app",
    image: "https://www.haojunmah.app/haojunpic1.jpg",
    jobTitle: "Software Engineer",
    alumniOf: "National University of Singapore",
    sameAs: [
      "https://github.com/haojun-mah",
      "https://www.linkedin.com/in/hao-jun-mah-7b22b7210",
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Hero + About Me Combined */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div aria-hidden className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

          <div className="max-w-7xl px-4 sm:px-6 mx-auto pt-16 sm:pt-20 pb-12 sm:pb-16">
            <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-12">
              {/* Hero Content - Left Side */}
              <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                    Hello! I&apos;m <span className="text-primary">Hao Jun</span><br />
                  </h1>
                  <h3 className="text-base sm:text-xl text-muted-foreground max-w-prose">
                    <span className="whitespace-nowrap font-bold text-foreground">Computer Science @ National University of Singapore</span>
                    <br  />
                    <span className="whitespace-nowrap">Areas of Interests: <span className="font-bold text-foreground">Parallel Computing</span> and <span className="font-bold text-foreground">Software Engineering</span></span>
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-10">
                    <Link href="https://www.linkedin.com/in/hao-jun-mah-7b22b7210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition">
                      <Icons.linkedin className="w-4 h-4" />
                    </Link>
                    <Link href="https://github.com/haojun-mah" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-md hover:bg-muted transition">
                      <Icons.github className="w-4 h-4" />
                    </Link>
                    <Link href="/MAH HAO JUN RESUME.pdf" download="Haojun_Mah_Resume.pdf">
                      <ShinyButton className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Icons.download className="w-4 h-8 flex-shrink-0" />
                          <span>Download Resume</span>
                        </div>
                      </ShinyButton>
                    </Link>
                 </div>
                </div>

              {/* Hero Visual - Right Side */}
              <div className="relative flex justify-center lg:justify-end">
                  <Avatar className="w-56 h-44 sm:w-64 sm:h-52 md:w-72 md:h-56 lg:w-[25rem] lg:h-64 border rounded-3xl">
                    <AvatarImage 
                      alt="Haojun face" 
                      src="/haojunpic1.jpg" 
                      className="aspect-auto object-cover object-center"
                    />
                    <AvatarFallback className="rounded-3xl">HJ</AvatarFallback>
                  </Avatar>
                </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex min-h-0 flex-col gap-y-4 sm:gap-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl">Work Experience</h2>
              {workExperience.map((work, id) => (
                  <ClientTweetCard key={work.company}
                    name={work.company}
                    subtitle={work.title}
                    period={`${work.start} - ${work.end ?? "Present"}`}
                    avatarUrl={work.logoUrl || ""}
                    description={
                      <div className="space-y-2 mt-2">
                        {work.description.map((desc, i) => (
                           <div key={i} className="text-foreground/80">
                             {desc.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                               if (part.startsWith("**") && part.endsWith("**")) {
                                 return <span key={index} className="font-bold text-foreground">{part.slice(2, -2)}</span>;
                               }
                               return part;
                             })}
                          </div>
                        ))}
                      </div>
                    }
                  />
              ))}
          </div>

         {/* Education */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex min-h-0 flex-col gap-y-4 sm:gap-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl">Education</h2>
              {educationData.map((education, id) => (
                  <ClientTweetCard key={education.school}
                     name={education.school}
                     subtitle={education.degree}
                     period={`${education.start} - ${education.end}`}
                     avatarUrl={education.logoUrl || ""}
                     description={
                        <div className="space-y-1 mt-2">
                          {education.description.map((desc, i) => (
                            <p key={i} className="text-foreground/80 font-medium">{desc}</p>
                          ))}
                        </div>
                     }
                  />
              ))}
            </div>

        {/* Tech Stack*/}
        <div className="space-y-6 sm:space-y-8 w-full py-8 sm:py-12 px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl">
                  Tech Stack I work with
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-base xl:text-lg px-4">
                  I have experience with various technologies across web and mobile development. Here are some of my favourites.
                </p>
              </div>
            </div>
            
            <TechStackSlider />
        </div>
       

          {/* Projects Teaser */}
            <div className="space-y-6 sm:space-y-8 w-full py-8 sm:py-12 px-4 sm:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center">
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl">
                    Check out my latest projects
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-base xl:text-lg px-4">
                    I&apos;ve worked on a variety of projects, from simple
                    websites to complex applications. Here are a few of my
                    favorites.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto px-4">
                {projectData.map((project, id) => (
                    <ProjectCard key={project.title}
                      href={project.href}
                      title={project.title}
                      description={project.description}
                      dates={project.dates}
                      tags={project.technologies}
                      image={project.image}
                      video={project.video}
                      links={project.links}
                    />
                ))}
              </div>
            </div>
         

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 mb-16 sm:mb-20">
            <div className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-border rounded-2xl p-6 sm:p-8 lg:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold">Let&apos;s build something great</h2>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">Available for freelance and full‑time roles</p>
              <div className="mt-4 sm:mt-6">
                <Link href="mailto:mahhaojun03@gmail.com" className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition text-sm sm:text-base">Contact Me</Link>
              </div>
            </div>
        </section>
      </main>
  );
}
