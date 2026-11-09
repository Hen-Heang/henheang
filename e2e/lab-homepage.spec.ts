import { test, expect } from "@playwright/test"
import { fillControlled } from "./support/interactions"

test.describe("Engineering Lab homepage", () => {
    test("renders the compact hero, Continue Learning, learning paths, and library sections in order", async ({ page }) => {
        const response = await page.request.get("/lab")
        const html = await response.text()

        const positions = [
            "Learn by building real systems — then prove they work.",
            'id="continue-learning-heading"',
            'id="learning-paths-heading"',
            'id="lab-library-heading"',
            'id="hands-on-practice-heading"',
            'id="apply-projects-heading"',
            'id="progress-summary-heading"',
        ].map((marker) => html.indexOf(marker))

        for (const pos of positions) expect(pos).toBeGreaterThan(-1)
        for (let i = 1; i < positions.length; i++) {
            expect(positions[i]).toBeGreaterThan(positions[i - 1])
        }
    })

    test("shows the Backend path as recommended and links to the roadmap", async ({ page }) => {
        await page.goto("/lab")
        const backendCard = page.locator("article", {
            hasText: "Backend Engineering",
        })
        await expect(backendCard.getByText("Recommended")).toBeVisible()
    })

    test("shows the hero technology chips and the real applied projects", async ({ page }) => {
        await page.goto("/lab")
        const stack = page.getByLabel("Core technologies")
        await expect(stack).toBeVisible()
        await expect(stack.getByText("PostgreSQL", { exact: true })).toBeVisible()

        const applied = page.locator('section[aria-labelledby="apply-projects-heading"]')
        await expect(applied.getByRole("heading", { name: /H-Phsar/ })).toBeVisible()
        await expect(applied.getByRole("heading", { name: /H-Space/ })).toBeVisible()
    })

    test("search stays interactive and swaps only the library preview section", async ({ page }) => {
        await page.goto("/lab")
        await expect(page.getByRole("link", { name: /Full searchable library/ })).toBeVisible()

        const search = page.getByRole("textbox", {
            name: "Search Engineering Lab",
        })
        await fillControlled(search, "docker")
        await expect(page.getByRole("link", { name: /Full searchable library/ })).toHaveCount(0)
        await expect(page.getByText(/\d+ results?$/)).toBeVisible()
        await expect(page.getByRole("link", { name: /Open in full library/ })).toBeVisible()

        await fillControlled(search, "")
        await expect(page.getByRole("link", { name: /Full searchable library/ })).toBeVisible()
    })

    test("the Lab nav marks the current section with aria-current", async ({ page }) => {
        // The tab-style Lab nav is mobile-only; desktop relies on the sidebar.
        await page.setViewportSize({ width: 390, height: 844 })
        await page.goto("/lab")
        const labNav = page.getByRole("navigation", {
            name: "Engineering Lab sections",
        })
        await expect(labNav.getByRole("link", { name: "Overview", exact: true })).toHaveAttribute("aria-current", "page")

        await page.goto("/lab/backend")
        await expect(labNav.getByRole("link", { name: "Backend", exact: true })).toHaveAttribute("aria-current", "page")
    })
})

test.describe("Engineering Lab library", () => {
    test("persists the query in the URL and survives a refresh", async ({ page }) => {
        await page.goto("/lab/library")
        const search = page.getByRole("textbox", {
            name: "Search the Engineering Lab library",
        })
        await fillControlled(search, "spring")
        await expect(page).toHaveURL(/[?&]q=spring/)

        await page.reload()
        await expect(
            page.getByRole("textbox", {
                name: "Search the Engineering Lab library",
            }),
        ).toHaveValue("spring")
    })

    test("filters by content type via the tab buttons", async ({ page }) => {
        await page.goto("/lab/library")
        await page.getByRole("button", { name: "Labs", exact: true }).click()
        await expect(page).toHaveURL(/[?&]type=lab/)
    })
})

test.describe("Engineering Lab progress", () => {
    test("shows the factual empty state with no local progress", async ({ page }) => {
        await page.context().clearCookies()
        await page.goto("/lab/progress")
        await expect(page.getByText("No learning progress yet.")).toBeVisible()
        await expect(page.getByRole("link", { name: "Start Backend Path" })).toBeVisible()
    })
})
