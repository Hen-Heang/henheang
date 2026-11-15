import type { AICategory, Article, Prompt, Snippet } from "@/src/lib/types/ai-engineering"
import type { KnowledgeSection } from "./types"

/**
 * AI-related knowledge, deliberately split into two categories the way a
 * recruiter should read them:
 *
 * 1. AI application integration — shipping LLM features inside real products.
 * 2. AI-assisted software development — using AI tools to build software.
 * 3. AX Engineering learning — a documented curriculum, not a claim of
 *    professional agent-infrastructure experience.
 *
 * Every item here is verified against this repository or the projects it
 * describes (app/api/chat/route.ts, data/projects.ts, data/cv-data.ts).
 * Deliberately excluded because unverified: model training, fine-tuning, and
 * production-scale autonomous-agent expertise. Learning topics remain
 * explicitly labeled below.
 */
const narrativeSections: KnowledgeSection[] = [
    {
        id: "ai-application-integration",
        category: "ai-engineering",
        title: "AI application integration",
        keywords: [
            "ai", "artificial intelligence", "llm", "openai", "anthropic", "claude", "gemini", "gpt",
            "ai feature", "ai chat", "ai integration", "ai application",
            "assistant", "chatbot", "responses api", "vercel ai sdk",
        ],
        sourceLabel: "AI Engineering page",
        sourceUrl: "https://henheang.site/ai-engineering",
        content: [
            "Heang integrates LLM features into shipped products, using the Vercel AI SDK as the integration layer:",
            "- **This portfolio's own assistant** — the chat widget you're using right now — is built on the **OpenAI Responses API** with retrieval grounded in the portfolio's own structured data, so it only answers from real Heang content.",
            "- **Luyra** (personal finance workspace) includes an optional **Anthropic-powered Money Coach** that answers questions grounded in the user's own finance data.",
            "- **Hengo** (focused Korean-learning platform) uses OpenAI through authenticated Next.js AI routes for conversation, workplace-message analysis, phrasing generation, structured corrections, and AI Korean voice coaching.",
        ].join("\n"),
    },
    {
        id: "ai-assisted-development",
        category: "ai-engineering",
        title: "AI-assisted software development",
        keywords: [
            "ai-assisted", "ai assisted", "claude", "claude code", "codex",
            "prompt", "prompting", "prompt design", "ai code review",
            "ai workflow", "development workflow", "ai tools", "productivity",
        ],
        sourceLabel: "AI Engineering page",
        sourceUrl: "https://henheang.site/ai-engineering",
        content: [
            "Separately from building AI *into* products, Heang uses AI tools as part of how he *builds* software day to day:",
            "- **Claude Code** and **Codex** for implementation planning, code analysis, review, testing, and documentation support.",
            "- **Prompt design** as a practiced skill — he maintains a prompt library on the portfolio's AI Engineering page (see the AI Engineering library section for current categories and counts).",
            "- AI-assisted code review as part of his regular workflow, alongside — not instead of — his own review and testing.",
            "",
            "This is a productivity practice, not a claimed engineering specialty: he does not do model training, fine-tuning, or machine learning engineering.",
        ].join("\n"),
    },
    {
        id: "ax-engineering-learning",
        category: "ai-engineering",
        title: "AX Engineering — learning and experimentation",
        keywords: [
            "ax engineering", "agent harness", "mcp", "model context protocol",
            "agent orchestration", "subagent", "subagents", "agent evals",
            "guardrails", "agent observability", "agentops", "handoff",
            "context engineering", "quality gates",
        ],
        sourceLabel: "AX Engineering learning path",
        sourceUrl: "https://henheang.site/lab/ax-engineering",
        content: [
            "Heang is learning and experimenting with AX Engineering concepts while keeping backend engineering as his primary foundation and Software Engineer – Backend & AI-Assisted Development as his professional title.",
            "The version-controlled AX Engineering learning path explores Agent Harness design, context engineering, project instructions, skills, agents and subagents, MCP and tool calling, planning, permissions, sandboxing, hooks, quality gates, evaluations, observability, memory, handoff, and CI/CD integration.",
            "These are learning and practice topics, not claims of professional production-scale agent orchestration, MCP infrastructure, advanced evaluation, guardrail, or AgentOps expertise.",
            "Verified current practices remain AI-assisted development with Claude Code and Codex, plus the existing portfolio retrieval and evaluation implementation described elsewhere in the portfolio.",
        ].join("\n"),
    },
]

/**
 * Articles, prompts, snippets, and categories are authored directly in
 * Supabase through the admin panel (`portfolio_ai_articles` /
 * `portfolio_ai_prompts` / `portfolio_ai_snippets` / `portfolio_ai_categories`
 * — see src/lib/db/ai-engineering.ts) with no static data file behind them.
 * Building one compact section per item — rather than one bundled list — is
 * what lets retrieval surface only the few sections relevant to a given
 * question instead of sending the whole library to the model every turn.
 *
 * When Supabase has no rows (not yet seeded, or a fetch failure — every
 * getter already resolves to `[]` rather than throwing), the corresponding
 * sections are simply omitted rather than rendered as an empty/misleading
 * list; the two narrative sections above still cover the topic.
 */
