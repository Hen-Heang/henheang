import { projects } from "@/data/projects"

/**
 * Skill status/evidence taxonomy for the AI portfolio assistant.
 *
 * This is deliberately a *different* model from `data/skills.ts` (the
 * level 1-5 / duration list that powers the CV and resume pages, and the
 * assistant's existing duration-detail knowledge sections). That file
 * answers "how long has he used X"; this one answers "how deep is X, and
 * does the portfolio have evidence for it" — the distinction the assistant
 * needs to never overstate a skill it hasn't shown proof of.
 *
 * Nothing here is invented: every entry is grounded in something that
 * already exists elsewhere in the codebase —
 * - `primary` skills are exactly `capabilityGroups` from
 *   src/lib/content/capabilities.ts (the curated public stack), exploded
 *   from grouped labels ("Docker/GitHub Actions") into individual entries.
 * - `working-knowledge` skills come from `secondaryTechnologies`
 *   (capabilities.ts) or from `data/skills.ts` rows that never made the
 *   curated primary list.
 * - `learning` skills come from content the site already publishes as
 *   not-yet-shipped: the Backend Engineering Lab's `status: "planned"`
 *   roadmap items (data/lab/backend/planned.ts) and the in-progress entry
 *   in data/education.ts.
 *
 * `projectSlugs` is never hand-typed — it's derived from `Project.skills`
 * (data/projects.ts) below, so the two can't drift out of sync.
 */

export type SkillStatus = "primary" | "working-knowledge" | "learning"

/** Distinct from `SkillCategory` in src/lib/types/index.ts (the level/duration list's grouping) — this is a fixed taxonomy for status classification. */
export type SkillCategory = "backend" | "database" | "frontend" | "devops" | "ai"

export interface Skill {
    /** Stable kebab-case id — referenced by `Project.skills` in data/projects.ts. */
    id: string
    name: string
    category: SkillCategory
    status: SkillStatus
    /** One factual sentence — never a proficiency claim beyond what `status` already implies. */
    description: string
    /** Slugs of projects that are meaningful evidence for this skill. Derived, not authored. */
    projectSlugs: string[]
}

type SkillDefinition = Omit<Skill, "projectSlugs">

