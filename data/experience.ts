import type { ExperienceItem } from "@/src/lib/types"

export const experiences: ExperienceItem[] = [
    {
        role: "Backend Developer (Java & Spring Boot)",
        company: "Bizplay",
        period: "October 2025 — Present",
        location: "Seoul, South Korea",
        summary: "Building enterprise financial web applications for government agencies and corporate clients. Developing both frontend interfaces and backend API services in Korean enterprise environment.",
        highlights: [
            "Build voucher administration screens with HTML, CSS, and jQuery",
            "Develop Java and MyBatis services for government-facing financial applications",
            "Designing SQL queries and connecting APIs to Oracle database",
            "Improving performance and stability of enterprise web applications",
            "Working in cross-functional team using Korean enterprise development patterns"
        ],
        stack: ["Java", "MyBatis", "Oracle", "JavaScript", "jQuery", "SQL", "HTML/CSS", "REST APIs"]
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
