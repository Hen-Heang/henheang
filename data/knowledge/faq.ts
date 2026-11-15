import type { KnowledgeSection } from "./types"

/**
 * Curated recruiter FAQ. Every answer here is backed by facts that already
 * exist elsewhere in the knowledge base — this section just phrases them the
 * way recruiters ask.
 */
export const faqKnowledge: KnowledgeSection[] = [
    {
        id: "faq-recruiters",
        category: "faq",
        title: "Frequently asked questions",
        keywords: ["faq", "relocate", "relocation", "remote", "onsite", "notice", "available", "availability", "visa", "seoul", "korea", "strength", "why", "fit", "team", "english", "korean", "backend or frontend"],
        content: [
            "**Q: Backend or full-stack?**",
            "A: Heang is a backend-focused Software Engineer (Backend & AI-Assisted Development). His verified foundation is Java, Spring Boot, MyBatis, and PostgreSQL/Oracle; he uses AI-assisted development in practice and is learning agent-engineering concepts separately.",
            "",
            "**Q: Where is he based and can he work in Korea?**",
            "A: He lives and works in Seoul, South Korea, employed at Bizplay in the Korean enterprise sector.",
            "",
            "**Q: What languages can he work in?**",
            "A: Khmer (native), English (professional working proficiency), and Korean (elementary conversational).",
            "",
            "**Q: What kind of systems has he built?**",
            "A: Enterprise financial web applications for government and corporate clients, B2B billing and payment platforms, marketplace APIs, and personal-finance and AI-learning products as solo side projects.",
            "",
            "**Q: Does he have real database experience?**",
            "A: Yes — schema design, Flyway migrations, query optimization, and Row Level Security on PostgreSQL, plus Oracle and SQL tuning in his day job.",
            "",
            "**Q: Is he open to new opportunities?**",
            "A: Yes. The fastest way to reach him is email (henheang15@gmail.com) or LinkedIn.",
        ].join("\n"),
    },
]
