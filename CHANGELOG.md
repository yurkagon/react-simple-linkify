# Changelog

All notable changes to **react-simple-linkify** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Releases from `2.0.0` onward are managed with
> [Changesets](https://github.com/changesets/changesets).

## [Unreleased]

_Nothing yet._

## [2.0.0] - 2026-06-18

A complete modernization and rewrite. The public surface is intentionally close
to `1.x`, but there are breaking changes — see **Changed** and **Removed**.

### Added

- Full **TypeScript** rewrite with bundled type declarations shipped for both
  module systems (`.d.ts` for ESM, `.d.cts` for CJS).
- **Dual ESM + CJS** build with a correct `exports` map, verified in CI-grade
  checks with [`publint`](https://publint.dev) and
  [`@arethetypeswrong/cli`](https://arethetypeswrong.github.io) (all green).
- **`react-simple-linkify/client`** subpath — a `'use client'`, `React.memo`-ed
  variant for client trees that re-render frequently. The root export stays
  Server-Component / SSR friendly.
- New public exports: the `DefaultUrl` component, the `tokenize` utility,
  `createUrlRegex` / `URL_PATTERN`, and all related types (`LinkifyProps`,
  `UrlComponent`, `UrlComponentProps`, `Token`, `DefaultUrlProps`).
- `children` now accepts **`ReactNode`**: `<Linkify>` walks the node tree and
  linkifies only string segments, preserving any nested markup.
- 100% test coverage (Vitest + Testing Library), including an SSR render test.

### Changed

- **BREAKING:** `Linkify`'s `children` prop type is now `ReactNode` instead of
  `string`. String usage is unaffected; passing elements now works too.
- **BREAKING:** `Linkify` is no longer wrapped in `React.memo` at the root, so it
  works in React Server Components without a `'use client'` boundary. Import from
  `react-simple-linkify/client` for the memoized variant.
- Build tooling migrated from Webpack 4 + Babel to **Vite 8** (library mode);
  tests run on **Vitest**; React 19 is supported (`react >= 18` peer range).

### Removed

- **BREAKING:** Dropped the `prop-types` dependency in favour of TypeScript types.
- **BREAKING:** `react-dom` is no longer a peer dependency — it was never used at
  runtime.

### Fixed

- **Stateful-regex bug:** URL detection no longer reuses a single global (`/g`)
  regex via `.test()`, whose mutable `lastIndex` caused segments to be
  misclassified across calls. Tokenization is now a single `matchAll` pass over a
  fresh regex instance.
- Trailing punctuation (e.g. the period in `…example.com.`) is reliably excluded
  from the matched link.

## 1.x

Versions `1.0.x` predate this changelog. `1.0.3` was the last release of the
original implementation: a memoized `Linkify` component plus a `linkify(text)`
function, typed with `prop-types`, built with Webpack to CommonJS only.

[Unreleased]: https://github.com/yurkagon/react-simple-linkify/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/yurkagon/react-simple-linkify/releases/tag/v2.0.0
