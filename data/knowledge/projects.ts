import { projects as staticProjects } from "@/data/projects"
import type { Project } from "@/src/lib/types"
import type { KnowledgeSection } from "./types"

/**
 * One section per project plus a catalog summary. Each project section
 * carries its technologies as keywords so questions like "which projects use
 * Spring Boot?" retrieve exactly the right sections.
 *
 * Exposed as a builder so the live knowledge layer (src/lib/ai/live-knowledge)
 * can rebuild these sections from Supabase rows; the static export below is
 * the fallback when the database is unavailable. DB rows only cover a subset
 * of the case-study fields, so every rich field is optional here.
 */
export function buildProjectsKnowledge(allProjects: Project[]): KnowledgeSection[] {
    // Hidden projects are unlisted on the site (see getProjects in
    // src/lib/db/portfolio.ts), so the assistant must not surface them either —
    // not as a section, and not in the catalog below.
    const projects = allProjects.filter((project) => !project.hidden)
    const projectSections: KnowledgeSection[] = projects.map((project) => ({
        id: `project-${project.slug}`,
        category: "projects",
        title: project.title,
        projectSlug: project.slug,
        sourceLabel: `${project.title} case study`,
        sourceUrl: `https://henheang.site/projects/${project.slug}`,
        updatedAt: project.updatedAt,
        keywords: [
            project.slug,
            ...project.slug.split("-"),
            ...project.title.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean),
            ...project.technologies.map((t) => t.toLowerCase()),
            "project", "portfolio", "built", "side project",
            ...(project.featured ? ["featured", "latest", "recent", "best"] : []),
            ...(project.ownership ? [project.ownership.toLowerCase()] : []),
        ],
        content: [
            `### ${project.title}`,
            project.featured ? "(Featured project)" : "",
            [
                project.ownership ? `Type: ${project.ownership}` : "",
                project.role ? `Role: ${project.role}` : "",
                project.duration ?? "",
                project.teamSize ? `Team: ${project.teamSize}` : "",
            ]
                .filter(Boolean)
                .join(" · "),
            "",
            project.description,
            "",
            project.businessProblem ? `**Problem:** ${project.businessProblem}` : "",
            "",
            project.overview ? `**Overview:** ${project.overview}` : "",
            "",
            ...(project.features?.length ? ["**Key features:**", ...project.features.map((f) => `- ${f}`)] : []),
            "",
            project.technicalDetails ? `**Technical details:** ${project.technicalDetails}` : "",
            "",
            project.architecture?.length
                ? `**Architecture:** ${project.architecture.join(" · ")}. ${project.architectureNote ?? ""}`
                : "",
            "",
            ...(project.challenges?.length
                ? [
                    "**Challenges and solutions:**",
                    ...project.challenges.map(
                        (challenge, i) => `- Challenge: ${challenge}\n  Solution: ${project.solutions?.[i] ?? "—"}`,
                    ),
                ]
                : []),
            "",
            ...(project.lessonsLearned?.length
                ? ["**Lessons learned:**", ...project.lessonsLearned.map((l) => `- ${l}`)]
                : []),
            "",
            `Technologies: ${project.technologies.join(", ")}`,
            project.confidential
                ? "This is confidential professional work — source code and a live demo aren't shareable, but the responsibilities and technologies above are accurate."
                : "",
            !project.confidential && project.github ? `GitHub: ${project.github}` : "",
            !project.confidential && project.demo && project.demo !== "#" ? `Live demo: ${project.demo}` : "",
            `Project page: https://henheang.site/projects/${project.slug}`,
        ]
            .filter((line) => line !== "")
            .join("\n"),
    }))

    const catalogSection: KnowledgeSection = {
        id: "projects-catalog",
        category: "projects",
        title: "All projects at a glance",
        keywords: [
            "projects", "project", "portfolio", "built", "list", "all", "latest",
            "recent", "showcase", "work", "github", "side",
        ],
        sourceLabel: "Projects page",
        sourceUrl: "https://henheang.site/projects",
        content: projects
            .map(
                (p) =>
                    `- **${p.title}**${p.featured ? " (featured)" : ""}${p.ownership ? ` (${p.ownership})` : ""} — ${p.description} [${p.technologies.join(", ")}] → https://henheang.site/projects/${p.slug}`,
            )
            .join("\n"),
    }

    return [catalogSection, ...projectSections]
}

export const projectsKnowledge: KnowledgeSection[] = buildProjectsKnowledge(staticProjects)
