"use client"

import {
    useAllDevOpsLabSteps,
    countCompletedLabSteps,
} from "@/src/lib/lab/devops-step-progress"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { Lab } from "@/src/lib/types/devops-lab"
import { DifficultyBadge } from "@/src/components/ai-engineering/DifficultyBadge"

export function LabCard({ lab }: { lab: Lab }) {
    const progress = useAllDevOpsLabSteps()
    const done = countCompletedLabSteps(progress[lab.slug], lab.steps.length)
    return (
        <Link
            href={`/lab/devops/labs/${lab.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:hover:translate-y-0"
        >
            <div className="flex items-center justify-between">
                <DifficultyBadge difficulty={lab.difficulty} />
                <span className="flex items-center gap-1 text-xs font-medium text-fg-secondary">
                    <Clock size={11} />
                    {lab.estimatedTime}
                </span>
            </div>
            <div>
                <h3 className="mb-1.5 text-base font-semibold text-fg">
                    {lab.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-fg-secondary">
                    {lab.description}
                </p>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs font-semibold text-fg-secondary">
                    {done === lab.steps.length
                        ? "Completed"
                        : done > 0
                          ? "In progress"
                          : "Not started"}{" "}
                    · {done}/{lab.steps.length} steps
                </span>
                <ArrowRight
                    size={13}
                    className="text-fg-secondary transition-all group-hover:translate-x-1 group-hover:text-brand"
                />
            </div>
        </Link>
    )
}
