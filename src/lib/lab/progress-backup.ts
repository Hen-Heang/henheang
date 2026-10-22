import { z } from "zod"

export const progressKeys = {
    backend: "henheang:lab:backend:progress:v1",
    devops: "devops-roadmap-progress",
    steps: "henheang:lab:devops:steps:v1",
    learning: "henheang:lab:state:v1",
} as const

const ids = z.array(z.string().max(200)).max(2000)
const path = z.enum(["backend", "devops", "ai"])
const localHref = z
    .string()
    .max(500)
    .refine(
        (href) =>
            /^\/(?:lab|ai-engineering)(?:\/[a-zA-Z0-9/_-]*)?(?:#[a-zA-Z0-9_-]+)?$/.test(
                href,
            ),
        "Only local learning links are allowed",
    )
const learning = z.object({
    selectedPath: path.optional(),
    lastVisitedItemId: z.string().max(200).optional(),
    lastVisitedHref: localHref.optional(),
    lastVisitedTitle: z.string().max(300).optional(),
    lastVisitedPath: path.optional(),
    lastVisitedAt: z.string().datetime().optional(),
    savedItemIds: ids,
    recentlyViewed: z
        .array(
            z.object({
                itemId: z.string().max(200),
                href: localHref,
                title: z.string().max(300),
                path,
                visitedAt: z.string().datetime(),
            }),
        )
        .max(5),
})
const backupSchema = z.object({
    version: z.literal(1),
    backend: ids,
    devops: ids,
    steps: z
        .record(z.array(z.number().int().min(0).max(1000)).max(1000))
        .refine((value) =>
            Object.keys(value).every((slug) => /^[a-z0-9-]+$/.test(slug)),
        ),
    learning,
})

export function parseProgressBackup(text: string) {
    if (text.length > 1_000_000) throw new Error("Backup is too large")
    return backupSchema.parse(JSON.parse(text))
}

export function exportProgressBackup(
    storage: Pick<Storage, "getItem">,
): string {
    const data = {
        version: 1,
        backend: JSON.parse(storage.getItem(progressKeys.backend) ?? "[]"),
        devops: JSON.parse(storage.getItem(progressKeys.devops) ?? "[]"),
        steps: JSON.parse(storage.getItem(progressKeys.steps) ?? "{}"),
        learning: JSON.parse(
            storage.getItem(progressKeys.learning) ??
                '{"savedItemIds":[],"recentlyViewed":[]}',
        ),
    }
    return JSON.stringify(backupSchema.parse(data), null, 2)
}

/** Validate everything before writing; merge completion so restore never erases it. */
export function restoreProgressBackup(text: string, storage: Storage): void {
    const incoming = parseProgressBackup(text)
    const current = parseProgressBackup(exportProgressBackup(storage))
    const union = <T>(a: T[], b: T[]) => [...new Set([...a, ...b])]
    const steps = { ...current.steps }
    for (const [slug, values] of Object.entries(incoming.steps))
        steps[slug] = union(steps[slug] ?? [], values)
    const recent = [
        ...incoming.learning.recentlyViewed,
        ...current.learning.recentlyViewed,
    ]
        .sort((a, b) => b.visitedAt.localeCompare(a.visitedAt))
        .filter(
            (visit, index, all) =>
                all.findIndex((entry) => entry.itemId === visit.itemId) ===
                index,
        )
        .slice(0, 5)
    const values = {
        backend: union(current.backend, incoming.backend),
        devops: union(current.devops, incoming.devops),
        steps,
        learning: {
            ...current.learning,
            ...incoming.learning,
            savedItemIds: union(
                current.learning.savedItemIds,
                incoming.learning.savedItemIds,
            ),
            recentlyViewed: recent,
        },
    }
    const originals = Object.values(progressKeys).map(
        (key) => [key, storage.getItem(key)] as const,
    )
    try {
        for (const key of Object.keys(
            progressKeys,
        ) as (keyof typeof progressKeys)[])
            storage.setItem(progressKeys[key], JSON.stringify(values[key]))
    } catch (error) {
        for (const [key, value] of originals) {
            try {
                if (value === null) storage.removeItem(key)
                else storage.setItem(key, value)
            } catch {
                /* Best-effort rollback if storage is unavailable. */
            }
        }
        throw error
    }
}
