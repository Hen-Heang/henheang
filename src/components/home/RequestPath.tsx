import React from "react"
import Link from "next/link"
import {
    ChevronDown,
    CircleCheck,
    Database,
    MonitorSmartphone,
    Server,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react"
import { cn } from "@/src/lib/utils/utils"
import type { Project } from "@/src/lib/types"

interface Hop {
    label: string
    icon: LucideIcon
    where: string
    /** Mono where the location is literally code (a path, a port). */
    whereIsCode?: boolean
    detail: React.ReactNode
}

/** Tables a login touches, shown first; the rest are counted, not listed. */
const LOGIN_TABLES = [
    "users",
    "refresh_tokens",
    "revoked_tokens",
    "mfa_recovery_codes",
    "login_history",
    "audit_logs",
]

const RESPONSE_LINES = [
    "HTTP/1.1 200 OK",
    "{",
    '  "accessToken":  "eyJhbGci…",',
    '  "refreshToken": "d290f1ee…",',
    '  "tokenType":    "Bearer",',
    '  "expiresIn":    900',
    "}",
]

const CI_STAGES = [
    "git push",
    "GitHub Actions + postgres:16",
    "build + test, Flyway validates",
    "deploy on green",
]

function buildHops(project: Project): Hop[] | null {
    const [login, , mfa] = project.apiEndpoints ?? []
    if (!login) return null

    const tables = project.dataModel ?? []
    const shown = LOGIN_TABLES.filter((t) => tables.includes(t))
    const more = tables.length - shown.length

    return [
        {
            label: "Request",
            icon: MonitorSmartphone,
            where: `${login.method} ${login.path}`,
            whereIsCode: true,
            detail: (
                <p>
                    From any client, including the sample todoapi on{" "}
                    <code className="font-mono text-[0.8125rem] text-fg">
                        :8082
                    </code>{" "}
                    that runs on AuthHub&apos;s JWTs.
                </p>
            ),
        },
        {
            label: "Security filters",
            icon: ShieldCheck,
            where: "rate limit, Spring Security",
            detail: (
                <p>
                    Every request passes a per-client rate-limiting filter and
                    the Spring Security chain. {project.solutions?.[0]}.
                </p>
            ),
        },
        {
            label: "Auth service",
            icon: Server,
            where: "security-api :8080",
            whereIsCode: true,
            detail: (
                <p>
                    {login.description}.
                    {mfa && (
                        <>
                            {" "}
                            With MFA on, login continues at{" "}
                            <code className="font-mono text-[0.8125rem] text-fg">
                                {mfa.method} {mfa.path}
                            </code>
                            .
                        </>
                    )}
                </p>
            ),
        },
        {
            label: "PostgreSQL",
            icon: Database,
            where: "Flyway-owned schema",
            detail: (
                <>
                    <ul
                        aria-label="Tables a login touches"
                        className="flex flex-wrap gap-1.5"
                    >
                        {shown.map((t) => (
                            <li
                                key={t}
                                className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-fg-secondary"
                            >
                                {t}
                            </li>
                        ))}
                        {more > 0 && (
                            <li className="px-1 py-0.5 text-xs text-fg-muted">
                                +{more} more tables
                            </li>
                        )}
                    </ul>
                    {project.solutions?.[2] && (
                        <p className="mt-2">{project.solutions[2]}.</p>
                    )}
                </>
            ),
        },
        {
            label: "Response",
            icon: CircleCheck,
            where: "200 OK",
            whereIsCode: true,
            detail: (
                <pre className="overflow-x-auto rounded-lg bg-surface-code px-3 py-2.5 font-mono text-xs leading-relaxed text-surface-code-foreground">
                    {RESPONSE_LINES.join("\n")}
                </pre>
            ),
        },
    ]
}

/**
 * The home page's one bold element: AuthHub's real request path, drawn as a
 * rail of hops. Every label and detail comes from the project's data
 * (endpoints, solutions, tables); only the response body and CI stages are
 * illustrative, and the caption says so.
 *
 * Server-rendered with native `<details name>`: exclusive expand/collapse
 * and keyboard support with no client JavaScript. The rail fills once on
 * load (CSS only); reduced motion renders it already filled.
 */
export function RequestPath({ project }: { project?: Project }) {
    const hops = project ? buildHops(project) : null
    if (!project || !hops) return null

    const name = project.title.split("—")[0].trim()
    const step = 1.6 / (hops.length - 1)

    return (
        <figure
            aria-labelledby="request-path-title"
            className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
        >
            <div className="flex items-baseline justify-between gap-4">
                <h2
                    id="request-path-title"
                    className="text-sm font-semibold text-fg"
                >
                    {`How a login moves through ${name}`}
                </h2>
                <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`${name} case study`}
                    className="inline-flex min-h-11 shrink-0 items-center text-sm font-medium text-brand transition-colors hover:text-brand-hover"
                >
                    Case study
                </Link>
            </div>

            <ol className="relative mt-2">
                {/* Rail: a static track plus a brand fill that grows once. */}
                <span
                    aria-hidden
                    className="absolute bottom-6 left-[15px] top-6 w-0.5 rounded-full bg-border"
                />
                <span
                    aria-hidden
                    className="absolute bottom-6 left-[15px] top-6 w-0.5 origin-top animate-rail-fill rounded-full bg-brand motion-reduce:animate-none"
                />
                {hops.map((hop, i) => {
                    const Icon = hop.icon
                    return (
                        <li key={hop.label} className="relative pl-11">
                            <span
                                aria-hidden
                                style={{ animationDelay: `${0.4 + i * step}s` }}
                                className="absolute left-0 top-1.5 flex h-8 w-8 animate-node-on items-center justify-center rounded-full border-2 border-brand bg-background text-brand motion-reduce:animate-none"
                            >
                                <Icon size={15} strokeWidth={2} />
                            </span>
                            <details
                                name="request-path"
                                open={i === 0}
                                className="group rounded-lg"
                            >
                                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-surface-hover [&::-webkit-details-marker]:hidden">
                                    {/* Stacked on phones so neither the label nor
                                    its location has to wrap or truncate. */}
                                    <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-3">
                                        <span className="text-sm font-medium text-fg">
                                            {hop.label}
                                        </span>
                                        <span
                                            className={cn(
                                                "truncate text-xs text-fg-muted sm:ml-auto sm:text-right",
                                                hop.whereIsCode && "font-mono",
                                            )}
                                        >
                                            {hop.where}
                                        </span>
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        aria-hidden
                                        className="shrink-0 text-fg-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
                                    />
                                </summary>
                                <div className="px-2.5 pb-3 pt-1 text-sm leading-relaxed text-fg-secondary">
                                    {hop.detail}
                                </div>
                            </details>
                        </li>
                    )
                })}
            </ol>

            <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs font-medium text-fg">On every push</p>
                <ol
                    aria-label="CI pipeline"
                    className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-xs text-fg-secondary"
                >
                    {CI_STAGES.map((stage, i) => (
                        <li
                            key={stage}
                            className="inline-flex items-center gap-1.5"
                        >
                            {i > 0 && (
                                <span aria-hidden className="text-fg-muted">
                                    →
                                </span>
                            )}
                            <span className="rounded-md border border-border bg-background px-2 py-0.5">
                                {stage}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>

            <figcaption className="mt-4 text-xs leading-relaxed text-fg-muted">
                Endpoints, filters and tables are from the {name} codebase. The
                response body and CI stages are illustrative.
            </figcaption>
        </figure>
    )
}
