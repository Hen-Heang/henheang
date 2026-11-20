# Hen Heang — Developer Portfolio

Backend-focused portfolio for [Hen Heang](https://henheang.site), a Java and Spring Boot developer based in Seoul. The site presents professional experience, engineering case studies, an open backend learning lab, recruiter-friendly resume views, and a retrieval-grounded AI assistant.

[Live site](https://henheang.site) · [Resume](https://henheang.site/resume) · [LinkedIn](https://www.linkedin.com/in/hen-heang) · [GitHub](https://github.com/Hen-Heang)

## Portfolio focus

- Primary engineering stack: Java, Spring Boot, Spring Security, MyBatis, PostgreSQL, and Oracle.
- Supporting product stack: Next.js 16, React 19, TypeScript, Supabase, and AI integrations.
- Major projects include architecture, API, data-model, security, and trade-off details on their case-study pages.
- Supabase-managed portfolio content falls back to typed static data when credentials are absent or a query fails.

## Main routes

| Route              | Purpose                                                    |
| ------------------ | ---------------------------------------------------------- |
| `/`                | Recruiter-focused overview and selected backend work       |
| `/projects`        | Filterable project index                                   |
| `/projects/[slug]` | Full engineering case studies                              |
| `/lab`             | Engineering Lab overview, library, and progress            |
| `/lab/backend`     | Java and Spring Boot curriculum                            |
| `/about`           | Experience, education, and background                      |
| `/journey`         | Current engineering growth and milestones                  |
| `/resume`          | Primary recruiter-friendly resume with Print / Save as PDF |
| `/cv`              | Modern CV view with Print / Save as PDF                    |
| `/contact`         | Supabase-backed contact form                               |
| `/admin`           | Authenticated content management                           |

## Featured work

- **H-Phsar:** Spring Boot and MyBatis B2B marketplace API with Spring Security, JWT, PostgreSQL, order workflows, and real-time notifications.
- **AuthHub:** reusable Spring Security service with token revocation, MFA, RBAC, audit logging, Flyway, and PostgreSQL.
- **H-Space:** personal software ecosystem on Next.js 16 and React 19. Hengo Learning (Korean for engineers and international professionals in Korea) uses Supabase RLS, spaced repetition, AI voice coaching, and authenticated Vercel AI SDK/OpenAI routes. Finance, merged in from the former standalone Luyra app, runs budgets, savings, reviews, and scheduled Telegram/email alerts through server-only routes over Neon Postgres.

## Technology

**Portfolio application:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Motion, Supabase, Vercel Analytics, and Vercel Speed Insights. The icon-only technology carousel uses Motion's `animate()` API for its accessible, pausable auto-scroll.

**Professional focus:** Java, Spring Boot, Spring Security, MyBatis, PostgreSQL, Oracle, Redis, eGovFramework, REST APIs, testing, Docker, and verified DevOps fundamentals.

## Project structure

```text
app/                         Next.js App Router pages, metadata, and API routes
data/                        Typed static content and Supabase fallbacks
data/lab/backend/            Validated backend curriculum and articles
e2e/                         Playwright browser tests
public/                      Images and static assets
scripts/                     Repository utilities and seed script
src/components/              Homepage, layout, project, resume, and UI components
src/lib/                     Types, schemas, database access, AI, and utilities
supabase/                    Local Supabase configuration and migrations
```

Backend Lab content is parsed with Zod during module load and build. Published topics create detail routes; planned topics remain discoverable in the roadmap without creating empty pages. Learning progress is stored locally in the visitor’s browser.

## Getting started

```bash
git clone https://github.com/Hen-Heang/hen-heang-portfolio.git
cd hen-heang-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env.local`. No environment variables are required to render the public site because typed static fallbacks are included.

- **Supabase:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY`. The service-role key is required for contact submissions and protected content operations.
- **OpenAI:** `OPENAI_API_KEY` enables the portfolio assistant. `OPENAI_MODEL`, `OPENAI_DEEP_MODEL`, and `OPENAI_FALLBACK_MODEL` optionally override built-in model defaults.
- **Rate limiting:** `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` provide cross-instance limits for AI and contact requests. Local development falls back to an in-memory limiter.
- **Live evaluations:** `RUN_LIVE_EVALS=1` enables billed model evaluations when a valid OpenAI key is present.

Admin-managed JSON is validated with the same Zod schemas used by the public site. Static files in `data/` remain the fallback source when Supabase is unavailable.

## Scripts and verification

```bash
npm run lint          # ESLint
npm run typecheck     # TypeScript
npm run test          # Vitest
npm run test:watch    # Vitest watch mode
npm run build         # Production build
npm run test:e2e      # Playwright; starts or reuses the local Next.js server
npm run format        # Prettier write
npm run format:check  # Prettier check
```

Install Chromium once with `npx playwright install chromium`. Linux and CI environments can use `npx playwright install --with-deps chromium`.

## Theme and accessibility

The site supports light and dark themes and defaults to the visitor’s system theme. It includes keyboard-accessible navigation and dialogs, visible focus treatment, reduced-motion support, semantic landmarks, responsive layouts, and print styles for both resume views.

## Deployment

The production site is deployed on Vercel. CI runs lint, type checking, unit tests, build verification, and Playwright checks before deployment.

## Contact

- Email: [henheang15@gmail.com](mailto:henheang15@gmail.com)
- LinkedIn: [linkedin.com/in/hen-heang](https://www.linkedin.com/in/hen-heang)
- GitHub: [github.com/Hen-Heang](https://github.com/Hen-Heang)
