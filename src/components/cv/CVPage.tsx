import Link from "next/link"
import { ArrowLeft, User, FileText } from "lucide-react"
import { paperSecondaryAction } from "@/src/components/system/actionStyles"
import { GithubIcon } from "@/src/components/icons/social"
import { CVHeader } from "./CVHeader"
import { CVSection } from "./CVSection"
import { CVExperience } from "./CVExperience"
import { CVEducation } from "./CVEducation"
import { CVSkills } from "./CVSkills"
import { CVProjects } from "./CVProjects"
import { CVLanguages } from "./CVLanguages"
import { CVDownloadButton } from "./CVDownloadButton"
import type { CVData } from "@/data/cv-data"

// The wrapping <div data-print-root> is the target for the browser's print/PDF output.
export function CVPage({ cv }: { cv: CVData }) {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 print:bg-white print:p-0">
      {/* Toolbar (hidden when printing) */}
      {/* No site header on this page, so the toolbar carries the way back. */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/" className={paperSecondaryAction}>
          <ArrowLeft size={15} aria-hidden />
          Back to portfolio
        </Link>
        <div className="flex flex-wrap gap-2">
          <Link href="/resume" className={paperSecondaryAction}>
            <FileText size={15} aria-hidden />
            View ATS Resume
          </Link>
          {cv.personal.github && (
            <a
              href={cv.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className={paperSecondaryAction}
            >
              <GithubIcon size={15} brand={false} />
              View GitHub
            </a>
          )}
          <CVDownloadButton />
        </div>
      </div>

      {/* CV Document */}
      <div
        id="cv-print-root"
        data-print-root
        className="
          max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-[0_1px_3px_rgba(15,23,42,0.06)]
          print:shadow-none print:rounded-none print:border-0 print:max-w-none
        "
      >
        <div className="px-6 py-10 sm:px-10 md:px-14 md:py-14 print:px-10 print:py-8">
          <CVHeader cv={cv} />

          {/* Professional Summary */}
          <CVSection title="Professional Summary" icon={User} className="mb-10 print:mb-8">
            <p className="text-[14px] text-slate-600 leading-relaxed">{cv.summary}</p>
          </CVSection>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 print:grid-cols-12 print:gap-8">
            {/* Left Column - Experience & Projects */}
            <div className="lg:col-span-8 print:col-span-8 space-y-10 print:space-y-8">
              <CVExperience cv={cv} />
              <CVProjects cv={cv} />
            </div>

            {/* Right Column - Skills, Education, Languages */}
            <div className="lg:col-span-4 print:col-span-4 space-y-10 print:space-y-8">
              <div className="lg:sticky lg:top-8 print:static space-y-10 print:space-y-8">
                <CVSkills cv={cv} />
                <CVEducation cv={cv} />
                <CVLanguages cv={cv} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer hint for users */}
      <div className="max-w-5xl mx-auto mt-8 text-center text-slate-600 text-xs print:hidden">
        <p>© {new Date().getFullYear()} Hen Heang — Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </div>
  )
}
