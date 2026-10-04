import type { AXHarnessProject } from "@/src/lib/types/ax-engineering"

/**
 * The AX Engineering Harness is the hands-on project behind this learning
 * path. Its claims mirror the harness README ("What works today"), so keep
 * them in step with that repository rather than describing plans here.
 */
export const axHarness: AXHarnessProject = {
    name: "AX Engineering Harness",
    tagline:
        "A reusable engineering layer for reliable AI-assisted software development.",
    summary:
        "The learning path turned into working software: versioned contracts for roles, procedures, policies, quality gates and evals, an installable `ax` CLI that adopts a repository for Claude Code, and a read-only web console that renders every definition.",
    version: "0.3.0",
    status: "Experimental · Foundation v1",
    consoleUrl: "https://ax-engineering-harness.henheang.site/",
    githubUrl: "https://github.com/Hen-Heang/ax-engineering-harness",
    pillars: [
        "Context",
        "Agents",
        "Skills",
        "MCP",
        "Guardrails",
        "Quality Gates",
        "Evals",
    ],
    highlights: [
        {
            title: "Versioned contracts",
            detail: "JSON Schemas with generated types for projects, profiles, agents, skills, policies, pipelines, evals, runs and handoffs.",
        },
        {
            title: "Profile detection",
            detail: "Maven, Gradle and Node detection at one explicit root. Ambiguous evidence fails instead of guessing.",
        },
        {
            title: "Roles and procedures",
            detail: "Eight roles, ten procedures and two vendor adapters, with cross-definition checks that keep them coherent.",
        },
        {
            title: "Quality gates",
            detail: "Passed, failed, unavailable and unrun stay distinct. `ax quality --execute` is the only command that runs a project's own checks.",
        },
        {
            title: "Controlled delivery",
            detail: "`ax git`, `ax pr`, `ax ci` and `ax deploy` preview by default and execute only an approved plan. Force push and production deploy have no path.",
        },
        {
            title: "Web console",
            detail: "Architecture and workflow diagrams, every building block, a config explorer, quality, evals and runs — verified at four widths with accessibility checks.",
        },
    ],
    architecture: ["Human", "AX Harness Core", "Agent roles", "Controlled tools", "Software", "Verification", "Feedback"],
    commands: [
        { command: "ax init --write", detail: "Adopt a repository for Claude Code" },
        { command: "ax doctor", detail: "What is declared, exists, and could run" },
        { command: "ax validate", detail: "Resolve the declaration and its context" },
        { command: "ax quality --execute", detail: "Run the project's declared gates" },
    ],
    stack: ["TypeScript", "Node.js 24", "Next.js 16", "React 19", "JSON Schema", "Playwright"],
}
