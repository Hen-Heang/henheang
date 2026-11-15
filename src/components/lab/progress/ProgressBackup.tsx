"use client"

import { useState } from "react"
import {
    exportProgressBackup,
    restoreProgressBackup,
} from "@/src/lib/lab/progress-backup"

export function ProgressBackup() {
    const [message, setMessage] = useState("")
    const [busy, setBusy] = useState(false)

    function download() {
        try {
            const blob = new Blob([exportProgressBackup(window.localStorage)], {
                type: "application/json",
            })
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = "engineering-lab-progress.json"
            link.click()
            setTimeout(() => URL.revokeObjectURL(url), 1000)
            setMessage("Progress backup downloaded.")
        } catch {
            setMessage(
                "Could not export progress. Check that browser storage is available and contains valid progress.",
            )
        }
    }

    return (
        <section
            aria-labelledby="backup-heading"
            className="mb-6 rounded-2xl border border-border bg-surface p-5"
        >
            <h2 id="backup-heading" className="text-lg font-semibold text-fg">
                Back up your progress
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                Export a JSON file to move progress between browsers. Restore
                merges completed steps and saved items, and uses the backup’s
                path selection. Files are processed on this device.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={download}
                    className="min-h-11 rounded-xl border border-border px-4 text-base font-semibold text-brand hover:border-brand"
                >
                    Export progress
                </button>
                <label className="inline-flex min-h-11 cursor-pointer items-center rounded-xl border border-border px-4 text-base font-semibold text-brand focus-within:outline focus-within:outline-2 focus-within:outline-brand hover:border-brand">
                    {busy ? "Restoring…" : "Restore progress"}
                    <input
                        type="file"
                        accept=".json,application/json"
                        disabled={busy}
                        className="sr-only"
                        onChange={async (event) => {
                            const file = event.currentTarget.files?.[0]
                            event.currentTarget.value = ""
                            if (!file) return
                            setBusy(true)
                            try {
                                if (file.size > 1_000_000)
                                    throw new Error("Too large")
                                restoreProgressBackup(
                                    await file.text(),
                                    window.localStorage,
                                )
                                window.dispatchEvent(new Event("storage"))
                                setMessage(
                                    "Progress restored. Existing completed steps and saved items were kept.",
                                )
                            } catch {
                                setMessage(
                                    "Could not restore this file. Choose a valid Engineering Lab JSON backup and check browser storage access.",
                                )
                            } finally {
                                setBusy(false)
                            }
                        }}
                    />
                </label>
            </div>
            <p role="status" className="mt-3 text-sm text-fg-secondary">
                {message}
            </p>
        </section>
    )
}
