/**
 * CV Data - Single Source of Truth
 * ================================
 * Edit ONLY this file to update your CV. Both /cv (portfolio-style) and
 * /resume (ATS-friendly) render from this same data through `getSiteContent("cv")`.
 *
 * Sections you can update:
 *  - personal    → name, title, contact info, links
 *  - summary     → professional summary paragraph
 *  - experience  → work history (newest first)
 *  - education   → degrees, certifications, training
 *  - skills      → skill categories (text lists, no proficiency bars)
 *  - projects    → featured projects (`featured: true` shows on /resume too)
 *  - languages   → spoken languages (text level, no percentages)
 */

import { profileData } from "./profile"

export type PersonalInfo = {
  name: string
  title: string
  subtitle?: string
  photo?: string
  location: string
  phone?: string
  email: string
  linkedin?: string
  github?: string
  portfolio?: string
}

export type ExperienceItem = {
  company: string
  title: string
  location: string
  startDate: string
  endDate: string
  current?: boolean
  bullets: string[]
  stack?: string[]
}

export type EducationItem = {
  school: string
  degree: string
  startDate: string
  endDate: string
  description?: string
}

export type ProjectItem = {
  name: string
  /** Short label, e.g. "Backend API" — shown as a category tag. */
  category?: string
  description: string
  /** 1-2 technical achievement bullets. */
  bullets?: string[]
  technologies: string[]
  github?: string | null
  live?: string | null
  /** Internal case-study route, e.g. "/projects/h-phsar". Omit if none is publicly viewable. */
  caseStudy?: string | null
  /** Shown on /resume (top 3); all featured + non-featured projects may show on /cv. */
  featured?: boolean
}

export type LanguageItem = {
  name: string
  level: string
}

export type SkillGroup = {
  category: string
  items: string[]
}

