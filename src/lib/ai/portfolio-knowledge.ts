import "server-only"

import { profileData } from "@/data/profile"
import { projects as allProjects } from "@/data/projects"
import { experiences } from "@/data/experience"
import { education } from "@/data/education"
import { skills } from "@/data/skills-taxonomy"
import type { Skill, SkillCategory, SkillStatus } from "@/data/skills-taxonomy"
import type { EducationItem, ExperienceItem, Project } from "@/src/lib/types"

/**
 * Static portfolio data access layer, shared by the website UI and the AI
 * assistant's tools (src/lib/ai/tools.ts). Deliberately reads only the
 * static data/*.ts files — not the Supabase-backed live layer used by
 * src/lib/ai/live-knowledge.ts — so this stays the simple, synchronous
 * source of truth described in the architecture: data files ->
 * portfolio-knowledge -> AI tools -> assistant. No embeddings, no vector
 * search, no second database.
 */

// Hidden projects are unlisted on the site, so the assistant's tools must not
// return them either — searchProjects, getProject, and skill evidence all read
// through this list.
const projects: Project[] = allProjects.filter((project) => !project.hidden)

export function getProfile() {
    return profileData
}

export function getSkills(): Skill[] {
    return skills
}

export function getSkillsByCategory(category: SkillCategory): Skill[] {
    return skills.filter((skill) => skill.category === category)
}

export function getSkillsByStatus(status: SkillStatus): Skill[] {
    return skills.filter((skill) => skill.status === status)
}

export function getProjects(): Project[] {
    return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug)
}

/** Projects that are meaningful evidence for a given skill id — driven by the curated `Project.skills` field, never fuzzy-matched. */
export function findProjectsBySkill(skillId: string): Project[] {
    return projects.filter((project) => project.skills?.includes(skillId))
}

export function getExperience(): ExperienceItem[] {
    return experiences
}

export function getEducation(): EducationItem[] {
    return education
}
