import type { Difficulty } from "@/src/lib/types/ai-engineering"

export type LabDifficulty = Difficulty

export interface RoadmapTopic {
    slug: string
    title: string
    category: string
    difficulty: LabDifficulty
    estimatedTime: string
    description: string
    /** Whether a full LearningCard exists for this topic yet — false renders an honest "coming soon" state. */
    hasCard: boolean
}

export interface LearningCard {
    topicSlug: string
    overview: string
    whyItMatters: string
    howBackendDevsUseIt: string
    commonMistakes: string[]
    exampleCommands: { description: string; command: string }[]
    resources: { label: string; url: string }[]
}

export interface DiagramNode {
    label: string
    sublabel?: string
}

export interface Diagram {
    title: string
    nodes: DiagramNode[]
}

export interface LabStep {
    title: string
    description?: string
    command?: string
}

export interface Lab {
    slug: string
    title: string
    description: string
    difficulty: LabDifficulty
    estimatedTime: string
    prerequisites: string[]
    architecture: Diagram
    setup?: LabStep[]
    troubleshooting?: { symptom: string; fix: string }[]
    steps: LabStep[]
    expectedResult: string
    lessonsLearned: string[]
}

export interface CommandEntry {
    name: string
    description: string
    syntax: string
    example: string
}

export interface CommandCategory {
    category: string
    commands: CommandEntry[]
}

export interface InfraTerm {
    term: string
    category: string
    definition: string
    whyItMattersForBackend: string
}
