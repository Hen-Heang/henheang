export type AXLearningStatus = "learning" | "experimenting" | "planned"

export type AXArchitectureGroup =
    "knowledge" | "execution" | "control" | "improvement"

export interface AXModule {
    number: string
    slug: string
    title: string
    description: string
    status: AXLearningStatus
    estimatedScope: string
    concepts: string[]
}

export interface AXConcept {
    slug: string
    name: string
    analogy: string
    group: AXArchitectureGroup
    what: string
    why: string
    how: string
    example: string
    whenToUse: string
}

export interface AXLab {
    id: `LAB-${string}`
    title: string
    objective: string
    deliverable: string
    concepts: string[]
    status: "planned"
}

export interface AXSource {
    title: string
    organization: string
    url: string
    topics: string[]
}

export interface AXWorkflowStep {
    label: string
    detail: string
}

export interface AXHarnessProject {
    name: string
    tagline: string
    summary: string
    version: string
    status: string
    consoleUrl: string
    githubUrl: string
    pillars: string[]
    highlights: { title: string; detail: string }[]
    architecture: string[]
    commands: { command: string; detail: string }[]
    stack: string[]
}
