import React from "react"
import { ExternalLink } from "lucide-react"
import { GithubIcon } from "@/src/components/icons/social"
import { TextLink } from "@/src/components/system/TextLink"
import { ProjectPreviewPanel } from "@/src/components/system/ProjectPreviewPanel"
import {
    getProjectPreview,
    type ProjectPreview,
} from "@/src/lib/utils/project-preview"
import { cn } from "@/src/lib/utils/utils"
import type { Project } from "@/src/lib/types"

interface ProjectFeatureProps {
    project: Project
    reverse?: boolean
    homepage?: boolean
}

function firstSentence(value: string): string {
    return value.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() ?? value
}

/**
 * Large editorial project panel for the homepage's Selected Work section and
 * the /projects featured slots: category/ownership/status metadata, a
 * problem → solution narrative, what I personally contributed, engineering
 * focus, real stack, and a technical preview. Falls back through
 * architecture/api/database/workflow/image data (see `getProjectPreview`)
 * and drops to a single full-width column when a project has none of it,
 * rather than leaving an empty second column.
 */
export function ProjectFeature({
    project,
    reverse = false,
    homepage = false,
}: ProjectFeatureProps) {
    const isLive = Boolean(project.demo && project.demo !== "#")
    const availabilityLabel = project.confidential
        ? "Private"
        : isLive
          ? "Live"
          : project.github
            ? "Source"
            : "Case study"
    const shortTitle = project.title.split("—")[0].trim()
    const preview: ProjectPreview =
        homepage && project.architecture?.length
            ? {
                  kind: "architecture",
                  layers: ["Client", ...project.architecture.slice(0, 4)],
                  note: "Request path from the client boundary through the documented service and persistence layers.",
              }
            : getProjectPreview(project)
    const hasPreview = preview.kind !== "none"
    const contributions = project.solutions?.slice(0, 2) ?? []
    const metadata = [
        project.category,
        project.ownership,
        availabilityLabel,
    ].filter(Boolean)

    if (homepage) {
        const homepageMetadata = [project.category, availabilityLabel].filter(
            Boolean,
        )

        return (
            <article className="group grid items-start gap-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                <div className="lg:col-start-1 lg:row-start-1">
                    {homepageMetadata.length > 0 && (
                        <p className="text-xs font-semibold text-fg-muted">
                            {homepageMetadata.join(" / ")}
                        </p>
                    )}
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                        {project.title}
                    </h3>
                </div>

                {hasPreview && (
                    <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
                        <ProjectPreviewPanel
                            preview={preview}
                            className="transition-all duration-300 group-hover:border-brand/30 group-hover:shadow-lg group-hover:shadow-black/5"
                        />
                    </div>
                )}

                <div className="lg:col-start-1 lg:row-start-2">
                    {project.businessProblem && (
                        <div>
                            <p className="text-xs font-semibold text-fg-muted">
                                Problem
                            </p>
                            <p className="mt-2 text-base leading-relaxed text-fg-secondary">
                                {firstSentence(project.businessProblem)}
                            </p>
                        </div>
                    )}

                    <div className="mt-5">
                        <p className="text-xs font-semibold text-fg-muted">
                            Solution
                        </p>
                        <p className="mt-2 text-base leading-relaxed text-fg-secondary">
                            {firstSentence(project.description)}
                        </p>
                    </div>

                    {contributions.length > 0 && (
                        <div className="mt-5">
                            <p className="text-xs font-semibold text-fg-muted">
                                My contribution
                            </p>
                            <ul className="mt-2 space-y-1.5">
                                {contributions.map((item) => (
                                    <li
                                        key={item}
                                        className="flex gap-2.5 text-sm leading-relaxed text-fg-secondary"
                                    >
                                        <span
                                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted"
                                            aria-hidden
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <ul
                        className="mt-5 flex flex-wrap gap-2"
                        aria-label={`${shortTitle} technologies`}
                    >
                        {project.technologies.slice(0, 3).map((tech) => (
                            <li
                                key={tech}
                                className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-fg-secondary"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-5">
                        <TextLink href={`/projects/${project.slug}`}>
                            View case study
                        </TextLink>
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg-secondary transition-colors hover:text-fg"
                                aria-label={`View ${shortTitle} on GitHub (opens in a new tab)`}
                            >
                                <GithubIcon size={15} brand={false} />
                                GitHub
                                <ExternalLink size={12} aria-hidden />
                            </a>
                        )}
                    </div>
                </div>
            </article>
        )
    }

    return (
        <article
            className={`group grid items-start gap-8 sm:gap-10 ${hasPreview ? "lg:grid-cols-2 lg:gap-16" : ""}`}
        >
            <div
                className={cn(
                    reverse && hasPreview ? "lg:order-2" : undefined,
                    !hasPreview && "max-w-3xl",
                )}
            >
                {metadata.length > 0 && (
                    <p className="text-xs font-semibold text-fg-muted">
                        {metadata.join(" / ")}
                    </p>
                )}

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {project.title}
                </h3>

                {project.businessProblem && (
                    <div className="mt-6">
                        <p className="text-xs font-semibold text-fg-muted">
                            Problem
                        </p>
                        <p className="mt-2 leading-relaxed text-fg-secondary">
                            {project.businessProblem}
                        </p>
                    </div>
                )}

                <div className="mt-5">
                    <p className="text-xs font-semibold text-fg-muted">
                        Solution
                    </p>
                    <p className="mt-2 leading-relaxed text-fg-secondary">
                        {project.description}
                    </p>
                </div>

                {contributions.length > 0 && (
                    <div className="mt-5">
                        <p className="text-xs font-semibold text-fg-muted">
                            My contribution
                        </p>
                        <ul className="mt-2 space-y-1.5">
                            {contributions.map((item) => (
                                <li
                                    key={item}
                                    className="flex gap-2.5 text-sm leading-relaxed text-fg-secondary"
                                >
                                    <span
                                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted"
                                        aria-hidden
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {project.engineeringFocus &&
                    project.engineeringFocus.length > 0 && (
                        <div className="mt-5">
                            <p className="text-xs font-semibold text-fg-muted">
                                Engineering focus
                            </p>
                            <p className="mt-2 text-sm text-fg-secondary">
                                {project.engineeringFocus
                                    .slice(0, 4)
                                    .join(" · ")}
                            </p>
                        </div>
                    )}

                {(project.role || project.duration) && (
                    <p className="mt-5 text-sm text-fg-muted">
                        {[project.role, project.duration]
                            .filter(Boolean)
                            .join(" · ")}
                    </p>
                )}

                <ul
                    className="mt-5 flex flex-wrap gap-2"
                    aria-label={`${shortTitle} technologies`}
                >
                    {project.technologies.slice(0, 5).map((tech) => (
                        <li
                            key={tech}
                            className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-fg-secondary"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>

                {project.confidential && (
                    <p className="mt-5 text-sm italic text-fg-muted">
                        Project details and source code are private due to
                        company confidentiality.
                    </p>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-5">
                    <TextLink href={`/projects/${project.slug}`}>
                        View case study: {shortTitle}
                    </TextLink>
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg-secondary transition-colors hover:text-fg"
                            aria-label={`View ${shortTitle} on GitHub (opens in a new tab)`}
                        >
                            <GithubIcon size={15} brand={false} />
                            GitHub
                            <ExternalLink size={12} aria-hidden />
                        </a>
                    )}
                    {isLive && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg-secondary transition-colors hover:text-fg"
                            aria-label={`Open ${shortTitle} live site (opens in a new tab)`}
                        >
                            Live site
                            <ExternalLink size={12} aria-hidden />
                        </a>
                    )}
                </div>
            </div>

            {hasPreview && (
                <div className={reverse ? "lg:order-1" : undefined}>
                    <ProjectPreviewPanel
                        preview={preview}
                        className="transition-all duration-300 group-hover:border-brand/30 group-hover:shadow-lg group-hover:shadow-black/5"
                    />
                </div>
            )}
        </article>
    )
}
