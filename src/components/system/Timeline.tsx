import React from "react"
import Image from "next/image"
import { Award, GraduationCap, Medal } from "lucide-react"
import { cn } from "@/src/lib/utils/utils"
import { TextLink } from "@/src/components/system/TextLink"

export interface TimelineCredential {
    title: string
    type: "certificate" | "graduation" | "award"
    /** Image rendered directly beneath the matching school/company entry. */
    image?: string
    /** Public verification or certificate URL. */
    link?: string
}

export interface TimelineEntry {
    period: string
    title: string
    org: string
    location?: string
    description: string
    highlights?: string[]
    stack?: string[]
    /** Certifications/awards earned during this role or program. */
    credentials?: TimelineCredential[]
    /** Preview rendered directly for a standalone `kind: "certificate"` entry. */
    image?: string
    /** Public verification or certificate URL for a standalone credential. */
    link?: string
    kind?: "education" | "work" | "direction" | "certificate"
}

const credentialIcon = {
    certificate: Award,
    graduation: GraduationCap,
    award: Medal,
} as const

/**
 * Editorial timeline: split period/content columns on desktop, simple
 * vertical rail on mobile. Server component — entrance animation is added
 * by wrapping items in <Reveal> at the call site.
 */
export function Timeline({ items, className }: { items: TimelineEntry[]; className?: string }) {
    return (
        <ol className={cn("flex flex-col", className)}>
            {items.map((item, i) => (
                <li key={`${item.org}-${item.period}-${item.title}`} className="grid gap-2 md:grid-cols-[150px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[180px_minmax(0,1fr)]">
                    <p className="pt-0.5 font-mono text-sm text-fg-muted md:text-right">{item.period}</p>
                    <div
                        className={cn(
                            "relative border-l border-border pl-8",
                            i === items.length - 1 ? "pb-2" : "pb-14",
                        )}
                    >
                        <span
                            className={cn(
                                "absolute -left-[5.5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background",
                                item.kind === "direction" || item.kind === "certificate" ? "bg-brand" : "bg-border-strong",
                            )}
                            aria-hidden
                        />
                        <h3 className="text-lg font-semibold tracking-tight text-fg">
                            {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-fg-muted">
                            {item.org}
                            {item.location ? ` · ${item.location}` : ""}
                        </p>
                        <p className="mt-3 max-w-xl leading-relaxed text-fg-secondary">{item.description}</p>
                        {item.highlights && item.highlights.length > 0 && (
                            <ul className="mt-4 max-w-xl space-y-2">
                                {item.highlights.map((h) => (
                                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg-secondary">
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted" aria-hidden />
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {item.stack && item.stack.length > 0 && (
                            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${item.org} stack`}>
                                {item.stack.map((tech) => (
                                    <li
                                        key={tech}
                                        className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs text-fg-muted"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {item.credentials && item.credentials.length > 0 && (
                            <ul
                                className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2"
                                aria-label={`Certifications and awards from ${item.org}`}
                            >
                                {item.credentials.map((c) => {
                                    const Icon = credentialIcon[c.type]
                                    return (
                                        <li
                                            key={`${c.type}-${c.title}-${c.image ?? "no-image"}`}
                                            className="overflow-hidden rounded-xl border border-border bg-background"
                                        >
                                            {c.image && (
                                                <div className="relative aspect-[16/10] border-b border-border bg-surface">
                                                    <Image
                                                        src={c.image}
                                                        alt={`${c.title} from ${item.org}`}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, 320px"
                                                        className="object-contain p-3"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex items-start gap-3 p-3.5">
                                                <span
                                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand"
                                                    aria-hidden
                                                >
                                                    <Icon size={15} />
                                                </span>
                                                <span>
                                                    <span className="block text-sm font-medium leading-snug text-fg">
                                                        {c.title}
                                                    </span>
                                                    <span className="mt-1 block text-xs text-fg-muted">
                                                        {c.type}
                                                    </span>
                                                    {c.link && (
                                                        <TextLink href={c.link} external className="mt-2 text-xs text-brand">
                                                            Verify certificate
                                                        </TextLink>
                                                    )}
                                                </span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                        {item.kind === "certificate" && item.link && (
                            <TextLink href={item.link} external className="mt-4 text-brand">
                                Verify certificate
                            </TextLink>
                        )}
                        {item.kind === "certificate" && item.image && (
                            <div className="relative mt-5 aspect-[16/10] max-w-lg overflow-hidden rounded-xl border border-border bg-background">
                                <Image
                                    src={item.image}
                                    alt={`${item.title} from ${item.org}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 512px"
                                    className="object-contain p-3"
                                />
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    )
}
