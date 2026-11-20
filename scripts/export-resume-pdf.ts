/**
 * Renders the ATS resume (/resume) to an A4 PDF in public/, so recruiters can
 * download a file instead of going through the browser's print dialog.
 *
 *   pnpm resume:pdf                         # from the live site (default)
 *   pnpm resume:pdf http://localhost:3000   # from a local server
 *
 * The resume's content lives in Supabase in production, so the live site is
 * the default source: a local server without .env.local renders the static
 * data/ fallback, which can differ. Re-run after editing the resume in the
 * admin, then commit the PDF.
 *
 * Uses the page's own print styles (globals.css @media print + the
 * [data-print-root] wrapper), exactly what "Print / Save as PDF" produces.
 */
import { chromium } from "@playwright/test"
import { statSync } from "fs"
import { resolve } from "path"

const DEFAULT_ORIGIN = "https://henheang.site"
export const RESUME_PDF_PATH = "public/Hen_Heang_Resume.pdf"

async function main() {
    const origin = (process.argv[2] ?? DEFAULT_ORIGIN).replace(/\/$/, "")
    const out = resolve(__dirname, "..", RESUME_PDF_PATH)
    const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH

    const browser = await chromium.launch(executablePath ? { executablePath } : {})
    try {
        const context = await browser.newContext({ colorScheme: "light" })
        const page = await context.newPage()
        const response = await page.goto(`${origin}/resume`, { waitUntil: "networkidle" })
        if (!response?.ok()) {
            throw new Error(`GET ${origin}/resume returned ${response?.status()}`)
        }
        await page.evaluate(() => document.fonts.ready)

        // Margins come from the page's own @page rule (A4, 12mm/14mm).
        await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true })
    } finally {
        await browser.close()
    }

    const kb = Math.round(statSync(out).size / 1024)
    console.log(`Wrote ${RESUME_PDF_PATH} (${kb} KB) from ${origin}/resume`)
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
