import { profileData } from "@/data/profile"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"
import type { KnowledgeSection } from "./types"

/**
 * Explicit professional positioning, kept as its own core section so the
 * assistant keeps "Software Engineer – Backend & AI-Assisted Development"
 * distinct from AI product or machine-learning roles. Backend remains the
 * proven foundation; AI-assisted development is verified practice, and agent
 * engineering topics are explicitly labeled learning areas.
 * Derived from the live profile (Supabase-backed, static fallback) — not a
 * separate claim.
 */
export function buildPositioningKnowledge(profile: ProfileContentParsed): KnowledgeSection[] {
    return [
        {
            id: "positioning-primary",
            category: "positioning",
            title: "Professional positioning",
            keywords: ["positioning", "position", "role", "identity", "backend or frontend", "backend or full-stack", "full-stack", "fullstack", "what does he do", "what kind of developer", "primary focus", "job title", "title", "software engineer", "ai-assisted development", "ax software engineer", "backend ax", "ai engineer"],
            core: true,
            sourceLabel: "About page",
            sourceUrl: `${profile.portfolioUrl}/about`,
            content: [
                `${profile.fullName}'s primary identity is **${profile.title}** — Java, Spring Boot, MyBatis, REST APIs, and PostgreSQL/Oracle.`,
                "",
                `He extends into frontend delivery — Next.js, TypeScript, JavaScript, and jQuery — when a product needs it, most visibly in his current role at ${profile.company ?? "his current employer"}. Frontend work is a supporting capability, not his primary identity.`,
                "",
                "The AI-assisted development side means using AI tools to improve how software gets built — requirement analysis, codebase exploration, implementation and debugging, SQL analysis, test preparation, code review, and documentation — while he stays responsible for correctness. Verified practice includes Claude Code, Codex, and AI features in personal products. Agent Harness, MCP architecture, orchestration, advanced evaluations, and AgentOps remain learning and experimentation areas (the AX Engineering learning path).",
                "",
                "He is not positioned as a machine-learning engineer, AI researcher, or expert in production-scale autonomous-agent infrastructure. His AI work is backend-first, AI-assisted software development and must not be confused with unsupported AI product or model-training expertise.",
            ].join("\n"),
        },
        {
            id: "positioning-recruiter-fit",
            category: "positioning",
            title: "Recruiter fit — what kind of role suits him",
            keywords: ["fit", "recruiter fit", "role fit", "suits", "suitable", "match", "what kind of role", "good fit for", "enterprise experience", "international", "worked internationally", "backend evidence"],
            sourceLabel: "About page",
            sourceUrl: `${profile.portfolioUrl}/about`,
            content: [
                "**Best-fit roles:** backend, Java/Spring Boot, or backend-first software engineering positions, especially where REST API design, MyBatis/JPA data access, PostgreSQL/Oracle, and responsible AI-assisted development are useful. Roles requiring production-scale agent platforms, ML model training, or advanced AI infrastructure would be growth roles rather than established-specialist matches.",
                "",
                `**Strongest backend evidence:** production REST APIs and data-access work at ${profile.company ?? "his current employer"} (Korean enterprise, government/corporate financial systems) and KOSIGN (B2B billing platform integrated with banking systems), plus personal projects (H-Phsar, AuthHub, and VSTV Agent) covering authentication, order/state-machine logic, operations workflows, and schema design end to end.`,
                "",
                "**Enterprise experience:** yes — both employers operate in regulated, enterprise-scale environments (government-facing systems, banking integrations).",
                "",
                "**International experience:** yes — Cambodia-based work (KOSIGN) collaborating daily with Korean development teams, followed by relocating to work in Seoul, South Korea directly (Bizplay).",
            ].join("\n"),
        },
    ]
}

/** Static fallback, used when Supabase is unavailable. */
export const positioningKnowledge: KnowledgeSection[] = buildPositioningKnowledge(profileData)
