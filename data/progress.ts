export type ProgressStatus = "Learning" | "Building" | "Practicing" | "Completed"
export type MilestoneState = "completed" | "current" | "planned"

export interface ProgressMilestone {
    label: string
    state: MilestoneState
}

export interface ProgressItem {
    id: "backend" | "devops" | "ai" | "korean"
    title: string
    subtitle: string
    description: string
    status: ProgressStatus
    statusLabel: string
    currentFocus: string
    technologies: string[]
    updatedAt: string
    milestones: ProgressMilestone[]
}

export interface ActiveProject {
    id: string
    name: string
    description: string
    status: string
    href: string
    technologies: string[]
}

export const progressItems: ProgressItem[] = [
    {
        id: "backend",
        title: "Backend Engineering",
        subtitle: "Spring Boot & Security",
        description:
            "Building production-ready REST APIs with Spring Boot, Spring Security, JWT authentication, MyBatis, PostgreSQL, validation, testing, and clean architecture.",
        status: "Building",
        statusLabel: "In Development",
        currentFocus: "AuthHub authentication and authorization API",
        technologies: ["Java", "Spring Boot", "Spring Security", "MyBatis", "PostgreSQL"],
        updatedAt: "2026-07-17",
        milestones: [
            { label: "Spring Boot REST API foundations", state: "completed" },
            { label: "JWT issue, refresh, logout, and token revocation", state: "completed" },
            { label: "PostgreSQL persistence and validation", state: "completed" },
            { label: "Role and permission authorization hardening", state: "current" },
            { label: "Dockerized release and CI/CD quality gate", state: "planned" },
        ],
    },
    {
        id: "devops",
        title: "DevOps Fundamentals",
        subtitle: "Deployment & Operations",
        description:
            "Learning how to build, deploy, monitor, and maintain applications using Docker, GitHub Actions, Linux, Nginx, CI/CD pipelines, and deployment strategies.",
        status: "Practicing",
        statusLabel: "Learning & Practicing",
        currentFocus: "Containerizing Spring Boot and Next.js applications",
        technologies: ["Docker", "GitHub Actions", "Linux", "Nginx", "CI/CD"],
        updatedAt: "2026-10-02",
        milestones: [
            { label: "Linux, Git, and environment configuration fundamentals", state: "completed" },
            { label: "GitHub Actions build and test workflow", state: "completed" },
            { label: "TFDevs DevOps Essential certificate", state: "completed" },
            { label: "Multi-stage containers for Spring Boot and Next.js", state: "current" },
            { label: "Nginx reverse proxy and HTTPS setup", state: "planned" },
            { label: "Deployment monitoring and rollback practice", state: "planned" },
        ],
    },
    {
        id: "ai",
        title: "AX Engineering",
        subtitle: "AI-Assisted Workflow & Agent Harness",
        description:
            "Learning how context, instructions, tools, agents, MCP, guardrails, quality gates, evaluations, observability, and handoff can make AI-assisted development more reliable.",
        status: "Learning",
        statusLabel: "Actively Exploring",
        currentFocus: "Structured AX Engineering curriculum and educational Agent Harness labs",
        technologies: ["Claude Code", "Codex", "Agent Harness", "MCP", "Evals"],
        updatedAt: "2026-09-10",
        milestones: [
            { label: "Structured planning and implementation prompts", state: "completed" },
            { label: "AI-supported documentation and code review", state: "completed" },
            { label: "Test-first verification loops for full-stack changes", state: "completed" },
            { label: "Version-controlled AX curriculum and concept map", state: "current" },
            { label: "Project instructions, skills, and read-only MCP tool labs", state: "planned" },
            { label: "Evaluation, observability, and handoff practice", state: "planned" },
        ],
    },
    {
        id: "korean",
        title: "Korean for Software Engineers",
        subtitle: "Workplace Communication",
        description:
            "Improving speaking, listening, and workplace communication to collaborate more effectively with Korean product and engineering teams.",
        status: "Practicing",
        statusLabel: "Daily Practice",
        currentFocus: "Technical Korean, workplace conversations, and K-Specialist interview preparation",
        technologies: ["Technical Korean", "TOPIK I", "Workplace Communication", "Interview Practice"],
        updatedAt: "2026-07-17",
        milestones: [
            { label: "TOPIK I language foundation", state: "completed" },
            { label: "Daily technical vocabulary and listening practice", state: "current" },
            { label: "Workplace conversations and written updates", state: "current" },
            { label: "K-Specialist interview preparation", state: "planned" },
            { label: "Technical presentation practice in Korean", state: "planned" },
        ],
    },
]

// Every entry must point at a real project slug in data/projects.ts (or "/").
// The previous list carried a separate "KoriAI" entry that pointed at
// /projects/hengo — KoriAI is the former name of Hengo, not a second project,
// so the two rows described the same thing and one of them linked to a title
// it didn't match.
export const activeProjects: ActiveProject[] = [
    {
        id: "hengo",
        name: "H-Space",
        description:
            "My personal application hub for learning, finance, productivity, and engineering, preserving Hengo Learning.",
        status: "Building",
        href: "/projects/hengo",
        technologies: ["Next.js", "Supabase", "OpenAI", "Vercel AI SDK"],
    },
    {
        id: "authhub",
        name: "AuthHub",
        description:
            "A reusable Spring Boot authentication and authorization service.",
        status: "In Development",
        href: "/projects/authhub",
        technologies: ["Java", "Spring Security", "PostgreSQL"],
    },
    {
        id: "portfolio",
        name: "Developer Portfolio",
        description:
            "A technical portfolio showcasing my backend experience, system design, projects, learning journey, and AI experiments.",
        status: "Iterating",
        href: "/",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
        id: "luyra",
        name: "Luyra",
        description:
            "A personal finance workspace for budgets, savings, analytics, reviews, and AI-assisted money coaching.",
        status: "Iterating",
        href: "/projects/luyra",
        technologies: ["Next.js", "Neon", "Supabase Auth", "Anthropic"],
    },
]
