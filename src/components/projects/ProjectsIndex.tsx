"use client"

import React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Container } from "@/src/components/system/Container"
import { Eyebrow } from "@/src/components/system/Eyebrow"
import { SectionHeading } from "@/src/components/system/SectionHeading"
import { ProjectFilterBar, type ProjectFilter } from "@/src/components/projects/ProjectFilterBar"
import { ProjectCard } from "@/src/components/projects/ProjectCard"
import { ProjectFeature } from "@/src/components/system/ProjectFeature"
import type { Project } from "@/src/lib/types"

const MAX_FEATURED = 1

function isBackend(project: Project): boolean {
    return project.technologies.some((t) => /spring|java|mybatis/i.test(t))
}

function isFullStack(project: Project): boolean {
    return isBackend(project) && project.technologies.some((t) => /next\.?js|react/i.test(t))
}

function isLive(project: Project): boolean {
    return Boolean(project.demo && project.demo !== "#")
}

function matchesFilter(project: Project, filter: ProjectFilter): boolean {
    switch (filter) {
        case "backend":
            return isBackend(project)
        case "full-stack":
            return isFullStack(project)
        case "live":
            return isLive(project)
        default:
            return true
    }
}

export function ProjectsIndex({ projects, filter }: { projects: Project[]; filter: ProjectFilter }) {
    const reduceMotion = useReducedMotion()
    const counts: Record<ProjectFilter, number> = {
        all: projects.length,
        backend: projects.filter(isBackend).length,
        "full-stack": projects.filter(isFullStack).length,
        live: projects.filter(isLive).length,
    }

    const filtered = projects.filter((p) => matchesFilter(p, filter))
    // Strongest projects (real `featured` flag, in curated data order) get a
    // large editorial treatment; everything else — including any unfeatured
    // remainder of the current filter — fills the grid below. A project
    // never appears in both, and both respect the active filter.
    const featured = filtered.filter((p) => p.featured).slice(0, MAX_FEATURED)
    const remaining = filtered.filter((p) => !featured.some((f) => f.slug === p.slug))

    return (
        <div className="py-section pt-16 md:pt-20">
            <Container>
                <Eyebrow className="mb-4">Projects</Eyebrow>
                <SectionHeading
                    as="h1"
                    size="lg"
                    className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-5xl"
                >
                    Selected engineering work
                </SectionHeading>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-secondary">
                    Start with the strongest backend case study, then scan the rest by stack, role, and engineering focus.
                </p>

                <div className="mt-10">
                    <ProjectFilterBar active={filter} counts={counts} />
                </div>

                {/* Visually hidden: the active filter pill already shows the count. Kept as a live status so screen readers hear the result of a filter change. */}
                <p className="sr-only" role="status">
                    {filtered.length} {filtered.length === 1 ? "project" : "projects"}
                </p>

                {filtered.length === 0 ? (
                    <div className="mt-16 flex flex-col items-center gap-4 text-center" role="status">
                        <p className="text-fg-muted">No projects in this category yet.</p>
                        <Link href="/projects" className="text-sm font-medium text-brand hover:text-brand-hover">
                            View all projects
                        </Link>
                    </div>
                ) : (
                    <>
                        {featured.length > 0 && (
                            <section className="mt-10">
                                {featured.map((project, i) => (
                                    <ProjectFeature key={project.slug} project={project} reverse={i % 2 === 1} />
                                ))}
                            </section>
                        )}

                        {remaining.length > 0 && (
                            <div className={featured.length > 0 ? "mt-14 sm:mt-16" : "mt-10"}>
                                {featured.length > 0 && (
                                    <h2 className="mb-6 text-lg font-semibold tracking-tight text-fg">
                                        All projects
                                    </h2>
                                )}
                                <motion.div layout className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                                    <AnimatePresence initial={false} mode="popLayout">
                                        {remaining.map((project) => (
                                            <motion.div
                                                layout
                                                key={project.slug}
                                                className="h-full"
                                                initial={reduceMotion ? false : { y: 8 }}
                                                animate={{ y: 0 }}
                                                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ProjectCard project={project} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    )
}
