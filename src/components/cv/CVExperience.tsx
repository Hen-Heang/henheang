import { Briefcase } from "lucide-react"
import { CVSection } from "./CVSection"
import type { CVData } from "@/data/cv-data"

export function CVExperience({ cv }: { cv: CVData }) {
  return (
    <CVSection title="Professional Experience" icon={Briefcase}>
      <div className="relative border-l border-slate-200 ml-1.5 pl-6 space-y-8 print:space-y-6">
        {cv.experience.map((job) => (
          // A whole job is taller than what's left of page 1, so keeping it in one
          // piece pushed the first job to page 2 and left the column empty. Jobs
          // may split; the header stays with the title line, and bullets don't split.
          <div key={`${job.company}-${job.startDate}`} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white bg-blue-600 print:hidden" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1 mb-0.5 print:break-after-avoid">
              <h3 className="font-bold text-slate-900 text-base">{job.company}</h3>
              <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                {job.startDate} – {job.current ? "Present" : job.endDate}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-3 print:break-after-avoid">
              <span className="text-sm font-semibold text-slate-700">{job.title}</span>
              <span className="text-xs text-slate-500">· {job.location}</span>
            </div>

            <ul className="space-y-1.5 mb-3">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-[13.5px] text-slate-600 leading-relaxed print:break-inside-avoid">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-300 print:hidden" />
                  {bullet}
                </li>
              ))}
            </ul>

            {job.stack && job.stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {job.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 text-slate-600 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </CVSection>
  )
}
