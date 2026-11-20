"use client"

import { Printer } from "lucide-react"
import { primaryAction } from "@/src/components/system/actionStyles"

/**
 * Opens the browser print dialog, where the visitor can print or save a PDF.
 * This produces a native, pixel-perfect PDF using the browser's engine.
 * The print: Tailwind variants in each component control the PDF layout.
 */
export function CVDownloadButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      title="Opens the browser print dialog"
      className={primaryAction}
    >
      <Printer size={15} aria-hidden />
      Print / Save as PDF
    </button>
  )
}
