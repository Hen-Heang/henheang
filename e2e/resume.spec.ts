import { expect, test } from "@playwright/test"

test.describe("Resume and CV documents", () => {
    for (const path of ["/resume", "/cv"]) {
        test(`${path} prints the document, not a blank page`, async ({ page }) => {
            await page.goto(path)
            await page.emulateMedia({ media: "print" })

            // Regression: the print stylesheet once hid the wrapper around
            // [data-print-root], so every print and PDF came out blank.
            const root = page.locator("[data-print-root]")
            const box = await root.boundingBox()
            expect(box?.height ?? 0).toBeGreaterThan(500)
            await expect(root.getByText("Hen Heang").first()).toBeVisible()

            // The toolbar is screen-only.
            await expect(
                page.getByRole("link", { name: "Back to portfolio" }),
            ).toBeHidden()
        })

        test(`${path} links back to the portfolio`, async ({ page }) => {
            await page.goto(path)
            const back = page.getByRole("link", { name: "Back to portfolio" })
            await expect(back).toHaveAttribute("href", "/")
            const box = await back.boundingBox()
            expect(box?.height ?? 0).toBeGreaterThanOrEqual(44)
        })
    }

    test("/resume offers the PDF as a download", async ({ page, request }) => {
        await page.goto("/resume")
        const download = page.getByRole("link", { name: "Download PDF" })
        await expect(download).toHaveAttribute("download", "")
        const href = await download.getAttribute("href")
        expect(href).toMatch(/\.pdf$/)

        const response = await request.get(href!)
        expect(response.status()).toBe(200)
        expect(response.headers()["content-type"]).toContain("application/pdf")
        expect((await response.body()).byteLength).toBeGreaterThan(20_000)
    })
})
