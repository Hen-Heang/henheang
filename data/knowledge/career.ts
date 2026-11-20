import { profileData } from "@/data/profile"
import { communityActivities } from "@/data/community"
import type { ProfileContentParsed } from "@/src/lib/schemas/content"
import type { KnowledgeSection } from "./types"

/**
 * The Cambodia-to-Korea career narrative and the confidential-work framing.
 * Synthesizes facts already present in data/experience.ts and data/education.ts
 * (see the "experience" category sections) into the trajectory recruiters ask
 * about — it must never introduce a fact that isn't already backed there.
 */
export function buildCareerKnowledge(profile: ProfileContentParsed): KnowledgeSection[] {
    return [
        {
            id: "career-journey",
            category: "career",
            title: "Career journey — Cambodia to South Korea",
            keywords: ["journey", "career journey", "career path", "story", "timeline", "cambodia", "korea", "move", "moved", "relocated", "background", "how did he start", "rupp", "hrd"],
            sourceLabel: "About page — career timeline",
            sourceUrl: `${profile.portfolioUrl}/about`,
            content: [
                `${profile.fullName} started in Cambodia: a Computer Science degree at the Royal University of Phnom Penh (2020–2024), alongside hands-on training at the Korea Software HRD Center (full-stack development, then Android/mobile) and an earlier C++ fundamentals course.`,
                "",
                "That training led directly to his first professional role — Software Engineer at KOSIGN (Korea Software Innovation Global Network) in Phnom Penh, Cambodia, from January 2024, building a B2B billing and payment platform with Spring Boot, MyBatis, and PostgreSQL while collaborating daily with Korean development teams.",
                "",
                "In October 2025 he moved to Seoul, South Korea, to work directly in the Korean enterprise sector — his current role as a Software Engineer – Backend & AI-Assisted Development at Bizplay (Webcash Group), maintaining and developing enterprise financial applications for government and corporate clients on Java, MyBatis, and Oracle, and using AI coding assistants for code analysis, troubleshooting, and review preparation.",
                "",
                "Throughout, his career direction has stayed backend-first: each step (Cambodia training → KOSIGN → Bizplay) deepened Java, Spring Boot/MyBatis, and relational databases. He now pairs that foundation with AI-assisted development in day-to-day work, and is learning Agent Harness, MCP, evaluations, DevOps, and system architecture through structured labs—adding to the backend foundation, not replacing it.",
            ].join("\n"),
        },
        {
            id: "career-confidential-work",
            category: "career",
            title: "Confidential professional work",
            keywords: ["confidential", "nda", "can't share", "cannot share", "source code", "company code", "screenshots", "proprietary", "private", "internal", "bizplay project", "kosign project", "employer work"],
            content: ["Heang's employer work at Bizplay and KOSIGN involves proprietary business systems — the source code, internal URLs, customer data, and production details belong to those companies and aren't shareable, the same way any employee's day job code isn't public.", "", "What can be discussed instead: his responsibilities and the technologies used — Java, MyBatis, Spring Boot, Spring Security/JWT, PostgreSQL, Oracle, SQL query design and optimization, and enterprise frontend work with JavaScript/jQuery — plus the general shape of the systems (government-facing financial web applications at Bizplay; a B2B billing platform integrated with banking systems at KOSIGN). For code-level detail, his personal projects (H-Phsar, AuthHub, and H-Space, which now includes the former Luyra finance app) are fully public on GitHub and cover the same stack."].join("\n"),
        },
        {
            id: "career-community",
            category: "career",
            title: "Community & volunteering",
            keywords: ["community", "volunteer", "volunteering", "workshop", "speaker", "talk", "teaching", "ai literacy", "cambodian community", "knowledge sharing", "siheung"],
            sourceLabel: "About page — Community",
            sourceUrl: `${profile.portfolioUrl}/about#community`,
            // Only facts recorded in data/community.ts — no organizer, date, or attendance figures exist, so none may be stated.
            content: communityActivities
                .map((a) => `- ${a.role}, "${a.title}" (${a.status === "completed" ? "completed" : "planned, not yet held"}) — for ${a.audience}, in ${a.location}. Topics: ${a.focus.join("; ")}.`)
                .join("\n"),
        },
    ]
}

/** Static fallback, used when Supabase is unavailable. */
export const careerKnowledge: KnowledgeSection[] = buildCareerKnowledge(profileData)
