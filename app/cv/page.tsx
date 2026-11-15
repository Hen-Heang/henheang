import type { Metadata } from "next"
import { CVPage } from "@/src/components/cv/CVPage"
import { getSiteContent } from "@/src/lib/db/portfolio"
import { profileData } from "@/data/profile"
import { positioning } from "@/src/lib/content/positioning"

// Re-render at most once a minute so admin edits show up without a redeploy
export const revalidate = 60

export const metadata: Metadata = {
    // Absolute: the root "%s | Hen Heang" template would repeat the name.
    title: { absolute: `CV — ${profileData.fullName} | ${positioning.headline}` },
    description: `Professional CV of ${profileData.fullName} — ${positioning.headline}. Java, Spring Boot, MyBatis, PostgreSQL, Oracle, REST APIs, and AI-assisted development.`,
    alternates: {
        canonical: `${profileData.portfolioUrl}/cv`,
    },
    openGraph: {
        title: "CV — Hen Heang",
        description: `${positioning.headline} · Java · Spring Boot · PostgreSQL · Oracle`,
        type: "profile",
    },
}

export default async function CVRoute() {
    const cv = await getSiteContent("cv")
    return <CVPage cv={cv} />
}
