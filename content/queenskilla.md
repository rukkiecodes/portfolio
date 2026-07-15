QueenSkilla is a full, production-grade marketplace I designed and built end to end: a federated microservices backend, a server-rendered web app, and a native mobile app, sharing one GraphQL contract and one design language.

## Snapshot

| | |
| --- | --- |
| **What it is** | Two-sided marketplace for verified student talent and businesses hiring them |
| **My role** | Sole architect & full-stack engineer — product, backend, web, mobile, infra, design system |
| **Scope** | 12 federated backend services · GraphQL gateway · Nuxt web app · Expo mobile app · admin panel · ~35-table domain model |
| **Status** | Early access / pre-launch — web live on Vercel, mobile in EAS preview with direct APK install ahead of store release |

## The problem

Freelance marketplaces have a trust problem in both directions. Businesses can't tell who can actually do the work, and talent — especially students with no track record — can't prove they can, or trust they'll get paid. QueenSkilla closes both gaps at once:

- **Talent proves ability** through timed, AI-graded skill certifications and ID/face verification, then builds a portfolio automatically from real delivered work.
- **Businesses hire with confidence** — every profile is skill-tested and verified, money sits in escrow until work is approved, and any disagreement can be escalated to a reviewed dispute.

The result is a marketplace where reputation is earned and payment is guaranteed on delivery.

## What it does

**For talent (students)**

- Take timed skill assessments; earn verifiable, shareable certificates
- Get ID- and face-verified to unlock a trust badge and marketplace visibility
- Apply to projects, deliver in a real-time workspace, and get paid to a wallet
- Auto-generated portfolio — every approved project becomes a portfolio piece

**For businesses**

- Post projects with budgets and durations; browse skill-tested, verified talent
- Fund escrow up front; release only on approval, milestone by milestone
- Chat, share files, and track submissions per project
- Rate talent bilaterally; raise disputes that freeze escrow for fair resolution

**Platform-wide**

- Escrow accounting with a talent wallet and live-FX withdrawals
- 11 categories of in-app + push notifications with per-category mute controls
- A dedicated admin panel for verifications, disputes, and reports
- Verifiable certificates rendered to downloadable PDFs

## Architecture

QueenSkilla is a **monorepo of independently deployable services** composed behind a single GraphQL endpoint. An Apollo Federation gateway composes 12 subgraphs and forwards the authenticated user's identity to every service, so each service stays focused on its own domain while the client sees one unified schema.

- **12 domain services**, each owning its slice of the model: users & verification, projects & applications, payments & escrow, Paystack integration, chat, disputes, ratings, portfolio, notifications, email, AI certification, and the skills catalog.
- **Two first-class clients** off the same GraphQL contract: a server-rendered Nuxt web app and a native Expo mobile app, with GraphQL operations and types kept in sync between them.
- **One data plane**: Supabase Postgres (via the transaction pooler for serverless-safe connections), Supabase Realtime for chat and live notifications, and Cloudinary for media.

**A representative design decision.** Talent visibility is gated in exactly one place — the backend `users` query — rather than in each client. Requiring a profile to be verified *and* have a photo before it appears anywhere is enforced in SQL, so it applies identically to the web home page, the mobile talent search, and the leaderboard, and it keeps pagination correct. One rule, one source of truth, every surface.

## Tech stack

| Layer | Choices |
| --- | --- |
| **Web** | Nuxt 4 · Vue 3 (Composition API) · Pinia · TanStack Vue Query · Zod · SSR with a cookie-auth BFF layer |
| **Mobile** | Expo SDK 55 · React Native 0.83 · React 19 · Expo Router · TanStack Query · Zustand · Reanimated 4 · EAS Build + OTA updates |
| **Backend** | Node.js · TypeScript · Apollo Server + Apollo Federation · GraphQL |
| **Data** | Supabase (Postgres, Realtime, Storage) · ~35-table relational model · Cloudinary media |
| **Payments** | Paystack — USD-denominated escrow with live-FX USD→NGN payouts |
| **AI** | Google Gemini 2.5 Pro — structured (JSON-schema) generation & grading of certification exams |
| **Auth** | JWT access + rotating refresh tokens — HttpOnly cookies on web, secure-store tokens on mobile; separate admin identity |

## Engineering highlights

- **Escrow that actually accounts.** Funding, holding, milestone release, wallet crediting, and withdrawal are modeled as first-class ledger state — money only moves on approval, disputes freeze it, and payouts convert USD balances to NGN at live FX before hitting Paystack.
- **AI certification with verifiable output.** The AI service drives Gemini 2.5 Pro with response schemas so exam generation and grading return structured, parseable results — feeding a certificate system with public verification and PDF rendering.
- **Federation done deliberately.** Splitting into 12 subgraphs behind a composing gateway let each domain deploy and scale on its own while the clients still consume one schema. Identity is injected at the gateway and trusted downstream, keeping every service stateless.
- **True cross-platform without a shared UI framework.** Web (Vue) and mobile (React Native) don't share components, so I unified them at the layers that matter: a single GraphQL contract, mirrored typed operations, and a custom Apple-inspired design system codified well enough to be exported as a reusable design skill.
- **Trust as a system property.** ID + face verification, admin approval workflows, bilateral ratings, dispute-backed escrow, and visibility gating are wired through the data model, so an untrustworthy profile simply can't surface.
- **Shipping ahead of the stores.** For early access I built a direct-install path: the web app resolves the *latest* EAS preview build live via the Expo API and redirects to the current APK, so the download link never goes stale as new builds ship.

## What I took away

QueenSkilla is the project where I owned the whole stack — schema to pixels, Postgres to push notifications — and had to make the boring-but-critical calls: where a rule lives so it can't drift, how money is allowed to move, how two very different clients stay honest against one backend. It's a marketplace, a payments system, an assessment engine, and a trust platform in one codebase, and it works as a product, not a demo.
