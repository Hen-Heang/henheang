"use client"

import { useMemo, useSyncExternalStore } from "react"

const STORAGE_KEY = "henheang:lab:devops:steps:v1"
const CHANGE_EVENT = "henheang:devops-lab-steps-change"

function subscribe(callback: () => void): () => void {
    window.addEventListener("storage", callback)
    window.addEventListener(CHANGE_EVENT, callback)
    return () => {
        window.removeEventListener("storage", callback)
        window.removeEventListener(CHANGE_EVENT, callback)
    }
}

function getSnapshot(): string {
    try {
        return window.localStorage.getItem(STORAGE_KEY) ?? "{}"
    } catch {
        return "{}"
    }
}

function getServerSnapshot(): string {
    return "{}"
}

/** Count only distinct indices that belong to the current checklist. */
export function countCompletedLabSteps(values: unknown, total: number): number {
    return new Set(
        Array.isArray(values)
            ? values.filter(
                  (value): value is number =>
                      Number.isInteger(value) && value >= 0 && value < total,
              )
            : [],
    ).size
}

/** Raw per-lab step-index progress for every DevOps lab — used by the /lab/progress summary to compute which labs are fully done. */
export function useAllDevOpsLabSteps(): Record<string, number[]> {
    const serialized = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    )
    return useMemo(() => {
        try {
            const parsed: unknown = JSON.parse(serialized)
            if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
                return {}
            return Object.fromEntries(
                Object.entries(parsed).map(([slug, values]) => [
                    slug,
                    Array.isArray(values)
                        ? [
                              ...new Set(
                                  values.filter(
                                      (value): value is number =>
                                          Number.isInteger(value) && value >= 0,
                                  ),
                              ),
                          ]
                        : [],
                ]),
            )
        } catch {
            return {}
        }
    }, [serialized])
}

export function toggleLabStep(labSlug: string, index: number) {
    const serialized = getSnapshot()
    let progress: Record<string, unknown> = {}
    try {
        const parsed: unknown = JSON.parse(serialized)
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed))
            progress = parsed as Record<string, unknown>
    } catch {
        /* Recover an invalid local snapshot. */
    }
    const raw = progress[labSlug]
    const next = new Set<number>(
        Array.isArray(raw)
            ? raw.filter(
                  (value): value is number =>
                      Number.isInteger(value) && value >= 0,
              )
            : [],
    )
    if (next.has(index)) next.delete(index)
    else next.add(index)
    try {
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                ...progress,
                [labSlug]: [...next].sort((a, b) => a - b),
            }),
        )
        window.dispatchEvent(new Event(CHANGE_EVENT))
    } catch {
        /* Content stays usable when storage is blocked. */
    }
}
