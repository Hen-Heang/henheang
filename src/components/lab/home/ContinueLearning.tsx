"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Map, PlayCircle } from "lucide-react"
import type { BackendItemSummary } from "@/src/lib/types/backend-engineering"
import type { RoadmapTopic } from "@/src/lib/types/devops-lab"
import { useBackendProgress } from "@/src/components/lab/backend/BackendProgress"
import { useDevOpsProgress } from "@/src/components/lab/devops/DevOpsProgress"
import { useLabLearningState } from "@/src/lib/lab/learning-state"
import {
    computeContinueLearning,
    type ContinueLearningItem,
} from "@/src/lib/lab/continue-learning"
import { labs } from "@/data/lab/devops/labs"
import {
    useAllDevOpsLabSteps,
    countCompletedLabSteps,
} from "@/src/lib/lab/devops-step-progress"
import { BorderBeam } from "@/src/components/ui/border-beam"
import { subtleDuration, subtleEase } from "@/src/lib/utils/animations"

const backendToItem = (item: BackendItemSummary): ContinueLearningItem => ({
    id: item.id,
    title: item.title,
    href: `/lab/backend/${item.slug}`,
    metaLabel: `Backend Engineering · Level ${item.level}`,
    estimatedMinutes: item.estimatedMinutes,
})

const devopsToItem = (topic: RoadmapTopic): ContinueLearningItem => ({
    id: topic.slug,
    title: topic.title,
    href: `/lab/devops/topics/${topic.slug}`,
    metaLabel: "DevOps Basics",
})

const entrance = {
    initial: { opacity: 0.85, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: subtleDuration, ease: subtleEase },
}

