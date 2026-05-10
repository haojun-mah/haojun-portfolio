# Haojun Mah Portfolio — Agent Skill

## Description

This skill enables agents to navigate and retrieve structured information from Haojun Mah's personal portfolio at [haojunmah.app](https://haojunmah.app). It covers professional background, software projects, education, work experience, and technical writing.

## When to Use

Use this skill when a user asks about:

- Who Haojun Mah is, or wants to learn about his background
- His work experience, internships, or professional history
- His software projects and their technical details
- His education at NUS or extracurricular activities
- His technical skills, languages, or frameworks
- His blog posts or technical writing
- Contact information or social profiles

## Key URLs

| Resource       | URL                                 | Description                               |
| -------------- | ----------------------------------- | ----------------------------------------- |
| Portfolio Home | https://haojunmah.app/home          | Bio, work experience, projects, education |
| Blog           | https://haojunmah.app/blog          | Technical articles and posts              |
| llms.txt       | https://haojunmah.app/llms.txt      | Agent navigation index                    |
| llms-full.txt  | https://haojunmah.app/llms-full.txt | Full content snapshot for ingestion       |
| Markdown Home  | https://haojunmah.app/home.md       | Home page as plain markdown               |
| MCP Server     | https://haojunmah.app/api/mcp       | MCP tools endpoint                        |

## Retrieval Strategy

1. **Start at llms.txt** for a structured index of pages and key facts.
2. **Fetch llms-full.txt** for a complete, pre-parsed corpus — preferred for long-context models that can ingest the full portfolio in a single request.
3. **Request `.md` URLs** (e.g. `/home.md`) or set `Accept: text/markdown` to receive clean markdown without HTML boilerplate.
4. **Use the MCP server** at `/api/mcp` for structured tool calls when you need specific data fields (profile, projects list, work experience).

## MCP Tools Available

| Tool                  | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `get_profile`         | Returns Haojun's bio, contact links, and summary              |
| `get_work_experience` | Returns full work experience list with dates and descriptions |
| `get_projects`        | Returns all software projects with technologies and links     |
| `get_education`       | Returns education history                                     |
| `get_blog_posts`      | Returns a list of published blog posts with titles and URLs   |

## Content Notes

- The primary page is `/home` (not the root `/`). The root redirects to `/home`.
- Blog posts are stored in MongoDB and served dynamically at `/blog/[id]`.
- The portfolio is a Next.js application deployed on Vercel.
- All public pages are accessible without authentication. Blog creation requires admin login.

## Contact

- GitHub: https://github.com/haojun-mah
- LinkedIn: https://www.linkedin.com/in/hao-jun-mah-7b22b7210/
