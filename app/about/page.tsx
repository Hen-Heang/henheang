import type { Metadata } from "next"
import { getEducation, getExperience, getAchievements, getProjects, getSiteContent } from "@/src/lib/db/portfolio"
import { profileData } from "@/data/profile"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { AboutIntro } from "@/src/components/about/AboutIntro"
import { AboutTimeline } from "@/src/components/about/AboutTimeline"
import { AboutCommunity } from "@/src/components/about/AboutCommunity"
import { communityActivities } from "@/data/community"
import { TechnicalCapabilities } from "@/src/components/capabilities/TechnicalCapabilities"
import { ContactCTASection } from "@/src/components/home/ContactCTASection"
import { positioning } from "@/src/lib/content/positioning"

// Re-render at most once a minute so admin edits show up without a redeploy
export const revalidate = 60

const title = "About"
const description = `${profileData.fullName} — ${positioning.headline}. ${positioning.description}`

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${profileData.portfolioUrl}/about`,
    },
    openGraph: {
        title: `About ${profileData.fullName} | ${positioning.headline}`,
        description,
        url: `${profileData.portfolioUrl}/about`,
    },
}

export default async function AboutPage() {
    const [profile, education, experience, achievements, projects] = await Promise.all([
        getSiteContent("profile"),
        getEducation(),
        getExperience(),
        getAchievements(),
        getProjects(),
    ])

    // Philosophy ("Clean Code / Problem Solving / Collaboration / Growth
    // Mindset") and AboutCurrentWork were generic and restated the About
    // narrative and the Engineering Lab respectively — both removed.
    return (
        <PageLayout>
            <AboutIntro profile={profile} />
            <AboutTimeline experience={experience} education={education} achievements={achievements} />
            <AboutCommunity activities={communityActivities} />
            <TechnicalCapabilities projects={projects} experience={experience} variant="surface" />
            <ContactCTASection />
        </PageLayout>
    )
}
