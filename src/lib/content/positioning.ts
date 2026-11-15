/**
 * Canonical positioning copy — the single source of truth for how the
 * portfolio describes Heang.
 *
 * These strings are code-owned on purpose. They are editorial positioning
 * (not structured records), they must stay identical across the homepage,
 * About page, CV, page metadata, and the AI assistant, and they are reviewed
 * in pull requests like any other copy. Structured content — projects,
 * experience, education, skills, CV sections — stays Supabase-first with the
 * `data/*.ts` files as its typed fallback (see src/lib/db/portfolio.ts).
 *
 * Nothing here may claim experience, metrics, or technologies that aren't
 * evidenced elsewhere in the portfolio data. AI wording describes AI-assisted
 * software development — not ML engineering or production agent platforms.
 */

export const positioning = {
    /** The role, on its own — hero line, About H1, JSON-LD jobTitle. */
    title: "Software Engineer",

    /** What the engineering work centers on, shown beside the title. */
    specialization: "Backend Systems & AI-Assisted Development",

    /**
     * Full professional title, matching the current Bizplay role and the
     * LinkedIn headline. Used for page titles, the CV header, and Open Graph.
     */
    headline: "Software Engineer – Backend & AI-Assisted Development",

    /** Core backend technologies shown on the first screen. */
    coreStack: ["Java", "Spring Boot", "MyBatis", "PostgreSQL", "Oracle", "REST APIs"],

    /** Hero lead — the value proposition, in one sentence. */
    description:
        "Building reliable backend systems with Java and Spring Boot while using AI-assisted development to improve software engineering workflows.",

    /** Hero supporting paragraph — the concrete scope of the work. */
    supporting:
        "At Bizplay (Webcash Group) in Seoul I maintain and develop enterprise financial applications: Java and MyBatis business logic, Oracle SQL, and the web screens around them. I use AI coding assistants to explore code, debug, and prepare reviews, and I stay responsible for every change that ships.",

    /**
     * About narrative, as three paragraphs. Rendered on /about and reused as
     * the homepage About summary and in the assistant's knowledge base, so
     * the same story is told everywhere.
     */
    about: [
        "I'm Hen Heang, a Cambodian software engineer working in Seoul, South Korea. My foundation is backend engineering with Java, Spring Boot, MyBatis, PostgreSQL, and Oracle, supported by frontend delivery with Next.js, React, TypeScript, JSP, and jQuery when a product needs it.",
        "At work I maintain and develop enterprise financial applications — business logic, SQL, and REST APIs that have to be correct. I use AI coding assistants throughout that process: analyzing requirements, exploring unfamiliar code, investigating bugs, checking SQL, preparing tests, and drafting review notes. The AI speeds up the investigation; the verification and the decision stay with me.",
        "Outside work I build personal projects — with Claude Code and Codex as development assistants — to go deeper on backend design, authentication, and data modeling, and I am learning Agent Harness design, MCP, evaluations, and DevOps through structured labs. I care about maintainable systems, explicit decisions, and software that solves real problems.",
    ],
} as const

/** Single-paragraph form of the About narrative, for metadata and the CV summary. */
export const aboutSummary = positioning.about.join(" ")

/** "Software Engineer · Backend Systems & AI-Assisted Development" — compact one-line form. */
export const positioningLine = `${positioning.title} · ${positioning.specialization}`
