import Link from "next/link"
import type { Metadata } from "next"
import { profileData } from "@/data/profile"
import { labJourney } from "@/data/lab/devops/labs"
import { LabCard } from "@/src/components/lab/devops/LabCard"
import { LabNav } from "@/src/components/lab/ui/LabNav"

export const metadata: Metadata = {
    title: "Hands-on Labs — DevOps Basics",
    description:
        "Dockerize a Spring Boot app, run a full stack with Docker Compose, configure Nginx with HTTPS, and set up a GitHub Actions pipeline.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/devops/labs` },
}

export default function LabsPage() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
            <LabNav active="practice" />
            <div className="mb-8">
                <h1 className="mb-1 text-3xl font-bold tracking-tight text-fg md:text-4xl">
                    Hands-on Labs
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-fg-secondary md:text-lg">
                    Build one system through four connected labs: containerize
                    your API, run the full stack, publish a tested image, then
                    configure HTTPS.
                </p>
            </div>
            <section
                className="mb-6 rounded-2xl border border-brand/30 bg-surface p-5"
                aria-labelledby="journey-heading"
            >
                <h2
                    id="journey-heading"
                    className="text-lg font-semibold text-fg"
                >
                    Recommended journey
                </h2>
                <p className="mt-2 text-base text-fg-secondary">
                    Use the same Spring Boot API and Next.js frontend
                    throughout. Start with lab 1; keep each result in your
                    project README.
                </p>
                <ol className="mt-4 grid gap-3 text-sm text-fg-secondary sm:grid-cols-2">
                    {labJourney.map((lab, index) => (
                        <li key={lab.slug}>
                            <Link
                                className="inline-flex min-h-11 items-center text-brand hover:underline"
                                href={`/lab/devops/labs/${lab.slug}`}
                            >
                                {index + 1}. {lab.title}
                            </Link>
                        </li>
                    ))}
                </ol>
                <p className="mt-3 text-sm text-fg-secondary">
                    Follow-up practice: server rollout, health monitoring,
                    database backup/restore, and rollback. These are not covered
                    by image publishing alone.
                </p>
            </section>
            <div className="grid gap-4 sm:grid-cols-2">
                {labJourney.map((lab) => (
                    <LabCard key={lab.slug} lab={lab} />
                ))}
            </div>
        </div>
    )
}
