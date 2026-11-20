import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			screens: {
				"xs": "480px",
			},
			fontFamily: {
				sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
			},
			// Type scale, top to bottom. The home hero name is the single largest
			// step on the site; page titles and section headings sit below it so a
			// section heading never outranks the person the page is about.
			fontSize: {
				display: ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.055em", fontWeight: "600" }],
				hero: ["clamp(2.75rem, 7vw, 4.75rem)", { lineHeight: "1", letterSpacing: "-0.045em", fontWeight: "700" }],
				"display-sm": ["clamp(1.875rem, 3.6vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "600" }],
			},
			maxWidth: {
				content: "80rem", // 1280px page width
				reading: "46rem", // ~736px prose width
			},
			spacing: {
				section: "clamp(4rem, 8vw, 8rem)", // 64px mobile → 128px desktop
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				surface: {
					DEFAULT: "hsl(var(--surface) / <alpha-value>)",
					hover: "hsl(var(--surface-hover) / <alpha-value>)",
					elevated: "hsl(var(--surface-elevated) / <alpha-value>)",
					code: {
						DEFAULT: "hsl(var(--surface-code) / <alpha-value>)",
						foreground: "hsl(var(--surface-code-foreground) / <alpha-value>)",
					},
				},
				fg: {
					DEFAULT: "hsl(var(--fg) / <alpha-value>)",
					secondary: "hsl(var(--fg-secondary) / <alpha-value>)",
					muted: "hsl(var(--fg-muted) / <alpha-value>)",
				},
				brand: {
					DEFAULT: "hsl(var(--brand) / <alpha-value>)",
					hover: "hsl(var(--brand-hover) / <alpha-value>)",
					active: "hsl(var(--brand-active) / <alpha-value>)",
					dark: "hsl(var(--brand-dark) / <alpha-value>)",
					foreground: "hsl(var(--brand-foreground) / <alpha-value>)",
				},
				action: {
					DEFAULT: "hsl(var(--action) / <alpha-value>)",
					hover: "hsl(var(--action-hover) / <alpha-value>)",
					active: "hsl(var(--action-active) / <alpha-value>)",
					foreground: "hsl(var(--action-foreground) / <alpha-value>)",
				},
				success: "hsl(var(--success) / <alpha-value>)",
				warning: "hsl(var(--warning) / <alpha-value>)",
				error: "hsl(var(--error) / <alpha-value>)",
				navy: {
					DEFAULT: "hsl(var(--navy) / <alpha-value>)",
					surface: "hsl(var(--navy-surface) / <alpha-value>)",
					elevated: "hsl(var(--navy-elevated) / <alpha-value>)",
				},
				border: {
					DEFAULT: "hsl(var(--border) / <alpha-value>)",
					strong: "hsl(var(--border-strong) / <alpha-value>)",
				},
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			backgroundImage: {
				"gradient-brand": "var(--gradient-brand)",
				"gradient-console": "var(--gradient-console)",
			},
			boxShadow: {
				// Brand-tinted lift for hover states — a neutral grey shadow on a
				// cyan-accented card reads as dirt rather than depth.
				brand: "0 10px 30px -12px hsl(var(--brand) / 0.35)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				// Track holds two identical copies of its children, so translating
				// exactly -50% lands on the seam and the loop is invisible.
				drift: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-50%)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				drift: "drift 240s linear infinite",
				"drift-slow": "drift 360s linear infinite",
			},
		},
	},
	plugins: [tailwindcssAnimate, tailwindcssTypography],
};

export default config;
