export { axConcepts } from "./concepts"
export { axLabs } from "./labs"
export { axRoadmap } from "./roadmap"
export { axSources } from "./sources"

import type { AXWorkflowStep } from "@/src/lib/types/ax-engineering"

export const axMentalModel = [
    "Human",
    "Agent Harness",
    "AI Agent / Model",
    "Tools",
    "Software",
    "Verification",
    "Feedback",
] as const

export const axWorkflow: AXWorkflowStep[] = [
    { label: "Requirement", detail: "Define the outcome and constraints." },
    {
        label: "Load Instructions",
        detail: "Apply project rules and boundaries.",
    },
    { label: "Retrieve Context", detail: "Select relevant code and evidence." },
    { label: "Plan", detail: "Sequence verifiable work." },
    { label: "Investigate", detail: "Test assumptions against current state." },
    { label: "Tool Calls / MCP", detail: "Use authorized capabilities." },
    { label: "Implement", detail: "Make the smallest coherent change." },
    { label: "Hooks", detail: "Run deterministic lifecycle automation." },
    { label: "Quality Gates", detail: "Compile, test, lint, and inspect." },
    { label: "Independent Review", detail: "Seek a separate critical pass." },
    { label: "Eval", detail: "Measure expected agent behavior." },
    {
        label: "Human Approval",
        detail: "Keep accountable decisions with people.",
    },
    { label: "PR / CI", detail: "Use standard integration controls." },
    { label: "Handoff", detail: "Transfer verified state and risks." },
    {
        label: "Learn / Improve",
        detail: "Feed evidence into the next iteration.",
    },
]
export { axHarness } from "./harness"