function buildArticleSections(articles: Article[]): KnowledgeSection[] {
    return articles.map((article) => ({
        id: `ai-article-${article.slug}`,
        category: "ai-engineering",
        title: article.title,
        keywords: [
            "article", "write-up", "engineering lab", article.category.toLowerCase(),
            ...article.tags.map((t) => t.toLowerCase()),
            ...article.technologies.map((t) => t.toLowerCase()),
        ],
        sourceLabel: `${article.title} — AI Engineering article`,
        sourceUrl: `https://henheang.site/ai-engineering/articles/${article.slug}`,
        updatedAt: article.updatedAt ?? article.publishedAt,
        content: [
            `### ${article.title}`,
            article.description,
            "",
            `Category: ${article.category} · Difficulty: ${article.difficulty} · Reading time: ${article.readingTime} min`,
            article.tags.length ? `Tags: ${article.tags.join(", ")}` : "",
            article.technologies.length ? `Technologies: ${article.technologies.join(", ")}` : "",
        ]
            .filter((line) => line !== "")
            .join("\n"),
    }))
}

/**
 * The prompt text itself is included — that's the point of a prompt library
 * — but `expectedOutput` and `bestPractices` are left out to keep each
 * section short; they're on the live page for anyone who opens it.
 */
function buildPromptSections(prompts: Prompt[]): KnowledgeSection[] {
    return prompts.map((prompt) => ({
        id: `ai-prompt-${prompt.id}`,
        category: "ai-engineering",
        title: `Prompt: ${prompt.title}`,
        keywords: [
            "prompt", "prompt library", "prompt design", prompt.category,
            ...prompt.tags.map((t) => t.toLowerCase()),
        ],
        sourceLabel: `${prompt.title} — prompt library`,
        sourceUrl: "https://henheang.site/ai-engineering/prompts",
        content: [
            `### ${prompt.title}`,
            prompt.description,
            "",
            `Category: ${prompt.category}`,
            "",
            "Prompt:",
            prompt.prompt,
            prompt.tags.length ? `\nTags: ${prompt.tags.join(", ")}` : "",
        ]
            .filter((line) => line !== "")
            .join("\n"),
    }))
}

/** Not the raw `code` — the explanation is what a recruiter conversation needs; the live page has the code. */
function buildSnippetSections(snippets: Snippet[]): KnowledgeSection[] {
    return snippets.map((snippet) => ({
        id: `ai-snippet-${snippet.id}`,
        category: "ai-engineering",
        title: `Snippet: ${snippet.title}`,
        keywords: [
            "snippet", "code snippet", snippet.language.toLowerCase(),
            ...snippet.tags.map((t) => t.toLowerCase()),
        ],
        sourceLabel: `${snippet.title} — code snippet`,
        sourceUrl: "https://henheang.site/ai-engineering/snippets",
        content: [
            `### ${snippet.title}`,
            `Language: ${snippet.language}`,
            snippet.explanation,
            snippet.tags.length ? `Tags: ${snippet.tags.join(", ")}` : "",
        ]
            .filter((line) => line !== "")
            .join("\n"),
    }))
}

/** One summary section covering categories and counts — not the full catalog of items. */
function buildCatalogSection(
    categories: AICategory[],
    articles: Article[],
    prompts: Prompt[],
    snippets: Snippet[],
): KnowledgeSection | null {
    if (categories.length === 0 && articles.length === 0 && prompts.length === 0 && snippets.length === 0) {
        return null
    }

    const perCategory = categories.map((cat) => {
        const articleCount = articles.filter((a) => a.category === cat.slug).length
        const promptCount = prompts.filter((p) => p.category === cat.slug).length
        return `- **${cat.title}**${cat.emoji ? ` ${cat.emoji}` : ""}: ${cat.description} (${articleCount} article${articleCount === 1 ? "" : "s"}, ${promptCount} prompt${promptCount === 1 ? "" : "s"})`
    })

    return {
        id: "ai-engineering-catalog",
        category: "ai-engineering",
        title: "AI Engineering library — categories, articles, prompts, and snippets",
        keywords: [
            "categories", "category", "library", "catalog", "how many",
            "list of prompts", "list of articles", "list of snippets",
        ],
        sourceLabel: "AI Engineering page",
        sourceUrl: "https://henheang.site/ai-engineering",
        content: [
            `The AI Engineering library currently has ${articles.length} article${articles.length === 1 ? "" : "s"}, ${prompts.length} prompt${prompts.length === 1 ? "" : "s"}, and ${snippets.length} code snippet${snippets.length === 1 ? "" : "s"}, organized into ${categories.length} categor${categories.length === 1 ? "y" : "ies"}:`,
            "",
            ...perCategory,
        ].join("\n"),
    }
}

/**
 * Exposed as a builder so the live knowledge layer (src/lib/ai/live-knowledge)
 * can rebuild these sections from Supabase rows; the static export below
 * (all empty) is the fallback when Supabase is unavailable — it keeps the
 * two verified narrative sections and simply omits the DB-only items rather
 * than inventing stale ones.
 */
export function buildAIEngineeringKnowledge(data: {
    categories: AICategory[]
    articles: Article[]
    prompts: Prompt[]
    snippets: Snippet[]
}): KnowledgeSection[] {
    const catalog = buildCatalogSection(data.categories, data.articles, data.prompts, data.snippets)
    return [
        ...narrativeSections,
        ...(catalog ? [catalog] : []),
        ...buildArticleSections(data.articles),
        ...buildPromptSections(data.prompts),
        ...buildSnippetSections(data.snippets),
    ]
}

/** Static fallback (narrative sections only) — used when Supabase is unavailable. */
export const aiEngineeringKnowledge: KnowledgeSection[] = buildAIEngineeringKnowledge({
    categories: [],
    articles: [],
    prompts: [],
    snippets: [],
})
