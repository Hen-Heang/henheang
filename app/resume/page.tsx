import type { Metadata } from "next"
import { ResumePage } from "@/src/components/resume/ResumePage"
import { getSiteContent } from "@/src/lib/db/portfolio"
import { profileData } from "@/data/profile"
import { positioning } from "@/src/lib/content/positioning"

// Re-render at most once a minute so admin edits show up without a redeploy
export const revalidate = 60

export const metadata: Metadata = {
    // Absolute: the root "%s | Hen Heang" template would repeat the name.
    title: { absolute: `Resume — ${profileData.fullName} | ${positioning.headline}` },
    description: `ATS-friendly resume of ${profileData.fullName} — ${positioning.headline}. Java, Spring Boot, MyBatis, PostgreSQL, Oracle, REST APIs, and AI-assisted development.`,
    alternates: {
        canonical: `${profileData.portfolioUrl}/resume`,
    },
}

export default async function ResumeRoute() {
    const cv = await getSiteContent("cv")
    return <ResumePage cv={cv} />
}
