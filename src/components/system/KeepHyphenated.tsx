import React from "react"

/**
 * Renders text with hyphenated words (e.g. "AI-Assisted") kept on one line, so
 * a short headline never breaks as "AI-" / "Assisted". The text content is
 * unchanged — only the wrapping opportunities are.
 */
export function KeepHyphenated({ text }: { text: string }) {
    const words = text.split(" ")
    return (
        <>
            {words.map((word, index) => (
                <React.Fragment key={`${word}-${index}`}>
                    {index > 0 && " "}
                    {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
                </React.Fragment>
            ))}
        </>
    )
}
