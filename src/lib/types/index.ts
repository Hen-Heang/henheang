import type { ReactNode } from "react"

export interface NavItem {
    id: string
    label?: string
    labelKey?: string
    icon: ReactNode
}

export interface SkillItem {
    name: string
    level: number
    experience: string
}

export interface SkillCategory {
    category: string
    items: SkillItem[]
}

export interface ApiEndpoint {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    path: string
    description: string
}

export interface ProcessStep {
    phase: string
    detail: string
}

/** Broad shape of the system — drives the category label on cards and the flagship panel. */
export type ProjectCategory = "Backend API" | "Full-Stack Application" | "Enterprise System" | "Frontend Application"

/** Who the work was built for — distinguishes solo/team side projects, paid company work, and practice/learning repos that aren't standalone products. */
export type ProjectOwnership = "Personal Project" | "Team Project" | "Professional Work" | "Learning Lab"

export interface Project {
    slug: string
    title: string
    description: string
    technologies: string[]
    image: string
    /** How `image` should fit its container — "contain" for non-landscape assets (e.g. a portrait poster) that would otherwise be cropped by the default cover fit. */
    imageFit?: "cover" | "contain"
    github?: string
    demo?: string
    featured?: boolean
    /** Excluded from all public listings (home, /projects, sitemap) while keeping its case-study data intact. */
    hidden?: boolean
    /** Show the poster image in the homepage Selected Work panel instead of the architecture/api/database/workflow preview that `getProjectPreview` would otherwise pick. */
    previewImage?: boolean
    category?: ProjectCategory
    ownership?: ProjectOwnership
    /** Short topic labels for what the engineering work actually covered (e.g. "Authentication", "Order workflow") — distinct from `technologies` (the stack) and `architecture` (system layers). */
    engineeringFocus?: string[]
    /** Stable skill ids (see `data/skills-taxonomy.ts`) this project is meaningful evidence for — a curated subset of `technologies`, not every technology used. Powers the AI assistant's `searchProjects`/`getProject` tools. */
    skills?: string[]
    /** Company work whose source/screenshots can't be shown — case-study and card UI hide GitHub/demo links and surface a confidentiality note instead. */
    confidential?: boolean
    businessProblem?: string
    overview?: string
    process?: ProcessStep[]
    features?: string[]
    technicalDetails?: string
    architecture?: string[]
    architectureNote?: string
    dataModel?: string[]
    apiEndpoints?: ApiEndpoint[]
    verification?: { description: string; href: string }
    challenges?: string[]
    solutions?: string[]
    lessonsLearned?: string[]
    screenshots?: string[]
    role?: string
    duration?: string
    teamSize?: string
    /** ISO timestamp of last DB update; absent for statically-sourced projects. */
    updatedAt?: string
}

export interface EducationItem {
    period: string
    title: string
    institution: string
    description: string
}

export interface ExperienceItem {
    role: string
    company: string
    period: string
    location?: string
    summary: string
    highlights?: string[]
    stack?: string[]
}
