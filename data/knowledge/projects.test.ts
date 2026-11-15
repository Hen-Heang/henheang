import { describe, expect, it } from "vitest"
import { buildProjectsKnowledge, projectsKnowledge } from "./projects"
import { projects as staticProjects } from "@/data/projects"

describe("Hengo technology accuracy", () => {
    it("never describes Hengo's backend as Spring Boot — it runs on Next.js and Supabase", () => {
        const hengoSection = projectsKnowledge.find((s) => s.id === "project-hengo")
        expect(hengoSection).toBeDefined()
        expect(hengoSection?.content).not.toContain("Spring Boot")
        expect(hengoSection?.content).toContain("Supabase")
        expect(hengoSection?.content).toContain("Next.js")
    })

    it("stays accurate even when rebuilt from a fabricated Supabase row for the same slug", () => {
        // Mirrors how buildProjectsKnowledge merges a DB row with the static case-study fields.
        const dbHengo = {
            slug: "hengo",
            title: "Hengo — Focused Korean Learning Platform",
            description: "A focused AI-assisted Korean learning platform.",
            technologies: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Vercel AI SDK", "OpenAI", "Tailwind CSS"],
        }
        const merged = staticProjects.map((p) => (p.slug === "hengo" ? { ...p, ...dbHengo } : p))
        const sections = buildProjectsKnowledge(merged)
        const hengoSection = sections.find((s) => s.id === "project-hengo")

        expect(hengoSection?.content).not.toContain("Spring Boot")
    })
})

describe("project classification — professional work vs. personal projects vs. learning labs", () => {
    it("labels every project section with an explicit Type: line matching its ownership", () => {
        for (const project of staticProjects.filter((p) => !p.hidden)) {
            const section = projectsKnowledge.find((s) => s.id === `project-${project.slug}`)
            expect(section, `missing section for ${project.slug}`).toBeDefined()
            if (project.ownership) {
                expect(section?.content).toContain(`Type: ${project.ownership}`)
            }
        }
    })

    it("the catalog summary carries the ownership label alongside each project", () => {
        const catalog = projectsKnowledge.find((s) => s.id === "projects-catalog")
        expect(catalog?.content).toContain("VSTV Agent")
        expect(catalog?.content).toContain("(Personal Project)")
    })
})

describe("hidden projects", () => {
    it("never becomes a knowledge section or a catalog entry", () => {
        const visible = staticProjects.find((p) => !p.hidden)!
        const hiddenProject = { ...visible, slug: "secret-project", title: "Secret Project — Unlisted", hidden: true }
        const sections = buildProjectsKnowledge([visible, hiddenProject])

        expect(sections.some((s) => s.id === "project-secret-project")).toBe(false)
        expect(sections.some((s) => s.id === `project-${visible.slug}`)).toBe(true)
        const catalog = sections.find((s) => s.id === "projects-catalog")
        expect(catalog?.content).not.toContain("Secret Project")
    })

    it("keeps every hidden static project out of the static knowledge base", () => {
        const text = JSON.stringify(projectsKnowledge)
        for (const project of staticProjects.filter((p) => p.hidden)) {
            expect(projectsKnowledge.some((s) => s.id === `project-${project.slug}`)).toBe(false)
            expect(text).not.toContain(project.title.split(" — ")[0])
        }
    })
})
