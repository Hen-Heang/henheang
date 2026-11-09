// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react"
import { labs } from "@/data/lab/devops/labs"
import { LabCard } from "../devops/LabCard"
import { LabStepsProgress } from "../devops/LabStepsProgress"
import { LabProgressClient } from "./LabProgressClient"
import { ProgressBackup } from "./ProgressBackup"
import {
    exportProgressBackup,
    progressKeys,
} from "@/src/lib/lab/progress-backup"

vi.mock("@/src/components/ai-engineering/CodeBlock", () => ({
    CodeBlock: ({ code }: { code: string }) => <pre>{code}</pre>,
}))

beforeEach(() => window.localStorage.clear())
afterEach(() => cleanup())

const props = { backendItems: [], devopsTopics: [], devopsLabs: labs }

describe("DevOps progress views", () => {
    it("updates the card and summary after checking steps, including reload persistence", () => {
        const lab = labs[0]
        const view = render(
            <>
                <LabCard lab={lab} />
                <LabStepsProgress labSlug={lab.slug} steps={lab.steps} />
                <LabProgressClient {...props} />
            </>,
        )
        expect(screen.getByText("Not started · 0/4 steps")).toBeTruthy()
        fireEvent.click(
            screen.getByRole("button", { name: "Mark step 1 complete" }),
        )
        expect(screen.getByText("In progress · 1/4 steps")).toBeTruthy()
        expect(screen.queryByText("No learning progress yet.")).toBeNull()
        for (let i = 2; i <= 4; i++)
            fireEvent.click(
                screen.getByRole("button", { name: `Mark step ${i} complete` }),
            )
        expect(screen.getByText("Completed · 4/4 steps")).toBeTruthy()
        const section = screen
            .getByRole("heading", { name: "Completed hands-on labs" })
            .closest("section")!
        expect(
            within(section).getByRole("link", { name: lab.title }),
        ).toBeTruthy()
        view.unmount()
        render(<LabCard lab={lab} />)
        expect(screen.getByText("Completed · 4/4 steps")).toBeTruthy()
    })

    it("does not count duplicate or stale indices as a completed lab", () => {
        window.localStorage.setItem(
            progressKeys.steps,
            JSON.stringify({ [labs[0].slug]: [0, 0, 0, 99] }),
        )
        render(<LabProgressClient {...props} />)
        expect(screen.getByText("None completed yet.")).toBeTruthy()
    })

    it("restores a backup and refreshes the displayed completion without reloading", async () => {
        window.localStorage.setItem(
            progressKeys.steps,
            JSON.stringify({ [labs[0].slug]: [0, 1, 2, 3] }),
        )
        const backup = exportProgressBackup(window.localStorage)
        window.localStorage.clear()
        render(
            <>
                <ProgressBackup />
                <LabCard lab={labs[0]} />
            </>,
        )
        const input = screen.getByLabelText("Restore progress")
        fireEvent.change(input, {
            target: {
                files: [{ size: backup.length, text: async () => backup }],
            },
        })
        await waitFor(() =>
            expect(screen.getByText("Completed · 4/4 steps")).toBeTruthy(),
        )
        expect(screen.getByRole("status").textContent).toContain(
            "Progress restored",
        )
    })
})