const skillDefinitions: SkillDefinition[] = [
    // --- Backend --------------------------------------------------------
    // Primary five match capabilityGroups' "Backend" group exactly; OpenAPI/Swagger
    // is exploded in from the "Delivery" group (categorized here as backend, since
    // it's API documentation rather than build/deploy tooling).
    { id: "java", name: "Java", category: "backend", status: "primary", description: "Primary backend language — REST APIs, business logic, and data models across every personal project and current professional work." },
    { id: "spring-boot", name: "Spring Boot", category: "backend", status: "primary", description: "Primary framework for backend services and REST APIs." },
    { id: "mybatis", name: "MyBatis", category: "backend", status: "primary", description: "Primary SQL mapping layer, used at Bizplay and across the Spring Boot personal projects." },
    { id: "spring-security", name: "Spring Security", category: "backend", status: "primary", description: "Authentication and authorization — JWT, OTP verification, MFA, RBAC — implemented end to end in H-Phsar and AuthHub." },
    { id: "rest-apis", name: "REST APIs", category: "backend", status: "primary", description: "Designs and ships REST APIs as the primary way backend work is delivered." },
    { id: "openapi-swagger", name: "OpenAPI / Swagger", category: "backend", status: "primary", description: "Documents every REST API with springdoc OpenAPI / Swagger UI." },
    { id: "data-structures-algorithms", name: "Data Structures & Algorithms", category: "backend", status: "learning", description: "Self-directed study deepening DSA and core Java/Spring fundamentals — listed as in-progress on his education timeline." },
    { id: "messaging-distributed-systems", name: "Messaging & Distributed Systems (Kafka)", category: "backend", status: "learning", description: "A planned module in the Backend Engineering Lab roadmap covering queues, sagas, and the transactional outbox pattern — not yet used in a shipped project." },

    // --- Database ---------------------------------------------------------
    // Primary five match capabilityGroups' "Data" group exactly ("JPA/Flyway"
    // exploded into Flyway + Spring Data JPA).
    { id: "postgresql", name: "PostgreSQL", category: "database", status: "primary", description: "Primary database across nearly every personal project, including Row Level Security schemas." },
    { id: "oracle", name: "Oracle", category: "database", status: "primary", description: "Primary database in his current professional work at Bizplay and prior role at KOSIGN." },
    { id: "sql", name: "SQL", category: "database", status: "primary", description: "Writes and optimizes SQL across PostgreSQL and Oracle." },
    { id: "flyway", name: "Flyway", category: "database", status: "primary", description: "Owns schema migrations with versioned Flyway scripts in H-Phsar and AuthHub." },
    { id: "spring-data-jpa", name: "Spring Data JPA", category: "database", status: "primary", description: "Persistence layer in AuthHub, alongside MyBatis on his other Spring Boot projects." },
    { id: "mysql", name: "MySQL", category: "database", status: "working-knowledge", description: "Used in earlier practice work; not a current primary database." },
    { id: "redis", name: "Redis", category: "database", status: "learning", description: "A planned caching module in the Backend Engineering Lab roadmap; appears as a listed skill tag but hasn't been used in a shipped project yet." },

    // --- Frontend -----------------------------------------------------
    // Primary four match capabilityGroups' "Frontend Support" group (JavaScript/jQuery split in two).
    { id: "nextjs", name: "Next.js", category: "frontend", status: "primary", description: "Primary frontend framework when a product needs a client — used across the active full-stack personal projects." },
    { id: "typescript", name: "TypeScript", category: "frontend", status: "primary", description: "Primary language for every Next.js frontend he ships." },
    { id: "javascript", name: "JavaScript", category: "frontend", status: "primary", description: "Used daily in his current role building frontend pages at Bizplay." },
    { id: "jquery", name: "jQuery", category: "frontend", status: "primary", description: "Used daily in his current role and at KOSIGN for enterprise frontend work." },
    { id: "react", name: "React", category: "frontend", status: "working-knowledge", description: "Used directly in Hengo; Next.js (not raw React) is his primary frontend framework." },
    { id: "tailwind-css", name: "Tailwind CSS", category: "frontend", status: "working-knowledge", description: "Used for styling in H-Space and VSTV Agent." },
    { id: "html", name: "HTML", category: "frontend", status: "working-knowledge", description: "Used for frontend pages in his current enterprise role; documented per-project rather than claimed as a core skill." },
    { id: "css", name: "CSS", category: "frontend", status: "working-knowledge", description: "Used for frontend pages in his current enterprise role; documented per-project rather than claimed as a core skill." },
    { id: "bootstrap", name: "Bootstrap", category: "frontend", status: "working-knowledge", description: "Used in earlier practice and enterprise frontend work." },

    // --- DevOps -------------------------------------------------------
    // Primary five match capabilityGroups' "Delivery" group (Docker/GitHub Actions split, Maven/Gradle split).
    { id: "git", name: "Git / GitHub", category: "devops", status: "primary", description: "Version control and code review workflow on every project." },
    { id: "github-actions", name: "GitHub Actions", category: "devops", status: "primary", description: "CI pipeline in AuthHub, running against a real postgres:16 service container with linting and coverage gates." },
    { id: "maven", name: "Maven", category: "devops", status: "primary", description: "Primary build tool for the Spring Boot projects." },
    { id: "gradle", name: "Gradle", category: "devops", status: "primary", description: "Build tool for AuthHub's multi-module Gradle monorepo." },
    { id: "docker", name: "Docker", category: "devops", status: "primary", description: "Packages backend services as Docker images, e.g. H-Phsar's API." },
    { id: "devops-fundamentals", name: "DevOps Fundamentals", category: "devops", status: "working-knowledge", description: "Verified foundational training through TFDevs' DevOps Essential certificate, reinforced by Git, Docker, CI/CD, and deployment study in the Engineering Lab." },
    { id: "nginx", name: "Nginx", category: "devops", status: "working-knowledge", description: "Documented in depth in the DevOps Engineering Lab guide, but not yet used to deploy a shipped project." },
    { id: "docker-compose", name: "Docker Compose", category: "devops", status: "working-knowledge", description: "Documented in the DevOps Engineering Lab guide for local multi-container development." },
    { id: "kubernetes", name: "Kubernetes", category: "devops", status: "learning", description: "Mentioned as an overview topic in the Backend Engineering Lab's planned deployment-strategies module — not yet hands-on or used in a project." },

    // --- AI -------------------------------------------------------------
    { id: "ai-assisted-development", name: "AI-Assisted Development (Claude Code, Codex)", category: "ai", status: "primary", description: "Practical AI-assisted development workflow used across his current projects." },
    { id: "openai", name: "OpenAI API", category: "ai", status: "primary", description: "Powers Hengo's AI Coach — conversation, message analysis, and structured feedback — via the Vercel AI SDK." },
    { id: "anthropic", name: "Anthropic API", category: "ai", status: "working-knowledge", description: "Built Luyra's optional Money Coach over the user's own finance data (luyra-web, before Luyra merged into H-Space)." },
    { id: "agent-harness-design", name: "Agent Harness Design", category: "ai", status: "learning", description: "Learning how context, instructions, tools, permissions, verification, and state form a reusable operating environment for AI-assisted development." },
    { id: "model-context-protocol", name: "Model Context Protocol (MCP)", category: "ai", status: "learning", description: "Exploring MCP architecture, bounded tool contracts, authentication, and read-only integration patterns through educational labs." },
    { id: "ai-evaluations", name: "AI Evaluations", category: "ai", status: "learning", description: "Practicing representative test cases and quality checks for retrieval, tool selection, groundedness, and workflow behavior." },
    { id: "agent-observability", name: "Agent Observability", category: "ai", status: "learning", description: "Building understanding of traceable model calls, tool activity, latency, failures, feedback, and privacy-aware execution records." },
]

export const skills: Skill[] = skillDefinitions.map((skill) => ({
    ...skill,
    projectSlugs: projects.filter((p) => p.skills?.includes(skill.id)).map((p) => p.slug),
}))

export function getSkillById(id: string): Skill | undefined {
    return skills.find((s) => s.id === id)
}
