# Agent Guidelines for example-portfolio

## Project Overview

- **Type**: React 19 + TypeScript + Vite SPA
- **Framework**: React 19.2.4 with TypeScript 5.9
- **Build Tool**: Vite 8.0
- **Linting**: ESLint 9 (flat config) with TypeScript ESLint

## Build / Lint / Test Commands

```bash
# Development
npm run dev          # Start Vite dev server with HMR
npm run preview      # Preview production build locally

# Build
npm run build        # Run TypeScript compiler + Vite build

# Linting
npm run lint         # Run ESLint on all files

# Type checking (included in build)
npm run build        # First runs `tsc -b` for type checking
```

**Note**: No test framework is currently configured. Do not add tests without explicit user request.

## Code Style Guidelines

### TypeScript

- **Strict mode enabled**: All strict compiler options are on
- Use `type` for types, `interface` for object shapes that may be extended
- Avoid `any`, use `unknown` when type is truly unknown
- Enable `verbatimModuleSyntax`: use `import type { ... }` for types only

### React

- Use React 19 features and hooks (`useState`, `useEffect`, etc.)
- Use functional components with arrow functions or `function` declarations
- Default export components: `export default function ComponentName()`
- Use PascalCase for component names, camelCase for variables/functions
- Always use `StrictMode` in development

### Imports

```typescript
// React imports first
import { useState, useEffect } from 'react'
import { SomeType } from './types'

// External libraries
import { something } from 'library'

// Internal imports
import { Component } from './components/Component'
import { utility } from './utils/utility'

// Assets/styles
import styles from './Component.module.css'
import './index.css'
```

### Naming Conventions

- **Components**: PascalCase (`App.tsx`, `UserProfile.tsx`)
- **Files**: kebab-case for utilities (`api-client.ts`), PascalCase for components
- **Variables/functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Interfaces/Types**: PascalCase, prefix with `I` only when ambiguous (`User` not `IUser`)

### Formatting

- Use 2 spaces for indentation
- Single quotes for strings (JSX attributes use double quotes)
- Trailing commas in arrays and objects
- Semicolons at end of statements
- Max line length: ~100 characters (soft limit)

### Error Handling

- Use try/catch for async operations
- Never silently swallow errors without logging
- Use descriptive error messages
- Consider error boundaries for component tree failures

### CSS

- Use CSS modules or global CSS files (`.css` files in src)
- Avoid inline styles except for dynamic values
- Use semantic class names
- Follow BEM-like naming for complex components

## File Structure

```
src/
  main.tsx          # Entry point
  App.tsx           # Root component
  App.css           # Root styles
  index.css         # Global styles
  assets/           # Images, SVGs
```

## Additional Notes

- No test framework installed; do not add tests unless asked
- ESLint config uses flat config format (`eslint.config.js`)
- Vite config is in `vite.config.ts`
- TypeScript uses project references (`tsconfig.app.json`, `tsconfig.node.json`)
- Use `npm run build` before committing to verify types and build
