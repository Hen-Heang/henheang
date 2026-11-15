import React from "react"
import { Section } from "@/src/components/system/Section"
import { CapabilityColumns } from "@/src/components/capabilities/CapabilityColumns"
import { aiPractice } from "@/src/lib/content/capabilities"
import { buildCapabilityEvidence } from "@/src/lib/content/capability-evidence"
import type { ExperienceItem, Project } from "@/src/lib/types"

/**
 * The one section that lists the primary technical stack. Used by both the
 * homepage and /about so the two pages can never drift apart — `variant`
 * only changes the surrounding band, never the content.
 *
 * The public view uses the curated capability model and links it back to real
 * project/experience evidence. The complete catalog remains available to the
 * admin and assistant knowledge layers.
 */
export function TechnicalCapabilities({
    projects,
    experience,
    variant = "default",
}: {
    /** Verified sources for every "used in" link the section shows. */
    projects: Project[]
    experience: ExperienceItem[]
    variant?: "default" | "surface"
}) {
    const groups = buildCapabilityEvidence(projects, experience)

    return (
        <Section
            id="capabilities"
            eyebrow="Technical Skills"
            title="Engineering stack"
            description="Core technologies grouped by the work they support. Project-specific tools stay with the case studies where they were used."
            className={variant === "surface" ? "bg-surface" : undefined}
            revealHeader
        >
            <CapabilityColumns groups={groups} aiPractice={aiPractice} />
        </Section>
    )
}
