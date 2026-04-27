import { NextRequest, NextResponse } from "next/server";

// MCP server implementing JSON-RPC 2.0 over HTTP
// Spec: https://spec.modelcontextprotocol.io

const PROFILE = {
  name: "Haojun Mah",
  alternateName: "Hao Jun Mah",
  url: "https://haojunmah.app",
  jobTitle: "Software Engineer / CS Student",
  university: "National University of Singapore",
  degree: "Bachelor of Computing, Computer Science",
  graduationYear: 2027,
  grade: "First Class Honours",
  areasOfInterest: ["Parallel Computing", "Software Engineering", "AI/ML", "Systems Programming"],
  github: "https://github.com/haojun-mah",
  linkedin: "https://www.linkedin.com/in/hao-jun-mah-7b22b7210/",
  portfolio: "https://haojunmah.app",
};

const WORK_EXPERIENCE = [
  {
    company: "Fly Fairly",
    title: "Software Engineer Intern",
    start: "Jan 2026",
    end: "Apr 2026",
    technologies: ["React", "Node.js", "TypeScript", "Next.js"],
    highlights: [
      "Identified and eliminated 3 key operational bottlenecks through structured stakeholder interviews.",
      "Built back-office reporting dashboard with Next.js, improving sprint throughput by ~20%.",
      "Proposed modernised tech stack solutions adopted into roadmap for 3 out of 6 company departments.",
    ],
  },
  {
    company: "Toppan Ecquaria",
    title: "Software Engineer Intern",
    start: "May 2025",
    end: "Jul 2025",
    highlights: [
      "Designed RAG pipelines and LLM-based AI agents for enterprise SaaS; deployed across 10+ clients.",
      "Enhanced AI lip-dubbing system with Kokoro and LatentSync models; sold at $5,000/licence.",
      "Refactored web applications with React and FastAPI for 2,000 users.",
    ],
  },
  {
    company: "Lyza Education",
    title: "Software Engineer Intern",
    start: "Mar 2024",
    end: "May 2024",
    technologies: ["Next.js", "Python", "JavaScript"],
    highlights: [
      "Built a Next.js learning management tool used by 100+ students.",
    ],
  },
  {
    company: "Singapore Armed Forces",
    title: "Deputy Staffer 4 Officer, 21 Singapore Artillery",
    start: "Feb 2022",
    end: "Feb 2024",
    highlights: [
      "Artillery Officer responsible for 80+ soldiers.",
      "Specialised in logistics; completed Junior and Advanced Logistics courses.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Hao Jun's Portfolio",
    url: "https://haojun-portfolio.vercel.app",
    github: "https://github.com/haojun-mah/haojun-portfolio",
    date: "Aug 2025",
    technologies: ["Next.js", "TypeScript", "Prisma", "MongoDB", "TailwindCSS", "Shadcn UI", "Vercel"],
    description: "Personal portfolio website showcasing work experience, education, and projects.",
  },
  {
    title: "GroceryPicker",
    url: "https://grocerypicker.expo.app/",
    github: "https://github.com/haojun-mah/GroceryPicker",
    date: "May 2025 – Aug 2025",
    technologies: ["React Native", "TypeScript", "Express.JS", "PostgreSQL", "Supabase", "GCP", "RAG", "Python"],
    description: "Full-stack Android/web app for building grocery lists and finding cheapest prices across stores.",
  },
  {
    title: "Orbital Project Log Generator",
    github: "https://github.com/haojun-mah/orbital-projectlog-generator",
    date: "July 2025",
    technologies: ["Python", "Groq API", "GitHub API"],
    description: "Converts git commit data into a project log CSV for NUS Orbital.",
  },
  {
    title: "3D Parkour",
    github: "https://github.com/haojun-mah/parkour",
    date: "Jun 2024 – Jul 2024",
    technologies: ["C++", "OpenGL"],
    description: "Third-person parkour simulator with a custom C++/OpenGL game engine.",
  },
  {
    title: "Aim Labs",
    github: "https://github.com/haojun-mah/aimlab",
    date: "May 2024 – Jun 2024",
    technologies: ["C++", "OpenGL"],
    description: "First-person shooting trainer built with a custom C++/OpenGL game engine.",
  },
];

const EDUCATION = [
  {
    school: "National University of Singapore",
    degree: "Bachelor of Computing, Computer Science",
    start: "2024",
    end: "2027",
    grade: "First Class Honours",
    extracurriculars: ["Google Developer Student Club (Software Engineer)", "NUS Fintech Society (Software Engineer)"],
    url: "https://nus.edu.sg/",
  },
  {
    school: "Nanyang Junior College",
    qualification: "GCE A-Levels",
  },
];

const TOOLS = [
  {
    name: "get_profile",
    description: "Returns Haojun Mah's professional profile, bio, and contact links.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_work_experience",
    description: "Returns full work experience list with company, title, dates, and key highlights.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_projects",
    description: "Returns all software projects with descriptions, technologies, and links.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_education",
    description: "Returns education history including degree, school, and extracurriculars.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
];

function handleTool(name: string): unknown {
  switch (name) {
    case "get_profile":
      return PROFILE;
    case "get_work_experience":
      return WORK_EXPERIENCE;
    case "get_projects":
      return PROJECTS;
    case "get_education":
      return EDUCATION;
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function jsonRpcError(id: unknown, code: number, message: string) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

export async function POST(request: NextRequest) {
  let body: { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(jsonRpcError(null, -32700, "Parse error"), { status: 400 });
  }

  const { id, method, params } = body;

  if (method === "initialize") {
    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "haojun-portfolio", version: "1.0.0" },
      },
    });
  }

  if (method === "tools/list") {
    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      result: { tools: TOOLS },
    });
  }

  if (method === "tools/call") {
    const toolName = (params as { name?: string })?.name;
    if (!toolName) {
      return NextResponse.json(jsonRpcError(id, -32602, "Missing tool name"), { status: 400 });
    }
    try {
      const result = handleTool(toolName);
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        },
      });
    } catch (err) {
      return NextResponse.json(
        jsonRpcError(id, -32601, err instanceof Error ? err.message : "Tool error"),
        { status: 404 }
      );
    }
  }

  return NextResponse.json(jsonRpcError(id, -32601, "Method not found"), { status: 404 });
}

// GET endpoint returns server metadata for discoverability
export async function GET() {
  return NextResponse.json({
    name: "haojun-portfolio",
    version: "1.0.0",
    description: "MCP server for Haojun Mah's portfolio",
    protocolVersion: "2024-11-05",
    tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
  });
}
