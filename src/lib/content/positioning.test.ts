import { describe, expect, it } from "vitest"
import { positioning, aboutSummary } from "./positioning"
import { profileData } from "@/data/profile"
import { cvData } from "@/data/cv-data"
import { experiences } from "@/data/experience"
import { communityActivities } from "@/data/community"
import { projects } from "@/data/projects"

describe("positioning consistency", () => {
    it("uses the same professional title in every static fallback", () => {
        expect(profileData.title).toBe(positioning.headline)
        expect(cvData.personal.title).toBe(positioning.headline)
    })

    it("keeps the current role identical on the homepage timeline and the CV", () => {
        const current = experiences[0]
        const cvCurrent = cvData.experience.find((job) => job.current)
        expect(current.company).toBe("Bizplay")
        expect(current.period).toMatch(/^October 2025 — Present$/)
        expect(cvCurrent?.company).toBe(current.company)
        expect(cvCurrent?.title).toBe(current.role)
        expect(current.role).toBe(positioning.headline)
    })

    it("keeps the previous KOSIGN role and its dates", () => {
        const kosign = experiences.find((job) => job.company.startsWith("KOSIGN"))
        expect(kosign?.role).toBe("Software Engineer")
        expect(kosign?.period).toBe("January 2024 — October 2025")
    })

    it("never retires the old title only partially", () => {
        const text = JSON.stringify({ positioning, profileData, cvData, experiences })
        expect(text).not.toContain("Backend / AX Software Engineer")
        expect(text).not.toContain("Backend Developer (Java & Spring Boot)")
    })

    it("does not position AI tool usage as ML or AI-engineer expertise", () => {
        const text = [positioning.description, positioning.supporting, aboutSummary].join(" ")
        expect(text).not.toMatch(/machine learning engineer|ML engineer|AI engineer|AI expert/i)
    })

    it("names each CV project the same way as its case study", () => {
        for (const item of cvData.projects) {
            const slug = item.caseStudy?.replace(/^\/projects\//, "")
            const project = projects.find((p) => p.slug === slug)
            expect(project, `${item.name} links to a missing case study`).toBeDefined()
            expect(project?.title.split(" — ")[0]).toBe(item.name)
            expect(item.github).toBe(project?.github)
        }
    })

    it("records community activity without unconfirmed specifics", () => {
        for (const activity of communityActivities) {
            expect(["completed", "planned"]).toContain(activity.status)
            expect(activity).not.toHaveProperty("date")
            expect(activity).not.toHaveProperty("organizer")
            expect(activity).not.toHaveProperty("participants")
        }
    })
})