/** The homepage's primary next-action card — computed from real local progress, never fabricated streaks/metrics. */
export function ContinueLearning({
    backendItems,
    devopsTopics,
}: {
    backendItems: BackendItemSummary[]
    devopsTopics: RoadmapTopic[]
}) {
    const backendProgress = useBackendProgress()
    const devopsProgress = useDevOpsProgress()
    const state = useLabLearningState()
    const labSteps = useAllDevOpsLabSteps()
    const lastLab = labs.find(
        (lab) => `devops-lab:${lab.slug}` === state.lastVisitedItemId,
    )

    const publishedBackend = backendItems.filter(
        (item) => item.status === "published",
    )
    const availableDevOps = devopsTopics.filter((topic) => topic.hasCard)

    const backendDone = publishedBackend.filter((item) =>
        backendProgress.has(item.id),
    ).length
    const devopsDone = availableDevOps.filter((topic) =>
        devopsProgress.has(topic.slug),
    ).length

    const nextBackendRaw = publishedBackend.find(
        (item) => !backendProgress.has(item.id),
    )
    const nextDevOpsRaw = availableDevOps.find(
        (topic) => !devopsProgress.has(topic.slug),
    )

    const lastVisitedBackend =
        state.lastVisitedPath === "backend"
            ? publishedBackend.find(
                  (item) => item.id === state.lastVisitedItemId,
              )
            : undefined
    const lastVisitedDevOps =
        state.lastVisitedPath === "devops"
            ? availableDevOps.find(
                  (topic) => topic.slug === state.lastVisitedItemId,
              )
            : undefined
    const lastVisitedItem = lastLab
        ? {
              id: `devops-lab:${lastLab.slug}`,
              title: lastLab.title,
              href: `/lab/devops/labs/${lastLab.slug}`,
              metaLabel: "DevOps hands-on lab",
          }
        : lastVisitedBackend
          ? backendToItem(lastVisitedBackend)
          : lastVisitedDevOps
            ? devopsToItem(lastVisitedDevOps)
            : undefined
    const lastVisitedCompleted = lastLab
        ? countCompletedLabSteps(
              labSteps[lastLab.slug],
              lastLab.steps.length,
          ) === lastLab.steps.length
        : lastVisitedBackend
          ? backendProgress.has(lastVisitedBackend.id)
          : lastVisitedDevOps
            ? devopsProgress.has(lastVisitedDevOps.slug)
            : false

    const result = computeContinueLearning({
        nextBackend: nextBackendRaw ? backendToItem(nextBackendRaw) : undefined,
        nextDevOps: nextDevOpsRaw ? devopsToItem(nextDevOpsRaw) : undefined,
        backendDone,
        backendTotal: publishedBackend.length,
        devopsDone,
        devopsTotal: availableDevOps.length,
        lastVisitedItemId: state.lastVisitedItemId,
        lastVisitedPath: state.lastVisitedPath,
        lastVisitedItem,
        lastVisitedCompleted,
        selectedPath: state.selectedPath,
    })

    if (result.mode === "start-here") {
        return (
            <motion.section
                {...entrance}
                className="mb-10 rounded-3xl border border-border bg-surface p-6 md:p-7"
                aria-labelledby="continue-learning-heading"
            >
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                    Start here
                </p>
                <h2
                    id="continue-learning-heading"
                    className="mt-2 text-2xl font-bold text-fg"
                >
                    Backend Engineering Foundations
                </h2>
                <p className="mt-2 max-w-xl text-base leading-6 text-fg-secondary">
                    A structured path through Java, Spring Boot, databases,
                    APIs, testing, and production systems.
                </p>
                <Link
                    href="/lab/backend/roadmap"
                    className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-base font-semibold text-white transition-[filter] hover:brightness-110"
                >
                    Start Backend Path{" "}
                    <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                    />
                </Link>
            </motion.section>
        )
    }

    if (result.mode === "all-caught-up") {
        return (
            <motion.section
                {...entrance}
                className="mb-10 rounded-3xl border border-border bg-surface p-6 md:p-7"
                aria-labelledby="continue-learning-heading"
            >
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-success">
                    All caught up
                </p>
                <h2
                    id="continue-learning-heading"
                    className="mt-2 text-2xl font-bold text-fg"
                >
                    You&apos;ve completed everything available right now
                </h2>
                <p className="mt-2 max-w-xl text-base leading-6 text-fg-secondary">
                    Review a roadmap to reinforce what you&apos;ve learned, or
                    explore the full library for something new.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                        href="/lab/backend/roadmap"
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-base font-semibold text-white transition-[filter] hover:brightness-110"
                    >
                        <Map size={15} aria-hidden="true" /> View roadmap
                    </Link>
                    <Link
                        href="/lab/library"
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-base font-semibold text-fg-secondary transition-colors hover:border-border-strong hover:text-fg"
                    >
                        Browse the library
                    </Link>
                </div>
            </motion.section>
        )
    }

    const { item, roadmapHref } = result
    const continuingLab = lastLab && result.source === "last-visited"
    const completed = continuingLab
        ? countCompletedLabSteps(labSteps[lastLab.slug], lastLab.steps.length)
        : result.completed
    const total = continuingLab ? lastLab.steps.length : result.total
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0

    return (
        <motion.section
            {...entrance}
            className="relative mb-10 overflow-hidden rounded-3xl border border-border bg-surface p-6 md:p-7"
            aria-labelledby="continue-learning-heading"
        >
            <BorderBeam size={80} duration={9} />
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                {result.source === "next-in-path" &&
                !state.selectedPath &&
                completed === 0
                    ? "Recommended next lesson"
                    : "Continue learning"}
            </p>
            <h2
                id="continue-learning-heading"
                className="mt-2 text-2xl font-bold text-fg"
            >
                {item.title}
            </h2>
            <p className="mt-1.5 text-base text-fg-muted">
                {item.metaLabel}
                {item.estimatedMinutes ? ` · ${item.estimatedMinutes} min` : ""}
            </p>

            {total > 0 && (
                <div className="mt-4 max-w-sm">
                    <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-fg-muted">
                        <span>
                            {completed} of {total}{" "}
                            {continuingLab ? "steps" : "lessons"} completed
                        </span>
                        <span>{percent}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
                        <motion.div
                            className="h-full rounded-full bg-brand"
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                                delay: 0.1,
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
                <Link
                    href={item.href}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 motion-reduce:hover:translate-y-0"
                >
                    <PlayCircle size={16} aria-hidden="true" />{" "}
                    {continuingLab ? "Continue lab" : "Continue lesson"}{" "}
                    <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                    />
                </Link>
                <Link
                    href={roadmapHref}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-base font-semibold text-fg-secondary transition-colors hover:border-border-strong hover:text-fg"
                >
                    <Map size={15} aria-hidden="true" /> View roadmap
                </Link>
            </div>
        </motion.section>
    )
}
