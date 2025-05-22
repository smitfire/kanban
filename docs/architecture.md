# Architecture & Design Decisions

## Overview
This document details the architecture, technology choices, and design rationale for the AI-Enhanced Kanban Board project.

## Stack Rationale
- **Fresh (Deno, Preact):** SSR, islands architecture, minimal JS, fast, type-safe, deploys to Deno Deploy
- **Supabase PostgreSQL:** Managed relational DB, RLS, integrated auth, free tier
- **Drizzle ORM:** Type-safe, zero-runtime, Deno support
- **Supabase Auth:** Secure, social logins, JWT sessions
- **LLM (LangChain.js/OpenAI):** Robust LLM API integration, Deno compatible
- **Twilio (WhatsApp):** Industry standard, easy webhook/API integration
- **Deno KV:** Fast, ephemeral storage, session/cache
- **Deno Deploy:** Serverless, global, easy, free tier

## Key Architectural Patterns
- **SSR by default** for fast loads and SEO
- **Islands architecture** for interactive UI with minimal JS
- **API routes** in Fresh for backend logic, LLM, and messaging webhooks
- **TypeScript everywhere** for end-to-end type safety
- **Modular messaging** for easy future channel expansion
- **Drizzle ORM** for schema, migrations, and type-safe DB access
- **Deno KV** for sessions, caching, and ephemeral state

## Authentication Flow
- Supabase Auth for registration/login (email/password, OAuth)
- JWT session management
- Fresh API routes validate JWTs for authenticated requests
- `@deno/kv-oauth` for social login flows and session state

## LLM Integration
- Backend Deno functions (Fresh API routes) call LLM APIs
- API keys stored as Deno environment variables
- Async LLM requests, optional streaming (SSE/WebSockets)

## Messaging Integration
- Twilio WhatsApp webhooks handled by Fresh API routes
- Outgoing messages sent via Twilio API
- Modular design for future Slack/Telegram/MCP support

## Database Interaction
- Drizzle ORM for all PostgreSQL access
- Deno KV for sessions, caching, ephemeral state

## Development Workflow
- TypeScript everywhere
- Deno tooling: `deno test`, `deno fmt`, `deno lint`
- Local Supabase via `supabase cli`
- Fresh dev server with HMR
- Git for version control

## See Also
- [`db/schema.ts`](../db/schema.ts) for schema
- [`README.md`](../README.md) for project overview
