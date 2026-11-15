import { describe, expect, it } from "vitest"
import { portfolioTools } from "./index"
import { experiences } from "@/data/experience"
import { projects as staticProjects } from "@/data/projects"

/** Minimal ToolExecutionOptions — these tools ignore all of it, but the AI SDK's `execute` signature requires it. */
const opts = { toolCallId: "test", messages: [], context: undefined }

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic test helper bridging each tool's own narrower input/output types
async function run<T>(tool: { execute?: (input: any, options: any) => any }, input: unknown): Promise<T> {
    if (!tool.execute) throw new Error("tool has no execute function")
    return tool.execute(input, opts)
}

describe("getSkills tool", () => {
    it("returns every skill with no filters", async () => {
        const result = await run<{ skills: unknown[] }>(portfolioTools.getSkills, {})
        expect(result.skills.length).toBeGreaterThan(30)
    })

    it("filters by category", async () => {
        const result = await run<{ skills: { category: string }[] }>(portfolioTools.getSkills, { category: "devops" })
        expect(result.skills.length).toBeGreaterThan(0)
        for (const skill of result.skills) expect(skill.category).toBe("devops")
    })

    it("filters by status, and never marks a learning skill as primary", async () => {
        const result = await run<{ skills: { status: string; name: string }[] }>(portfolioTools.getSkills, { status: "learning" })
        expect(result.skills.some((s) => s.name.toLowerCase().includes("kubernetes"))).toBe(true)
        for (const skill of result.skills) expect(skill.status).toBe("learning")
    })

    it("returns nothing for a technology that appears nowhere in the portfolio", async () => {
        const result = await run<{ skills: { name: string }[] }>(portfolioTools.getSkills, {})
        expect(result.skills.some((s) => s.name.toLowerCase().includes("cobol"))).toBe(false)
    })
})

describe("searchProjects tool", () => {
    it("finds every project that lists Spring Boot as a skill", async () => {
        const result = await run<{ projects: { slug: string }[] }>(portfolioTools.searchProjects, { query: "Spring Boot" })
        const slugs = result.projects.map((p) => p.slug)
        expect(slugs).toEqual(expect.arrayContaining(["h-phsar", "authhub", "vstv-agent"]))
        expect(slugs).not.toContain("hengo")
    })

    it("finds projects by engineering focus area (authentication)", async () => {
        const result = await run<{ projects: { slug: string }[] }>(portfolioTools.searchProjects, { query: "authentication" })
        expect(result.projects.map((p) => p.slug)).toContain("h-phsar")
    })

    it("returns nothing for a technology with no shipped project evidence", async () => {
        const result = await run<{ projects: unknown[] }>(portfolioTools.searchProjects, { query: "Kubernetes" })
        expect(result.projects).toEqual([])
    })

    it("matches by project name", async () => {
        const result = await run<{ projects: { slug: string }[] }>(portfolioTools.searchProjects, { query: "H-Phsar" })
        expect(result.projects.map((p) => p.slug)).toContain("h-phsar")
    })
})

describe("getProject tool", () => {
    it("returns case-study detail for a known slug, including engineering focus", async () => {
        const result = await run<{ slug?: string; technologies?: string[]; engineeringFocus?: string[] }>(portfolioTools.getProject, { slug: "h-phsar" })
        expect(result.slug).toBe("h-phsar")
        expect(result.technologies).toContain("PostgreSQL")
        expect(result.engineeringFocus?.length).toBeGreaterThan(0)
    })

    it("returns an error for an unknown slug instead of inventing a project", async () => {
        const result = await run<{ error?: string }>(portfolioTools.getProject, { slug: "does-not-exist" })
        expect(result.error).toMatch(/no project found/i)
    })
})

describe("hidden projects", () => {
    // Projects marked `hidden` are unlisted on the site, so the assistant's
    // tools must never return them — not by name, technology, or slug.
    const hidden = staticProjects.filter((p) => p.hidden)

    it.each(hidden.map((p) => [p.slug, p.title.split(" — ")[0]]))(
        "never returns %s from searchProjects, even when searched by name",
        async (slug, name) => {
            for (const query of [name, slug, "Spring Boot", "marketplace"]) {
                const result = await run<{ projects: { slug: string }[] }>(portfolioTools.searchProjects, { query })
                expect(result.projects.map((p) => p.slug), `query "${query}"`).not.toContain(slug)
            }
        },
    )

    it.each(hidden.map((p) => [p.slug]))("getProject treats %s as unknown", async (slug) => {
        const result = await run<{ error?: string; slug?: string }>(portfolioTools.getProject, { slug })
        expect(result.slug).toBeUndefined()
        expect(result.error).toMatch(/no project found/i)
    })
})

describe("getExperience tool", () => {
    it("returns his real work history, distinct from personal projects", async () => {
        const result = await run<{ experience: { company: string; summary: string }[] }>(portfolioTools.getExperience, {})
        expect(result.experience).toHaveLength(experiences.length)
        expect(result.experience.map((e) => e.company)).toContain("Bizplay")
        // Personal-project names should never appear in professional work history.
        for (const item of result.experience) expect(item.company.toLowerCase()).not.toContain("authhub")
    })
})

describe("searchEngineeringLab tool", () => {
    it("finds Lab content for a topic", async () => {
        const result = await run<{ results: { title: string; source: string }[] }>(portfolioTools.searchEngineeringLab, { query: "Docker" })
        expect(result.results.length).toBeGreaterThan(0)
        for (const item of result.results) expect(item.source).toBe("engineering-lab")
    })

    it("respects the limit and category filters", async () => {
        const result = await run<{ results: { category: string }[] }>(portfolioTools.searchEngineeringLab, { query: "security", category: "devops", limit: 2 })
        expect(result.results.length).toBeLessThanOrEqual(2)
        for (const item of result.results) expect(item.category).toBe("devops")
    })
})

describe("getLabItem tool", () => {
    it("returns a fuller excerpt for a known slug", async () => {
        const result = await run<{ excerpt?: string; error?: string }>(portfolioTools.getLabItem, { slug: "spring-boot-layered-architecture" })
        expect(result.error).toBeUndefined()
        expect(result.excerpt?.length).toBeGreaterThan(0)
    })

    it("returns an error instead of inventing content for an unknown slug", async () => {
        const result = await run<{ error?: string }>(portfolioTools.getLabItem, { slug: "not-a-real-slug" })
        expect(result.error).toMatch(/no engineering lab item found/i)
    })
})
