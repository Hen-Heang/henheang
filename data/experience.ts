import type { ExperienceItem } from "@/src/lib/types"

export const experiences: ExperienceItem[] = [
    {
        role: "Software Engineer – Backend & AI-Assisted Development",
        company: "Bizplay",
        period: "October 2025 — Present",
        location: "Seoul, South Korea",
        summary: "Maintaining and developing enterprise financial applications at Bizplay (Webcash Group) for government agencies and corporate clients — Java and MyBatis business logic, Oracle SQL, and the enterprise web interfaces around them.",
        highlights: [
            "Implement Java and MyBatis business logic for enterprise financial applications",
            "Write and analyze SQL queries against Oracle databases",
            "Develop and maintain enterprise web interfaces, including voucher administration screens built with HTML, CSS, and jQuery",
            "Analyze technical requirements and system design before implementation",
            "Use AI coding assistants for code analysis, implementation, troubleshooting, and review preparation, while owning the correctness of each change",
            "Collaborate with development teams and follow established coding standards in a Korean enterprise environment"
        ],
        stack: ["Java", "MyBatis", "Oracle", "SQL", "JavaScript", "jQuery", "HTML/CSS", "REST APIs"]
    },
    {
        role: "Software Engineer",
        company: "KOSIGN [Korea Software Innovation Global Network]",
        period: "January 2024 — October 2025",
        location: "Phnom Penh, Cambodia",
        summary: "Developed B2B financial platforms including billing systems and e-commerce solutions. Built end-to-end features from database design to API implementation.",
        highlights: [
            "Contributed to WeBill365, a B2B billing product with Vietnamese banking integrations",
            "Designed PostgreSQL database schemas and optimized query performance",
            "Implemented Spring Security with JWT authentication",
            "Developed REST APIs with Spring Boot and MyBatis",
            "Collaborated with Korean development teams on enterprise projects"
        ],
        stack: ["Java 8+", "Spring Boot", "MyBatis", "PostgreSQL", "Spring Security", "Next.js", "TypeScript"]
    }
]
