import { describe, expect, it } from "vitest"
import {
    exportProgressBackup,
    parseProgressBackup,
    progressKeys,
    restoreProgressBackup,
} from "./progress-backup"

function memoryStorage(): Storage {
    const values = new Map<string, string>()
    return {
        get length() {
            return values.size
        },
        clear: () => values.clear(),
        getItem: (key) => values.get(key) ?? null,
        key: (index) => [...values.keys()][index] ?? null,
        removeItem: (key) => {
            values.delete(key)
        },
        setItem: (key, value) => {
            values.set(key, value)
        },
    }
}

describe("progress backup", () => {
    it("round trips browser progress and merges completion without touching unrelated storage", () => {
        const source = memoryStorage()
        source.setItem(progressKeys.backend, '["lesson-1"]')
        source.setItem(progressKeys.steps, '{"dockerize-spring-boot":[0,1]}')
        const backup = exportProgressBackup(source)
        const destination = memoryStorage()
        destination.setItem(progressKeys.backend, '["lesson-2"]')
        destination.setItem(
            progressKeys.steps,
            '{"dockerize-spring-boot":[1,2]}',
        )
        destination.setItem("unrelated", "preserved")
        restoreProgressBackup(backup, destination)
        expect(JSON.parse(destination.getItem(progressKeys.backend)!)).toEqual([
            "lesson-2",
            "lesson-1",
        ])
        expect(JSON.parse(destination.getItem(progressKeys.steps)!)).toEqual({
            "dockerize-spring-boot": [1, 2, 0],
        })
        expect(destination.getItem("unrelated")).toBe("preserved")
    })

    it("rejects malformed, oversized, unsupported, and external-link backups before writing", () => {
        const storage = memoryStorage()
        const valid = JSON.parse(exportProgressBackup(storage))
        for (const content of [
            "broken",
            "x".repeat(1_000_001),
            JSON.stringify({ ...valid, version: 2 }),
            JSON.stringify({ ...valid, steps: { bad: [-1] } }),
            JSON.stringify({
                ...valid,
                learning: {
                    ...valid.learning,
                    lastVisitedHref: "javascript:alert(1)",
                },
            }),
            JSON.stringify({
                ...valid,
                learning: {
                    ...valid.learning,
                    lastVisitedHref: "//example.com",
                },
            }),
        ]) {
            expect(() => restoreProgressBackup(content, storage)).toThrow()
            expect(storage.length).toBe(0)
        }
    })

    it("rolls back already-written keys if storage fails during restore", () => {
        const storage = memoryStorage()
        const backup = exportProgressBackup(storage)
        storage.setItem(progressKeys.backend, '["keep"]')
        const write = storage.setItem
        let failed = false
        storage.setItem = (key, value) => {
            if (key === progressKeys.devops && !failed) {
                failed = true
                throw new Error("quota")
            }
            write(key, value)
        }
        expect(() => restoreProgressBackup(backup, storage)).toThrow("quota")
        expect(storage.getItem(progressKeys.backend)).toBe('["keep"]')
        expect(storage.getItem(progressKeys.devops)).toBeNull()
    })

    it("exports only the four learning stores", () => {
        const storage = memoryStorage()
        storage.setItem("other-app", "private")
        expect(
            parseProgressBackup(exportProgressBackup(storage)),
        ).toMatchObject({ version: 1, backend: [], devops: [], steps: {} })
        expect(exportProgressBackup(storage)).not.toContain("private")
    })
})
