import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import { profileData } from "@/data/profile"
import { labs, getLab } from "@/data/lab/devops/labs"
import { DifficultyBadge } from "@/src/components/ai-engineering/DifficultyBadge"
import { LabDetail } from "@/src/components/lab/devops/LabDetail"
import { TrackLabVisit } from "@/src/components/lab/ui/TrackLabVisit"
import { OnPageNav } from "@/src/components/lab/ui/OnPageNav"

export async function generateStaticParams() {
    return labs.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const lab = getLab(slug)
    if (!lab) return {}
    const url = `${profileData.portfolioUrl}/lab/devops/labs/${lab.slug}`
    return {
        title: `${lab.title} — Lab`,
        description: lab.description,
        alternates: { canonical: url },
        openGraph: {
            title: lab.title,
            description: lab.description,
            url,
            type: "article",
        },
    }
}

export default async function LabPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const lab = getLab(slug)
    if (!lab) notFound()

    const navSections = [
        { id: "prerequisites", title: "Prerequisites" },
        { id: "architecture", title: "Architecture" },
        ...lab.steps.map((step, i) => ({
            id: `step-${i + 1}`,
            title: `${i + 1}. ${step.title}`,
        })),
        { id: "expected-result", title: "Expected result" },
        { id: "troubleshooting", title: "Troubleshooting" },
        { id: "lessons-learned", title: "Lessons learned" },
    ]

    return (
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
            <TrackLabVisit
                itemId={`devops-lab:${lab.slug}`}
                href={`/lab/devops/labs/${lab.slug}`}
                title={lab.title}
                path="devops"
            />
            <Link
                href="/lab/devops/labs"
                className="mb-6 inline-flex items-center gap-1.5 text-base text-fg-muted transition-colors hover:text-fg"
            >
                <ArrowLeft size={14} aria-hidden="true" /> Hands-on labs
            </Link>
            <header className="mb-8">
                <div className="mb-3">
                    <DifficultyBadge difficulty={lab.difficulty} />
                </div>
                <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-fg md:text-4xl">
                    {lab.title}
                </h1>
                <p className="mb-4 text-base leading-relaxed text-fg-secondary md:text-lg">
                    {lab.description}
                </p>
                <span className="flex items-center gap-1 text-sm text-fg-muted">
                    <Clock size={12} aria-hidden="true" />
                    {lab.estimatedTime}
                </span>
            </header>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div className="min-w-0">
                    <LabDetail lab={lab} />
                </div>
                <aside className="order-first lg:order-last">
                    <div className="lg:sticky lg:top-20">
                        <OnPageNav sections={navSections} />
                    </div>
                </aside>
            </div>
        </div>
    )
}
