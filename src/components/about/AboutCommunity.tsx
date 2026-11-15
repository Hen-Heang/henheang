import React from "react"
import { MapPin, Users } from "lucide-react"
import { Section } from "@/src/components/system/Section"
import { Reveal } from "@/src/components/system/Reveal"
import { StatusBadge } from "@/src/components/system/StatusBadge"
import type { CommunityActivity } from "@/data/community"

/**
 * Community & knowledge sharing — volunteer work kept separate from the
 * professional timeline so it is never read as employment.
 */
export function AboutCommunity({ activities }: { activities: CommunityActivity[] }) {
    if (activities.length === 0) return null

    return (
        <Section
            id="community"
            eyebrow="Community"
            title="Community & knowledge sharing"
            description="Volunteer sessions where I share practical AI skills with my community."
            layout="split"
        >
            <div className="space-y-6">
                {activities.map((activity, index) => (
                    <Reveal key={activity.title} delay={index * 0.05}>
                        <article className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand">
                                    {activity.role}
                                </p>
                                <StatusBadge status={activity.status === "completed" ? "archived" : "wip"}>
                                    {activity.status === "completed" ? "Completed" : "Planned"}
                                </StatusBadge>
                            </div>
                            <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                                {activity.title}
                            </h3>

                            <dl className="mt-4 space-y-2 text-sm text-fg-secondary">
                                <div className="flex items-start gap-2">
                                    <dt className="mt-0.5 shrink-0 text-fg-muted">
                                        <Users size={15} aria-hidden />
                                        <span className="sr-only">Audience</span>
                                    </dt>
                                    <dd>{activity.audience}</dd>
                                </div>
                                <div className="flex items-start gap-2">
                                    <dt className="mt-0.5 shrink-0 text-fg-muted">
                                        <MapPin size={15} aria-hidden />
                                        <span className="sr-only">Location</span>
                                    </dt>
                                    <dd>{activity.location}</dd>
                                </div>
                            </dl>

                            <h4 className="mt-6 text-sm font-semibold text-fg">
                                {activity.status === "completed" ? "Topics covered" : "Planned topics"}
                            </h4>
                            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-fg-secondary">
                                {activity.focus.map((topic) => (
                                    <li key={topic} className="flex gap-2">
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </Reveal>
                ))}
            </div>
        </Section>
    )
}
