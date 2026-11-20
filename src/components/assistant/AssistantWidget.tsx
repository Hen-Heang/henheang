"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Sparkles } from "lucide-react"

import { resolvePageContext } from "@/src/lib/ai/page-context"

/**
 * The chat panel (AI SDK hooks, markdown renderer) is loaded lazily on first
 * open so visitors who never touch the assistant download none of it.
 */
const AssistantPanel = dynamic(() => import("./AssistantPanel"), {
    ssr: false,
    loading: () => (
        <div aria-hidden className="flex-1 animate-pulse motion-reduce:animate-none" />
    ),
})

export function AssistantWidget() {
    const [open, setOpen] = useState(false)
    const [wasOpened, setWasOpened] = useState(false)
    const pathname = usePathname()
    const { page, projectSlug } = resolvePageContext(pathname ?? "/")

    // Whatever opened the panel from outside the Trigger (the phone header
    // button, the command menu). Radix only knows how to return focus to its
    // own Trigger, which is hidden on phones, so closing would drop focus to
    // <body> without this.
    const openerRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const onOpen = () => {
            openerRef.current =
                document.activeElement instanceof HTMLElement
                    ? document.activeElement
                    : null
            // The panel's portal only mounts once wasOpened is set; opening
            // by event must set it too or nothing appears.
            setWasOpened(true)
            setOpen(true)
        }
        window.addEventListener("hh:assistant-open", onOpen)
        return () => window.removeEventListener("hh:assistant-open", onOpen)
    }, [])

    return (
        <DialogPrimitive.Root
            open={open}
            onOpenChange={(next) => {
                // Opened via the Trigger itself: Radix's default focus return is right.
                if (next) openerRef.current = null
                setOpen(next)
                if (next) setWasOpened(true)
            }}
        >
            <DialogPrimitive.Trigger
                type="button"
                aria-label="Ask about my work"
                // Quiet on purpose: an outlined surface rather than a filled
                // brand pill, so it never competes with the page's primary
                // action. Focus uses the global --ring outline (an explicit
                // white outline was invisible on the light theme). On phones
                // it hides wherever SiteHeader offers its own button
                // (see [data-assistant-fab] in globals.css).
                data-assistant-fab
                className="fixed z-[70] bottom-[calc(6.25rem+env(safe-area-inset-bottom))] right-4 lg:bottom-6 lg:right-6 flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-background/95 px-3 text-sm font-semibold text-fg shadow-lg backdrop-blur transition-colors hover:bg-surface-hover lg:px-4 data-[state=open]:hidden"
            >
                <Sparkles size={18} className="text-brand lg:h-4 lg:w-4" aria-hidden />
                <span className="hidden lg:inline">Ask about my work</span>
            </DialogPrimitive.Trigger>

            {wasOpened && (
                <DialogPrimitive.Portal>
                    {/* Above MobileTabBar (z-[120]): on phones the panel is full-screen and
                        the floating tab bar would otherwise sit over the chat input. */}
                    <DialogPrimitive.Overlay className="fixed inset-0 z-[129] bg-background/40 sm:bg-transparent data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none" />
                    <DialogPrimitive.Content
                        aria-describedby={undefined}
                        onCloseAutoFocus={(event) => {
                            const opener = openerRef.current
                            openerRef.current = null
                            // Fall back to Radix's default (the Trigger) when the
                            // opener is gone or hidden, e.g. a closed command menu item.
                            if (opener?.isConnected && opener.offsetParent !== null) {
                                event.preventDefault()
                                opener.focus()
                            }
                        }}
                        className="fixed z-[130] inset-0 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:top-auto sm:w-[420px] flex flex-col h-[100dvh] sm:h-[min(700px,calc(100dvh-3rem))] overflow-hidden rounded-none sm:rounded-2xl bg-[#050816] pt-[env(safe-area-inset-top)] sm:pt-0 sm:border sm:border-slate-400/15 shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:sm:slide-in-from-bottom-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:sm:slide-out-to-bottom-4 motion-reduce:animate-none"
                    >
                        <DialogPrimitive.Title className="sr-only">Portfolio Assistant</DialogPrimitive.Title>
                        <AssistantPanel onClose={() => setOpen(false)} page={page} projectSlug={projectSlug} />
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            )}
        </DialogPrimitive.Root>
    )
}
