"use client"

import {
    BriefcaseBusiness,
    FileText,
    FlaskConical,
    Mail,
    MessageCircle,
    Route,
    UserRound,
} from "lucide-react"
import { usePersonalInfo } from "@/src/providers/site-content-provider"
import Link from "next/link"
import Image from "next/image"
import {
    FacebookIcon,
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    TelegramIcon,
    XIcon,
} from "@/src/components/icons/social"

const navLinks = [
    { name: "Work", href: "/projects", icon: BriefcaseBusiness },
    { name: "Lab", href: "/lab", icon: FlaskConical },
    { name: "Journey", href: "/journey", icon: Route },
    { name: "About", href: "/about", icon: UserRound },
    { name: "Resume", href: "/resume", icon: FileText },
    { name: "Contact", href: "/contact", icon: MessageCircle },
]

export function Footer() {
    const personalInfo = usePersonalInfo()
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        {
            href: personalInfo.socialLinks.github,
            icon: GithubIcon,
            label: "GitHub",
        },
        {
            href: personalInfo.socialLinks.linkedin,
            icon: LinkedinIcon,
            label: "LinkedIn",
        },
        {
            href: personalInfo.socialLinks.telegram,
            icon: TelegramIcon,
            label: "Telegram",
        },
        { href: personalInfo.socialLinks.x, icon: XIcon, label: "X" },
        {
            href: personalInfo.socialLinks.facebook,
            icon: FacebookIcon,
            label: "Facebook",
        },
        {
            href: personalInfo.socialLinks.instagram,
            icon: InstagramIcon,
            label: "Instagram",
        },
    ].filter((social) => Boolean(social.href))

    return (
        <footer className="border-t border-border bg-surface">
            <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
                <div className="grid gap-12 md:grid-cols-12">
                    <div className="md:col-span-6">
                        {/* Same photo + wordmark lockup as SiteHeader, so the site has one brand mark. */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-85"
                        >
                            <Image
                                src="/image/heang_new.jpeg"
                                alt=""
                                width={32}
                                height={32}
                                className="h-8 w-8 rounded-full object-cover ring-1 ring-border"
                            />
                            <span className="text-base font-semibold tracking-tight text-fg">
                                {personalInfo.fullName}<span className="text-brand">.</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-secondary">
                            {personalInfo.fullName} — backend engineer building
                            enterprise systems with Java and Spring Boot in{" "}
                            {personalInfo.location}.
                        </p>
                    </div>

                    <div className="min-w-0 md:col-span-6">
                        <h2 className="text-xs font-semibold text-fg-muted">
                            Navigation
                        </h2>
                        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-sm text-fg-secondary transition-colors hover:text-brand"
                                    >
                                        <link.icon size={14} aria-hidden />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <ul
                    aria-label="Social profiles"
                    className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-8 sm:gap-3"
                >
                    {socialLinks.map((social) => (
                        <li key={social.label}>
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={social.label}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg-secondary transition-colors hover:border-brand/45 hover:bg-surface-hover hover:text-brand"
                            >
                                <social.icon size={20} brand={false} />
                                <span className="sr-only">{social.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex flex-col items-start gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-fg-muted">
                        © {currentYear} {personalInfo.fullName} ·{" "}
                        {personalInfo.location} (GMT+9)
                    </p>
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="inline-flex min-w-0 max-w-full items-center gap-1.5 text-xs text-fg-muted transition-colors hover:text-fg"
                    >
                        <Mail size={13} className="shrink-0" aria-hidden />
                        <span className="min-w-0 truncate">
                            {personalInfo.email}
                        </span>
                    </a>
                </div>
            </div>
        </footer>
    )
}
