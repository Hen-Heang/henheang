import { expect, test } from "@playwright/test"
import { positioning } from "../src/lib/content/positioning"

test.describe("portfolio-wide positioning", () => {
    test("keeps the backend-first identity consistent across core routes", async ({
        page,
    }) => {
        await page.goto("/")
        await expect(
            page.getByText(positioning.specialization, { exact: true }).first(),
        ).toBeVisible()
        await expect(
            page.getByRole("list", { name: "Core backend technologies" }),
        ).toContainText("Spring Boot")
        await expect(page.getByText(/My foundation is backend engineering/)).toBeVisible()

        await page.goto("/about")
        await expect(
            page.getByRole("heading", {
                level: 1,
                name: `Hen Heang — ${positioning.title}`,
            }),
        ).toBeVisible()
        await expect(page.getByText(/the verification and the decision stay with me/)).toBeVisible()
        await expect(
            page.getByRole("heading", { name: "AI for Everyday Life & Work" }),
        ).toBeVisible()

        await page.goto("/resume")
        await expect(page.getByText(positioning.headline).first()).toBeVisible()
        await expect(
            page.getByRole("heading", { name: /H-Phsar — Backend API/ }),
        ).toBeVisible()

        await page.goto("/journey")
        await expect(page.getByText("AX Engineering", { exact: true })).toBeVisible()
        await expect(page.getByText("Last updated October 2, 2026")).toBeVisible()
    })

    test("keeps the main portfolio routes inside an iPhone-width viewport", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 428, height: 926 })

        for (const route of [
            "/",
            "/about",
            "/resume",
            "/journey",
            "/lab/ax-engineering",
            "/ai-engineering",
        ]) {
            await page.goto(route)
            await expect(
                page
                    .locator("body")
                    .evaluate((body) => body.scrollWidth <= window.innerWidth),
                `${route} should not overflow horizontally`,
            ).resolves.toBe(true)
        }
    })
})
