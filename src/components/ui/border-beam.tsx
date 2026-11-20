"use client"

import type { CSSProperties } from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/src/lib/utils/utils"

interface BorderBeamProps {
    className?: string
    size?: number
    duration?: number
    delay?: number
    colorFrom?: string
    colorTo?: string
}

/**
 * A thin light beam that travels around a card's border to mark it as the
 * single active/featured item in view. It uses the same lightweight
 * `offset-path` technique as the Magic UI pattern with local brand tokens and
 * no runtime dependency. It renders nothing under reduced motion because its
 * sole purpose is decorative movement.
 */
export function BorderBeam({
    className,
    size = 90,
    duration = 8,
    delay = 0,
    colorFrom = "hsl(var(--brand))",
    colorTo = "hsl(var(--brand-hover))",
}: BorderBeamProps) {
    const reduceMotion = useReducedMotion()
    if (reduceMotion) return null

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
        >
            <motion.div
                className={cn(
                    "absolute aspect-square bg-gradient-to-l from-[var(--beam-from)] via-[var(--beam-to)] to-transparent",
                    className,
                )}
                style={
                    {
                        width: size,
                        offsetPath: `rect(0 auto auto 0 round ${size}px)`,
                        "--beam-from": colorFrom,
                        "--beam-to": colorTo,
                    } as CSSProperties
                }
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration,
                    delay: -delay,
                }}
            />
        </div>
    )
}
