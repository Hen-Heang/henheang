"use client"

import type React from "react"
import { Mail, MapPin, MessageSquare, ExternalLink } from "lucide-react"
import {
    FacebookIcon,
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    TelegramIcon,
    type SocialIconProps,
} from "@/src/components/icons/social"
import { ContactForm } from "@/src/components/sections/contact/ContactForm"
import { usePersonalInfo } from "@/src/providers/site-content-provider"
import { SiteHeader } from "@/src/components/layout/SiteHeader"
import { Footer } from "@/src/components/ui/Footer"
import { Container } from "@/src/components/system/Container"
import { Eyebrow } from "@/src/components/system/Eyebrow"
import { StatusBadge } from "@/src/components/system/StatusBadge"
import { cn } from "@/src/lib/utils/utils"

// Contact cards tint every icon with the single brand accent, so the social
// marks render as monochrome glyphs instead of five competing brand colours.
const mono = (Icon: (props: SocialIconProps) => React.ReactElement) =>
    function MonoSocialIcon(props: Omit<SocialIconProps, "brand">) {
        return <Icon {...props} brand={false} />
    }
const MonoLinkedin = mono(LinkedinIcon)
const MonoTelegram = mono(TelegramIcon)
const MonoGithub = mono(GithubIcon)
const MonoFacebook = mono(FacebookIcon)
const MonoInstagram = mono(InstagramIcon)

export function ContactPageClient() {
    const personalInfo = usePersonalInfo()
    const contactCards = [
        { title: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, newTab: false, icon: Mail },
        { title: "LinkedIn", value: "Hen Heang", href: personalInfo.socialLinks.linkedin, newTab: true, icon: MonoLinkedin },
        { title: "Telegram", value: "@henheang", href: personalInfo.socialLinks.telegram, newTab: true, icon: MonoTelegram },
        { title: "GitHub", value: "Hen-Heang", href: personalInfo.socialLinks.github, newTab: true, icon: MonoGithub },
        { title: "Facebook", value: "HenHeang15", href: personalInfo.socialLinks.facebook, newTab: true, icon: MonoFacebook },
        { title: "Instagram", value: "@hen_heang", href: personalInfo.socialLinks.instagram, newTab: true, icon: MonoInstagram },
    ].filter((card) => Boolean(card.href))
    const PRIMARY = ["Email", "LinkedIn", "GitHub"]
    const primaryCards = contactCards.filter((card) => PRIMARY.includes(card.title))
    const otherCards = contactCards.filter((card) => !PRIMARY.includes(card.title))

    return (
        <div className="min-h-screen bg-background text-fg">
            <SiteHeader />

            <main className="py-section pt-12 md:pt-16">
                <Container>
                    <div className="mb-16 max-w-2xl">
                        <Eyebrow className="mb-4">
                            <MessageSquare size={12} className="mr-1 inline" aria-hidden /> Contact
                        </Eyebrow>
                        <h1 className="text-display-sm text-fg">Let&apos;s build something together.</h1>
                        <p className="mt-4 text-lg leading-relaxed text-fg-secondary">
                            Whether you have a specific project in mind or just want to explore
                            potential collaborations, I&apos;m always open to new opportunities.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-12">
                        <div className="rounded-xl border border-border bg-surface p-8 lg:col-span-7 md:p-10">
                            <h2 className="mb-8 text-lg font-semibold text-fg">Drop me a line</h2>
                            <ContactForm />
                        </div>

                        <div className="space-y-6 lg:col-span-5">
                            {/* Email, LinkedIn and GitHub are where hiring conversations
                                happen, so they get full cards (email widest); the other
                                channels stay one tap away in a compact row. */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                {primaryCards.map((card) => (
                                    <a
                                        key={card.title}
                                        href={card.href}
                                        target={card.newTab ? "_blank" : undefined}
                                        rel={card.newTab ? "noopener noreferrer" : undefined}
                                        className={cn(
                                            "group relative block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong",
                                            card.title === "Email" && "sm:col-span-2",
                                        )}
                                    >
                                        <card.icon size={18} className="text-brand" />
                                        <p className="mt-4 text-xs font-medium text-fg-muted">
                                            {card.title}
                                        </p>
                                        <p className="mt-1 break-all text-sm font-medium text-fg">{card.value}</p>
                                        {card.newTab && (
                                            <ExternalLink
                                                size={13}
                                                className="absolute right-4 top-4 text-fg-muted"
                                                aria-hidden
                                            />
                                        )}
                                        {card.newTab && <span className="sr-only"> (opens in a new tab)</span>}
                                    </a>
                                ))}
                            </div>
                            {otherCards.length > 0 && (
                                <ul aria-label="Other channels" className="flex flex-wrap gap-2">
                                    {otherCards.map((card) => (
                                        <li key={card.title}>
                                            <a
                                                href={card.href}
                                                target={card.newTab ? "_blank" : undefined}
                                                rel={card.newTab ? "noopener noreferrer" : undefined}
                                                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-fg-secondary transition-colors hover:border-border-strong hover:text-fg"
                                            >
                                                <card.icon size={15} className="text-fg-muted" />
                                                <span>{card.title}</span>
                                                <span className="text-fg-muted">{card.value}</span>
                                                {card.newTab && <span className="sr-only"> (opens in a new tab)</span>}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="rounded-xl border border-border bg-surface p-6">
                                <MapPin size={18} className="text-fg-muted" aria-hidden />
                                <h3 className="mt-4 text-base font-semibold text-fg">Location</h3>
                                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                                    Currently based in Seoul, South Korea. Open to remote opportunities
                                    worldwide.
                                </p>
                                <div className="mt-4">
                                    <StatusBadge status="live" pulse>Ready for work</StatusBadge>
                                </div>
                            </div>

                            <div className="rounded-xl border border-border bg-surface p-6">
                                <h4 className="text-sm font-semibold text-fg">Working Hours</h4>
                                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                                    Typically replying within 1–2 business days. Mon–Fri, 9:00 AM–6:00 PM (KST).
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    )
}
