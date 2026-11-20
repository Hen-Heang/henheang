import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import {
  paperSecondaryAction,
  primaryAction,
} from "@/src/components/system/actionStyles"
import { ResumeHeader } from "./ResumeHeader"
import { ResumeSection } from "./ResumeSection"
import { ResumeSkills } from "./ResumeSkills"
import { ResumeExperience } from "./ResumeExperience"
import { ResumeProjects } from "./ResumeProjects"
import { ResumeEducation } from "./ResumeEducation"
import { ResumeLanguages } from "./ResumeLanguages"
import { ResumePrintButton } from "./ResumePrintButton"
import type { CVData } from "@/data/cv-data"

/** Generated from this page by `pnpm resume:pdf`; regenerate after resume edits. */
export const RESUME_PDF_URL = "/Hen_Heang_Resume.pdf"

// The wrapping <div data-print-root> is what the browser print dialog outputs.
export function ResumePage({ cv }: { cv: CVData }) {
  return (
    <div className="min-h-screen bg-white py-8 px-4 print:min-h-0 print:p-0">
      {/* Toolbar (hidden when printing) */}
      {/* This page has no site header, so the toolbar carries the way back to
          the portfolio. Download is the primary action: recruiters want a file
          to forward, not a print dialog. */}
      <div className="max-w-[720px] mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <nav aria-label="Resume" className="flex flex-wrap gap-2">
          <Link href="/" className={paperSecondaryAction}>
            <ArrowLeft size={15} aria-hidden />
            Back to portfolio
          </Link>
          <Link href="/cv" className={paperSecondaryAction}>
            Modern CV
          </Link>
        </nav>
        <div className="flex flex-wrap gap-2">
          <ResumePrintButton />
          <a href={RESUME_PDF_URL} download className={primaryAction}>
            <Download size={15} aria-hidden />
            Download PDF
          </a>
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
