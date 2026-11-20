import React from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ArchitecturePreview } from "@/src/components/system/ArchitecturePreview"
import { cn } from "@/src/lib/utils/utils"
import type { ProjectPreview } from "@/src/lib/utils/project-preview"

const METHOD_COLOR: Record<string, string> = {
    GET: "text-success border-success/30 bg-success/5",
    POST: "text-brand border-brand/30 bg-brand/5",
    PUT: "text-warning border-warning/30 bg-warning/5",
    PATCH: "text-warning border-warning/30 bg-warning/5",
    DELETE: "text-error border-error/30 bg-error/5",
}

/**
 * Renders whichever real technical preview `getProjectPreview` selected for
 * a project's featured panel. Returns `null` for "none" so the caller can
 * render a full-width editorial layout instead of an empty column.
 */
export function ProjectPreviewPanel({ preview, className }: { preview: ProjectPreview; className?: string }) {
    switch (preview.kind) {
        case "architecture":
            return <ArchitecturePreview layers={preview.layers} note={preview.note} className={className} />

        case "api":
            return (
                <div className={cn("rounded-xl border border-border bg-surface p-5 sm:p-6", className)}>
                    <p className="mb-4 font-mono text-xs text-fg-muted">api</p>
                    <div className="flex flex-col gap-2">
                        {preview.endpoints.slice(0, 5).map((ep, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2.5 rounded-lg border border-border bg-background/60 px-3 py-2"
                            >
                                <span
                                    className={cn(
                                        "shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold",
                                        METHOD_COLOR[ep.method],
                                    )}
                                >
                                    {ep.method}
                                </span>
                                <code className="truncate font-mono text-[13px] text-fg-secondary">{ep.path}</code>
                            </div>
                        ))}
                    </div>
                </div>
            )

        case "database":
            return (
                <div className={cn("rounded-xl border border-border bg-surface p-5 sm:p-6", className)}>
                    <p className="mb-4 font-mono text-xs text-fg-muted">database</p>
                    <div className="grid grid-cols-2 gap-1.5">
                        {preview.tables.slice(0, 8).map((table) => (
                            <code
                                key={table}
                                className="truncate rounded-lg border border-border bg-background/60 px-3 py-2 font-mono text-xs text-fg-secondary"
                            >
                                {table}
                            </code>
                        ))}
                    </div>
                </div>
            )

        case "workflow":
            return (
                <div className={cn("rounded-xl border border-border bg-surface p-5 sm:p-6", className)}>
                    <p className="mb-4 font-mono text-xs text-fg-muted">workflow</p>
                    <div className="flex flex-col gap-1.5">
                        {preview.steps.slice(0, 5).map((step, i) => (
                            <React.Fragment key={step.phase}>
                                {i > 0 && <ArrowRight size={13} className="mx-auto rotate-90 shrink-0 text-fg-muted" aria-hidden />}
                                <div className="flex items-baseline justify-between gap-3 rounded-lg border border-border bg-background/60 px-4 py-2.5">
                                    <span className="font-mono text-[13px] text-fg">{step.phase}</span>
                                    <span className="truncate text-right text-xs text-fg-muted">{step.detail}</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )

        case "image":
            return (
                <div className={cn("relative aspect-[4/3] overflow-hidden rounded-xl border border-border", preview.imageFit === "contain" ? "bg-[#000611]" : "bg-background", className)}>
                    <Image
                        src={preview.src}
                        alt={preview.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={preview.imageFit === "contain" ? "object-contain" : "object-cover"}
                    />
                </div>
            )

        case "none":
            return null
    }
}
