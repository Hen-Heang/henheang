import React from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react"
import { GithubIcon } from "@/src/components/icons/social"
import { Container } from "@/src/components/system/Container"
import {
    TechnicalPanel,
    type TechnicalTab,
} from "@/src/components/system/TechnicalPanel"
import { HeroEntrance } from "@/src/components/home/HeroEntrance"
import { positioning } from "@/src/lib/content/positioning"
import type { Project } from "@/src/lib/types"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"

/**
 * Builds the hero's technical views from real project data: API request
 * first (the default, visible-on-mobile tab), then database, then pipeline.
 * The H-Phsar architecture flow is deliberately absent — Selected Work shows
 * it directly below, and repeating it here made the page say the same thing
 * twice. The API response body and pipeline stages are labeled illustrative
 * in their captions.
 */
function buildTabs(projects: Project[]): TechnicalTab[] {
    const bySlug = (slug: string) => projects.find((p) => p.slug === slug)
    const tabs: TechnicalTab[] = []

    const authhub = bySlug("authhub")
    const authEndpoint = authhub?.apiEndpoints?.[0]
    if (authEndpoint) {
        tabs.push({
            id: "api",
            label: "api",
            data: {
                kind: "request",
                method: authEndpoint.method,
                path: authEndpoint.path,
                responseLines: [
                    "HTTP/1.1 200 OK",
                    "{",
                    '  "accessToken":  "eyJhbGci…",',
                    '  "refreshToken": "d290f1ee…",',
                    '  "tokenType":    "Bearer",',
                    '  "expiresIn":    900',
                    "}",
                ],
                caption: `Real endpoint from ${authhub.title.split("—")[0].trim()} (JWT with refresh + revocation). Response body illustrative.`,
            },
        })
    }

    const luyra = bySlug("luyra")
    if (luyra?.dataModel?.length) {
        tabs.push({
            id: "database",
            label: "database",
            data: {
                kind: "database",
                tables: luyra.dataModel.slice(0, 10),
                caption:
                    "Luyra finance schema — authenticated access is scoped server-side before Neon queries.",
            },
        })
    }

    tabs.push({
        id: "pipeline",
        label: "pipeline",
        data: {
            kind: "pipeline",
            stages: [
                { label: "git push", detail: "feature branch" },
                { label: "GitHub Actions", detail: "postgres:16 service" },
                { label: "build + test", detail: "Flyway validates schema" },
                { label: "deploy", detail: "on green" },
            ],
            caption:
                "CI pipeline as run on AuthHub (GitHub Actions + postgres:16). Stages illustrative.",
        },
    })

    return tabs
}

export function Hero({
    profile,
    projects,
}: {
    profile: ProfileContentParsed
    projects: Project[]
}) {
    const tabs = buildTabs(projects)
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
                                                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
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
                            <h1 className="text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-fg sm:text-5xl lg:text-6xl">
                                {profile.name}
                            </h1>
                        </HeroEntrance>

                        <HeroEntrance delay={0.12} className="mt-3">
                            <p className="text-balance text-lg font-semibold leading-snug text-brand sm:text-xl">
                                {positioning.title}
                            </p>
                        </HeroEntrance>

                        <HeroEntrance delay={0.18} className="mt-4">
                            <p className="text-balance text-base leading-relaxed text-fg-secondary sm:text-lg">
                                {positioning.description}
                            </p>
                        </HeroEntrance>

                        <HeroEntrance delay={0.22} className="mt-3">
                            <p className="text-sm leading-relaxed text-fg-muted sm:text-base">
                                {positioning.supporting}
                            </p>
                        </HeroEntrance>

                        <HeroEntrance delay={0.24} className="mt-8 w-full">
                            <div className="flex w-full flex-wrap items-center gap-3">
                                <Link
                                    href="#work"
                                    className="shadow-xs group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] sm:w-auto"
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
                                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-medium text-fg transition-all duration-200 hover:border-border-strong hover:bg-surface-hover active:scale-[0.98] sm:w-auto"
                                >
                                    <FileText size={15} aria-hidden />
                                    <span>Resume & Skills</span>
                                </Link>
                                <a
                                    href={profile.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-11 w-full items-center justify-center gap-1.5 px-3 text-sm font-medium text-fg-secondary transition-colors hover:text-fg sm:w-auto"
                                    aria-label="View Hen Heang on GitHub (opens in a new tab)"
                                >
                                    <GithubIcon size={16} />
                                    <span>GitHub</span>
                                    <ArrowUpRight
                                        size={13}
                                        aria-hidden
                                        className="text-fg-muted"
                                    />
                                </a>
                            </div>
                        </HeroEntrance>

                        <HeroEntrance delay={0.3} className="mt-8 w-full">
                            <dl className="grid w-full grid-cols-3 gap-3 border-y border-border py-4">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex flex-col-reverse"
                                    >
                                        <dt className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-fg-muted">
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
                        <TechnicalPanel tabs={tabs} />
                    </HeroEntrance>
                </div>
            </Container>
        </section>
    )
}
