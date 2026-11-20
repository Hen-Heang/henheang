import React from "react"
import { cn } from "@/src/lib/utils/utils"

/** Quiet label naming a section. Sentence case and neutral: the heading below it carries the emphasis, and blue stays reserved for actions. */
export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <p className={cn("text-sm font-medium text-fg-muted", className)}>
            {children}
        </p>
    )
}
