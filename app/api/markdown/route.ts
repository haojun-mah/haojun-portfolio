import { NextRequest, NextResponse } from "next/server";

const HOME_MARKDOWN = `# Haojun Mah — Portfolio

> For the complete documentation index, see [llms.txt](/llms.txt). Full snapshot at [llms-full.txt](/llms-full.txt).

Haojun Mah is a Computer Science student at the National University of Singapore (NUS), specialising in parallel computing and software engineering.

- **GitHub**: https://github.com/haojun-mah
- **LinkedIn**: https://www.linkedin.com/in/hao-jun-mah-7b22b7210/

## Work Experience

### Fly Fairly — Software Engineer Intern (Jan 2026 – Apr 2026)
- Identified and eliminated 3 key operational bottlenecks through structured stakeholder interviews.
- Built a back-office reporting dashboard with Next.js, improving sprint throughput by ~20%.
- Proposed tech stack modernisations adopted into roadmap for 3 out of 6 company departments.

### Toppan Ecquaria — Software Engineer Intern (May 2025 – Jul 2025)
- Designed RAG pipelines and LLM-based AI agents for enterprise SaaS products; deployed across 10+ clients.
- Enhanced AI lip-dubbing system with Kokoro and LatentSync models; product sold at $5,000/licence.
- Refactored web applications with React and FastAPI for 2,000 users.

### Lyza Education — Software Engineer Intern (Mar 2024 – May 2024)
- Built a Next.js learning management tool used by 100+ students.

### Singapore Armed Forces — Deputy Staffer 4 Officer (Feb 2022 – Feb 2024)
- Artillery Officer responsible for 80+ soldiers, specialised in logistics.

## Projects

### [Hao Jun's Portfolio](https://haojun-portfolio.vercel.app)
Next.js, TypeScript, Prisma, MongoDB, TailwindCSS, Vercel. Personal portfolio site.

### [GroceryPicker](https://grocerypicker.expo.app/)
React Native, TypeScript, Express.js, PostgreSQL, Supabase, GCP, RAG. Full-stack grocery price comparison app for Android and web.

### [Orbital Project Log Generator](https://github.com/haojun-mah/orbital-projectlog-generator)
Python, Groq API, GitHub API. Converts git commit data to project log CSV.

### [3D Parkour](https://github.com/haojun-mah/parkour)
C++, OpenGL. Third-person parkour simulator with custom game engine.

### [Aim Labs](https://github.com/haojun-mah/aimlab)
C++, OpenGL. First-person shooting trainer with custom game engine.

## Education

### National University of Singapore
Bachelor of Computing, Computer Science — 2024–2027 — First Class Honours.
Extracurriculars: Google Developer Student Club, NUS Fintech Society.

### Nanyang Junior College
GCE A-Levels.
`;

const BLOG_MARKDOWN = `# Blog — Haojun Mah

> For the complete documentation index, see [llms.txt](/llms.txt).

Technical blog posts and articles by Haojun Mah.

Visit [https://haojunmah.app/blog](https://haojunmah.app/blog) to read all posts.
`;

const MARKDOWN_MAP: Record<string, string> = {
  "/home": HOME_MARKDOWN,
  "/": HOME_MARKDOWN,
  "/blog": BLOG_MARKDOWN,
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const path = searchParams.get("path") ?? "/";

  const markdown = MARKDOWN_MAP[path] ?? MARKDOWN_MAP["/"];

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
