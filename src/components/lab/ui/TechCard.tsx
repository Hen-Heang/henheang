import { createElement } from "react"
import { TechIcons, CodeIcon } from "@/src/components/icons/TechIcons"

/** Tech names in project/status data often carry a version suffix (e.g. "Java 17", "React 19") that isn't in the icon map. */
function resolveIcon(name: string) {
    if (TechIcons[name]) return TechIcons[name]
    const stripped = name.replace(/\s+\d+\+?$/, "").trim()
    return TechIcons[stripped] ?? CodeIcon
}

export function TechCard({
    name,
    category,
}: {
    name: string
    category?: string
}) {
    return (
        <div className="group flex min-h-[72px] items-center gap-3 rounded-2xl border border-border bg-surface px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-surface-hover hover:shadow-sm">
            <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background p-2"
                aria-hidden="true"
            >
                {createElement(resolveIcon(name))}
            </span>
            <span className="min-w-0 leading-tight">
                <span className="block truncate text-sm font-semibold text-fg">
                    {name}
                </span>
                {category && (
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-fg-muted">
                        {category}
                    </span>
                )}
            </span>
        </div>
    )
}
