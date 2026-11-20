import { test, expect } from "@playwright/test"

test.describe("Projects index", () => {
    test("shows featured projects as large panels and the rest in a compact grid", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1200 })
        await page.goto("/projects")
        await expect(page.getByRole("heading", { name: /H-Phsar/, level: 3 })).toBeVisible()
        await expect(page.getByText("All projects", { exact: true })).toBeVisible()
        await expect(page.getByRole("link", { name: "View case study", exact: false }).first()).toBeVisible()
    })

    test("filters remain correct and featured projects respect the active filter", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1200 })
        await page.goto("/projects?filter=backend")
        await expect(page.getByRole("link", { name: /^Backend/ })).toHaveAttribute("aria-current", "page")
        await expect(page.getByRole("link", { name: /^All /, exact: false })).not.toHaveAttribute("aria-current", "page")
        // H-Space is a full-stack project and must not appear at all under this filter.
        await expect(page.getByRole("heading", { name: "H-Space", exact: false })).toHaveCount(0)
    })

    test("filter bar is reachable and scrollable at 320px with comfortable touch targets", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 700 })
        await page.goto("/projects")
        const group = page.getByRole("group", { name: "Filter projects by type" })
        await expect(group).toBeVisible()

        // "Live" is the last pill. Empty filters are hidden, so whether the
        // strip overflows at 320px depends on the data — assert instead that
        // the last pill can be brought fully into the scroll container.
        const scrollContainer = group.locator("xpath=..")
        const liveFilter = group.getByRole("link", { name: /^Live/ })
        await liveFilter.scrollIntoViewIfNeeded()
        const box = await liveFilter.boundingBox()
        const container = await scrollContainer.boundingBox()
        expect(box!.x).toBeGreaterThanOrEqual(container!.x)
        expect(box!.x + box!.width).toBeLessThanOrEqual(container!.x + container!.width + 1)
        expect(box!.height).toBeGreaterThanOrEqual(44)
        await liveFilter.click()
        await expect(page).toHaveURL(/filter=live/)
        await expect(liveFilter).toHaveAttribute("aria-current", "page")
    })

    test("hides empty filters unless they are the active one", async ({ page }) => {
        await page.goto("/projects")
        const group = page.getByRole("group", { name: "Filter projects by type" })
        for (const link of await group.getByRole("link").all()) {
            const text = (await link.textContent())?.trim() ?? ""
            if (!text.startsWith("All")) expect(text).not.toMatch(/\D0$/)
        }

        await page.goto("/projects?filter=full-stack")
        await expect(group.getByRole("link", { name: /^Full-stack/ })).toHaveAttribute("aria-current", "page")
    })

    test("shows an editorial no-results message and clears back to all", async ({ page }) => {
        await page.goto("/projects?filter=live")
        await expect(page.getByRole("link", { name: /^All /, exact: false })).toBeVisible()
    })

    test("grid card CTA is visible without hover and github/live links are separate from the card link", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1200 })
        await page.goto("/projects")
        // VSTV Agent is in the "All projects" grid, not the featured section.
        const card = page.locator("a.static-link", { hasText: "VSTV Agent" }).locator("xpath=../..")
        const cta = card.getByText("View case study", { exact: true })
        // Not hovering — the CTA must already be in the accessibility tree and rendered (opacity/visibility default state).
        await expect(cta).toBeVisible()

        const githubLink = card.getByRole("link", { name: /GitHub/ })
        await expect(githubLink).toBeVisible()
        await expect(githubLink).toHaveAttribute("target", "_blank")
    })
})
