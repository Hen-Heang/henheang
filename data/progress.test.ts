import { describe, expect, it } from "vitest"
import { activeProjects, progressItems } from "./progress"
import { projects } from "./projects"

describe("current portfolio progress", () => {
    it("keeps the homepage overview to four focus areas", () => {
        expect(progressItems).toHaveLength(4)
        expect(progressItems.map((item) => item.id)).toEqual(["backend", "devops", "ai", "korean"])
    })

    it("tracks every focus area with milestones instead of percentages", () => {
        for (const item of progressItems) {
            expect(item.subtitle.length).toBeGreaterThan(0)
            expect(item.currentFocus.length).toBeGreaterThan(0)
            expect(item.technologies.length).toBeGreaterThan(0)
            expect(item.milestones.some((milestone) => milestone.state === "current")).toBe(true)
            expect(item).not.toHaveProperty("percentage")
        }
    })

    it("shows the four active projects requested for the journey", () => {
        expect(activeProjects.map((project) => project.name)).toEqual([
            "H-Space",
            "AuthHub",
            "Developer Portfolio",
            "Luyra",
        ])
    })

    // Guards the stale-link class of bug this list previously had: a "KoriAI"
    // entry whose href pointed at /projects/hengo.
    it("links every active project to a real project page", () => {
        const slugs = new Set(projects.map((project) => project.slug))
        for (const project of activeProjects) {
            if (project.href === "/") continue
            const slug = project.href.replace("/projects/", "")
            expect(slugs, `${project.name} -> ${project.href}`).toContain(slug)
        }
    })

    it("does not list the same project twice under different names", () => {
        const hrefs = activeProjects.map((project) => project.href)
        expect(new Set(hrefs).size).toBe(hrefs.length)
    })
})
