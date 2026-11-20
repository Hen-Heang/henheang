import React from "react"
import Link from "next/link"
import { ArrowRight, FileText, MessageCircle } from "lucide-react"
import { Container } from "@/src/components/system/Container"
import { primaryAction, secondaryAction } from "@/src/components/system/actionStyles"
import { cn } from "@/src/lib/utils/utils"
import { Reveal } from "@/src/components/system/Reveal"

export function ContactCTASection() {
    return (
        <section className="border-t border-border py-16 sm:py-24">
            <Container>
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12 lg:p-16">
                        <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <span className="text-sm font-medium text-fg-muted">
                                    Let&apos;s Build Together
                                </span>
                                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl leading-tight">
                                    Have a system or service to build?
                                </h2>
                                <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-secondary sm:text-lg">
                                    Available for Java and Spring Boot backend engineering, API architecture, and product engineering teams that value dependability.
                                </p>
                            </div>
                            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
                                <Link
                                    href="/contact"
                                    className={cn(primaryAction, "group whitespace-nowrap")}
                                >
                                    <MessageCircle size={16} aria-hidden />
                                    <span>Start a conversation</span>
                                    <ArrowRight size={15} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
                                </Link>
                                <Link
                                    href="/resume"
                                    className={cn(secondaryAction, "whitespace-nowrap")}
                                >
                                    <FileText size={15} aria-hidden />
                                    <span>View Resume</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    )
}
