import { describe, expect, it } from "vitest"
import { skills, getSkillById } from "./skills-taxonomy"
import { projects } from "./projects"
import { capabilityGroups } from "@/src/lib/content/capabilities"

const CATEGORIES = ["backend", "database", "frontend", "devops", "ai"]
const STATUSES = ["primary", "working-knowledge", "learning"]

describe("skills taxonomy", () => {
    it("has unique, kebab-case ids", () => {
        const ids = skills.map((s) => s.id)
        expect(new Set(ids).size).toBe(ids.length)
        for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    })

    it("only uses the defined category and status enums", () => {
        for (const skill of skills) {
            expect(CATEGORIES).toContain(skill.category)
            expect(STATUSES).toContain(skill.status)
        }
    })

    it("never cites a hidden (unlisted) project as evidence in a description", () => {
        const hiddenNames = projects.filter((p) => p.hidden).map((p) => p.title.split(" — ")[0])
        for (const skill of skills) {
            for (const name of hiddenNames) {
                expect(skill.description ?? "", `${skill.id} mentions ${name}`).not.toContain(name)
            }
        }
    })

    it("never uses expert/advanced language for a skill still being learned", () => {
        const learning = skills.filter((s) => s.status === "learning")
        expect(learning.length).toBeGreaterThan(0)
        for (const skill of learning) {
            expect(skill.description).not.toMatch(/\b(expert|advanced|proficient|strong experience)\b/i)
        }
    })

    it("every technology the site publicly claims as a primary capability is also a primary skill here", () => {
        // Cross-checks against the canonical public model (src/lib/content/capabilities.ts)
        // so the two can't silently drift into contradicting each other.
        const primaryNames = new Set(skills.filter((s) => s.status === "primary").map((s) => s.name.toLowerCase()))
        for (const group of capabilityGroups) {
            for (const tech of group.technologies) {
                // Combined labels ("Docker/GitHub Actions", "JPA/Flyway") are exploded into
                // individual skill entries, so check each half is represented.
                const parts = tech.toLowerCase().split("/")
                for (const part of parts) {
                    const found = [...primaryNames].some((name) => name.includes(part) || part.includes(name))
                    expect(found, `${tech} (${part}) should map to a primary skill`).toBe(true)
                }
            }
        }
    })

    it("derives projectSlugs from Project.skills rather than hand-authoring them", () => {
        for (const skill of skills) {
            for (const slug of skill.projectSlugs) {
                const project = projects.find((p) => p.slug === slug)
                expect(project?.skills, `${slug} should list "${skill.id}" in its skills array`).toContain(skill.id)
            }
        }
    })

    it("does not claim project evidence for a learning-only technology", () => {
        expect(getSkillById("kubernetes")?.projectSlugs).toEqual([])
        expect(getSkillById("redis")?.projectSlugs).toEqual([])
        expect(getSkillById("agent-harness-design")?.projectSlugs).toEqual([])
        expect(getSkillById("model-context-protocol")?.projectSlugs).toEqual([])
    })

    it("records DevOps Fundamentals as verified working knowledge without project evidence", () => {
        expect(getSkillById("devops-fundamentals")).toMatchObject({
            name: "DevOps Fundamentals",
            category: "devops",
            status: "working-knowledge",
            projectSlugs: [],
        })
    })

    it("has real project evidence for primary backend/database technologies", () => {
        expect(getSkillById("spring-boot")?.projectSlugs.length).toBeGreaterThan(0)
        expect(getSkillById("postgresql")?.projectSlugs.length).toBeGreaterThan(0)
    })
})
