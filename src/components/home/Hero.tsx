import React from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, FileText, Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/src/components/icons/social"
import { Container } from "@/src/components/system/Container"
import { HeroEntrance } from "@/src/components/home/HeroEntrance"
import { RequestPath } from "@/src/components/home/RequestPath"
import { KeepHyphenated } from "@/src/components/system/KeepHyphenated"
import {
    primaryAction,
    secondaryAction,
} from "@/src/components/system/actionStyles"
import { positioning } from "@/src/lib/content/positioning"
import { cn } from "@/src/lib/utils/utils"
import type { Project } from "@/src/lib/types"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"

export function Hero({
    profile,
    projects,
}: {
    profile: ProfileContentParsed
    projects: Project[]
}) {
    const authhub = projects.find((p) => p.slug === "authhub")
    const visibleProjects = projects.filter((p) => !p.hidden)
    const liveCount = visibleProjects.filter(
        (p) => p.demo && p.demo !== "#",
    ).length
    // Every stat is countable from the projects list, so a reviewer can
    // verify it by scrolling down — no unverifiable "100%" claims.
    const stats = [
        { value: profile.yearsExperience, label: "Years Exp" },
        { value: String(visibleProjects.length), label: "Projects" },
        { value: String(liveCount), label: "Live Products" },
    ]

    return (
        <section className="pb-12 pt-10 sm:pt-14 md:pb-16 md:pt-20">
            <Container>
                <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="flex max-w-xl flex-col items-start">
                        <HeroEntrance className="mb-6">
                            <div className="flex items-center gap-2.5">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-fg">
                                        Based in {profile.location}
                                    </p>
                                    <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-fg-muted">
                                        {profile.available && (
                                            <span
                                                className="h-1.5 w-1.5 rounded-full bg-success"
                                                aria-hidden
                                            />
                                        )}
                                        <span>
                                            {profile.available
                                                ? "Open to opportunities"
                                                : "Currently not looking"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </HeroEntrance>

                        <HeroEntrance delay={0.06}>
                            <h1 className="text-balance text-hero text-fg">
                                {profile.name}
                            </h1>
                        </HeroEntrance>

                        <HeroEntrance delay={0.12} className="mt-3">
                            <p className="text-lg font-semibold leading-snug text-fg sm:text-xl">
                                {positioning.title}
                            </p>
                            <p className="mt-0.5 text-lg font-semibold leading-snug text-brand sm:text-xl">
                                <KeepHyphenated
                                    text={positioning.specialization}
                                />
                            </p>
                        </HeroEntrance>

                        <HeroEntrance delay={0.15} className="mt-4">
                            <ul
                                aria-label="Core backend technologies"
                                className="flex flex-wrap gap-1.5"
                            >
                                {positioning.coreStack.map((tech) => (
                                    <li
                                        key={tech}
                                        className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs font-medium text-fg-secondary"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </HeroEntrance>

                        <HeroEntrance delay={0.18} className="mt-6">
                            <p className="text-balance text-base leading-relaxed text-fg-secondary sm:text-lg">
                                {positioning.description}
                            </p>
                        </HeroEntrance>

                        {/* Phones: the long supporting paragraph moves below the
                            actions and stats so the primary button is in the
                            first screen. DOM order (and reading order) is unchanged. */}
                        <HeroEntrance
                            delay={0.22}
                            className="order-1 mt-6 sm:order-none sm:mt-3"
                        >
                            <p className="text-sm leading-relaxed text-fg-muted sm:text-base">
                                {positioning.supporting}
                            </p>
                        </HeroEntrance>

                        <HeroEntrance delay={0.24} className="mt-8 w-full">
                            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                <Link
                                    href="#work"
                                    className={cn(
                                        primaryAction,
                                        "group w-full sm:w-auto",
                                    )}
                                >
                                    <span>View Backend Work</span>
                                    <ArrowRight
                                        size={15}
                                        aria-hidden
                                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                                    />
                                </Link>
                                <Link
                                    href="/resume"
                                    className={cn(
                                        secondaryAction,
                                        "w-full sm:w-auto",
                                    )}
                                >
                                    <FileText size={15} aria-hidden />
                                    <span>Resume & Skills</span>
                                </Link>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-5 text-sm font-medium">
                                <Link
                                    href="/contact"
                                    className="inline-flex min-h-11 items-center gap-1.5 text-fg-secondary transition-colors hover:text-fg"
                                >
                                    <Mail size={15} aria-hidden />
                                    <span>Contact</span>
                                </Link>
                                <a
                                    href={profile.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center gap-1.5 text-fg-secondary transition-colors hover:text-fg"
                                    aria-label="View Hen Heang on GitHub (opens in a new tab)"
                                >
                                    <GithubIcon size={15} />
                                    <span>GitHub</span>
                                    <ArrowUpRight
                                        size={13}
                                        aria-hidden
                                        className="text-fg-muted"
                                    />
                                </a>
                                {profile.socialLinks.linkedin && (
                                    <a
                                        href={profile.socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-11 items-center gap-1.5 text-fg-secondary transition-colors hover:text-fg"
                                        aria-label="View Hen Heang on LinkedIn (opens in a new tab)"
                                    >
                                        <LinkedinIcon size={15} />
                                        <span>LinkedIn</span>
                                        <ArrowUpRight
                                            size={13}
                                            aria-hidden
                                            className="text-fg-muted"
                                        />
                                    </a>
                                )}
                            </div>
                        </HeroEntrance>

                        <HeroEntrance delay={0.3} className="mt-8 w-full">
                            <dl className="grid w-full grid-cols-3 gap-3 border-y border-border py-4">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex flex-col-reverse"
                                    >
                                        <dt className="mt-0.5 text-xs font-medium text-fg-muted">
                                            {stat.label}
                                        </dt>
                                        <dd className="font-mono text-2xl font-bold tabular-nums tracking-tight text-fg sm:text-3xl">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </HeroEntrance>
                    </div>

                    <HeroEntrance delay={0.36} className="min-w-0">
                        <RequestPath project={authhub} />
                    </HeroEntrance>
                </div>
            </Container>
        </section>
    )
}
