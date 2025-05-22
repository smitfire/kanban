# AI-Enhanced Kanban Board

## Project Overview

**Project Name:** AI-Enhanced Kanban Board (Placeholder)

A modern, interactive Kanban board application inspired by Jira and Trello, designed for teams and individuals to manage tasks and workflows. The app features integration with Large Language Models (LLMs) for intelligent assistance (e.g., ticket summarization, suggestions), and is architected for future expansion into messaging platforms (WhatsApp, Slack, etc.) for notifications and conversational task management.

## Core Features
- Kanban board with projects, tickets, comments, and user management
- LLM-powered features: ticket summarization, suggestions, and more
- Supabase Auth for secure authentication (email/password, OAuth)
- Messaging integration (WhatsApp via Twilio, future MCP)
- Real-time updates and notifications
- Type-safe, scalable, and modern stack

## Tech Stack

| Layer         | Technology/Service         | Rationale                                                                 |
|--------------|---------------------------|--------------------------------------------------------------------------|
| Frontend     | [Fresh](https://fresh.deno.dev/) (Deno, Preact) | SSR, islands architecture, minimal JS, fast, type-safe, deploys to Deno Deploy |
| Database     | [Supabase PostgreSQL](https://supabase.com/)    | Managed relational DB, RLS, integrated auth, free tier                   |
| ORM          | [Drizzle ORM](https://orm.drizzle.team/)        | Type-safe, zero-runtime, Deno support                                    |
| Auth         | Supabase Auth              | Secure, social logins, JWT sessions                                      |
| LLM          | LangChain.js / OpenAI SDK  | Robust LLM API integration, Deno compatible                              |
| Messaging    | Twilio (WhatsApp), Deno    | Industry standard, easy webhook/API integration                          |
| Edge Data    | Deno KV                    | Fast, ephemeral storage, session/cache                                   |
| Deployment   | Deno Deploy                | Serverless, global, easy, free tier                                      |

## Architectural Highlights
- **SSR by default** for fast loads and SEO
- **Islands architecture** for interactive UI with minimal JS
- **API routes** in Fresh for backend logic, LLM, and messaging webhooks
- **TypeScript everywhere** for end-to-end type safety
- **Modular messaging** for easy future channel expansion
- **Drizzle ORM** for schema, migrations, and type-safe DB access
- **Deno KV** for sessions, caching, and ephemeral state

## Database Schema (Drizzle ORM, PostgreSQL)

See [`db/schema.ts`](db/schema.ts) for the full schema. Core tables:
- `users` (integrated with Supabase Auth)
- `projects` (owned by users)
- `tickets` (Kanban cards, belong to projects)
- `comments` (on tickets)
- `llm_interactions` (logs LLM API calls)

## Key Integrations
- **Supabase Auth:** Secure user management, JWT sessions, RLS
- **Drizzle ORM:** Type-safe DB access, migrations
- **LLM (LangChain.js/OpenAI):** Backend API calls for AI features
- **Twilio WhatsApp:** Webhooks for incoming/outgoing messages
- **Deno KV:** Sessions, OAuth state, caching

## Development Workflow
- TypeScript everywhere
- Deno tooling: `deno test`, `deno fmt`, `deno lint`
- Local Supabase via `supabase cli`
- Fresh dev server with HMR
- Git for version control

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone <repo-url>
   cd kanban
   ```
2. **Install Deno:** [https://deno.com/manual/getting_started/installation](https://deno.com/manual/getting_started/installation)
3. **Start Supabase locally:**
   ```sh
   supabase start
   ```
4. **Configure environment variables:** See `.env.example` for required keys (Supabase, LLM, Twilio, etc.)
5. **Run the Fresh dev server:**
   ```sh
   deno task dev
   ```
6. **Run migrations:**
   ```sh
   deno task db:migrate
   ```

## Future Roadmap
- Multi-channel messaging (Slack, Telegram, etc.)
- More LLM-powered features (auto ticket creation, smart notifications)
- Advanced analytics and reporting
- Customizable board views

---

For more details, see the [project documentation](./docs/architecture.md) and [`db/schema.ts`](./db/schema.ts).
