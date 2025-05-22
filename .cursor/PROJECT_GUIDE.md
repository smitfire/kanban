# Kanban Project Guide (Cursor Reference)

## Workflow Strategy

1. **Branching:**
   - For each ticket/issue, create a feature branch named `feature/<issue-number>-<short-description>` (e.g., `feature/2-drizzle-schema`).
   - All work for a ticket is done in its branch.

2. **Implementation:**
   - Follow the ticket description, README, and architecture docs for guidance.
   - Reference the ticket number in commit messages (e.g., `feat: implement Drizzle ORM schema (#2)`).

3. **Pull Request (MR):**
   - When ready, push the branch and open a PR to `main`.
   - Link the PR to the issue using `Closes #<issue-number>` in the PR description.
   - Request review.

4. **Review & Merge:**
   - Review for code quality, completeness, and adherence to architecture.
   - Once approved, merge the PR. The ticket will be closed automatically if linked.

---

## Tools & Stack

- **Frontend/Full-stack:** Fresh (Deno, Preact, Islands architecture)
- **Database:** Supabase PostgreSQL
- **ORM:** Drizzle ORM
- **Auth:** Supabase Auth
- **LLM:** LangChain.js / OpenAI SDK
- **Messaging:** Twilio (WhatsApp), modular for future channels
- **Edge Data:** Deno KV
- **Deployment:** Deno Deploy
- **Testing/Quality:** Deno test, lint, fmt
- **UI:** Tailwind CSS, daisyUI, (optionally Headless UI, HyperUI, Flowbite)
- **Docs:** README.md, docs/architecture.md, .cursor/PROJECT_GUIDE.md

---

## Reference Docs
- [README.md](../README.md): Project overview, stack, setup
- [docs/architecture.md](../docs/architecture.md): Architecture, design decisions
- [GitHub Issues](https://github.com/smitfire/kanban/issues): Task tracking

---

## Best Practices
- TypeScript everywhere
- Small, focused commits
- Keep docs up to date
- Use environment variables for secrets
- Write tests for new features
- Use code reviews for all merges
- Use Tailwind CSS and daisyUI for rapid, consistent UI

---

_This file is for quick reference in Cursor and should be updated as the project evolves._
