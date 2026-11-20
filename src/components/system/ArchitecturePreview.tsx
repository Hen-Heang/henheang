import { cn } from "@/src/lib/utils/utils"

interface ArchitecturePreviewProps {
    layers: string[]
    note?: string
    compact?: boolean
    className?: string
}

/**
 * Architecture layers drawn as the same rail as the home hero's request
 * path, so every system diagram on the site shares one visual language.
 * Rendered from a project's real `architecture` data (server component —
 * pure markup, no motion: only the hero animates).
 */
export function ArchitecturePreview({
    layers,
    note,
    compact = false,
    className,
}: ArchitecturePreviewProps) {
    return (
        <figure
            className={cn(
                "rounded-2xl border border-border bg-surface p-5 sm:p-6",
                className,
            )}
            aria-label={`Architecture flow: ${layers.join(" to ")}`}
        >
            <p className="mb-3 text-xs font-semibold text-fg-muted">
                Architecture flow
            </p>
            <ol className="relative">
                <span
                    aria-hidden
                    className={cn(
                        "absolute left-[5px] w-0.5 rounded-full bg-brand/70",
                        compact ? "bottom-3 top-3" : "bottom-4 top-4",
                    )}
                />
                {layers.map((layer) => (
                    <li
                        key={layer}
                        className={cn(
                            "relative flex items-center pl-7",
                            compact ? "min-h-8" : "min-h-11",
                        )}
                    >
                        <span
                            aria-hidden
                            className="absolute left-0 h-3 w-3 rounded-full border-2 border-brand bg-background"
                        />
                        <span className="font-mono text-xs text-fg sm:text-sm">
                            {layer}
                        </span>
                    </li>
                ))}
            </ol>
            {note && (
                <figcaption className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-fg-muted">
                    {note}
                </figcaption>
            )}
        </figure>
    )
}
