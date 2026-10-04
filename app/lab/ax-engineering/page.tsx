import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookMarked, BookOpenText } from "lucide-react"
import { profileData } from "@/data/profile"
import {
    axConcepts,
    axLabs,
    axMentalModel,
    axRoadmap,
    axSources,
    axWorkflow,
} from "@/data/lab/ax-engineering"
import { AXArchitecture } from "@/src/components/lab/ax-engineering/AXArchitecture"
import {
    AXConceptGuide,
    AXLabs,
    AXReferences,
    AXRoadmap,
} from "@/src/components/lab/ax-engineering/AXCurriculum"
import { AXWorkflow } from "@/src/components/lab/ax-engineering/AXWorkflow"
import { AXJourneyMap } from "@/src/components/lab/ax-engineering/AXJourneyMap"
import { AXHarnessShowcase } from "@/src/components/lab/ax-engineering/AXHarnessShowcase"
import { ArchitectureDiagram } from "@/src/components/lab/ui/ArchitectureDiagram"
import { LabHeroBackdrop } from "@/src/components/lab/ui/LabHeroBackdrop"
import { LabNav } from "@/src/components/lab/ui/LabNav"
import { LabPathHeader } from "@/src/components/lab/ui/LabPathHeader"
import { Reveal } from "@/src/components/lab/ui/Reveal"

export const metadata: Metadata = {
    title: "AX Engineering Learning Path — Engineering Lab",
    description:
        "A structured learning path for reliable human + AI development workflows, agent harness concepts, MCP, guardrails, verification, evaluations, and handoff.",
    alternates: { canonical: `${profileData.portfolioUrl}/lab/ax-engineering` },
    openGraph: {
        title: "AX Engineering Learning Path | Hen Heang",
        description:
            "Learning and experimenting with the systems around reliable AI-assisted software development.",
        url: `${profileData.portfolioUrl}/lab/ax-engineering`,
        type: "website",
    },
}

export default function AXEngineeringPage() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
            <LabNav active="ax" />
            <LabHeroBackdrop
                terms={axConcepts.map((concept) => concept.name)}
                className="mb-8"
            >
                <LabPathHeader
                    label="AX Engineering"
                    title="Engineering reliable human + AI development workflows."
                    description="The concepts behind AI-assisted development: context, instructions, skills, agents, tools, MCP, guardrails, verification, evaluations, and feedback. For the tool-by-tool commands and configuration, read the Agent Coding Handbook."
                    accent="warning"
                    bare
                >
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-warning">
                            Learning / Experimenting
                        </span>
                        <Link
                            href="/lab/handbook"
                            className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface/80 px-4 py-2.5 text-sm font-semibold text-fg backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-brand"
                        >
                            <BookMarked size={15} aria-hidden="true" /> Agent
                            Coding Handbook{" "}
                            <ArrowRight
                                size={13}
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </Link>
                        <Link
                            href="/ai-engineering"
                            className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface/80 px-4 py-2.5 text-sm font-semibold text-fg backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-brand"
                        >
                            <BookOpenText size={15} aria-hidden="true" /> AI
                            Engineering Library{" "}
                            <ArrowRight
                                size={13}
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>
                </LabPathHeader>
            </LabHeroBackdrop>

            <AXJourneyMap />

            <AXHarnessShowcase />

            <section
                id="roadmap-poster"
                className="mb-12 scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-surface"
                aria-labelledby="roadmap-poster-heading"
            >
                <div className="px-4 py-3 sm:px-5">
                    <h2
                        id="roadmap-poster-heading"
                        className="text-sm font-semibold text-fg"
                    >
                        Modern Software Engineer roadmap poster
                    </h2>
                    <p className="mt-0.5 text-xs text-fg-muted">
                        Visual overview · the responsive learning path continues
                        below
                    </p>
                </div>
                <figure className="border-t border-border p-3 sm:p-5">
                    <a
                        href="/RoadMap.png"
                        target="_blank"
                        rel="noreferrer"
                        className="block overflow-hidden rounded-xl border border-border bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                        aria-label="Open the roadmap poster at full size in a new tab"
                    >
                        <Image
                            src="/RoadMap.png"
                            alt="Modern Software Engineer roadmap showing six stages from fundamentals through long-term improvement"
                            width={1675}
                            height={909}
                            sizes="(min-width: 1280px) 1088px, calc(100vw - 3rem)"
                            className="h-auto w-full"
                            priority
                        />
                    </a>
                    <figcaption className="mt-3 text-xs leading-5 text-fg-muted">
                        The poster provides the big picture. The semantic flows,
                        modules, and labs below remain the accessible source of
                        detail on smaller screens.
                    </figcaption>
                </figure>
            </section>

            <section
                id="mental-model"
                className="mb-12 scroll-mt-24"
                aria-labelledby="mental-model-heading"
            >
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                    Core mental model
                </p>
                <h2
                    id="mental-model-heading"
                    className="mt-1.5 text-[26px] font-bold leading-[1.15] tracking-tight text-fg md:text-[32px]"
                >
                    Reasoning needs an operating environment
                </h2>
                <ArchitectureDiagram
                    title="Human-guided agent development loop"
                    steps={axMentalModel.map((label) => ({ label }))}
                />
                <blockquote className="rounded-2xl border-l-4 border-brand bg-brand/5 px-5 py-4 text-base leading-7 text-fg-secondary">
                    The model provides reasoning. The harness provides the
                    operating system around that reasoning: context, tools,
                    permissions, workflow, verification, and state.
                </blockquote>
            </section>

            {/* Each block fades up once as it enters view. Wrapping the
                sections rather than every card keeps the observer count low
                and avoids a popcorn effect on the dense grids inside. */}
            <Reveal>
                <AXArchitecture />
            </Reveal>
            <Reveal>
                <AXWorkflow steps={axWorkflow} />
            </Reveal>
            <Reveal>
                <AXRoadmap modules={axRoadmap} />
            </Reveal>
            <Reveal>
                <AXConceptGuide concepts={axConcepts} />
            </Reveal>
            <Reveal>
                <AXLabs labs={axLabs} />
            </Reveal>
            <Reveal>
                <AXReferences sources={axSources} />
            </Reveal>
        </div>
    )
}
