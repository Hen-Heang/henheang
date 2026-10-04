import Link from "next/link"
import { ArrowRight, ArrowUpRight, Boxes, Github, Terminal } from "lucide-react"
import { axHarness } from "@/data/lab/ax-engineering"
import { interactiveCard, cn } from "@/src/lib/utils/utils"

/** Renders `code` spans from the data copy without pulling in a markdown parser. */
function InlineCode({ text }: { text: string }) {
    return (
        <>
            {text.split("`").map((part, i) =>
                i % 2 === 1 ? (
                    <code
                        key={i}
                        className="rounded bg-background px-1 py-0.5 font-mono text-[0.85em] text-fg"
                    >
                        {part}
                    </code>
                ) : (
                    part
                ),
            )}
        </>
    )
}

const linkButton =
    "group inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand motion-reduce:hover:translate-y-0"

function ProjectLinks() {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <a
                href={axHarness.consoleUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                    linkButton,
                    "bg-gradient-brand text-white hover:brightness-110",
                )}
            >
                Open live console
                <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
            </a>
            <a
                href={axHarness.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                    linkButton,
                    "border border-border bg-surface text-fg hover:border-brand/50",
                )}
            >
                <Github size={15} aria-hidden="true" /> Source on GitHub
            </a>
        </div>
    )
}

/** Full project section for the AX Engineering learning path page. */
export function AXHarnessShowcase() {
    return (
        <section
            id="harness"
            className="mb-12 scroll-mt-24 overflow-hidden rounded-2xl border border-warning/30 bg-surface"
            aria-labelledby="harness-heading"
        >
            <div className="border-b border-border bg-warning/5 p-5 md:p-7">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-warning">
                        <Boxes size={12} aria-hidden="true" /> Built project
                    </span>
                    <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] text-fg-muted">
                        v{axHarness.version} · {axHarness.status}
                    </span>
                </div>
                <h2
                    id="harness-heading"
                    className="mt-3 text-[26px] font-bold leading-[1.15] tracking-tight text-fg md:text-[32px]"
                >
                    {axHarness.name}
                </h2>
                <p className="mt-2 text-base font-medium text-fg-secondary">
                    {axHarness.tagline}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-fg-secondary">
                    <InlineCode text={axHarness.summary} />
                </p>
                <ul
                    className="mt-4 flex flex-wrap gap-1.5"
                    aria-label="Harness pillars"
                >
                    {axHarness.pillars.map((pillar) => (
                        <li
                            key={pillar}
                            className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-fg-muted"
                        >
                            {pillar}
                        </li>
                    ))}
                </ul>
                <div className="mt-5">
                    <ProjectLinks />
                </div>
            </div>

            <div className="p-5 md:p-7">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Feedback loop it enforces
                </h3>
                <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm">
                    {axHarness.architecture.map((step, i) => (
                        <li key={step} className="flex items-center gap-1.5">
                            <span className="rounded-lg border border-border bg-background px-2.5 py-1 font-medium text-fg">
                                {step}
                            </span>
                            {i < axHarness.architecture.length - 1 && (
                                <ArrowRight
                                    size={13}
                                    aria-hidden="true"
                                    className="text-fg-muted"
                                />
                            )}
                        </li>
                    ))}
                </ol>

                <h3 className="mt-7 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    What works today
                </h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {axHarness.highlights.map((item) => (
                        <li
                            key={item.title}
                            className="rounded-xl border border-border bg-background p-4"
                        >
                            <p className="text-sm font-semibold text-fg">
                                {item.title}
                            </p>
                            <p className="mt-1 text-sm leading-5 text-fg-secondary">
                                <InlineCode text={item.detail} />
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="mt-7 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                    <div>
                        <h3 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                            <Terminal size={13} aria-hidden="true" /> Try the
                            CLI
                        </h3>
                        <dl className="mt-3 overflow-hidden rounded-xl border border-border bg-background font-mono text-xs">
                            {axHarness.commands.map((cmd) => (
                                <div
                                    key={cmd.command}
                                    className="flex flex-col gap-0.5 border-b border-border px-4 py-2.5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                                >
                                    <dt className="text-fg">
                                        <span className="text-success">$</span>{" "}
                                        {cmd.command}
                                    </dt>
                                    <dd className="text-fg-muted">
                                        {cmd.detail}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div>
                        <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                            Built with
                        </h3>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                            {axHarness.stack.map((tech) => (
                                <li
                                    key={tech}
                                    className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-fg-secondary"
                                >
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

/** Compact teaser for the Lab landing page that points at the full section. */
export function AXHarnessCallout() {
    return (
        <section className="mb-10" aria-labelledby="ax-harness-callout-heading">
            <div
                className={cn(
                    "flex flex-col gap-4 rounded-2xl border border-warning/30 bg-surface p-5 md:flex-row md:items-center md:justify-between",
                    interactiveCard,
                )}
            >
                <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-warning">
                        <Boxes size={11} aria-hidden="true" /> Built project
                    </span>
                    <h2
                        id="ax-harness-callout-heading"
                        className="mt-2 text-lg font-bold tracking-tight text-fg"
                    >
                        {axHarness.name}
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-fg-secondary">
                        {axHarness.tagline} The AX Engineering path, built and
                        running.
                    </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                    <Link
                        href="/lab/ax-engineering#harness"
                        className={cn(
                            linkButton,
                            "border border-border bg-background text-fg hover:border-brand/50",
                        )}
                    >
                        See the project
                        <ArrowRight
                            size={13}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                    </Link>
                    <a
                        href={axHarness.consoleUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                            linkButton,
                            "bg-gradient-brand text-white hover:brightness-110",
                        )}
                    >
                        Live console
                        <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    )
}
