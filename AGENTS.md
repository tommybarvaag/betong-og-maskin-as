# General instructions

- Be extremely concise. Sacrifice grammar for the sake of concision.
- Comments: weigh every word. Keep the non-obvious "why"; cut anything the code or tests already show.
- Never use emojis. Emojis are not allowed.
- Always add air around if statements and air above return statements. This is a convention in our codebase to improve readability.
- use kebab-case for file and directory names. Use PascalCase for component names. Use camelCase for variable and function names.

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

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
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

- Use our internal ui package if possible, it uses shadcn/ui with Base UI, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

# Performance Optimization

- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.

# Key Conventions

- Optimize Web Vitals (LCP, CLS, FID).
- Follow Next.js docs for Data Fetching, Rendering, and Routing.

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
