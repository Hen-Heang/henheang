import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"
import { positioning } from "@/src/lib/content/positioning"

export const alt = `Hen Heang — ${positioning.headline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const TECH = [
    { label: "Java",        color: "#f89820" },
    { label: "Spring Boot", color: "#6db33f" },
    { label: "PostgreSQL",  color: "#60a5fa" },
    { label: "MyBatis",     color: "#93c5fd" },
    { label: "REST APIs",   color: "#e4e4e7" },
]

export default async function Image() {
    const imgBuffer = readFileSync(join(process.cwd(), "public/image/heang_new.jpeg"))
    const photo = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`

    return new ImageResponse(
        (
            <div style={{
                width: 1200, height: 630,
                backgroundColor: "#070b14",
                display: "flex", position: "relative", overflow: "hidden",
                fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
                {/* Blob TL */}
                <div style={{
                    position: "absolute", top: -120, left: -80,
                    width: 520, height: 520, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(29,78,216,0.28) 0%, transparent 70%)",
                }} />
                {/* Blob BR */}
                <div style={{
                    position: "absolute", bottom: -80, right: 340,
                    width: 380, height: 380, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
                }} />

                {/* Left: content column */}
                <div style={{
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "56px 0 56px 80px", flex: 1,
                }}>
                    {/* Available badge */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        backgroundColor: "rgba(59,130,246,0.12)",
                        border: "1px solid rgba(96,165,250,0.32)",
                        borderRadius: 100, padding: "7px 18px",
                        alignSelf: "flex-start", marginBottom: 28,
                    }}>
                        <div style={{
                            width: 7, height: 7, borderRadius: "50%",
                            backgroundColor: "#22c55e",
                        }} />
                        <span style={{
                            color: "#93c5fd", fontSize: 13, fontWeight: 800,
                            letterSpacing: "0.15em", textTransform: "uppercase",
                        }}>
                            Available for hire
                        </span>
                    </div>

                    {/* Name */}
                    <div style={{
                        color: "#ffffff", fontSize: 74, fontWeight: 900,
                        lineHeight: 1, marginBottom: 14, letterSpacing: "-0.03em",
                        display: "flex",
                    }}>
                        Hen Heang
                    </div>

                    {/* Title */}
                    <div style={{
                        color: "#e4e4e7", fontSize: 30, fontWeight: 600,
                        marginBottom: 8, letterSpacing: "-0.01em",
                        display: "flex",
                    }}>
                        {positioning.title}
                    </div>
                    <div style={{
                        color: "#60a5fa", fontSize: 24, fontWeight: 600,
                        marginBottom: 36, letterSpacing: "-0.01em",
                        display: "flex",
                    }}>
                        {positioning.specialization}
                    </div>

                    {/* Tech pills */}
                    <div style={{
                        display: "flex", gap: 10, marginBottom: 44, flexWrap: "wrap",
                    }}>
                        {TECH.map(t => (
                            <div key={t.label} style={{
                                display: "flex", alignItems: "center",
                                backgroundColor: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 8, padding: "7px 16px",
                                color: t.color, fontSize: 14, fontWeight: 700,
                                letterSpacing: "0.04em",
                            }}>
                                {t.label}
                            </div>
                        ))}
                    </div>

                    {/* Footer row */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 20,
                        fontSize: 16, fontWeight: 500,
                    }}>
                        <span style={{ color: "#71717a", display: "flex", alignItems: "center", gap: 8 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Seoul, South Korea
                        </span>
                        <div style={{
                            width: 4, height: 4, borderRadius: "50%",
                            backgroundColor: "#3f3f46",
                        }} />
                        <span style={{ color: "#60a5fa", fontWeight: 700, display: "flex" }}>
                            henheang.site
                        </span>
                    </div>
                </div>

                {/* Right: photo */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 380, padding: "60px 80px 60px 0",
                }}>
                    {/* Gradient ring */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 294, height: 294, borderRadius: 36,
                        background: "linear-gradient(135deg, #102a4c 0%, #1d4ed8 50%, #60a5fa 100%)",
                        padding: 3,
                    }}>
                        {/* Photo container */}
                        <div style={{
                            display: "flex",
                            width: "100%", height: "100%",
                            borderRadius: 32, overflow: "hidden",
                            backgroundColor: "#0b1f3a",
                        }}>
                            <img
                                src={photo}
                                style={{
                                    width: "100%", height: "100%",
                                    objectFit: "cover", objectPosition: "center top",
                                }}
                                alt="Hen Heang"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom gradient strip */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                    background: "linear-gradient(90deg, #102a4c 0%, #1d4ed8 50%, #60a5fa 100%)",
                }} />
            </div>
        ),
        { ...size }
    )
}
