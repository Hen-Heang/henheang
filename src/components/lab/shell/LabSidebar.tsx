"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Sparkles,
    MessageSquareCode,
    FileCode2,
    Terminal,
    FlaskConical,
    ScrollText,
    BookOpen,
    BookMarked,
    Network,
    Braces,
    Database,
    Gauge,
    TestTubes,
    ArrowLeft,
    Library,
    ChartNoAxesColumn,
} from "lucide-react"
import { profileData } from "@/data/profile"
import Image from "next/image"

interface LabNavItem {
    label: string
    href?: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    /** Marks a link as active for these path prefixes (exact match on href otherwise) */
    matchPrefixes?: string[]
    soon?: boolean
}

interface LabNavGroup {
    title?: string
    items: LabNavItem[]
}

const navGroups: LabNavGroup[] = [
    {
        items: [
            { label: "Overview", href: "/lab", icon: LayoutDashboard },
            { label: "Library", href: "/lab/library", icon: Library },
            {
                label: "Progress",
                href: "/lab/progress",
                icon: ChartNoAxesColumn,
            },
        ],
    },
    {
        title: "Learn",
        items: [
            {
                label: "Backend Path",
                href: "/lab/backend",
                icon: Braces,
                matchPrefixes: ["/lab/backend/"],
            },
            {
                label: "DevOps Path",
                href: "/lab/devops",
                icon: Terminal,
                matchPrefixes: ["/lab/devops/topics"],
            },
            {
                label: "AX Engineering",
                href: "/lab/ax-engineering",
                icon: Sparkles,
            },
        ],
    },
    {
        title: "Practice",
        items: [
            {
                label: "Hands-on Labs",
                href: "/lab/devops/labs",
                icon: FlaskConical,
                matchPrefixes: ["/lab/devops/labs"],
            },
            {
                label: "Prompt Library",
                href: "/ai-engineering/prompts",
                icon: MessageSquareCode,
            },
            {
                label: "Code Snippets",
                href: "/ai-engineering/snippets",
                icon: FileCode2,
            },
        ],
    },
    {
        title: "Reference",
        items: [
            {
                label: "Agent Handbook",
                href: "/lab/handbook",
                icon: BookMarked,
            },
            {
                label: "AI Engineering Library",
                href: "/ai-engineering",
                icon: BookOpen,
                matchPrefixes: ["/ai-engineering/articles"],
            },
            {
                label: "Commands",
                href: "/lab/devops/commands",
                icon: ScrollText,
            },
            {
                label: "Infrastructure",
                href: "/lab/devops/infrastructure",
                icon: BookOpen,
            },
            { label: "System Design", href: "/lab/systems", icon: Network },
            { label: "API Design", href: "/lab/api", icon: Braces },
            { label: "Database", href: "/lab/database", icon: Database },
            { label: "Performance", href: "/lab/performance", icon: Gauge },
            { label: "Experiments", href: "/lab/experiments", icon: TestTubes },
        ],
    },
]

function isActive(pathname: string, item: LabNavItem): boolean {
    if (!item.href) return false
    if (pathname === item.href) return true
    return (item.matchPrefixes ?? []).some((p) => pathname.startsWith(p))
}

export function LabSidebar({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname()

    return (
        <div className="flex h-full flex-col bg-background">
            {/* Brand */}
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <Link
                    href="/"
                    onClick={onNavigate}
                    aria-label="Back to portfolio home"
                >
                    <Image
                        src="/image/heang_new.jpeg"
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-border transition-all hover:ring-border-strong"
                    />
                </Link>
                <div className="min-w-0">
                    <p className="truncate text-lg font-bold text-fg">
                        Engineering Lab
                    </p>
                    <p className="truncate font-mono text-sm text-fg-muted lg:text-xs">
                        ~/henheang/lab
                    </p>
                </div>
            </div>

            {/* Nav */}
            <nav
                className="flex-1 overflow-y-auto px-3 py-4"
                aria-label="Lab sections"
            >
                {navGroups.map((group, gi) => (
                    <details
                        key={`${group.title ?? gi}-${pathname}`}
                        open={
                            !group.title ||
                            group.title !== "Reference" ||
                            group.items.some((item) => isActive(pathname, item))
                        }
                        className={gi > 0 ? "mt-5" : ""}
                    >
                        <summary
                            className={
                                group.title
                                    ? "mb-1.5 min-h-9 cursor-pointer px-2 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-fg-secondary"
                                    : "hidden"
                            }
                        >
                            {group.title ?? "Overview"}
                        </summary>
                        <ul className="space-y-0.5">
                            {group.items.map((item) => {
                                const active = isActive(pathname, item)
                                if (item.soon) {
                                    return (
                                        <li key={item.label}>
                                            <span
                                                aria-disabled="true"
                                                className="flex cursor-default items-center justify-between rounded-lg px-2 py-1.5 text-base text-border-strong lg:text-sm"
                                            >
                                                <span className="flex items-center gap-2.5">
                                                    <item.icon
                                                        size={15}
                                                        aria-hidden="true"
                                                    />
                                                    {item.label}
                                                </span>
                                                <span className="rounded border border-border px-1 py-px font-mono text-[11px] uppercase tracking-wider text-fg-muted lg:text-[10px]">
                                                    soon
                                                </span>
                                            </span>
                                        </li>
                                    )
                                }
                                return (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href!}
                                            onClick={onNavigate}
                                            aria-current={
                                                active ? "page" : undefined
                                            }
                                            className={`flex min-h-11 items-center gap-2.5 rounded-lg border-l-2 px-2 py-1.5 text-base transition-colors lg:min-h-0 lg:text-sm ${
                                                active
                                                    ? "border-brand bg-surface font-medium text-fg"
                                                    : "border-transparent text-fg-secondary hover:bg-surface/60 hover:text-fg"
                                            }`}
                                        >
                                            <item.icon
                                                size={15}
                                                aria-hidden="true"
                                                className={
                                                    active
                                                        ? "text-brand"
                                                        : "text-fg-muted"
                                                }
                                            />
                                            {item.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </details>
                ))}
            </nav>

            {/* Footer */}
            <div className="space-y-0.5 border-t border-border px-3 py-3">
                <a
                    href={profileData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 py-1.5 text-base text-fg-secondary transition-colors hover:bg-surface/60 hover:text-fg lg:min-h-0 lg:text-sm"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                </a>
                <Link
                    href="/"
                    onClick={onNavigate}
                    className="flex min-h-11 items-center gap-2.5 rounded-lg px-2 py-1.5 text-base text-fg-secondary transition-colors hover:bg-surface/60 hover:text-fg lg:min-h-0 lg:text-sm"
                >
                    <ArrowLeft size={15} aria-hidden="true" />
                    Back to Portfolio
                </Link>
            </div>
        </div>
    )
}
