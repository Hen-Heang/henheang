import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ResumeHeader } from "./ResumeHeader"
import { ResumeSection } from "./ResumeSection"
import { ResumeSkills } from "./ResumeSkills"
import { ResumeExperience } from "./ResumeExperience"
import { ResumeProjects } from "./ResumeProjects"
import { ResumeEducation } from "./ResumeEducation"
import { ResumeLanguages } from "./ResumeLanguages"
import { ResumePrintButton } from "./ResumePrintButton"
import type { CVData } from "@/data/cv-data"

// The wrapping <div data-print-root> is what the browser print dialog outputs.
export function ResumePage({ cv }: { cv: CVData }) {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      {/* Toolbar (hidden when printing) */}
      <div className="max-w-[720px] mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/cv"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-slate-700 text-sm font-semibold border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={15} aria-hidden />
          Back to Modern CV
        </Link>
        <div className="flex flex-col items-end gap-1">
          <ResumePrintButton />
          {/* Fixed light palette: this page is a white print document in both themes. slate-400 was 2.6:1. */}
          <p className="text-xs text-slate-600">Opens the browser print dialog.</p>
        </div>
      </div>

      {/* ATS resume document */}
      <div id="resume-print-root" data-print-root className="max-w-[720px] mx-auto">
        <ResumeHeader cv={cv} />

        <main>
          <ResumeSection title="PROFESSIONAL SUMMARY">
            <p className="text-[10.5px] text-black leading-[1.45]">{cv.summary}</p>
          </ResumeSection>

          <ResumeSkills cv={cv} />
          <ResumeExperience cv={cv} />
          <ResumeProjects cv={cv} />
          <ResumeEducation cv={cv} />
          <ResumeLanguages cv={cv} />
        </main>
      </div>
    </div>
  )
}
