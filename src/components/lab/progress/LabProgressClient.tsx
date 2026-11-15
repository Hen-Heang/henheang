"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { BackendItemSummary } from "@/src/lib/types/backend-engineering"
import type { Lab, RoadmapTopic } from "@/src/lib/types/devops-lab"
import { useBackendProgress } from "@/src/components/lab/backend/BackendProgress"
import { useDevOpsProgress } from "@/src/components/lab/devops/DevOpsProgress"
import {
    useAllDevOpsLabSteps,
    countCompletedLabSteps,
} from "@/src/lib/lab/devops-step-progress"
import { useLabLearningState } from "@/src/lib/lab/learning-state"

const pathLabel: Record<string, string> = {
    backend: "Backend Engineering",
    devops: "DevOps for Backend",
    ai: "AI-Assisted Engineering",
}

function ProgressSection({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
                {title}
            </h2>
            <div className="mt-3">{children}</div>
        </section>
    )
}

export function LabProgressClient({
    backendItems,
    devopsTopics,
    devopsLabs,
}: {
    backendItems: BackendItemSummary[]
    devopsTopics: RoadmapTopic[]
    devopsLabs: Lab[]
}) {
    const backendProgress = useBackendProgress()
    const devopsProgress = useDevOpsProgress()
    const devopsSteps = useAllDevOpsLabSteps()
    const state = useLabLearningState()

    const publishedBackend = backendItems.filter(
        (item) => item.status === "published",
    )
    const availableDevOps = devopsTopics.filter((topic) => topic.hasCard)
    const backendDone = publishedBackend.filter((item) =>
        backendProgress.has(item.id),
    )
    const devopsDone = availableDevOps.filter((topic) =>
        devopsProgress.has(topic.slug),
    )

    const completedBackendLabs = publishedBackend.filter(
        (item) => item.type === "lab" && backendProgress.has(item.id),
    )
    const completedDevOpsLabs = devopsLabs.filter(
        (lab) =>
            lab.steps.length > 0 &&
            countCompletedLabSteps(devopsSteps[lab.slug], lab.steps.length) ===
                lab.steps.length,
    )

    const savedBackend = publishedBackend.filter((item) =>
        state.savedItemIds.includes(item.id),
    )
    const savedDevOps = availableDevOps.filter((topic) =>
        state.savedItemIds.includes(topic.slug),
    )

    const hasAnyProgress =
        backendDone.length > 0 ||
        devopsDone.length > 0 ||
        state.savedItemIds.length > 0 ||
        state.recentlyViewed.length > 0 ||
        Boolean(state.selectedPath) ||
        devopsLabs.some(
            (lab) =>
                countCompletedLabSteps(
                    devopsSteps[lab.slug],
                    lab.steps.length,
                ) > 0,
        )

    if (!hasAnyProgress) {
        return (
            <div className="rounded-2xl border border-dashed border-border py-16 text-center">
                <p className="text-lg font-semibold text-fg">
                    No learning progress yet.
                </p>
                <p className="mt-2 text-base text-fg-muted">
                    Start the Backend Engineering path or explore the library.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/lab/backend/roadmap"
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
                    >
                        Start Backend Path{" "}
                        <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <Link
                        href="/lab/library"
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-base font-semibold text-fg-secondary transition-colors hover:border-border-strong hover:text-fg"
                    >
                        Browse the library
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <ProgressSection title="Current path">
                <p className="text-base text-fg-secondary">
                    {state.selectedPath
                        ? pathLabel[state.selectedPath]
                        : "Not selected — browsing a lesson does not select a path."}
                </p>
            </ProgressSection>

            <ProgressSection title="Last visited">
                {state.lastVisitedTitle && state.lastVisitedHref ? (
                    <Link
                        href={state.lastVisitedHref}
                        className="text-base font-medium text-brand hover:underline"
                    >
                        {state.lastVisitedTitle}
                    </Link>
                ) : (
                    <p className="text-base text-fg-muted">
                        Nothing visited yet.
                    </p>
                )}
            </ProgressSection>

            <ProgressSection title="Backend progress">
                <p className="text-base text-fg-secondary">
                    {backendDone.length} of {publishedBackend.length} lessons
                    completed
                </p>
                <Link
                    href="/lab/backend/roadmap"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                >
                    View roadmap <ArrowRight size={12} aria-hidden="true" />
                </Link>
            </ProgressSection>

            <ProgressSection title="DevOps progress">
                <p className="text-base text-fg-secondary">
                    {devopsDone.length} of {availableDevOps.length} topics
                    completed
                </p>
                <Link
                    href="/lab/devops"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                >
                    View DevOps hub <ArrowRight size={12} aria-hidden="true" />
                </Link>
            </ProgressSection>

            <ProgressSection title="Completed hands-on labs">
                {completedBackendLabs.length + completedDevOpsLabs.length ===
                0 ? (
                    <p className="text-base text-fg-muted">
                        None completed yet.
                    </p>
                ) : (
                    <ul className="space-y-1.5">
                        {completedBackendLabs.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={`/lab/backend/${item.slug}`}
                                    className="text-base text-fg-secondary hover:text-fg"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        {completedDevOpsLabs.map((lab) => (
                            <li key={lab.slug}>
                                <Link
                                    href={`/lab/devops/labs/${lab.slug}`}
                                    className="text-base text-fg-secondary hover:text-fg"
                                >
                                    {lab.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </ProgressSection>

            <ProgressSection title="Saved items">
                {savedBackend.length + savedDevOps.length === 0 ? (
                    <p className="text-base text-fg-muted">
                        Nothing saved yet.
                    </p>
                ) : (
                    <ul className="space-y-1.5">
                        {savedBackend.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={`/lab/backend/${item.slug}`}
                                    className="text-base text-fg-secondary hover:text-fg"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        {savedDevOps.map((topic) => (
                            <li key={topic.slug}>
                                <Link
                                    href={`/lab/devops/topics/${topic.slug}`}
                                    className="text-base text-fg-secondary hover:text-fg"
                                >
                                    {topic.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </ProgressSection>

            <ProgressSection title="Recently viewed">
                {state.recentlyViewed.length === 0 ? (
                    <p className="text-base text-fg-muted">
                        Nothing viewed yet.
                    </p>
                ) : (
                    <ul className="space-y-1.5">
                        {state.recentlyViewed.map((visit) => (
                            <li key={visit.itemId}>
                                <Link
                                    href={visit.href}
                                    className="text-base text-fg-secondary hover:text-fg"
                                >
                                    {visit.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </ProgressSection>
        </div>
    )
}
