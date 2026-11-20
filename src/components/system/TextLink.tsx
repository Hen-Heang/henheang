import React from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/src/lib/utils/utils"
import { textLinkStyle } from "@/src/components/system/actionStyles"

interface TextLinkProps {
    href: string
    external?: boolean
    arrow?: boolean
    className?: string
    children: React.ReactNode
}

/** Brand-coloured text link (44px hit area) with an optional trailing arrow that nudges on hover. */
export function TextLink({ href, external = false, arrow = true, className, children }: TextLinkProps) {
    const classes = cn(
        "group", textLinkStyle,
        className,
    )
    const arrowIcon = arrow ? (
        external ? (
            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
        ) : (
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
        )
    ) : null

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
                {children}
                {arrowIcon}
            </a>
        )
    }
    return (
        <Link href={href} className={classes}>
            {children}
            {arrowIcon}
        </Link>
    )
}
