import { describe, expect, it, vi, beforeEach } from "vitest"
import type { Project } from "@/src/lib/types"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"

const mockGetProjects = vi.fn()
const mockGetExperience = vi.fn()
const mockGetEducation = vi.fn()
const mockGetSkills = vi.fn()
const mockGetSiteContent = vi.fn()
const mockGetAICategories = vi.fn()
const mockGetAIArticles = vi.fn()
const mockGetAIPrompts = vi.fn()
const mockGetAISnippets = vi.fn()

vi.mock("@/src/lib/db/portfolio", () => ({
    getProjects: () => mockGetProjects(),
    getExperience: () => mockGetExperience(),
    getEducation: () => mockGetEducation(),
    getSkills: () => mockGetSkills(),
    getSiteContent: (key: string) => mockGetSiteContent(key),
}))

vi.mock("@/src/lib/db/ai-engineering", () => ({
    getAICategories: () => mockGetAICategories(),
    getAIArticles: () => mockGetAIArticles(),
    getAIPrompts: () => mockGetAIPrompts(),
    getAISnippets: () => mockGetAISnippets(),
}))

/** All getters empty/static-equivalent by default; individual tests override what they care about. */
async function mockAllGettersToEmpty() {
    const { profileData } = await import("@/data/profile")
    mockGetProjects.mockResolvedValue([])
    mockGetExperience.mockResolvedValue([])
    mockGetEducation.mockResolvedValue([])
    mockGetSkills.mockResolvedValue([])
    mockGetSiteContent.mockResolvedValue(profileData)
    mockGetAICategories.mockResolvedValue([])
    mockGetAIArticles.mockResolvedValue([])
    mockGetAIPrompts.mockResolvedValue([])
    mockGetAISnippets.mockResolvedValue([])
}

describe("getLiveKnowledgeBase", () => {
    beforeEach(() => {
        vi.resetModules()
        mockGetProjects.mockReset()
        mockGetExperience.mockReset()
        mockGetEducation.mockReset()
        mockGetSkills.mockReset()
        mockGetSiteContent.mockReset()
        mockGetAICategories.mockReset()
        mockGetAIArticles.mockReset()
        mockGetAIPrompts.mockReset()
        mockGetAISnippets.mockReset()
    })

    it("uses Supabase as the primary source: a DB-only project appears in the rendered knowledge", async () => {
        await mockAllGettersToEmpty()
        const dbOnlyProject: Project = {
            slug: "db-only-project",
            title: "Database-Only Project",
            description: "Exists only in Supabase, no static counterpart.",
            technologies: ["Rust"],
            image: "/image/db-only.svg",
        }
        mockGetProjects.mockResolvedValue([dbOnlyProject])

        const { getLiveKnowledgeBase } = await import("./live-knowledge")
        const sections = await getLiveKnowledgeBase()

        const projectSection = sections.find((s) => s.id === "project-db-only-project")
        expect(projectSection).toBeDefined()
        expect(projectSection?.content).toContain("Rust")
    })

    it("uses the live profile from Supabase as the primary source over the static one", async () => {
        await mockAllGettersToEmpty()
        const { profileData } = await import("@/data/profile")
        const dbProfile: ProfileContentParsed = { ...profileData, fullName: "DB-Sourced Name" }
        mockGetSiteContent.mockResolvedValue(dbProfile)

        const { getLiveKnowledgeBase } = await import("./live-knowledge")
        const sections = await getLiveKnowledgeBase()

        const profileSection = sections.find((s) => s.id === "profile-overview")
        expect(profileSection?.content).toContain("DB-Sourced Name")
    })

    it("falls back to static project/experience/skills data when Supabase tables are empty", async () => {
        await mockAllGettersToEmpty()

        const { getLiveKnowledgeBase } = await import("./live-knowledge")
        const { projects: staticProjects } = await import("@/data/projects")
        const sections = await getLiveKnowledgeBase()

        for (const project of staticProjects) {
            // Hidden projects are unlisted on the site, so the fallback must leave them out too.
            const present = sections.some((s) => s.id === `project-${project.slug}`)
            expect(present, `${project.hidden ? "hidden" : "missing static"} project ${project.slug}`).toBe(!project.hidden)
        }
        // KOSIGN only exists in the static experience data — proves the experience fallback engaged too.
        const workHistory = sections.find((s) => s.id === "experience-work-history")
        expect(workHistory?.content).toContain("KOSIGN")
    })

    it("falls back to the fully static knowledge base when a Supabase call throws unexpectedly", async () => {
        await mockAllGettersToEmpty()
        mockGetProjects.mockRejectedValue(new Error("network error"))

        const { getLiveKnowledgeBase } = await import("./live-knowledge")
        const { knowledgeBase } = await import("@/data/knowledge")
        const sections = await getLiveKnowledgeBase()

        expect(sections).toEqual(knowledgeBase)
    })

    it("conflicting data: DB project fields win field-by-field over the static counterpart, but static-only case-study fields survive", async () => {
        await mockAllGettersToEmpty()
        const { projects: staticProjects } = await import("@/data/projects")
        const staticHPhsar = staticProjects.find((p) => p.slug === "h-phsar")!
        const conflictingDbProject: Project = {
            ...staticHPhsar,
            description: "DB-provided description that should win over the static one.",
            technologies: ["DB-Only-Tech"],
        }
        mockGetProjects.mockResolvedValue([conflictingDbProject])

        const { getLiveKnowledgeBase } = await import("./live-knowledge")
        const sections = await getLiveKnowledgeBase()
        const hPhsarSection = sections.find((s) => s.id === "project-h-phsar")

        expect(hPhsarSection?.content).toContain("DB-provided description that should win over the static one.")
        expect(hPhsarSection?.content).toContain("DB-Only-Tech")
        // Static-only case-study field, absent from the DB row, still comes through.
        expect(hPhsarSection?.content).toContain("Architecture:")
    })

    it("an AI-content fetch failure also falls back to the static knowledge base rather than failing the whole request", async () => {
        await mockAllGettersToEmpty()
        mockGetAIArticles.mockRejectedValue(new Error("ai content unavailable"))

        const { getLiveKnowledgeBase } = await import("./live-knowledge")
        const sections = await getLiveKnowledgeBase()

        const { knowledgeBase } = await import("@/data/knowledge")
        expect(sections).toEqual(knowledgeBase)
    })
})
