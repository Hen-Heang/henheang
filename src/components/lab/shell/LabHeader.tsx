"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { labs } from "@/data/lab/devops/labs"
import { Menu, X } from "lucide-react"

/** Segments that have their own index page and can be linked in the breadcrumb */
const LINKABLE: Record<string, string> = {
    backend: "Backend Engineering",
    roadmap: "Roadmap",
    devops: "DevOps",
    handbook: "Agent Handbook",
    "ax-engineering": "AX Engineering",
    labs: "Labs",
    commands: "Commands",
    infrastructure: "Infrastructure",
    systems: "System Design",
    api: "API Design",
    database: "Database",
    performance: "Performance",
    experiments: "Experiments",
}

/** Segments that exist in the URL but have no index page */
const UNLINKABLE: Record<string, string> = {
    topics: "Topics",
}

function slugToTitle(slug: string): string {
    return decodeURIComponent(slug)
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
}

export function LabHeader({
    menuOpen,
    onMenuToggle,
    menuButtonRef,
}: {
    menuOpen: boolean
    onMenuToggle: () => void
    menuButtonRef?: React.RefObject<HTMLButtonElement | null>
}) {
    const pathname = usePathname()
    // The AI Library lives at /ai-engineering but renders inside the Lab
    // shell, so its crumbs root at "ai library" under "lab".
    const [root, ...segments] = pathname.split("/").filter(Boolean)
    const isAILibrary = root === "ai-engineering"
    const base = isAILibrary ? "/ai-engineering" : "/lab"

    const crumbs = [
        ...(isAILibrary
            ? [{ label: "AI Library", href: base as string | null }]
            : []),
        ...segments.map((seg, i) => {
            const href = `${base}/${segments.slice(0, i + 1).join("/")}`
            if (isAILibrary && seg === "articles")
                return { label: "Articles", href: null }
            if (LINKABLE[seg]) return { label: LINKABLE[seg], href }
            if (UNLINKABLE[seg]) return { label: UNLINKABLE[seg], href: null }
            return {
                label:
                    labs.find((lab) => lab.slug === seg)?.title ??
                    slugToTitle(seg),
                href: null,
            }
        }),
    ]

    return (
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    ref={menuButtonRef}
                    type="button"
                    onClick={onMenuToggle}
                    aria-label={menuOpen ? "Close lab menu" : "Open lab menu"}
                    aria-expanded={menuOpen}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-fg-secondary transition-colors hover:border-border-strong hover:text-fg lg:hidden"
                >
                    {menuOpen ? (
                        <X size={16} aria-hidden="true" />
                    ) : (
                        <Menu size={16} aria-hidden="true" />
                    )}
                </button>

                <nav
                    aria-label="Breadcrumb"
                    className="flex min-w-0 items-center gap-1.5 font-mono text-base text-fg-muted lg:text-sm"
                >
                    <Link
                        href="/lab"
                        className="shrink-0 transition-colors hover:text-fg"
                    >
                        lab
                    </Link>
                    {crumbs.map((crumb, i) => (
                        <span
                            key={i}
                            className="flex min-w-0 items-center gap-1.5 first:shrink-0"
                        >
                            <span className="text-border-strong">/</span>
                            {crumb.href && i < crumbs.length - 1 ? (
                                <Link
                                    href={crumb.href}
                                    className="shrink-0 transition-colors hover:text-fg"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="truncate text-fg-secondary">
                                    {crumb.label}
                                </span>
                            )}
                        </span>
                    ))}
                </nav>
            </div>

            <div className="flex shrink-0 items-center gap-4">
                <span className="hidden items-center gap-1.5 font-mono text-sm text-fg-muted sm:flex lg:text-xs">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                    </span>
                    always building
                </span>
                <Link
                    href="/"
                    className="rounded-lg border border-border px-2.5 py-1 font-mono text-sm text-fg-secondary transition-colors hover:border-border-strong hover:text-fg lg:text-xs"
                >
                    exit lab
                </Link>
            </div>
        </header>
    )
}
