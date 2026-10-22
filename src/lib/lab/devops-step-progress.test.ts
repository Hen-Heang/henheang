import { describe, expect, it } from "vitest"
import { countCompletedLabSteps } from "./devops-step-progress"

describe("lab completion", () => {
    it("requires distinct valid indices rather than an array length", () => {
        expect(countCompletedLabSteps([0, 0, 0, 99], 4)).toBe(1)
        expect(countCompletedLabSteps([0, 1, 2, 3, 100], 4)).toBe(4)
        expect(countCompletedLabSteps(["0", -1, 1.5, null], 4)).toBe(0)
        expect(countCompletedLabSteps(null, 4)).toBe(0)
    })
})
