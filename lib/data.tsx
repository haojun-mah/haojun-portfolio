import { Icons } from "@/components/icons";

export const workExperience = [
  {
    company: "Fly Fairly",
    title: "Software Engineer Intern",
    logoUrl: "/flyfairly.png",
    href: "https://example.com",
    badges: ["React", "Node.js", "TypeScript"],
    start: "Jan 2026",
    end: "Apr 2026",
    description: [
      "Identified and eliminated **3 key operational bottlenecks** through structured stakeholder interviews.",
      "Built back-office reporting dashboard with **Next.js**, reducing cross-team coordination overhead and improving sprint throughput by an estimated **20%**.",
      "Proposed and documented modernized tech stack solutions for interviewed problems which were adopted into the **technical roadmap** for **3 out of 6** company departments.",
    ],
  },

  {
    company: "Toppan Ecquaria",
    title: "Software Engineer Intern",
    logoUrl: "/toppanecquaria.jpg",
    href: "https://example.com",
    start: "May 2025",
    end: "Jul 2025",
    description: [
      "Designed and integrated **RAG pipelines** and **LLM-based AI agents** into enterprise SaaS products, enabling context-aware document Q&A; deployed across **10+ client companies**, directly contributing to new product adoption.",
      "Enhanced an AI lip dubbing system by leveraging open-source audio models such as **Kokoro** and the **LatentSync** lip-sync model, enabling multilingual AI video dubbing solutions sold at **$5,000 per license**.",
      "Refactored and modernized multiple web applications using **React** and **FastAPI**, improving UI performance and scalability for the group's **2,000 users**.",
    ],
  },
  {
    company: "Lyza Education",
    title: "Software Engineer Intern",
    logoUrl: "/lyzaeducation.jpg",
    badges: ["Python", "JavaScript", "Teaching"],
    start: "Mar 2024",
    end: "May 2024",
    description: [
      "Built and deployed a web-based learning management tool in **Next.js** used by **100+ students** to submit assignments, track progress, and receive automated feedback on programming exercises.",
    ],
  },
  {
    company: "Singapore Armed Forces",
    title: "Deputy Staffer 4 Officer, 21 Singapore Artillery",
    logoUrl: "/SAF.png",
    badges: ["Leadership", "Logistics", "Training"],
    start: "Feb 2022",
    end: "Feb 2024",
    description: [
      "Trained and served as an Artillery Officer. Learnt interesting technical knowledge such as fire direction calculation, gun positioning and even war strategy.",
      "In-charge of a company of 80+ soldiers, responsible for their welfare and training",
      "Specialised in logistics, taken part in both Junior and Advanced Logistics course",
      "Genuinely one of the most fun and meaningful moments of my life. Enjoyed meeting people from different walks of life serving the same mission. Really reignited the patriotism in me.",
    ],
  },
];

