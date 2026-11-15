"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Bot, Container, ServerCog } from "lucide-react"
import type { BackendItemSummary } from "@/src/lib/types/backend-engineering"
import type { RoadmapTopic } from "@/src/lib/types/devops-lab"
import { useBackendProgress } from "@/src/components/lab/backend/BackendProgress"
import { useDevOpsProgress } from "@/src/components/lab/devops/DevOpsProgress"
import { HoverArrow } from "@/src/components/lab/ui/HoverArrow"
import {
    StatusIndicator,
    type StatusLevel,
} from "@/src/components/lab/ui/StatusIndicator"
import { setSelectedLabPath, type LabPath } from "@/src/lib/lab/learning-state"
import { staggerContainer, staggerItem } from "@/src/lib/utils/animations"

const paths = {
    backend: {
        outcome: "Ship secure, observable Spring Boot services end to end.",
        technologies: ["Java", "Spring Boot", "MyBatis", "PostgreSQL"],
    },
    devops: {
        outcome:
            "Take a service from local code to a reachable, recoverable deployment.",
        technologies: ["Docker", "CI/CD", "Nginx", "Git"],
    },
    ax: {
        outcome:
            "Learn to design reliable human + AI development workflows using context, agents, tools, guardrails, verification, and evaluation.",
        technologies: ["Agent Harness", "MCP", "Evals", "AI Workflow"],
    },
}

export function LabLearningDashboard({
    backendItems,
    devopsTopics,
}: {
    backendItems: BackendItemSummary[]
    devopsTopics: RoadmapTopic[]
}) {
    const backendProgress = useBackendProgress()
    const devopsProgress = useDevOpsProgress()
    const publishedBackend = backendItems.filter(
        (item) => item.status === "published",
    )
    const availableDevOps = devopsTopics.filter((topic) => topic.hasCard)
    const nextBackend = publishedBackend.find(
        (item) => !backendProgress.has(item.id),
    )
    const nextDevOps = availableDevOps.find(
        (topic) => !devopsProgress.has(topic.slug),
    )

    const backendDone = publishedBackend.filter((item) =>
        backendProgress.has(item.id),
    ).length
    const devopsDone = availableDevOps.filter((topic) =>
        devopsProgress.has(topic.slug),
    ).length

    return (
        <section
            id="learning-paths"
            className="mb-10 scroll-mt-24"
            aria-labelledby="learning-paths-heading"
        >
            <h2
                id="learning-paths-heading"
                className="mb-4 text-xl font-bold tracking-tight text-fg"
            >
                Learning paths
            </h2>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-64px" }}
                className="grid gap-4 lg:grid-cols-3"
            >
                <LearningPathCard
                    icon={ServerCog}
                    title="Backend Engineering"
                    path="backend"
                    recommended
                    status="active"
                    outcome={paths.backend.outcome}
                    technologies={paths.backend.technologies}
                    completed={backendDone}
                    total={publishedBackend.length}
                    href={
                        nextBackend
                            ? `/lab/backend/${nextBackend.slug}`
                            : "/lab/backend/roadmap"
                    }
                    action={
                        nextBackend
                            ? `Continue: ${nextBackend.title}`
                            : "Review the roadmap"
                    }
                    accent="brand"
                />
                <LearningPathCard
                    icon={Container}
                    title="DevOps for Backend"
                    path="devops"
                    status="learning"
                    outcome={paths.devops.outcome}
                    technologies={paths.devops.technologies}
                    completed={devopsDone}
                    total={availableDevOps.length}
                    href={
                        nextDevOps
                            ? `/lab/devops/topics/${nextDevOps.slug}`
                            : "/lab/devops/labs"
                    }
                    action={
                        nextDevOps
                            ? `Continue: ${nextDevOps.title}`
                            : "Practice with a hands-on lab"
                    }
                    accent="success"
                />
                <LearningPathCard
                    icon={Bot}
                    title="AX Engineering"
                    path="ai"
                    status="experimenting"
                    outcome={paths.ax.outcome}
                    technologies={paths.ax.technologies}
                    href="/lab/ax-engineering"
                    action="Explore the learning path"
                    accent="warning"
                />
            </motion.div>
        </section>
    )
}

function LearningPathCard({
    icon: Icon,
    path,
    title,
    recommended,
    status,
    outcome,
    technologies,
    completed,
    total,
    href,
    action,
    accent,
}: {
    icon: React.ComponentType<{
        size?: number
        className?: string
        "aria-hidden"?: boolean
    }>
    path: LabPath
    title: string
    recommended?: boolean
    status: StatusLevel
    outcome: string
    technologies: string[]
    completed?: number
    total?: number
    href: string
    action: string
    accent: "brand" | "success" | "warning"
}) {
    const accentClasses = {
        brand: "bg-brand/10 text-brand",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
    }[accent]
    const progress = total ? Math.round(((completed ?? 0) / total) * 100) : null

    return (
        <motion.article
            variants={staggerItem}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className={`group flex h-full flex-col rounded-2xl border p-5 transition-colors ${recommended ? "border-brand/30 bg-brand/[0.03]" : "border-border bg-surface hover:border-border-strong"}`}
        >
            <div className="flex items-start justify-between gap-3">
                <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100 ${accentClasses}`}
                >
                    <Icon size={16} aria-hidden={true} />
                </span>
                <StatusIndicator status={status} pulse={recommended} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold text-fg">{title}</h3>
                {recommended && (
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-brand">
                        Recommended start
                    </span>
                )}
            </div>
            <p className="mt-1.5 text-base leading-6 text-fg-secondary">
                {outcome}
            </p>

            <p className="mt-3 font-mono text-[11px] uppercase leading-5 tracking-wider text-fg-muted">
                {technologies.slice(0, 4).join(" · ")}
            </p>

            {progress !== null && (
                <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-fg-muted">
                        <span>
                            {completed}/{total} complete
                        </span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
                        <motion.div
                            className="h-full rounded-full bg-brand"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            )}

            <Link
                href={href}
                onClick={() => setSelectedLabPath(path)}
                className="mt-5 flex min-h-11 items-center justify-between gap-3 rounded-xl border border-border bg-background px-3.5 py-2.5 text-base font-semibold text-fg transition-colors group-hover:border-border-strong"
            >
                <span className="line-clamp-1">{action}</span>
                <HoverArrow />
            </Link>
        </motion.article>
    )
}
