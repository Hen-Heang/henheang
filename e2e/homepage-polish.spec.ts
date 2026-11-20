import { expect, test } from "@playwright/test"
import { positioning } from "../src/lib/content/positioning"

const viewports = [
    { name: "small mobile", width: 375, height: 812 },
    { name: "mobile", width: 390, height: 844 },
    { name: "large mobile", width: 430, height: 932 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 900 },
] as const

test.describe("Homepage polish", () => {
    test("server-renders the recruiter-focused hero and consistent resume CTAs", async ({
        page,
        request,
    }) => {
        const consoleErrors: string[] = []
        const pageErrors: string[] = []
        page.on("console", (message) => {
            if (message.type() === "error") consoleErrors.push(message.text())
        })
        page.on("pageerror", (error) => pageErrors.push(error.message))

        const response = await request.get("/")
        const html = await response.text()

        expect(html).toContain(positioning.title)
        expect(html).toContain(positioning.description)
        expect(html).toContain(positioning.supporting)
        expect(html).toContain("Years Exp")

        await page.goto("/")
        const main = page.locator("main")
        await expect(main.getByText(positioning.description)).toBeVisible()
        await expect(
            main.getByRole("link", { name: "View Backend Work" }),
        ).toHaveAttribute("href", "#work")

        const resumeLinks = main.getByRole("link", {
            name: /^(View Resume|Resume & Skills)$/,
        })
        await expect(resumeLinks).toHaveCount(2)
        for (const link of await resumeLinks.all()) {
            await expect(link).toHaveAttribute("href", "/resume")
        }
        await expect(main.getByText(/Download (CV|Resume)/)).toHaveCount(0)
        expect(consoleErrors).toEqual([])
        expect(pageErrors).toEqual([])
    })

    test("keeps a concise section hierarchy and a readable H-Phsar architecture preview", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 390, height: 844 })
        await page.goto("/")

        // Recruiter-scan order: who he is, the work (proof first), where he
        // did it, what he works with, the background, then a contact path.
        const landmarks = [
            page.getByRole("heading", { name: "Hen Heang", level: 1 }),
            page.locator("#work"),
            page.locator("#experience"),
            page.locator("#capabilities"),
            page.locator("#about"),
            page.getByRole("heading", {
                name: "Have a system or service to build?",
            }),
        ]
        const positions = await Promise.all(
            landmarks.map((landmark) =>
                landmark.evaluate(
                    (element) =>
                        element.getBoundingClientRect().top + window.scrollY,
                ),
            ),
        )
        expect([...positions].sort((a, b) => a - b)).toEqual(positions)

        // Each purpose appears once: the old proof-strip, profile, and growth
        // sections restated Selected Work, Experience, and Capabilities.
        await expect(page.locator("#profile")).toHaveCount(0)
        await expect(page.locator("#growth")).toHaveCount(0)

        const hPhsar = page
            .locator("article", {
                has: page.getByRole("heading", { name: /H-Phsar/, level: 3 }),
            })
            .first()
        await expect(
            hPhsar.getByLabel(/Architecture flow: Client to Spring Security/),
        ).toBeVisible()
        await expect(hPhsar.getByText("Engineering focus")).toHaveCount(0)
        await expect(hPhsar.getByText(/^Role:/)).toHaveCount(0)
        await expect(
            hPhsar
                .getByRole("list", { name: /H-Phsar technologies/ })
                .getByRole("listitem"),
        ).toHaveCount(3)
        await expect(
            page.locator('img[src*="h-phsar-poster-image"]'),
        ).toHaveCount(0)
    })

    for (const viewport of viewports) {
        test(`keeps the homepage within the ${viewport.name} viewport`, async ({
            page,
        }) => {
            await page.setViewportSize(viewport)
            await page.goto("/")
            await expect(
                page.getByRole("heading", { name: "Hen Heang", level: 1 }),
            ).toBeVisible()

            const dimensions = await page.evaluate(() => ({
                clientWidth: document.documentElement.clientWidth,
                scrollWidth: document.documentElement.scrollWidth,
                offenders: [...document.querySelectorAll<HTMLElement>("body *")]
                    .filter((element) => {
                        const rect = element.getBoundingClientRect()
                        return (
                            rect.left < -1 ||
                            rect.right >
                                document.documentElement.clientWidth + 1
                        )
                    })
                    .slice(0, 8)
                    .map((element) => ({
                        tag: element.tagName,
                        className: element.className,
                        left: element.getBoundingClientRect().left,
                        right: element.getBoundingClientRect().right,
                    })),
            }))
            expect(
                dimensions.scrollWidth,
                JSON.stringify(dimensions.offenders),
            ).toBeLessThanOrEqual(dimensions.clientWidth)
        })
    }

    test("server-renders the AuthHub request path and opens one hop at a time from the keyboard", async ({
        page,
        request,
    }) => {
        // Server component with native <details>: the real endpoint is in the
        // HTML before any JavaScript runs.
        const html = await (await request.get("/")).text()
        expect(html).toContain("How a login moves through AuthHub")
        expect(html).toContain("/api/auth/login")

        await page.setViewportSize({ width: 1440, height: 900 })
        await page.goto("/")

        const path = page.getByRole("figure", {
            name: "How a login moves through AuthHub",
        })
        await expect(path).toBeVisible()
        const hops = path.locator("details")
        await expect(hops).toHaveCount(5)
        await expect(hops.first()).toHaveAttribute("open", "")

        // The response hop holds the token body; opening it by keyboard closes
        // the request hop (exclusive <details name>).
        const response = path.locator("summary", { hasText: "Response" })
        await response.focus()
        await page.keyboard.press("Enter")
        await expect(hops.last()).toHaveAttribute("open", "")
        await expect(hops.first()).not.toHaveAttribute("open", "")
        await expect(path).toContainText("HTTP/1.1 200 OK")

        // Each hop is a full-size touch target.
        for (const summary of await path.locator("summary").all()) {
            const box = await summary.boundingBox()
            expect(box?.height ?? 0).toBeGreaterThanOrEqual(44)
        }

        await expect(
            path.getByRole("link", { name: "AuthHub case study" }),
        ).toHaveAttribute("href", "/projects/authhub")
    })

    test("renders static hero content and preserves focus treatment with reduced motion", async ({
        page,
    }) => {
        const consoleErrors: string[] = []
        page.on("console", (message) => {
            if (message.type() === "error") consoleErrors.push(message.text())
        })
        await page.setViewportSize({ width: 390, height: 844 })
        await page.emulateMedia({ reducedMotion: "reduce" })
        await page.goto("/")

        const heading = page.getByRole("heading", {
            name: "Hen Heang",
            level: 1,
        })
        await expect(heading).toBeVisible()
        const heroMotionStyle = await heading
            .locator("xpath=..")
            .evaluate((element) => {
                const style = getComputedStyle(element)
                return { opacity: style.opacity, transform: style.transform }
            })
        expect(heroMotionStyle.opacity).toBe("1")
        expect(heroMotionStyle.transform).toBe("none")

        const resume = page.getByRole("link", { name: "View Resume" }).first()
        await resume.focus()
        expect(
            await resume.evaluate(
                (element) => getComputedStyle(element).outlineStyle,
            ),
        ).not.toBe("none")
        expect(consoleErrors).toEqual([])
    })

    test("supports dark mode and keeps both resume views public", async ({
        page,
        request,
    }) => {
        await page.emulateMedia({ colorScheme: "light" })
        await page.goto("/")
        const darkToggle = page
            .getByRole("button", { name: "Switch to dark theme" })
            .first()
        await darkToggle.click()
        await expect(page.locator("html")).toHaveClass(/dark/)

        expect((await request.get("/resume")).status()).toBe(200)
        expect((await request.get("/cv")).status()).toBe(200)
    })
})
