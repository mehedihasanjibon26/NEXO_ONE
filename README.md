# NEXO ONE

Frontend project setup only. UI sections, assets, design tokens, and section
animations await explicit implementation approval.

## Development

Use Node.js 22.14 or newer and npm. On Windows PowerShell, use `npm.cmd` if
execution policy blocks `npm.ps1`.

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm run format:check
npm run build
```

Development and builds use Next.js's built-in Webpack bundler. Windows Application
Control on this machine blocks the native SWC compiler; Next.js automatically
downloads its WebAssembly fallback, which Webpack supports. The initial fallback
download requires registry access. The native compiler warning may still appear.

TypeScript stays on 6.0.x to match the supported range of Next.js's ESLint tooling.
ESLint 9 satisfies the bundled React plugins' peer requirements, although npm
marks that ESLint release as deprecated.

## Structure and conventions

- App Router entry points: `src/app`.
- Import alias: `@/*` resolves to `src/*`.
- Components: `src/components/layout`, `sections`, and `ui`.
- Local content, hooks, and types: `src/data`, `src/hooks`, and `src/types`.
- Shared animation setup: `src/lib/animations`.
- General utilities and additional styles: `src/lib/utils` and `src/styles`.
- Assets: `public/images`, `public/icons`, `public/fonts`, and `public/models`.
- Empty directories contain only `.gitkeep` placeholders.

The approved requirements are in [docs/PRD.md](docs/PRD.md). The original
`NEXO_ONE_PRD.md` is retained unchanged. For this setup, the explicitly requested
folder structure takes precedence over the PRD's suggested paths.

## Animation setup

GSAP owns future scroll timelines, Motion for React owns future UI transitions,
and Lenis owns smooth scrolling. ScrollTrigger is included in `gsap`.

The setup helpers are dormant: the root layout does not initialize scrolling or
animations. When authorized, call `initializeSmoothScroll` once in a root client
effect and return its cleanup. It uses the GSAP ticker, leaves touch scrolling
native, and destroys Lenis when reduced motion is enabled, including live changes.
Scope future GSAP animations with `gsap.context` and revert the context on cleanup.

Tailwind CSS uses its PostCSS plugin. Prettier uses the Tailwind class-sorting
plugin with `src/app/globals.css` as its stylesheet entry point. The supplied PRD
files are excluded from formatting to preserve their original contents.
