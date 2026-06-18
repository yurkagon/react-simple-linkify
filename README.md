<div align="center">

<img src="./docs/logo.png" alt="react-simple-linkify" width="70%" />

# react-simple-linkify

**A tiny, zero-dependency React library that finds URLs in text and turns them
into clickable links — or any component you want.**

[![npm version](https://img.shields.io/npm/v/react-simple-linkify.svg)](https://www.npmjs.com/package/react-simple-linkify)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-simple-linkify)](https://bundlephobia.com/package/react-simple-linkify)
[![types](https://img.shields.io/npm/types/react-simple-linkify.svg)](https://www.npmjs.com/package/react-simple-linkify)
[![license](https://img.shields.io/npm/l/react-simple-linkify.svg)](./LICENSE)

</div>

- 🪶 **Tiny & zero-dependency** — React is the only peer; ships ~1 kB gzipped.
- 🧩 **Bring your own renderer** — swap the default anchor for any component.
- 🌳 **`ReactNode` children** — linkifies text while preserving nested markup.
- ⚡ **SSR-ready** — no client-only state; renders on the server without issues.
- 📦 **Modern dual package** — ESM + CJS, full TypeScript declarations, verified
  with `publint` and `@arethetypeswrong/cli`.

## Contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Usage](#usage)
  - [Basic](#basic)
  - [Nested markup](#nested-markup)
  - [Custom URL component](#custom-url-component)
  - [As a function](#as-a-function)
- [MemoizedLinkify](#memoizedlinkify)
- [API reference](#api-reference)
- [FAQ](#faq)
- [License](#license)
- [Development](#development)

## Installation

```bash
npm install react-simple-linkify
# or
pnpm add react-simple-linkify
yarn add react-simple-linkify
```

`react >= 18` is a peer dependency (React 19 is fully supported).

## Quick start

```tsx
import { Linkify } from 'react-simple-linkify';

function Comment({ text }: { text: string }) {
  return (
    <p>
      <Linkify>{text}</Linkify>
    </p>
  );
}
```

Each URL becomes a safe `target="_blank"` anchor; everything else is left as-is.

## Usage

### Basic

`Linkify` is available as both a named and the default export:

```tsx
import { Linkify } from 'react-simple-linkify';
import Linkify from 'react-simple-linkify'; // same thing
```

### Nested markup

`children` accepts any `ReactNode`. `Linkify` walks the tree and linkifies
**only string segments**, leaving your elements untouched:

```tsx
<Linkify>
  Read <strong>the docs at https://example.com</strong> carefully.
</Linkify>

// renders:
// "Read " <strong>"the docs at " <a …>https://example.com</a></strong> " carefully."
```

### Custom URL component

Pass a `component` prop to control how each matched URL is rendered — useful
for rich embeds, router links, or analytics wrappers:

```tsx
import { Linkify, type UrlComponentProps } from 'react-simple-linkify';

const UrlEnhancer = ({ url }: UrlComponentProps) => {
  if (url.includes('youtube.com')) return <YouTubeEmbed url={url} />;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {url}
    </a>
  );
};

<Linkify component={UrlEnhancer}>
  Watch this: https://www.youtube.com/watch?v=dQw4w9WgXcQ
</Linkify>;
```

### As a function

When you already have a plain string and want React elements directly:

```tsx
import { linkify } from 'react-simple-linkify';

const elements = linkify('Check https://example.com out');
// => [<Fragment key="text-0">"Check "</Fragment>, <a key="url-1" …>https://example.com</a>, …]
```

> `linkify(text)` takes a **string**. For a `ReactNode` tree use the `<Linkify>`
> component, which walks children for you.

## MemoizedLinkify

For content that re-renders frequently on the client, use `MemoizedLinkify` — a
`React.memo`-wrapped version that skips re-linkifying when props have not
changed. It carries a `'use client'` directive, so it works seamlessly with
Next.js App Router and similar RSC-aware frameworks.

```tsx
import MemoizedLinkify from 'react-simple-linkify/MemoizedLinkify';

// Drop-in replacement for Linkify — same props
<MemoizedLinkify>{text}</MemoizedLinkify>;
```

## API reference

### `<Linkify>`

```tsx
import { Linkify } from 'react-simple-linkify';
```

| Prop        | Type                             | Default      | Description                                          |
| ----------- | -------------------------------- | ------------ | ---------------------------------------------------- |
| `children`  | `ReactNode`                      | —            | Content to scan; only string segments are linkified. |
| `component` | `ComponentType<{ url: string }>` | `DefaultUrl` | Component used to render each matched URL.           |

### `<MemoizedLinkify>`

```tsx
import MemoizedLinkify from 'react-simple-linkify/MemoizedLinkify';
```

Same props as `<Linkify>`. Wrapped in `React.memo` and marked `'use client'`.

### `linkify(text, Component?)`

```ts
function linkify(text: string, Component?: UrlComponent): ReactElement[];
```

Converts a plain string into React elements. Text segments become keyed
fragments; URLs are rendered with `Component` (default: a safe `target="_blank"` anchor).

### Types

`LinkifyProps`, `UrlComponent`, `UrlComponentProps`.

## FAQ

**Does it sanitize URLs?**
No — the library detects and renders. If you accept untrusted input, validate
or sanitize the `url` value inside your custom `component`.

**Why isn't `example.com` linked?**
Only URLs with an explicit scheme are matched, by design. Use
`https://example.com` to get a link.

**Can I use it with Next.js App Router?**
Yes. Use `Linkify` directly in Server Components (no client boundary needed).
Use `MemoizedLinkify` inside Client Components when you want memoization.

## License

[MIT](./LICENSE) © Yura Khvyshchuk

---

## Development

This is a [pnpm](https://pnpm.io) workspace monorepo:

```
.
├── react-simple-linkify/   # the library (published to npm)
└── demo/                   # Vite playground for local development
```

### Prerequisites

- **Node** `>=20.19` — see [`.nvmrc`](./.nvmrc) (`nvm use` picks up Node 24)
- **pnpm** — pinned via `packageManager`; enable with `corepack enable`

### Getting started

```bash
pnpm install   # install all workspaces
pnpm dev       # start the demo at http://localhost:3000
```

### Scripts

| Script               | What it does                                           |
| -------------------- | ------------------------------------------------------ |
| `pnpm dev`           | Start the demo app (Vite, port 3000).                  |
| `pnpm build`         | Build the library — ESM + CJS + `.d.ts` / `.d.cts`.    |
| `pnpm test`          | Run the library test suite (Vitest).                   |
| `pnpm test:coverage` | Run tests with a coverage report.                      |
| `pnpm typecheck`     | Type-check every workspace.                            |
| `pnpm lint`          | Lint with ESLint (flat config).                        |
| `pnpm format`        | Format with Prettier (`format:check` to check only).   |
| `pnpm verify-pack`   | Validate the publishable package (`publint` + `attw`). |

### Tech stack

| Concern        | Tool                                                       |
| -------------- | ---------------------------------------------------------- |
| Language       | TypeScript 6                                               |
| Library build  | Vite (library mode) + `rollup-plugin-dts` for declarations |
| Tests          | Vitest + Testing Library (`jsdom`)                         |
| Lint / format  | ESLint (flat config) + Prettier                            |
| Package checks | `publint` + `@arethetypeswrong/cli`                        |

### Quality gates

Quality is enforced locally via [husky](https://typicode.github.io/husky) git hooks:

- **`pre-commit`** — `lint-staged`: ESLint `--fix` + Prettier on staged files.
- **`pre-push`** — `pnpm typecheck && pnpm test`.

Hooks are installed automatically on `pnpm install`.

### Releasing

```bash
# 1. Bump version in react-simple-linkify/package.json
# 2. Update CHANGELOG.md
pnpm release   # build + publish to npm
```
