"use client"

import { Printer } from "lucide-react"
import { paperSecondaryAction } from "@/src/components/system/actionStyles"

/** Secondary to "Download PDF": printing is still useful, but the file is what most visitors want. */
export function ResumePrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      title="Opens the browser print dialog"
      className={paperSecondaryAction}
    >
      <Printer size={15} aria-hidden />
      Print
    </button>
  )
}
