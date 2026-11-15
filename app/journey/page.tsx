import type { Metadata } from "next"
import { progressItems } from "@/data/progress"
import { PageLayout } from "@/src/components/layout/PageLayout"
import { JourneyProgress } from "@/src/components/journey/JourneyProgress"
import { Container } from "@/src/components/system/Container"
import { Eyebrow } from "@/src/components/system/Eyebrow"
import { SectionHeading } from "@/src/components/system/SectionHeading"

export const metadata: Metadata = {
    title: "What I’m Working On",
    description: "Hen Heang’s current backend engineering, DevOps, AX Engineering, Korean communication, and active project milestones.",
    alternates: { canonical: "/journey" },
    openGraph: {
        title: "What I’m Working On — Hen Heang",
        description: "A milestone-based view of current engineering work, learning, and active projects.",
        type: "website",
    },
}

function formatUpdatedAt(value: string): string {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${value}T00:00:00Z`))
}

export default function JourneyPage() {
    const latestUpdate = progressItems.reduce((latest, item) => (item.updatedAt > latest ? item.updatedAt : latest), progressItems[0].updatedAt)

    return (
        <PageLayout>
            <section className="border-b border-border py-20 sm:py-24 lg:py-28">
                <Container>
                    <div className="max-w-3xl">
                        <Eyebrow className="mb-5">Now / Journey</Eyebrow>
                        <SectionHeading as="h1" size="display">
                            What I’m working on
                        </SectionHeading>
                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-secondary sm:text-lg">A public snapshot of the backend skills I’m deepening, the systems I’m building, and the evidence guiding my growth as a backend-focused software engineer.</p>
                        <time dateTime={latestUpdate} className="mt-6 block font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">
                            Last updated {formatUpdatedAt(latestUpdate)}
                        </time>
                    </div>
                </Container>
            </section>

            <JourneyProgress />
        </PageLayout>
    )
}
