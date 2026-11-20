"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { motion } from "motion/react"
import {
    BriefcaseBusiness,
    Command,
    FileText,
    FlaskConical,
    MessageCircle,
    Route,
    Sparkles,
    UserRound,
} from "lucide-react"
import { ThemeToggle } from "@/src/components/system/ThemeToggle"
import { MobileMenu } from "@/src/components/layout/MobileMenu"
import { MobileTabBar } from "@/src/components/layout/MobileTabBar"

const CommandMenu = dynamic(
    () => import("@/src/components/system/CommandMenu"),
    { ssr: false },
)

export const NAV_LINKS = [
    {
        label: "Work",
        href: "/projects",
        match: ["/projects"],
        icon: BriefcaseBusiness,
    },
    {
        label: "Lab",
        href: "/lab",
        match: ["/lab", "/ai-engineering"],
        icon: FlaskConical,
    },
    { label: "Journey", href: "/journey", match: ["/journey"], icon: Route },
    { label: "About", href: "/about", match: ["/about"], icon: UserRound },
    {
        label: "Resume",
        href: "/resume",
        match: ["/resume", "/cv"],
        icon: FileText,
    },
]

const DESKTOP_NAV_LINKS = NAV_LINKS

function isActive(pathname: string, match: string[]): boolean {
    return match.some((m) => pathname === m || pathname.startsWith(`${m}/`))
}

/**
 * Site-wide sticky navigation. Transparent over the page top; gains a
 * blurred background and hairline border once the page scrolls.
 */
export function SiteHeader() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const [commandOpen, setCommandOpen] = useState(false)
    // Only mount the lazy command-menu chunk once it has been requested.
    const [commandRequested, setCommandRequested] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (
                (event.metaKey || event.ctrlKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault()
                setCommandRequested(true)
                setCommandOpen((v) => !v)
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    const openCommandMenu = () => {
        setCommandRequested(true)
        setCommandOpen(true)
    }

    return (
        <>
            {/* data-site-header lets globals.css hide the floating assistant
                trigger on phones, where this header has its own button. */}
            <header
                data-site-header
                className={`sticky top-0 z-[100] transition-colors duration-200 ${
                    scrolled
                        ? "border-b border-border bg-background/80 backdrop-blur-md"
                        : "border-b border-transparent bg-transparent"
                }`}
            >
                <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 transition-opacity hover:opacity-85"
                        aria-label="Hen Heang — home"
                    >
                        <Image
                            src="/image/heang_new.jpeg"
                            alt="Hen Heang"
                            width={38}
                            height={38}
                            priority
                            className="shadow-xs h-9 w-9 rounded-full object-cover ring-2 ring-border"
                        />
                        <span className="text-sm font-bold tracking-tight text-fg">
                            Hen Heang<span className="text-brand">.</span>
                        </span>
                    </Link>

                    <nav
                        aria-label="Main"
                        className="shadow-xs hidden items-center gap-0.5 rounded-full border border-border/70 bg-surface/75 p-1 backdrop-blur-md lg:flex"
                    >
                        {DESKTOP_NAV_LINKS.map((link) => {
                            const active = isActive(pathname, link.match)
                            const Icon = link.icon
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    aria-current={active ? "page" : undefined}
                                    className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                                        active
                                            ? "text-fg"
                                            : "text-fg-secondary hover:text-fg"
                                    }`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="nav-active-pill"
                                            className="shadow-xs absolute inset-0 rounded-full bg-surface-hover ring-1 ring-border"
                                            transition={{
                                                duration: 0.22,
                                                ease: "easeOut",
                                            }}
                                        />
                                    )}
                                    <Icon
                                        className="relative z-10 h-3.5 w-3.5"
                                        aria-hidden
                                    />
                                    <span className="relative z-10">
                                        {link.label}
                                    </span>
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={openCommandMenu}
                            aria-label="Open command menu, keyboard shortcut Command or Control K"
                            aria-keyshortcuts="Meta+K Control+K"
                            className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-surface/60 px-2.5 font-mono text-xs text-fg-muted transition-colors hover:border-border-strong hover:text-fg lg:flex"
                        >
                            <Command size={13} aria-hidden />
                            <span>Search</span>
                            <kbd
                                className="py-0.2 rounded border border-border bg-background px-1 text-[10px] text-fg-muted"
                                aria-hidden
                            >
                                ⌘K
                            </kbd>
                        </button>
                        {/* Phones get the assistant here instead of a floating
                            button that would sit over page content. */}
                        <button
                            type="button"
                            onClick={() =>
                                window.dispatchEvent(
                                    new Event("hh:assistant-open"),
                                )
                            }
                            aria-label="Ask about my work"
                            className="flex h-11 w-11 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg lg:hidden"
                        >
                            <Sparkles size={18} aria-hidden />
                        </button>
                        <ThemeToggle className="h-11 w-11 rounded-lg lg:h-9 lg:w-9" />
                        {/* Outlined, not filled: the page's own primary action
                            is the one filled button in view. */}
                        <Link
                            href="/contact"
                            className="ml-1 hidden h-9 items-center gap-2 rounded-lg border border-border-strong bg-background px-4 text-xs font-semibold text-fg transition-colors hover:bg-surface-hover lg:flex"
                        >
                            <MessageCircle size={14} aria-hidden />
                            Contact
                        </Link>
                    </div>
                </div>

                <MobileMenu
                    open={menuOpen}
                    onOpenChange={setMenuOpen}
                    onOpenCommandMenu={openCommandMenu}
                    triggerRef={menuButtonRef}
                    title="More"
                />
                {commandRequested && (
                    <CommandMenu
                        open={commandOpen}
                        onOpenChange={setCommandOpen}
                    />
                )}
            </header>
            {/* Outside <header>: its scrolled backdrop-filter would become the
            containing block and pin this fixed bar to the header. */}
            <MobileTabBar
                onMore={() => setMenuOpen(true)}
                moreButtonRef={menuButtonRef}
                moreActive={menuOpen}
            />
        </>
    )
}
