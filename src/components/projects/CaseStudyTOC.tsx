"use client"

import { useScrollSpy } from "@/src/lib/hooks/useScrollSpy"

export interface TocItem {
    id: string
    text: string
}

/** Sticky in-page navigation for the case-study sections, scroll-spied via IntersectionObserver. */
export function CaseStudyTOC({ items }: { items: TocItem[] }) {
    const activeId = useScrollSpy(items.map((item) => item.id))

    if (items.length === 0) return null

    return (
        <nav aria-label="Case study sections" className="sticky top-24 hidden max-h-[70vh] overflow-y-auto lg:block">
            <p className="mb-3 text-xs font-semibold text-fg-muted">On this page</p>
            <ul className="space-y-2 border-l border-border">
                {items.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={`-ml-px block border-l pl-3 text-sm leading-snug transition-colors ${
                                activeId === item.id
                                    ? "border-brand font-medium text-fg"
                                    : "border-transparent text-fg-muted hover:text-fg-secondary"
                            }`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
