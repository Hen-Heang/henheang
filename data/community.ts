/**
 * Community & knowledge-sharing activity, shown on /about.
 *
 * Code-owned (not Supabase) because it is a small, rarely changing list.
 * Only record what actually happened: no organizer, date, attendance, or
 * outcome is listed unless it has been confirmed. Use `status: "planned"` for
 * sessions that have not taken place yet.
 */

export type CommunityActivity = {
    role: string
    title: string
    status: "completed" | "planned"
    audience: string
    location: string
    focus: string[]
}

export const communityActivities: CommunityActivity[] = [
    {
        role: "Volunteer AI Literacy Speaker",
        title: "AI for Everyday Life & Work",
        status: "completed",
        audience: "Cambodian community members living and working in South Korea",
        location: "Siheung-si, Gyeonggi-do, South Korea",
        focus: [
            "Introduction to AI basics",
            "Prompt writing",
            "Practical AI use for workplace productivity and communication",
            "AI for language learning and everyday activities",
        ],
    },
]
