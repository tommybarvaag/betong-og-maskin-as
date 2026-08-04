# General instructions

- Be extremely concise. Sacrifice grammar for the sake of concision.
- Comments: weigh every word. Keep the non-obvious "why"; cut anything the code or tests already show.
- Never use emojis. Emojis are not allowed.
- Always add air around if statements and air above return statements. This is a convention in our codebase to improve readability.
- Directories: kebab-case
- Component modules under src/components/: PascalCase filenames (ContactForm.tsx)
- Non-component modules: kebab-case (contact-schema.ts)
- Variables/functions camelCase; components PascalCase

# Code style

- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow

- Be sure to typecheck, lint, and format when you’re done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance

You are an expert in TypeScript, Node.js, Next.js App Router, React, Base UI, Zod, Tailwind, Sanity (GROQ + embedded Studio), and TanStack Form.

# Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

# Naming Conventions

- Directories: kebab-case (e.g., components/auth-wizard).
- Component modules under src/components/: PascalCase filenames (ContactForm.tsx)
- Non-component modules: kebab-case (contact-schema.ts)
- Variables/functions camelCase; components PascalCase
- Favor named exports for components.

# TypeScript Usage

- Use TypeScript for all code; prefer types over interfaces.
- Avoid enums; use maps instead and const assertions.
- Use functional components with TypeScript types.

# Syntax and Formatting

- Use the "function" keyword for pure functions.
- Use declarative JSX.
- Never add empty lines between sibling JSX elements. Keep JSX compact. Empty lines are for logical blocks (if/switch), not JSX structure.
- Always use ternaries for conditional JSX rendering. Use `{condition ? <Component /> : null}` not `{condition && <Component />}`.

# UI and Styling

- Use src/components/ui/* (shadcn + Base UI + Tailwind). Prefer existing primitives.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

# Performance Optimization

- Prefer Server Components by default
- "use client" only when needed
- next/dynamic for heavy client-only (Studio pattern src/app/studio/[[...tool]]/Studio.tsx)
- Images: sizes; priority/fetchPriority only for true LCP hero, not chrome logos

# Key Conventions

- Optimize Core Web Vitals (LCP, CLS, INP).
- Follow Next.js docs for Data Fetching, Rendering, and Routing.
- Preview Next + Cache Components: read docs/adr/0001-preview-next-stack.md before changing Studio loading, load.ts, or next.config.ts cache flags.

# Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness
- Run type-checks and linters, no warning or errors

# Demand Elegance

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

**Simplicity First**: Make every change as simple as possible. Impact minimal code.
**No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
**Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs

<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->
