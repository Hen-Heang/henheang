"use client"

import React, { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { primaryAction } from "@/src/components/system/actionStyles"
import { cn } from "@/src/lib/utils/utils"
import { submitContactForm } from "@/app/contact/actions"

export function ContactForm() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "", // honeypot — real users never see or fill this in
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formRenderedAt] = useState(() => Date.now())

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormState((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const result = await submitContactForm({
            ...formState,
            honeypot: formState.website,
            formRenderedAt,
        })

        setIsSubmitting(false)

        if (!result.success) {
            setError(result.error ?? "Something went wrong. Please try again or email me directly.")
            return
        }

        setIsSubmitted(true)
        setFormState({
            name: "",
            email: "",
            subject: "",
            message: "",
            website: "",
        })

        setTimeout(() => setIsSubmitted(false), 5000)
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Honeypot — invisible and untabbable to real users; bots that fill every field trip it */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                    type="text"
                    id="website"
                    name="website"
                    value={formState.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <div aria-live="polite" role="status">
                {error && (
                    <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}
                {isSubmitted && (
                    <div className="mb-6 flex items-start gap-3 rounded-lg border border-success/30 bg-success/10 p-4">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" aria-hidden />
                        <div>
                            <p className="text-sm font-medium text-fg">Thanks for reaching out!</p>
                            <p className="mt-1 text-xs text-fg-muted">
                                I&apos;ve received your message and will get back to you within 1&ndash;2 business days.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-fg">
                        Name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="min-h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-fg placeholder:text-fg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
                        Email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="min-h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-fg placeholder:text-fg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        placeholder="your@email.com"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-fg">
                    Subject <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="min-h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-fg placeholder:text-fg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    placeholder="Project Inquiry"
                />
            </div>
            <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
                    Message <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="min-h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-fg placeholder:text-fg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    placeholder="Tell me about your project..."
                />
            </div>
            <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(primaryAction, "w-full")}
            >
                {isSubmitting ? "Sending…" : "Send Message"}
            </Button>
        </form>
    )
}
