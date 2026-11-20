"use client"

import type { RefObject } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    BriefcaseBusiness,
    FileText,
    House,
    MoreHorizontal,
    UserRound,
} from "lucide-react"

const TABS = [
    { label: "Home", href: "/", match: ["/"], icon: House },
    {
        label: "Work",
        href: "/projects",
        match: ["/projects"],
        icon: BriefcaseBusiness,
    },
    { label: "About", href: "/about", match: ["/about"], icon: UserRound },
    // Resume is the page recruiters look for first, so it gets a tab; Lab
    // lives in the "More" sheet with the rest of the navigation.
    {
        label: "Resume",
        href: "/resume",
        match: ["/resume", "/cv"],
        icon: FileText,
    },
] as const

function isActive(pathname: string, match: readonly string[]): boolean {
    return match.some(
        (item) => pathname === item || pathname.startsWith(`${item}/`),
    )
}

interface MobileTabBarProps {
    onMore: () => void
    moreButtonRef: RefObject<HTMLButtonElement | null>
    moreActive?: boolean
}

/** Compact iOS-style navigation for narrow screens. */
export function MobileTabBar({
    onMore,
    moreButtonRef,
    moreActive = false,
}: MobileTabBarProps) {
    const pathname = usePathname()
    const moreSelected =
        moreActive || !TABS.some((tab) => isActive(pathname, tab.match))

    return (
        <nav
            aria-label="Mobile navigation"
            className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[120] rounded-[26px] border border-white/35 bg-background/90 p-1.5 shadow-[0_12px_36px_-12px_rgb(0_0_0_/0.35)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-background/85 lg:hidden"
        >
            <div className="grid grid-cols-5 items-stretch gap-0.5">
                {TABS.map((tab) => {
                    const active = isActive(pathname, tab.match)
                    const Icon = tab.icon
                    return (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            aria-current={active ? "page" : undefined}
                            className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-[21px] px-1 text-xs font-semibold tracking-tight transition-colors active:scale-95 ${
                                active
                                    ? "bg-surface/90 text-brand shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"
                                    : "text-fg-muted hover:bg-surface/60 hover:text-fg"
                            }`}
                        >
                            <Icon
                                size={19}
                                strokeWidth={active ? 2.25 : 1.9}
                                aria-hidden="true"
                            />
                            <span>{tab.label}</span>
                        </Link>
                    )
                })}
                <button
                    ref={moreButtonRef}
                    type="button"
                    onClick={onMore}
                    aria-label="Open more navigation"
                    aria-current={moreSelected ? "page" : undefined}
                    aria-expanded={moreActive}
                    aria-haspopup="dialog"
                    className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-[21px] px-1 text-xs font-semibold tracking-tight transition-colors active:scale-95 ${
                        moreSelected
                            ? "bg-surface/90 text-brand shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"
                            : "text-fg-muted hover:bg-surface/60 hover:text-fg"
                    }`}
                >
                    <MoreHorizontal
                        size={20}
                        strokeWidth={moreSelected ? 2.25 : 1.9}
                        aria-hidden="true"
                    />
                    <span>More</span>
                </button>
            </div>
        </nav>
    )
}