export const cvData: CVData = {
  personal: {
    name: profileData.fullName,
    title: "Software Engineer – Backend & AI-Assisted Development",
    subtitle: "Java · Spring Boot · MyBatis · PostgreSQL · Oracle · AI-Assisted Development",
    photo: profileData.myImage,
    location: profileData.location,
    email: profileData.email,
    linkedin: profileData.socialLinks.linkedin,
    github: profileData.socialLinks.github,
    portfolio: profileData.portfolioUrl,
  } satisfies PersonalInfo,

  summary:
    "Software Engineer focused on backend systems and AI-assisted development, with 2+ years of experience building Java and Spring Boot applications in Cambodian and Korean enterprise environments. Currently maintaining and developing enterprise financial applications at Bizplay (Webcash Group) with Java, MyBatis, and Oracle SQL. Experienced in REST APIs, Spring Security, PostgreSQL, and SQL-driven business logic for financial and B2B platforms. I use AI coding assistants such as Claude Code and Codex for requirement analysis, codebase exploration, debugging, SQL analysis, test preparation, and review, and I remain responsible for verifying every change. I am learning Agent Harness, MCP, and evaluation concepts through structured practice; these are growth areas, not production experience.",

  experience: [
    {
      company: "Bizplay",
      title: "Software Engineer – Backend & AI-Assisted Development",
      location: "Seoul, South Korea",
      startDate: "October 2025",
      endDate: "Present",
      current: true,
      bullets: [
        "Maintain and develop enterprise financial applications for government agencies and corporate clients (Bizplay, Webcash Group).",
        "Implement Java and MyBatis business logic and write Oracle SQL queries.",
        "Develop and maintain enterprise web interfaces, including voucher administration screens built with HTML, CSS, and jQuery.",
        "Analyze technical requirements and system design before implementation.",
        "Use AI coding assistants for code analysis, implementation, troubleshooting, and review preparation, while owning the correctness of each change.",
        "Collaborate with development teams and follow established coding standards.",
      ],
      stack: ["Java", "MyBatis", "Oracle", "JavaScript", "jQuery", "HTML/CSS"],
    },
    {
      company: "KOSIGN (Korea Software Innovation Global Network)",
      title: "Software Engineer",
      location: "Phnom Penh, Cambodia",
      startDate: "January 2024",
      endDate: "October 2025",
      current: false,
      bullets: [
        "Developed Spring Boot and MyBatis REST APIs for WeBill365, a B2B billing product with Vietnamese banking integrations.",
        "Designed PostgreSQL schemas and optimized query performance for high-volume transactions.",
        "Implemented Spring Security with JWT authentication to secure enterprise-grade APIs.",
        "Integrated Zalo, SMS, and Telegram delivery channels for transactional notifications.",
        "Collaborated daily with Korean development teams on architecture design and code reviews.",
      ],
      stack: ["Java 8+", "Spring Boot", "Spring Security", "PostgreSQL", "MyBatis", "Next.js", "TypeScript"],
    },
  ] satisfies ExperienceItem[],

  education: [
    {
      school: "Royal University of Phnom Penh",
      degree: "Bachelor of Computer Science",
      startDate: "March 2020",
      endDate: "May 2024",
      description: "Focused on software development, algorithms, and web technologies.",
    },
    {
      school: "Korea Software HRD Center",
      degree: "Full-Stack & Mobile Development Training",
      startDate: "July 2023",
      endDate: "April 2024",
      description: "Intensive training in full-stack development and Android application development using Java and Kotlin.",
    },
    {
      school: "ANT Technology Training Center",
      degree: "Basic C++ Programming Certificate",
      startDate: "March 2021",
      endDate: "July 2021",
      description: "Introduction to programming concepts and problem solving with C++.",
    },
  ] satisfies EducationItem[],

  /**
   * Categorised skill lists. Order reflects priority for backend roles.
   * IDE names (IntelliJ IDEA, WebStorm) are filtered out of the ATS resume
   * view in ResumeSkills — they stay here for the portfolio CV only.
   */
  skills: [
    {
      category: "Backend",
      items: ["Java", "Spring Boot", "MyBatis", "Spring Security", "REST APIs", "Maven"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "Oracle", "MySQL", "SQL Optimization", "Schema Design"],
    },
    {
      // Supporting capability, not the primary identity — kept as plain text
      // tags (no proficiency levels) and placed after core backend/database
      // skills. Every item here is verified: app/api/chat/route.ts (OpenAI
      // Responses API), the Luyra Money Coach (Anthropic SDK, in the public
      // Hen-Heang/luyra-web repo, built before Luyra merged into H-Space), and
      // data/progress.ts "ai" entry (Claude Code, Codex, Prompt Design,
      // AI-supported code review — self-reported, in progress).
      category: "AI & Developer Productivity",
      items: [
        "Claude Code",
        "Codex",
        "Anthropic API",
        "OpenAI API",
        "LLM Integration",
        "Prompt Design",
        "AI-Assisted Code Review",
      ],
    },
    {
      category: "Frontend",
      items: ["Next.js", "React", "TypeScript", "JavaScript", "jQuery", "Tailwind CSS"],
    },
    {
      category: "Tools & Delivery",
      items: ["DevOps Fundamentals", "Git", "GitHub", "IntelliJ IDEA", "WebStorm", "Postman", "Swagger", "Vercel", "Railway"],
    },
  ] satisfies SkillGroup[],

  /**
   * Featured projects. `featured: true` = shown on /resume (backend-first).
   * /cv shows all of them. Set github/live/caseStudy to null when a link isn't
   * publicly reachable — never leave a broken or misleading link.
   * We Commerce is intentionally omitted here (unlisted/hidden everywhere,
   * matching `hidden: true` on its data/projects.ts entry).
   */
  projects: [
    {
      name: "H-Phsar",
      category: "Backend API",
      description:
        "Backend API for a B2B marketplace connecting distributors and retailers, built on Spring Boot 3 and PostgreSQL.",
      bullets: [
        "Designed the data model for stores, product catalogs, and carts, and implemented an order state machine with OTP-based verification.",
        "Delivered real-time order notifications over WebSocket.",
      ],
      technologies: ["Spring Boot 3", "Java 17", "MyBatis", "PostgreSQL", "WebSocket"],
      github: "https://github.com/Hen-Heang/h-phsar-api",
      live: null,
      caseStudy: "/projects/h-phsar",
      featured: true,
    },
    {
      // Luyra (personal finance) was merged into H-Space as its Finance area,
      // so it is described here rather than as a separate project.
      name: "H-Space",
      category: "Full-Stack App",
      description:
        "Personal software ecosystem on Next.js, Supabase, and Neon Postgres that brings my learning, finance, and productivity apps into one place — Hengo Learning for Korean and the Luyra finance workspace merged in as Finance.",
      bullets: [
        "Merged the standalone Luyra finance app into H-Space: transactions, budgets, savings, reviews, reports, and scheduled Telegram/email alerts behind server-only route handlers that scope every Neon query to an explicitly linked account.",
        "Kept learning data behind Supabase RLS and routed authenticated AI work through JWT-verified Next.js handlers with per-user limits, using OpenAI and the Vercel AI SDK.",
      ],
      technologies: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Neon Postgres", "Vercel AI SDK", "OpenAI"],
      github: "https://github.com/Hen-Heang/h-space",
      live: "https://hengo.henheang.site/home",
      caseStudy: "/projects/hengo",
      featured: true,
    },
  ] satisfies ProjectItem[],

  languages: profileData.languages,
}

/**
 * The shape both /cv and /resume components render against. Defined
 * independently of `cvData`'s literal type — `getSiteContent("cv")` returns
 * this same (schema-parsed, optional-field) shape when content comes from
 * Supabase instead of this static fallback, and components must accept both.
 */
export type CVData = {
  personal: PersonalInfo
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillGroup[]
  projects: ProjectItem[]
  languages: LanguageItem[]
}
