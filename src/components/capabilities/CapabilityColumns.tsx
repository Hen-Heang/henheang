import Link from "next/link"
import {
    Bot,
    Braces,
    Database,
    GitBranch,
    PanelsTopLeft,
    type LucideIcon,
} from "lucide-react"
import { Reveal } from "@/src/components/system/Reveal"
import type { EnrichedCapabilityGroup } from "@/src/lib/content/capability-evidence"

interface EvidenceSource {
    key: string
    label: string
    href?: string
}

const groupVisuals: Record<string, { icon: LucideIcon; accent: string }> = {
    Backend: { icon: Braces, accent: "bg-brand/10 text-brand" },
    Data: { icon: Database, accent: "bg-success/10 text-success" },
    "Frontend Support": {
        icon: PanelsTopLeft,
        accent: "bg-warning/10 text-warning",
    },
    Delivery: {
        icon: GitBranch,
        accent: "bg-surface-elevated text-fg-secondary",
    },
}

function getEvidenceSources(group: EnrichedCapabilityGroup): EvidenceSource[] {
    const sources = new Map<string, EvidenceSource>()

    for (const technology of group.technologies) {
        for (const project of technology.projects) {
            sources.set(`project:${project.slug}`, {
                key: `project:${project.slug}`,
                label: project.shortTitle,
                href: `/projects/${project.slug}`,
            })
        }
        for (const role of technology.roles) {
            sources.set(`role:${role.company}`, {
                key: `role:${role.company}`,
                label: role.company,
            })
        }
    }

    return Array.from(sources.values()).slice(0, 3)
}

export function CapabilityColumns({
    groups,
    aiPractice,
}: {
    groups: EnrichedCapabilityGroup[]
    aiPractice: ReadonlyArray<{ label: string; text: string }>
}) {
    if (groups.length === 0) return null

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2">
                {groups.map((group, index) => {
                    const visual =
                        groupVisuals[group.label] ?? groupVisuals.Backend
                    const Icon = visual.icon
                    const evidenceSources = getEvidenceSources(group)

                    return (
                        <Reveal
                            key={group.label}
                            delay={index * 0.05}
                            className="h-full"
                        >
                            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <span
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${visual.accent}`}
                                    >
                                        <Icon size={18} aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-semibold tracking-tight text-fg">
                                            {group.label}
                                        </h3>
                                        <p className="mt-1 text-sm leading-5 text-fg-secondary">
                                            {group.summary}
                                        </p>
                                    </div>
                                </div>

                                <ul className="mt-5 grid gap-x-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                                    {group.technologies.map((technology) => (
                                        <li
                                            key={technology.name}
                                            className="flex min-h-10 items-center gap-2 border-t border-border py-2.5 text-sm font-medium text-fg"
                                        >
                                            <span
                                                className="font-mono text-brand"
                                                aria-hidden="true"
                                            >
                                                &gt;
                                            </span>
                                            <span>{technology.name}</span>
                                            {technology.hasEvidence && (
                                                <span className="sr-only">
                                                    Verified in project or
                                                    professional experience data
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                {evidenceSources.length > 0 && (
                                    <div className="mt-auto border-t border-border pt-4">
                                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-fg-muted">
                                            <span className="text-xs font-semibold">
                                                Used in
                                            </span>
                                            {evidenceSources.map(
                                                (source, sourceIndex) => (
                                                    <span
                                                        key={source.key}
                                                        className="inline-flex items-center gap-1.5"
                                                    >
                                                        {sourceIndex > 0 && (
                                                            <span aria-hidden="true">
                                                                ·
                                                            </span>
                                                        )}
                                                        {source.href ? (
                                                            <Link
                                                                href={
                                                                    source.href
                                                                }
                                                                className="font-medium text-fg-secondary underline-offset-4 hover:text-brand hover:underline"
                                                            >
                                                                {source.label}
                                                            </Link>
                                                        ) : (
                                                            <span className="font-medium text-fg-secondary">
                                                                {source.label}
                                                            </span>
                                                        )}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </article>
                        </Reveal>
                    )
                })}
            </div>

            <Reveal delay={0.1}>
                <aside className="mt-4 flex items-start gap-3 rounded-2xl border border-brand/20 bg-brand/[0.03] p-5 sm:p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <Bot size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                        <h3 className="text-base font-semibold text-fg">
                            AI-assisted development
                        </h3>
                        <dl className="mt-2 max-w-3xl space-y-2 text-sm leading-6">
                            {aiPractice.map((tier) => (
                                <div key={tier.label} className="sm:flex sm:gap-3">
                                    <dt className="shrink-0 font-medium text-fg sm:w-36">
                                        {tier.label}
                                    </dt>
                                    <dd className="text-fg-secondary">
                                        {tier.text}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <Link
                            href="/lab/ax-engineering"
                            className="mt-3 inline-flex text-sm font-medium text-brand underline-offset-4 hover:underline"
                        >
                            Explore the learning path →
                        </Link>
                    </div>
                </aside>
            </Reveal>
        </div>
    )
}
