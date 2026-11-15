import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/src/components/ThemeProvider"
import { SiteContentProvider } from "@/src/providers/site-content-provider"
import { MotionProvider } from "@/src/providers/motion-provider"
import { RouteScrollReset } from "@/src/components/utils/RouteScrollReset"
import { AssistantWidget } from "@/src/components/assistant"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { profileData } from "@/data/profile"
import { getSiteContent } from "@/src/lib/db/portfolio"
import { positioning } from "@/src/lib/content/positioning"
import "./globals.css"

// Re-render at most once a minute so admin edits show up without a redeploy.
export const revalidate = 60
const enableVercelTelemetry = process.env.VERCEL === "1"

const inter = localFont({
    src: [
        { path: "../public/fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
        { path: "../public/fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
        { path: "../public/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
    ],
    variable: "--font-inter",
    display: "swap",
    fallback: ["system-ui", "-apple-system", "sans-serif"],
})

const jetbrainsMono = localFont({
    src: [
        { path: "../public/fonts/JetBrainsMono-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/JetBrainsMono-Medium.woff2", weight: "500", style: "normal" },
    ],
    variable: "--font-mono",
    display: "swap",
    fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
})

// Title and description are code-owned positioning (src/lib/content/positioning.ts)
// so search results, social cards, and the hero always say the same thing.
const siteTitle = `${profileData.fullName} | ${positioning.headline}`
const siteDescription = `${positioning.description} Based in ${profileData.location}.`

export const metadata: Metadata = {
    metadataBase: new URL(profileData.portfolioUrl),
    title: {
        default: siteTitle,
        template: `%s | ${profileData.fullName}`,
    },
    description: siteDescription,
    keywords: profileData.knowsAbout.concat([
        positioning.title, "Backend Engineer", profileData.fullName, profileData.location, profileData.company, "Portfolio",
    ]),
    authors: [{ name: profileData.fullName, url: profileData.portfolioUrl }],
    alternates: {
        canonical: profileData.portfolioUrl,
    },
    icons: {
        icon: "/icon",
        apple: "/apple-icon",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: profileData.portfolioUrl,
        siteName: `${profileData.fullName} — Portfolio`,
        title: siteTitle,
        description: siteDescription,
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.fullName,
    url: profileData.portfolioUrl,
    jobTitle: positioning.title,
    description: positioning.description,
    worksFor: { "@type": "Organization", name: profileData.company },
    address: { "@type": "PostalAddress", addressLocality: "Seoul", addressCountry: "KR" },
    email: profileData.email,
    sameAs: [
        profileData.socialLinks.github,
        profileData.socialLinks.linkedin,
        profileData.socialLinks.facebook,
        profileData.socialLinks.instagram,
    ].filter(Boolean),
    knowsAbout: profileData.knowsAbout,
    subjectOf: {
        "@type": "WebPage",
        name: "Resume",
        url: profileData.cvUrl,
    },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const [profile, cv] = await Promise.all([
        getSiteContent("profile"),
        getSiteContent("cv"),
    ])

    return (
        <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
        <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <MotionProvider>
                    <SiteContentProvider initialContent={{ profile, cv }}>
                        <RouteScrollReset />
                        {children}
                        <AssistantWidget />
                    </SiteContentProvider>
                </MotionProvider>
            </ThemeProvider>
            {enableVercelTelemetry && <Analytics />}
            {enableVercelTelemetry && <SpeedInsights />}
        </body>
        </html>
    )
}
