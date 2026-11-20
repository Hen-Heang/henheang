import Link from "next/link"
import {
    ArrowRight,
    Bot,
    Box,
    Check,
    Circle,
    CircleDot,
    Languages,
    ServerCog,
    type LucideIcon,
} from "lucide-react"
import {
    activeProjects,
    progressItems,
    type MilestoneState,
    type ProgressItem,
} from "@/data/progress"
import { Section } from "@/src/components/system/Section"
import { MagicCard } from "@/src/components/ui/magic-card"

const ICONS: Record<ProgressItem["id"], LucideIcon> = {
    backend: ServerCog,
    devops: Box,
    ai: Bot,
    korean: Languages,
}

const STATUS_CLASSES: Record<ProgressItem["status"], string> = {
    Building: "border-brand/25 bg-brand/10 text-brand",
    Learning: "border-warning/25 bg-warning/10 text-warning",
    Practicing: "border-success/25 bg-success/10 text-success",
    Completed: "border-success/25 bg-success/10 text-success",
}

const MILESTONE_LABELS: Record<MilestoneState, string> = {
    completed: "Completed",
    current: "In progress",
    planned: "Planned",
}

function formatUpdatedAt(value: string): string {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${value}T00:00:00Z`))
}

function MilestoneIcon({ state }: { state: MilestoneState }) {
    if (state === "completed") {
        return <Check size={15} className="mt-0.5 shrink-0 text-success" aria-hidden />
    }
    if (state === "current") {
        return <CircleDot size={15} className="mt-0.5 shrink-0 text-brand" aria-hidden />
    }
    return <Circle size={15} className="mt-0.5 shrink-0 text-fg-muted" aria-hidden />
}

export function JourneyProgress() {
    return (
        <>
            <Section
                eyebrow="Focus Areas"
                title="Learning through real milestones"
                description="Progress is tracked by what I can build, explain, test, and deploy—not by made-up skill percentages."
            >
                <div className="grid gap-5 lg:grid-cols-2">
                    {progressItems.map((item) => {
                        const Icon = ICONS[item.id]

                        return (
                            <MagicCard
                                key={item.id}
                                className="h-full rounded-xl"
                                gradientFrom="#22d3ee"
                                gradientTo="#38bdf8"
                                gradientOpacity={0.1}
                            >
                                <article className="flex h-full flex-col p-6 sm:p-7">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-brand">
                                                <Icon size={18} aria-hidden />
                                            </span>
                                            <h2 className="text-xl font-semibold tracking-tight text-fg">{item.title}</h2>
                                        </div>
                                        <span
                                            className={`rounded-full border px-2.5 py-1 font-mono text-xs font-medium ${STATUS_CLASSES[item.status]}`}
                                        >
                                            {item.statusLabel}
                                        </span>
                                    </div>

                                    <p className="mt-5 text-sm leading-relaxed text-fg-secondary">{item.description}</p>

                                    <div className="mt-5 rounded-lg border border-brand/15 bg-brand/5 p-4">
                                        <p className="font-mono text-xs text-brand">Current focus</p>
                                        <p className="mt-2 text-sm font-medium leading-relaxed text-fg">{item.currentFocus}</p>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="font-mono text-xs font-medium text-fg-muted">
                                            Milestones
                                        </h3>
                                        <ul className="mt-4 space-y-3">
                                            {item.milestones.map((milestone) => (
                                                <li key={milestone.label} className="flex gap-3 text-sm leading-relaxed text-fg-secondary">
                                                    <MilestoneIcon state={milestone.state} />
                                                    <span>
                                                        <span className="sr-only">{MILESTONE_LABELS[milestone.state]}: </span>
                                                        {milestone.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-auto pt-7">
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.technologies.map((technology) => (
                                                <span
                                                    key={technology}
                                                    className="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-fg-muted"
                                                >
                                                    {technology}
                                                </span>
                                            ))}
                                        </div>
                                        <time
                                            dateTime={item.updatedAt}
                                            className="mt-4 block font-mono text-xs text-fg-muted"
                                        >
                                            Updated {formatUpdatedAt(item.updatedAt)}
                                        </time>
                                    </div>
                                </article>
                            </MagicCard>
                        )
                    })}
                </div>
            </Section>

            <Section
                eyebrow="Active Projects"
                title="Where the learning becomes software"
                description="These projects turn the focus areas above into APIs, workflows, product decisions, and deployed experiences."
                className="bg-surface"
            >
                <div className="grid gap-4 sm:grid-cols-2">
                    {activeProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={project.href}
                            className="group rounded-xl border border-border bg-background p-5 transition-colors hover:border-border-strong sm:p-6"
                        >
                            <article className="flex h-full flex-col">
                                <div className="flex items-start justify-between gap-4">
                                    <h2 className="text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-brand">
                                        {project.name}
                                    </h2>
                                    <span className="shrink-0 rounded-full border border-brand/20 bg-brand/10 px-2.5 py-1 font-mono text-xs text-brand">
                                        {project.status}
                                    </span>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-fg-secondary">{project.description}</p>
                                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                                    {project.technologies.map((technology) => (
                                        <span
                                            key={technology}
                                            className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-fg-muted"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors group-hover:text-brand">
                                    View project
                                    <ArrowRight
                                        size={15}
                                        className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                                        aria-hidden
                                    />
                                </span>
                            </article>
                        </Link>
                    ))}
                </div>
            </Section>
        </>
    )
}
