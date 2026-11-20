"use client"

import { Printer } from "lucide-react"
import { primaryAction } from "@/src/components/system/actionStyles"

export function ResumePrintButton() {
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
