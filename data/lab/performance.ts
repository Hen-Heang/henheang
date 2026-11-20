import { projects } from "@/data/projects"

const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!

export interface PerformanceEntry {
    category: "Caching" | "Optimistic UI" | "Background Jobs" | "Data Access" | "Reliability"
    slug: string
    project: string
    text: string
}

/**
 * Every entry quotes an existing solution/lesson from data/projects.ts by reference
 * (not retyped) so this view can never drift from the source of truth.
 */
const technique = (category: PerformanceEntry["category"], slug: string, solutionIndex: number): PerformanceEntry => {
    const project = bySlug(slug)
    return { category, slug, project: project.title, text: project.solutions![solutionIndex] }
}

export const performanceTechniques: PerformanceEntry[] = [
    technique("Data Access", "hengo", 1),
    technique("Background Jobs", "hengo", 2),
    technique("Reliability", "vstv-agent", 2),
    technique("Data Access", "h-phsar", 0),
]
