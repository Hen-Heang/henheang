import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Briefcase, Clock, Database, Lightbulb, Users } from "lucide-react"
import { GithubIcon } from "@/src/components/icons/social"
import { Container } from "@/src/components/system/Container"
import { StatusBadge } from "@/src/components/system/StatusBadge"
import { ArchitecturePreview } from "@/src/components/system/ArchitecturePreview"
import { CaseStudyTOC, type TocItem } from "@/src/components/projects/CaseStudyTOC"
import { ScreenshotGallery } from "@/src/components/projects/ScreenshotGallery"
import { cn } from "@/src/lib/utils/utils"
import type { Project } from "@/src/lib/types"

type AdjacentProject = Pick<Project, "slug" | "title"> | null

const methodColor: Record<string, string> = {
    GET: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    POST: "bg-success/10 text-success",
    PUT: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    PATCH: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    DELETE: "bg-red-500/10 text-red-500",
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="scroll-mt-24 rounded-xl border border-border bg-surface p-4 sm:p-6">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">{title}</h2>
            <div className="mt-4">{children}</div>
        </section>
    )
}

export function CaseStudy({ project, nextProject }: { project: Project; nextProject?: AdjacentProject }) {
    const isLive = Boolean(project.demo && project.demo !== "#")
    const verification = project.confidential ? undefined : project.verification
    const hasBackendEvidence = Boolean(project.dataModel?.length || project.apiEndpoints?.length || verification)
    const decisionCount = Math.min(
        Math.max(project.challenges?.length ?? 0, project.solutions?.length ?? 0),
        3,
    )
    const decisions = Array.from({ length: decisionCount }, (_, index) => ({
        challenge: project.challenges?.[index],
        solution: project.solutions?.[index],
    }))

    const toc: TocItem[] = [
        (project.businessProblem || project.overview) && { id: "summary", text: "Project Summary" },
        project.screenshots?.length && { id: "screenshots", text: "Screenshots" },
        project.features?.length && { id: "build", text: "What I Built" },
        project.architecture?.length && { id: "architecture", text: "Architecture" },
        hasBackendEvidence && { id: "evidence", text: "Backend Evidence" },
        (decisions.length || project.lessonsLearned?.length) && { id: "decisions", text: "Engineering Decisions" },
    ].filter(Boolean) as TocItem[]

    return (
        <Container>
            <div className="py-section pt-12 md:pt-16">
                <Link
                    href="/projects"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                    <ArrowLeft size={16} aria-hidden /> Back to Projects
                </Link>

                <div
                    className={cn(
                        "relative aspect-[4/3] overflow-hidden rounded-xl border border-border sm:aspect-video",
                        project.imageFit === "contain" && "bg-[#000611]",
                    )}
                >
                    <Image
                        src={project.image || "/image/placeholder_image.png"}
                        alt={project.title}
                        fill
                        priority
                        className={project.imageFit === "contain" ? "object-contain" : "object-cover"}
                    />
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        {(project.category || project.ownership) && (
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">
                                {[project.category, project.ownership].filter(Boolean).join(" · ")}
                            </p>
                        )}
                        <h1 className="mt-2 text-display-sm text-fg">{project.title}</h1>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-fg-secondary sm:gap-5">
                            {project.role && (
                                <span className="inline-flex items-center gap-2">
                                    <Briefcase size={15} className="text-fg-muted" aria-hidden /> {project.role}
                                </span>
                            )}
                            {project.duration && (
                                <span className="inline-flex items-center gap-2">
                                    <Clock size={15} className="text-fg-muted" aria-hidden /> {project.duration}
                                </span>
                            )}
                            {project.teamSize && (
                                <span className="inline-flex items-center gap-2">
                                    <Users size={15} className="text-fg-muted" aria-hidden /> {project.teamSize}
                                </span>
                            )}
                        </div>
                    </div>
                    {isLive ? <StatusBadge status="live" pulse>Live</StatusBadge> : <StatusBadge status="archived">Source available</StatusBadge>}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface-hover"
                        >
                            <GithubIcon size={16} brand={false} /> GitHub
                        </a>
                    )}
                    {isLive && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 items-center justify-center rounded-lg bg-brand px-4 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
                        >
                            Live Demo
                        </a>
                    )}
                </div>

                {project.confidential && (
                    <p className="mt-4 text-sm italic text-fg-muted">
                        Project details and source code are private due to company confidentiality.
                    </p>
                )}

                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((tech) => (
                        <li key={tech} className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-fg-secondary">
                            {tech}
                        </li>
                    ))}
                </ul>

                <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[1fr_220px] lg:gap-16">
                    <div className="flex flex-col gap-6">
                        {(project.businessProblem || project.overview) && (
                            <Block id="summary" title="Project Summary">
                                <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
                                    {project.businessProblem && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-fg">Problem</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                                                {project.businessProblem}
                                            </p>
                                        </div>
                                    )}
                                    {project.overview && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-fg">Approach</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                                                {project.overview}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Block>
                        )}

                        {project.screenshots && project.screenshots.length > 0 && (
                            <Block id="screenshots" title="Screenshots">
                                <ScreenshotGallery images={project.screenshots} title={project.title} />
                            </Block>
                        )}

                        {project.features && project.features.length > 0 && (
                            <Block id="build" title="What I Built">
                                <ul className="grid gap-3 sm:grid-cols-2">
                                    {project.features.slice(0, 4).map((feature) => (
                                        <li key={feature} className="flex gap-3 text-sm leading-relaxed text-fg-secondary">
                                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                {project.technicalDetails && (
                                    <div className="mt-5 border-t border-border pt-5">
                                        <h3 className="text-sm font-semibold text-fg">Implementation</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                                            {project.technicalDetails}
                                        </p>
                                    </div>
                                )}
                            </Block>
                        )}

                        {project.architecture && project.architecture.length > 0 && (
                            <section id="architecture" className="scroll-mt-24">
                                <ArchitecturePreview layers={project.architecture} note={project.architectureNote} />
                            </section>
                        )}

                        {hasBackendEvidence && (
                            <Block id="evidence" title="Backend Evidence">
                                <div className="grid gap-6 xl:grid-cols-2">
                                    {project.dataModel && project.dataModel.length > 0 && (
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-semibold text-fg">Core data</h3>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {project.dataModel.slice(0, 8).map((table) => (
                                                    <span
                                                        key={table}
                                                        className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs text-fg-secondary"
                                                    >
                                                        <Database size={12} className="shrink-0 text-fg-muted" aria-hidden />
                                                        <span className="break-all">{table}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {project.apiEndpoints && project.apiEndpoints.length > 0 && (
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-semibold text-fg">Key endpoints</h3>
                                            <ul className="mt-3 space-y-3">
                                                {project.apiEndpoints.slice(0, 4).map((endpoint) => (
                                                    <li
                                                        key={[endpoint.method, endpoint.path].join(" ")}
                                                        className="min-w-0 text-sm"
                                                    >
                                                        <div className="flex min-w-0 items-start gap-2">
                                                            <span
                                                                className={cn(
                                                                    "shrink-0 rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold",
                                                                    methodColor[endpoint.method] ?? "bg-surface-hover text-fg",
                                                                )}
                                                            >
                                                                {endpoint.method}
                                                            </span>
                                                            <code className="min-w-0 break-all font-mono text-xs leading-5 text-fg-secondary">
                                                                {endpoint.path}
                                                            </code>
                                                        </div>
                                                        <p className="mt-1 text-xs leading-relaxed text-fg-muted">
                                                            {endpoint.description}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {verification && (
                                        <div className="min-w-0 xl:col-span-2">
                                            <h3 className="text-sm font-semibold text-fg">Integration test</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                                                {verification.description}
                                            </p>
                                            <a
                                                href={verification.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-brand underline underline-offset-4"
                                            >
                                                <GithubIcon size={14} brand={false} />
                                                View integration test
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </Block>
                        )}

                        {(decisions.length > 0 || project.lessonsLearned?.length) ? (
                            <Block id="decisions" title="Engineering Decisions">
                                {decisions.length > 0 && (
                                    <ol className="space-y-4">
                                        {decisions.map((decision, index) => (
                                            <li key={index} className="rounded-lg border border-border bg-background p-4">
                                                {decision.challenge && (
                                                    <>
                                                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted">
                                                            Challenge
                                                        </p>
                                                        <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
                                                            {decision.challenge}
                                                        </p>
                                                    </>
                                                )}
                                                {decision.solution && (
                                                    <div className={decision.challenge ? "mt-3 border-t border-border pt-3" : undefined}>
                                                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-success">
                                                            Decision
                                                        </p>
                                                        <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
                                                            {decision.solution}
                                                        </p>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                )}
                                {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                                    <div className={decisions.length > 0 ? "mt-5 border-t border-border pt-5" : undefined}>
                                        <h3 className="text-sm font-semibold text-fg">Takeaways</h3>
                                        <ul className="mt-3 space-y-2.5">
                                            {project.lessonsLearned.slice(0, 2).map((lesson) => (
                                                <li key={lesson} className="flex gap-3 text-sm leading-relaxed text-fg-secondary">
                                                    <Lightbulb size={15} className="mt-0.5 shrink-0 text-amber-500" aria-hidden />
                                                    {lesson}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Block>
                        ) : null}

                        {nextProject && (
                            <Link
                                href={`/projects/${nextProject.slug}`}
                                className="group flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong sm:p-6"
                            >
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">Next Project</span>
                                    <p className="mt-1 text-lg font-semibold text-fg">{nextProject.title}</p>
                                </div>
                                <ArrowRight
                                    size={20}
                                    className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-brand motion-reduce:transition-none"
                                    aria-hidden
                                />
                            </Link>
                        )}
                    </div>

                    <CaseStudyTOC items={toc} />
                </div>
            </div>
        </Container>
    )
}
