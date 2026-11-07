import { describe, expect, it, vi, beforeEach } from "vitest"

const mockGetSupabaseClient = vi.fn()

vi.mock("@/src/lib/supabase", () => ({
    getSupabaseClient: () => mockGetSupabaseClient(),
}))

function fromChain(result: { data: unknown; error: unknown }) {
    const chain: Record<string, unknown> = {}
    chain.select = () => chain
    chain.order = () => Promise.resolve(result)
    chain.eq = () => chain
    chain.maybeSingle = () => Promise.resolve(result)
    return chain
}

describe("portfolio repository — Supabase-absent fallback", () => {
    beforeEach(() => {
        vi.resetModules()
        mockGetSupabaseClient.mockReset()
    })

    it("getProjects falls back to static data when Supabase is unconfigured", async () => {
        mockGetSupabaseClient.mockReturnValue(null)
        const { getProjects } = await import("./portfolio")
        const { projects } = await import("@/data/projects")

        const result = await getProjects()
        expect(result).toEqual(projects.filter((p) => !p.hidden))
        expect(result.length).toBeGreaterThan(0)
    })

    it("getProjectBySlug falls back to a static project by slug, and returns null for an unknown slug", async () => {
        mockGetSupabaseClient.mockReturnValue(null)
        const { getProjectBySlug } = await import("./portfolio")
        const { projects } = await import("@/data/projects")

        const found = await getProjectBySlug(projects[0].slug)
        expect(found?.slug).toBe(projects[0].slug)

        const missing = await getProjectBySlug("this-slug-does-not-exist")
        expect(missing).toBeNull()
    })

    it("getSiteContent falls back to static profile/dashboard/cv when Supabase is unconfigured", async () => {
        mockGetSupabaseClient.mockReturnValue(null)
        const { getSiteContent } = await import("./portfolio")
        const { profileData } = await import("@/data/profile")

        const profile = await getSiteContent("profile")
        expect(profile).toEqual(profileData)
    })

    it("falls back to static data when Supabase returns a row that fails schema validation", async () => {
        mockGetSupabaseClient.mockReturnValue({
            from: () => fromChain({ data: [{ slug: "bad", title: 123 }], error: null }),
        })
        const { getProjects } = await import("./portfolio")
        const { projects } = await import("@/data/projects")

        const result = await getProjects()
        expect(result).toEqual(projects.filter((p) => !p.hidden))
    })

    it("retains the H-Phsar integration test link on a Supabase-backed case study", async () => {
        mockGetSupabaseClient.mockReturnValue({
            from: () => fromChain({
                data: [{
                    slug: "h-phsar",
                    title: "H-Phsar",
                    description: "B2B marketplace API",
                    technologies: ["Spring Boot"],
                    image: "/h-phsar.jpg",
                }],
                error: null,
            }),
        })
        const { getProjectBySlug } = await import("./portfolio")

        const project = await getProjectBySlug("h-phsar")
        expect(project?.description).toBe("B2B marketplace API")
        expect(project?.verification?.href).toContain("OrderLifecycleIT.java#L235")
    })

    it("falls back to static data when the Supabase query errors", async () => {
        mockGetSupabaseClient.mockReturnValue({
            from: () => fromChain({ data: null, error: new Error("network error") }),
        })
        const { getProjects } = await import("./portfolio")
        const { projects } = await import("@/data/projects")

        const result = await getProjects()
        expect(result).toEqual(projects.filter((p) => !p.hidden))
    })
})
