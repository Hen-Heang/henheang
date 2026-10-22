import Link from "next/link"
import { labJourney } from "@/data/lab/devops/labs"
import type { Lab } from "@/src/lib/types/devops-lab"
import { DiagramViewer } from "@/src/components/lab/devops/DiagramViewer"
import { Callout } from "@/src/components/ai-engineering/Callout"
import { LabStepsProgress } from "@/src/components/lab/devops/LabStepsProgress"

export function LabDetail({ lab }: { lab: Lab }) {
    const position = labJourney.findIndex((item) => item.slug === lab.slug)
    const previous = labJourney[position - 1]
    const next = labJourney[position + 1]
    return (
        <div>
            <h2
                id="prerequisites"
                className="mb-3 scroll-mt-24 text-xl font-bold text-fg"
            >
                Prerequisites
            </h2>
            <ul className="mb-8 list-disc space-y-1.5 pl-5 text-[17px] leading-[1.8] text-fg-secondary">
                {lab.prerequisites.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>

            {lab.setup && (
                <section
                    className="mb-8 space-y-3"
                    aria-label="Before you start"
                >
                    <h2 className="text-xl font-bold text-fg">
                        Before you start
                    </h2>
                    {lab.setup.map((item) => (
                        <Callout
                            key={item.title}
                            variant="tip"
                            title={item.title}
                            text={item.description ?? ""}
                        />
                    ))}
                </section>
            )}

            <h2
                id="architecture"
                className="mb-3 scroll-mt-24 text-xl font-bold text-fg"
            >
                Architecture
            </h2>
            <DiagramViewer diagram={lab.architecture} />

            <div id="steps" className="mt-8 scroll-mt-24">
                <LabStepsProgress labSlug={lab.slug} steps={lab.steps} />
            </div>

            <h2
                id="expected-result"
                className="mb-3 mt-8 scroll-mt-24 text-xl font-bold text-fg"
            >
                Expected result
            </h2>
            <Callout
                variant="best-practice"
                title="What success looks like"
                text={lab.expectedResult}
            />

            {lab.troubleshooting && (
                <section
                    id="troubleshooting"
                    className="mt-8 scroll-mt-24 space-y-3"
                    aria-labelledby="troubleshooting-heading"
                >
                    <h2
                        id="troubleshooting-heading"
                        className="text-xl font-bold text-fg"
                    >
                        Troubleshooting
                    </h2>
                    {lab.troubleshooting.map((item) => (
                        <Callout
                            key={item.symptom}
                            variant="tip"
                            title={item.symptom}
                            text={item.fix}
                        />
                    ))}
                </section>
            )}

            <h2
                id="lessons-learned"
                className="mb-3 mt-8 scroll-mt-24 text-xl font-bold text-fg"
            >
                Lessons learned
            </h2>
            <div className="space-y-3">
                {lab.lessonsLearned.map((lesson, i) => (
                    <Callout key={i} variant="tip" text={lesson} />
                ))}
            </div>
            <section className="mt-8 rounded-2xl border border-border bg-surface p-5">
                <h2 className="text-xl font-bold text-fg">
                    Keep your evidence
                </h2>
                <p className="mt-2 text-base leading-relaxed text-fg-secondary">
                    Save your source commit, verification output, and one
                    engineering decision in your project README. Record measured
                    results and any failure you reproduced. Checklist completion
                    is self-reported; it does not automatically validate your
                    system.
                </p>
            </section>
            <nav
                aria-label="Lab journey"
                className="mt-8 grid gap-3 sm:grid-cols-2"
            >
                {previous && (
                    <Link
                        className="min-h-11 rounded-xl border border-border p-4 text-brand hover:underline"
                        href={`/lab/devops/labs/${previous.slug}`}
                    >
                        Previous lab: {previous.title}
                    </Link>
                )}
                {next ? (
                    <Link
                        className="min-h-11 rounded-xl border border-brand/40 p-4 text-brand hover:underline"
                        href={`/lab/devops/labs/${next.slug}`}
                    >
                        Next lab: {next.title}
                    </Link>
                ) : (
                    <Link
                        className="min-h-11 rounded-xl border border-border p-4 text-brand hover:underline"
                        href="/lab/progress"
                    >
                        Review your progress
                    </Link>
                )}
            </nav>
        </div>
    )
}
