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
    title: "Backend / AX Software Engineer",
    subtitle: "Java · Spring Boot · MyBatis · PostgreSQL · Oracle · AI-Assisted Development",
    photo: profileData.myImage,
    location: profileData.location,
    email: profileData.email,
    linkedin: profileData.socialLinks.linkedin,
    github: profileData.socialLinks.github,
    portfolio: profileData.portfolioUrl,
  } satisfies PersonalInfo,

  summary:
    "Backend / AX Software Engineer with 2+ years of experience building Java and Spring Boot applications in Cambodian and Korean enterprise environments. Experienced in REST APIs, MyBatis, Spring Security, PostgreSQL, Oracle, and SQL-driven business logic for financial and B2B platforms. I have integrated practical LLM-powered product features and use Claude Code and Codex for AI-assisted planning, analysis, implementation, review, testing, and documentation. I am learning Agent Harness, MCP, guardrail, evaluation, and observability concepts through structured practice; these are growth areas, not claims of production-scale agent infrastructure experience.",

  experience: [
    {
      company: "Bizplay",
      title: "Backend Developer (Java & Spring Boot)",
      location: "Seoul, South Korea",
      startDate: "October 2025",
      endDate: "Present",
      current: true,
      bullets: [
        "Develop Java and MyBatis services and Oracle SQL queries for government-facing financial applications.",
        "Build voucher administration screens with HTML, CSS, and jQuery.",
        "Maintain and improve the stability of enterprise web applications in a Korean enterprise environment.",
        "Collaborate with cross-functional teams following Korean enterprise development conventions.",
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
      // Responses API), data/projects.ts luyra (Anthropic Money Coach), and
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
   * /cv shows all three. Set github/live/caseStudy to null when a link isn't
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
      name: "Luyra",
      category: "Full-Stack App",
      description:
        "Personal finance workspace on Next.js, Supabase Auth, and Neon Postgres with scheduled reviews and finance automation.",
      bullets: [
        "Built transaction, budgeting, savings, analytics, and financial-review workflows behind authenticated Next.js route handlers.",
        "Added an optional Anthropic Money Coach plus scheduled budget alerts, summaries, reports, and multi-channel delivery.",
      ],
      technologies: ["Next.js 16", "TypeScript", "Supabase Auth", "Neon Postgres", "Anthropic"],
      github: "https://github.com/Hen-Heang/luyra-web",
      live: "https://luyra.henheang.site/",
      caseStudy: "/projects/luyra",
      featured: true,
    },
    {
      name: "Hengo",
      category: "Full-Stack App",
      description:
        "Focused AI-assisted Korean learning platform on Next.js, Supabase Auth/Postgres with RLS, and JWT-verified AI routes.",
      bullets: [
        "Built the Today, Vocabulary, Practice, Coach, and Study loop around spaced repetition, workplace Korean, and voice practice.",
        "Kept data behind Supabase RLS and routed authenticated AI work through thin Next.js handlers with OpenAI and the Vercel AI SDK.",
      ],
      technologies: ["Next.js 16", "TypeScript", "Supabase", "Vercel AI SDK", "OpenAI", "Tailwind CSS"],
      github: "https://github.com/Hen-Heang/hengo",
      live: "https://hengo.henheang.site/home",
      caseStudy: "/projects/hengo",
      featured: false,
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
