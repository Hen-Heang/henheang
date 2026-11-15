/**
 * Canonical public capability model — the single source of truth for the
 * technologies the portfolio presents as primary skills.
 *
 * Why this is curated rather than derived from `portfolio_skills`:
 * the database stores 28 rows covering everything ever used (HTML, CSS,
 * Bootstrap, IDEs, Postman, MySQL, Tailwind, React, …). That is a useful
 * record, but it is not what a recruiter should scan. This model is the
 * short, deliberate public list; the database rows stay untouched and remain
 * available to the admin panel and the assistant's detailed knowledge.
 *
 * Rules encoded here (asserted in capabilities.test.ts):
 * - Four capability groups, max five technologies each.
 * - No proficiency levels, percentages, or Expert/Advanced/Intermediate labels.
 * - AI is presented separately as a statement, not as a skill column, because
 *   it describes how he works rather than a technology he claims depth in.
 * - Supporting technologies (`secondaryTechnologies`) are documented per
 *   project instead of being displayed as primary skills.
 */

export interface CapabilityGroup {
    /** Column heading. */
    label: string
    /** One factual sentence about what he does with this group. */
    summary: string
    /** Primary technologies — max five, shown in full. */
    technologies: string[]
}

/** Maximum technologies shown per category, so the section stays scannable. */
export const MAX_TECHNOLOGIES_PER_GROUP = 5

export const capabilityGroups: readonly CapabilityGroup[] = [
    {
        label: "Backend",
        summary:
            "Designing REST APIs and business logic with Spring Boot and Spring Security.",
        technologies: [
            "Java",
            "Spring Boot",
            "MyBatis",
            "Spring Security",
            "REST APIs",
        ],
    },
    {
        label: "Data",
        summary:
            "Modeling schemas and writing SQL across PostgreSQL and Oracle.",
        technologies: ["PostgreSQL", "Oracle", "SQL", "JPA/Flyway"],
    },
    {
        label: "Frontend Support",
        summary:
            "Extending backend work into Next.js clients when a product needs a frontend.",
        technologies: ["Next.js", "TypeScript", "JavaScript/jQuery"],
    },
    {
        label: "Delivery",
        summary:
            "Documenting APIs and shipping services with build tooling and CI pipelines.",
        technologies: [
            "Git/GitHub",
            "Maven/Gradle",
            "Docker/GitHub Actions",
            "OpenAPI/Swagger",
        ],
    },
] as const

/**
 * How AI is presented across the site. Deliberately a short statement rather
 * than a skills column, split into three tiers so professional practice,
 * personal-project work, and learning are never blurred together.
 */
export const aiPractice = [
    {
        label: "At work",
        text: "AI coding assistants support requirement analysis, codebase exploration, SQL analysis, debugging, and review preparation. I verify the result and own every change.",
    },
    {
        label: "Personal projects",
        text: "Claude Code and Codex for planning, implementation, testing, and documentation, plus product features built on the OpenAI and Anthropic APIs.",
    },
    {
        label: "Learning",
        text: "Agent Harness design, MCP, guardrails, and evaluations, explored through the structured AX Engineering labs.",
    },
] as const

/** Single-string form of `aiPractice`, for the assistant and plain-text contexts. */
export const aiStatement = aiPractice.map((tier) => `${tier.label}: ${tier.text}`).join(" ")

/**
 * Technologies that were previously shown as primary skills and now belong to
 * project detail pages instead. Kept as an explicit list so a reviewer can see
 * nothing was silently dropped, and so a test can assert none of them reappear
 * in `capabilityGroups`.
 */
export const secondaryTechnologies: readonly string[] = [
    "HTML",
    "CSS",
    "Bootstrap",
    "IntelliJ IDEA",
    "WebStorm",
    "Postman",
    "Supabase",
    "Neon",
    "Tailwind CSS",
    "React",
    "WebSocket",
    "Web Push",
    "Vercel",
    "Railway",
] as const

/** Flat list of every primary technology, for matching against project stacks. */
export const primaryTechnologies: readonly string[] = capabilityGroups.flatMap(
    (group) => group.technologies,
)
