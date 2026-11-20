import { cn } from "@/src/lib/utils/utils"

/**
 * The public site's two action styles. One filled primary per view; every
 * other action is the outlined secondary or a text link. Both are 44px tall
 * so they stay comfortable touch targets.
 *
 * Kept as class strings rather than a component because the call sites are a
 * mix of next/link, plain anchors and buttons.
 */
const base =
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors duration-200 active:scale-[0.98] motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-50"

export const primaryAction = cn(
    base,
    "bg-action text-action-foreground hover:bg-action-hover active:bg-action-active",
)

export const secondaryAction = cn(
    base,
    "border border-border-strong bg-background text-fg hover:bg-surface-hover",
)

/**
 * Secondary action on the /cv and /resume document pages. Those pages are
 * white "paper" in both themes, so this uses a fixed light palette instead
 * of theme tokens (which would turn dark on a white page in dark mode).
 */
export const paperSecondaryAction = cn(
    base,
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
)

/** In-content text link: brand-coloured so it reads as a link without an underline. */
export const textLinkStyle =
    "inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-hover"