export const projectData = [
  {
    title: "Minecraft GPT",
    href: "https://github.com/haojun-mah/minecraft-gpt",
    dates: "May 2026",
    active: true,
    description:
      "When I was 14, I failed my art class. Back then I was addicted to Minecraft and I realised that I have zero artistic talent. Hence, we decided to build Minecraft GPT, a mod which allows us to spawn structures in through text and images only.",
    technologies: [
      "Java",
      "FastAPI",
      "Exa",
      "GPT Image",
      "Fal API",
    ],
    links: [
      {
        type: "GitHub",
        href: "https://github.com/haojun-mah/minecraft-gpt",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "https://youtu.be/lJ81ANBxTJU",
  },
  {
    title: "Orbital Project Log Generator",
    href: "https://github.com/haojun-mah/orbital-projectlog-generator",
    dates: "July 2025",
    active: false,
    description:
      "I was frustrated at how long and tedious it takes to create a project log for Orbital. As the project log task messages are identical or similar to git commit messages, it is possible to create a project log file from git commit data. Hence, I built a script in python which convert git commit data into a project log CSV file. The script also has option to use Groq API key to estimate hours spent on task as well.",
    technologies: ["Python", "Groq API", "Github API"],
    links: [
      {
        type: "GitHub",
        href: "https://github.com/haojun-mah/orbital-projectlog-generator",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "https://youtu.be/O3_bBsJRbgQ",
  },

  {
    title: "Hao Jun's Portfolio",
    href: "https://haojun-portfolio.vercel.app",
    dates: "Aug 2025",
    active: true,
    description:
      "With application season coming up, I wanted to create a portfolio website that showcase my work experiece, education and projects. More importantly, I want to build a canvas that reflects my design philosophy and personal brand. Had alot of fun trying out new UI designs and cool animations. Let me know if there is any way I can improve on this portfolio.",
    technologies: [
      "Next.js",
      "Typescript",
      "Prisma",
      "MongoDB",
      "TailwindCSS",
      "Shadcn UI",
      "Magic UI",
      "Vercel",
    ],
    links: [
      {
        type: "Website",
        href: "https://haojun-portfolio.vercel.app",
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: "GitHub",
        href: "https://github.com/haojun-mah/haojun-portfolio",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "https://youtu.be/cE4w29sNgLQ",
  },
  {
    title: "Orbital Project Log Generator",
    href: "https://github.com/haojun-mah/orbital-projectlog-generator",
    dates: "July 2025",
    active: false,
    description:
      "I was frustrated at how long and tedious it takes to create a project log for Orbital. As the project log task messages are identical or similar to git commit messages, it is possible to create a project log file from git commit data. Hence, I built a script in python which convert git commit data into a project log CSV file. The script also has option to use Groq API key to estimate hours spent on task as well.",
    technologies: ["Python", "Groq API", "Github API"],
    links: [
      {
        type: "GitHub",
        href: "https://github.com/haojun-mah/orbital-projectlog-generator",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "https://youtu.be/O3_bBsJRbgQ",
  },
  {
    title: "GroceryPicker",
    href: "https://grocerypicker.expo.app/",
    dates: "May 2025 - Aug 2025",
    active: false,
    description:
      "GroceryPicker is a full-stack android application with web support. It is an application which helps user build grocery lists and find cheapest grocery items and where to purchase them from various grocery stores. This allows users to easily maximising savings on grocery items without having to walk back and forth between grocery stores to compare prices.",
    technologies: [
      "React Native",
      "TypeScript",
      "Express.JS",
      "PostgreSQL",
      "Supabase",
      "NativeWindCSS",
      "GCP",
      "RAG",
      "Playwright",
      "Jest",
      "Python",
    ],
    links: [
      {
        type: "Website",
        href: "https://grocerypicker.expo.app/",
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: "GitHub",
        href: "https://github.com/haojun-mah/GroceryPicker",
        icon: <Icons.github className="size-3" />,
      },
      {
        type: "APK",
        href: "https://drive.google.com/file/d/1u4HWQieASk8GGFnAbVKAR8zh2yVntvos/view?usp=sharing",
        icon: <Icons.robot className="size-3" />,
      },
      {
        type: "Video",
        href: "https://youtu.be/E0fc65hqdE4",
        icon: (
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 15.75v-7.5a2 2 0 0 1 2-2h8.5a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2m17.168-8.759-4 3.563a.5.5 0 0 0-.168.373v1.778a.5.5 0 0 0 .168.373l4 3.563a.5.5 0 0 0 .832-.374V7.365a.5.5 0 0 0-.832-.374" />
          </svg>
        ),
      },
    ],
    image: "",
    video: "https://youtu.be/E0fc65hqdE4",
  },
  {
    title: "3D Parkour",
    href: "https://github.com/haojun-mah/parkour",
    dates: "Jun 2024 - Jul 2024",
    active: false,
    description:
      "3D Parkour is a third-person parkour simulator where player has to navigate its character through a set parkour course. The entire game is written with a game engine that i built by myself, written using C++ and OpenGL. I had alot of fun experimenting with graphics and game physics.",
    technologies: ["C++", "OpenGL", "Game Development", "Game Engine"],
    links: [
      {
        type: "GitHub",
        href: "https://github.com/haojun-mah/parkour",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "https://youtu.be/0maBoQnJcNo",
  },
  {
    title: "Aim Labs",
    href: "https://github.com/haojun-mah/aimlab",
    dates: "May 2024 - Jun 2024",
    active: false,
    description:
      "Aimlabs is a first-person shooting trainer where player has to shoot down targets. It is meant to be a take on the popular KovaaK's aimlabs. The entire game is written with a game engine that i built by myself, written using C++ and OpenGL. I had alot of fun experimenting with graphics and game physics.",
    technologies: ["C++", "OpenGL", "Game Development", "Game Engine"],
    links: [
      {
        type: "GitHub",
        href: "https://github.com/haojun-mah/aimlab",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "https://youtu.be/GcTnzl00pJo",
  },
];

// Main DATA object for navbar and other components
export const DATA = {
  navbar: [
    { href: "/home", icon: Icons.home, label: "Home" },
    { href: "/blog", icon: Icons.book, label: "Blog" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/haojun-mah",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/hao-jun-mah-7b22b7210/",
        icon: Icons.linkedin,
        navbar: true,
      },
    },
  },
};

export const educationData = [
  {
    school: "National University of Singapore",
    href: "https://nus.edu.sg/",
    degree: "Bachelor of Computing, Computer Science",
    logoUrl: "/nus.jpg",
    start: "2024",
    end: "2027",
    description: [
      "Extracurricular: Google Developer Student Club Software Engineer, NUS Fintech Society Software Engineer",
      "Grade: First Class Honors",
    ],
  },
  {
    school: "Nanyang Junior College",
    href: "https://www.nanyangjc.moe.edu.sg/",
    degree:
      "Singapore-Cambridge GCE A-Level, Biology, Chemistry, Math, Economics (BCME)",
    logoUrl: "/nyjc.png",
    start: "2020",
    end: "2021",
    description: ["Grade: AAAA/A"],
  },
];
