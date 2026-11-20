import React from "react"
import { Section } from "@/src/components/system/Section"
import { Reveal } from "@/src/components/system/Reveal"
import { TextLink } from "@/src/components/system/TextLink"
import { positioning } from "@/src/lib/content/positioning"
import { cn } from "@/src/lib/utils/utils"

/**
 * The homepage's About section — the same canonical narrative rendered on
 * /about, so the two never diverge. Kept to the narrative only; the photo,
 * timeline, and contact facts stay on /about rather than being repeated here.
 *
 * Phones show the first paragraph only: the full narrative is identical on
 * /about, one tap away via the link below, and the home page was ~13 screens.
 */
export function AboutSummary() {
    return (
        <Section
            id="about"
            eyebrow="About"
            title="Backend engineering, built on real business problems"
            className="bg-surface"
            layout="split"
            revealHeader
        >
            <Reveal delay={0.05}>
                <div className="max-w-2xl space-y-5 lg:pt-10">
                    {positioning.about.map((paragraph, index) => (
                        <p
                            key={paragraph}
                            className={cn(
                                "text-base leading-relaxed text-fg-secondary",
                                index > 0 && "hidden sm:block",
                            )}
                        >
                            {paragraph}
                        </p>
                    ))}
                    <div className="pt-3">
                        <TextLink href="/about">
                            More about my background
                        </TextLink>
                    </div>
                </div>
            </Reveal>
        </Section>
    )
}
