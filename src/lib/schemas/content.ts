import { z } from "zod"

// ---------------------------------------------------------------------------
// Shared building blocks
// ---------------------------------------------------------------------------

export const ApiEndpointSchema = z.object({
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    path: z.string().min(1),
    description: z.string(),
})

export const ProcessStepSchema = z.object({
    phase: z.string().min(1),
    detail: z.string(),
})

export const SocialLinksSchema = z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    telegram: z.string().url().optional(),
    x: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
})

// ---------------------------------------------------------------------------
// Project (matches src/lib/types/index.ts `Project`)
// ---------------------------------------------------------------------------

export const ProjectSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string(),
    technologies: z.array(z.string()),
    image: z.string(),
    imageFit: z.enum(["cover", "contain"]).optional(),
    github: z.string().url().optional(),
    demo: z.string().optional(),
    featured: z.boolean().optional(),
    hidden: z.boolean().optional(),
    previewImage: z.boolean().optional(),
    category: z.enum(["Backend API", "Full-Stack Application", "Enterprise System", "Frontend Application"]).optional(),
    ownership: z.enum(["Personal Project", "Team Project", "Professional Work", "Learning Lab"]).optional(),
    engineeringFocus: z.array(z.string()).optional(),
    confidential: z.boolean().optional(),
    businessProblem: z.string().optional(),
    overview: z.string().optional(),
    process: z.array(ProcessStepSchema).optional(),
    features: z.array(z.string()).optional(),
    technicalDetails: z.string().optional(),
    architecture: z.array(z.string()).optional(),
    architectureNote: z.string().optional(),
    dataModel: z.array(z.string()).optional(),
    apiEndpoints: z.array(ApiEndpointSchema).optional(),
    verification: z.object({
        description: z.string().min(1),
        href: z.string().url().startsWith("https://"),
    }).optional(),
    challenges: z.array(z.string()).optional(),
    solutions: z.array(z.string()).optional(),
    lessonsLearned: z.array(z.string()).optional(),
    screenshots: z.array(z.string()).optional(),
    role: z.string().optional(),
    duration: z.string().optional(),
    teamSize: z.string().optional(),
    updatedAt: z.string().optional(),
})
export type ProjectParsed = z.infer<typeof ProjectSchema>

// ---------------------------------------------------------------------------
// Skills / Experience / Education / Achievements
// (match src/lib/types/index.ts and data/achievements.ts)
// ---------------------------------------------------------------------------

export const SkillItemSchema = z.object({
    name: z.string().min(1),
    level: z.number(),
    experience: z.string(),
})

export const SkillCategorySchema = z.object({
    category: z.string().min(1),
    items: z.array(SkillItemSchema),
})

export const ExperienceItemSchema = z.object({
    role: z.string().min(1),
    company: z.string().min(1),
    period: z.string(),
    location: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).optional(),
    stack: z.array(z.string()).optional(),
})

export const EducationItemSchema = z.object({
    period: z.string(),
    title: z.string().min(1),
    institution: z.string().min(1),
    description: z.string(),
})

export const AchievementSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    issuer: z.string(),
    date: z.string(),
    type: z.enum(["certificate", "graduation", "award"]),
    description: z.string().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
})

// ---------------------------------------------------------------------------
// Site content: profile / cv
// (match data/profile.ts, data/cv-data.ts)
// ---------------------------------------------------------------------------

export const ProfileContentSchema = z.object({
    name: z.string().min(1),
    fullName: z.string().min(1),
    koreanName: z.string().optional(),
    title: z.string().min(1),
    company: z.string().optional(),
    location: z.string().min(1),
    locationEmoji: z.string().optional(),
    email: z.string().email(),
    available: z.boolean().optional(),
    yearsExperience: z.string(),
    // Optional for backward compatibility with existing admin-managed rows.
    // The homepage falls back to data/profile.ts until those rows are resaved.
    heroValueProposition: z.string().min(1).optional(),
    heroBio: z.string().min(1).optional(),
    bio: z.string(),
    description: z.string(),
    profileImage: z.string(),
    myImage: z.string(),
    socialLinks: SocialLinksSchema,
    portfolioUrl: z.string().url(),
    cvUrl: z.string().url().optional(),
    phone: z.string().optional(),
    ides: z.array(z.string()).optional(),
    linkedinCoreSkills: z.array(z.string()),
    knowsAbout: z.array(z.string()).optional(),
    rotatingRoles: z.array(z.string()).min(1),
    languages: z.array(z.object({ name: z.string(), level: z.string() })).optional(),
    heroTechStack: z.array(z.object({ name: z.string(), color: z.string().optional(), icon: z.string().optional() })),
})
export type ProfileContentParsed = z.infer<typeof ProfileContentSchema>


const CvExperienceSchema = z.object({
    company: z.string().min(1),
    title: z.string().min(1),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    current: z.boolean().optional(),
    bullets: z.array(z.string()),
    stack: z.array(z.string()).optional(),
})

const CvEducationSchema = z.object({
    school: z.string().min(1),
    degree: z.string().min(1),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string().optional(),
})

const CvProjectSchema = z.object({
    name: z.string().min(1),
    category: z.string().optional(),
    description: z.string(),
    bullets: z.array(z.string()).optional(),
    technologies: z.array(z.string()),
    github: z.string().nullable().optional(),
    live: z.string().nullable().optional(),
    caseStudy: z.string().nullable().optional(),
    featured: z.boolean().optional(),
})

export const CvContentSchema = z.object({
    personal: z.object({
        name: z.string().min(1),
        title: z.string().min(1),
        subtitle: z.string().optional(),
        photo: z.string().optional(),
        location: z.string(),
        // TODO: verify this phone number — see TODO in data/profile.ts.
        phone: z.string().optional(),
        email: z.string().email(),
        linkedin: z.string().url().optional(),
        github: z.string().url().optional(),
        portfolio: z.string().url().optional(),
    }),
    summary: z.string(),
    experience: z.array(CvExperienceSchema),
    education: z.array(CvEducationSchema),
    skills: z.array(SkillCategorySchema.extend({ items: z.array(z.string()) })),
    projects: z.array(CvProjectSchema),
    // Text-based proficiency only — no percentages/progress bars on recruiter-facing pages.
    languages: z.array(z.object({ name: z.string(), level: z.string() })),
})
export type CvContentParsed = z.infer<typeof CvContentSchema>

// ---------------------------------------------------------------------------
// Keyed map used by `getSiteContent`/`SiteContentEditor`
// ---------------------------------------------------------------------------

export const SiteContentSchemas = {
    profile: ProfileContentSchema,
    cv: CvContentSchema,
} as const

export type SiteContentKey = keyof typeof SiteContentSchemas
