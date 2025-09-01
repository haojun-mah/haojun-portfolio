"use server";
import Link from "next/link";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { ResumeCard } from "@/components/resume-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { TechStackSlider } from "@/components/TechStackSlider";
import { Icons } from "@/components/icons";
import { educationData, workExperience, projectData } from "@/lib/data";
import Image from "next/image";

const BLUR_FADE_DELAY = 0.04;
const currentHacking = "Productivity Solutions for Developers";



export default async function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
        {/* Hero + About Me Combined */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div aria-hidden className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

          <div className="max-w-7xl px-4 sm:px-6 mx-auto pt-16 sm:pt-20 pb-12 sm:pb-16">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              {/* Hero Content - Left Side */}
              <BlurFade delay={BLUR_FADE_DELAY * 1}>
                <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  Hi, I'm <span className="text-primary">Hao Jun</span>
                  <br />
                  I love to <PointerHighlight rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
                                              pointerClassName="text-yellow-500 h-3 w-3"
                                              containerClassName="inline-block">
                                                build
                                             </PointerHighlight>.
                </h1>
                <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground max-w-prose">
                  Full‑stack developer and aspiring entrepreneur.
                  <br />
                  Passionate about building solutions to everyday problems.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="https://www.linkedin.com/in/hao-jun-mah-7b22b7210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition">
                    <Icons.linkedin className="w-4 h-4" />
                  </Link>
                  <Link href="https://github.com/haojun-mah" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-md hover:bg-muted transition">
                    <Icons.github className="w-4 h-4" />
                  </Link>
                  <Link href="/MAH HAO JUN RESUME.pdf" download="Haojun_Mah_Resume.pdf" className="flex items-center gap-2 px-5 py-2.5 border-4  border-border rounded-md hover:bg-muted transition">
                    <Icons.download className="w-4 h-4" />
                    Download Resume
                  </Link>
                </div>
                </div>
              </BlurFade>

              {/* Hero Visual - Right Side */}
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="relative">
                  <div className="aspect-square sm:aspect-video rounded-xl border border-border bg-card shadow-lg overflow-hidden">
                    <Image 
                      src="/haojunpic1.jpg" 
                      alt="Hao Jun" 
                      fill
                      className="object-cover object-center rounded-xl" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-card border border-border rounded-xl p-3 sm:p-4 shadow-md">
                    <p className="text-xs sm:text-sm">Currently hacking on: <span className="font-medium">{currentHacking}</span></p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="max-w-7xl mx-auto px-6 py-5">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* About Me Card - Left Side */}
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="relative">
              <div className="aspect-square sm:aspect-video rounded-xl border border-border bg-card shadow-lg overflow-hidden">
                <Image 
                  src="/haojun2.jpg" 
                  alt="About Me Visual" 
                  fill
                  className="object-cover object-center rounded-xl" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              </div>
            </BlurFade>

            {/* About Me Content - Right Side */}
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div>
              <h2 className="text-2xl font-bold">About Me</h2>
              <br/>
              <div className="space-y-4 text-primary">
                <p>
                  I'm a <span className="font-bold text-foreground">Year 2
                  Computer Science</span> student at the <span
                  className="font-bold text-foreground">National University of
                  Singapore</span> with a passion for building impactful
                  technology. As a <span className="font-bold
                  text-foreground">full-stack engineer</span> with a
                  solution-oriented mindset, I enjoy creating tech solutions to
                  everyday problems, especially <span className="font-semibold
                  text-foreground">tech for good</span>.
                </p>
               <p>
                  As an <span className="font-bold text-foreground">aspiring entrepreneur</span>, I'm also excited about
                  entrepreneurial ventures and
                  startups, where I can build productive products that positively
                  benefit lives. My technical interests lie in <span className="font-bold text-foreground">agentic AI and
                  hacking for good</span>.
                </p>
                  <p>
                  In the past, I've interned as a <span className="font-bold text-foreground">software engineer, taught
                  programming lessons and taken on freelance software development
                  projects.</span> I am looking for more opportunities to grow and
                  interested in <span className="font-bold text-foreground">working for a start up</span>.
                </p>
              </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Work Experience */}
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-6 flex min-h-0 flex-col gap-y-3 sm:gap-y-4">
            <h2 className="text-xl sm:text-2xl font-bold">Work Experience</h2>
              {workExperience.map((work, id) => (
                <BlurFade key={work.company} delay={BLUR_FADE_DELAY * (6 + id)}>
                  <ResumeCard
                    logoUrl={work.logoUrl || ""}
                    altText={work.company}
                    title={work.company}
                    subtitle={work.title}
                    href={work.href}
                    period={`${work.start} - ${work.end ?? "Present"}`}
                    description={work.description}
                  />
                </BlurFade>
              ))}
          </div>
        </BlurFade>
          {/* Education */}
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-6 flex min-h-0 flex-col gap-y-3 sm:gap-y-4">
              <h2 className="text-xl sm:text-2xl font-bold">Education</h2>
              {educationData.map((education, id) => (
                <BlurFade key={education.school} delay={BLUR_FADE_DELAY * (11 + id)}>
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
          </BlurFade>
        {/* Tech Stack*/}
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <div className="space-y-4 sm:space-y-6 w-full py-4 sm:py-8 px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
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
        </BlurFade>
       

          {/* Projects Teaser */}
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-4 sm:space-y-6 w-full py-4 sm:py-8 px-4 sm:px-6">
              <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
                <div className="space-y-2">
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
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto px-4">
                {projectData.map((project, id) => (
                  <BlurFade key={project.title} delay={BLUR_FADE_DELAY * (17 + id)}>
                    <ProjectCard
                      href={project.href}
                      title={project.title}
                      description={project.description}
                      dates={project.dates}
                      tags={project.technologies}
                      image={project.image}
                      video={project.video}
                      links={project.links}
                    />
                  </BlurFade>
                ))}
              </div>
            </div>
          </BlurFade>

        {/* CTA */}
        <BlurFade delay={BLUR_FADE_DELAY * 20}>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <div className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-border rounded-2xl p-6 sm:p-8 lg:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold">Let's build something great</h2>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">Available for freelance and full‑time roles</p>
              <div className="mt-4 sm:mt-6">
                <Link href="mailto:mahhaojun03@gmail.com" className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition text-sm sm:text-base">Contact Me</Link>
              </div>
            </div>
          </section>
        </BlurFade>
      </main>
  );
}
