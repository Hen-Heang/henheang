import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { getBackendSummaries } from "@/src/lib/backend/catalog"
import { roadmap as devopsRoadmap } from "@/data/lab/devops/roadmap"
import { labs as devopsLabs } from "@/data/lab/devops/labs"
import { LabNav } from "@/src/components/lab/ui/LabNav"
import { ProgressBackup } from "@/src/components/lab/progress/ProgressBackup"
import { LabProgressClient } from "@/src/components/lab/progress/LabProgressClient"

export const metadata: Metadata = {
    title: "Your Progress — Engineering Lab",
    description:
        "Your local learning progress across the Engineering Lab — stored only in your browser.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/progress` },
    robots: { index: false },
}

export default function LabProgressPage() {
    const backendItems = getBackendSummaries()

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-10">
            <LabNav active="progress" />
            <div className="mb-6">
                <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                    Progress
                </span>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-fg md:text-4xl">
                    Your learning progress
                </h1>
                <p className="mt-2 max-w-xl text-base leading-6 text-fg-secondary">
                    Stored only in your browser — nothing here is sent anywhere.
                    Clearing your browser data clears this too.
                </p>
            </div>
            <ProgressBackup />
            <LabProgressClient
                backendItems={backendItems}
                devopsTopics={devopsRoadmap}
                devopsLabs={devopsLabs}
            />
        </div>
    )
}
