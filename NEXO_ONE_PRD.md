# NEXO ONE - Product Requirements Document

**Implementation Source of Truth for a Premium Frontend Sneaker Showcase**

- Version: 1.0
- Date: 15 September 2026
- Status: Approved baseline for implementation
- Product type: Frontend-only premium concept/demo
- Primary route: `/`

> This file is intended to live in the codebase as the implementation source of truth. Coding agents and developers should follow the phase gates and acceptance criteria instead of inventing scope.

## 0. Coding Agent Directives

- Treat this PRD as the primary implementation source of truth. Do not invent new product features that change scope.
- Work phase-by-phase. Complete and verify the current phase gate before starting the next phase.
- Use real final-quality assets as early as possible. Do not build complex animation around disposable placeholders.
- Prefer the simplest implementation that reaches the visual target. Real-time 3D is optional, never mandatory.
- Do not add a backend, database, authentication, Shopify, payment integration or admin panel.
- Do not replace the custom art direction with a generic template or component library.
- When a motion idea creates visible jank, simplify the motion before weakening usability/performance.
- For every section, implement desktop, mobile and reduced-motion behavior before calling it complete.
- Keep copy/content in local typed data where repeated or stateful.
- Before committing a phase, run build/lint/type checks and manually inspect the phase at target breakpoints.

## 1. Product Definition

A fictional premium performance-lifestyle sneaker designed to demonstrate world-class frontend art direction, motion, interaction and scrolling without any production backend.

**Brand:** NEXO  
**Product:** NEXO ONE  
**Tagline:** BUILT FOR MOTION.

### 1.1 Objective

Build a single-product sneaker showcase that is more cinematic, tactile and memorable than the supplied Jiro beverage reference while remaining maintainable and frontend-only. The experience should demonstrate premium art direction, continuous product storytelling, physically believable motion and top-class scroll behavior.

### 1.2 Success Signals

- The first 3-5 seconds communicate the product, brand attitude and a distinct visual signature.
- Scrolling feels immediate, smooth and controlled on trackpad, mouse wheel and touch.
- The sneaker remains the hero object across the experience instead of disappearing between unrelated sections.
- At least two sequences are unmistakably showcase-worthy: the hero hand-off and exploded anatomy sequence.
- The page feels premium even with motion reduced or disabled.
- Mobile is intentionally re-composed rather than treated as a scaled-down desktop page.
- The codebase stays componentized, readable and maintainable despite advanced animation.

### 1.3 Product Story

- **Weightless Upper:** Engineered knit / mesh with structured support zones.
- **Adaptive Midsole:** Responsive foam geometry designed around controlled rebound.
- **Precision Grip:** Segmented outsole with directional traction zones.
- **Contoured Heel:** Sculpted heel counter for stability and a recognizable silhouette.
- **Signature Finishes:** Four controlled colorways that support the visual story.

### 1.4 Colorways

| Finish | Reference | Direction |
| --- | --- | --- |
| VOID | #0A0A0A | Near-black monochrome finish. |
| BONE | #E9E5DD | Warm off-white / bone finish. |
| CHROME | #B7B7B7 | Cool metallic silver / grey finish. |
| SIGNAL | #D92D20 | Single expressive campaign accent finish. |

## 2. Scope and Non-Goals

### 2.1 In Scope

- One premium single-page website.
- Advanced scroll choreography and product-led narrative.
- Local demo interaction for color, size, quantity and bag.
- Responsive desktop/tablet/mobile compositions.
- Reduced-motion mode.
- Static/local content and product data.
- Production deployment of the frontend.

### 2.2 Explicitly Out of Scope

- No Laravel, Node application backend or server-side commerce service.
- No SQL / NoSQL database.
- No user account, authentication or authorization.
- No production inventory, price synchronization or stock logic.
- No payment gateway, real checkout or order processing.
- No admin dashboard or CMS in v1.
- No realtime infrastructure, websocket layer, queues or background jobs.
- No production analytics pipeline unless explicitly added later.
- No mandatory WebGL / 3D dependency. Real-time 3D is an enhancement, not a baseline requirement.

## 3. Recommended Technical Stack

| Area | Technology | Responsibility |
| --- | --- | --- |
| Framework | Next.js App Router | Application shell, routing, metadata, image/font optimization and production deployment. |
| Language | TypeScript | Strict typing for product data, animation configuration, UI state and component contracts. |
| Styling | Tailwind CSS | Custom responsive system, tokens and precise layout without a generic theme layer. |
| Cinematic motion | GSAP + ScrollTrigger | Pinned sequences, scrubbed product movement, timeline choreography, masks and section hand-offs. |
| Smooth scrolling | Lenis | Premium scroll feel synchronized with ScrollTrigger. Responsive input must remain the priority. |
| UI motion | Motion for React | Menu, cart drawer, selectors, hover/tap, local enter/exit and state-driven transitions. |
| 3D - optional | React Three Fiber + Three.js + Drei | Only if a high-quality GLB clearly improves the result and passes the performance gate. |
| Media | Next/Image + modern WebP/AVIF assets | Responsive media loading and controlled critical asset delivery. |
| Deployment | Vercel | Preview and production deployment for the frontend-only experience. |

### 3.1 Dependency Rule

Do not add React Three Fiber/Three.js during initial setup. Add it only after the Product Orbit baseline is complete and the 3D decision gate passes.

## 4. Global Functional Requirements

| ID | Requirement | Acceptance / Notes |
| --- | --- | --- |
| GLOB-001 | The experience is a single-page frontend showcase at `/`. | No secondary production pages are required for v1; anchor navigation is allowed. |
| GLOB-002 | The project must remain backend-free. | No database, server commerce, authentication, payment or order APIs are introduced. |
| GLOB-003 | The sneaker is the dominant recurring visual object. | Major sections use the product or a meaningful product detail; avoid unrelated generic content blocks. |
| GLOB-004 | Motion must have clear ownership. | GSAP = cinematic scroll timelines; Motion = UI state; Lenis = scroll feel. Avoid duplicate animation systems on the same property. |
| GLOB-005 | The baseline implementation must not depend on real-time 3D. | Rendered assets/image sequences must be capable of delivering the full v1 experience. |
| GLOB-006 | All content and product choices are local typed data. | No hard-coded repeated variant/spec content across multiple components. |
| GLOB-007 | The experience must support reduced motion. | No essential information is hidden behind scroll-scrub behavior. |
| GLOB-008 | All interactive controls support keyboard and touch. | No hover-only critical action. |
| GLOB-009 | The site must preserve normal browser navigation and scrolling. | Pinned scenes release reliably; user is never trapped. |
| GLOB-010 | No generic component-library visual language. | Use custom Tailwind components and only minimal utility primitives. |
| GLOB-011 | Critical media must define dimensions/aspect ratios. | No avoidable CLS from product images, video or canvas. |
| GLOB-012 | Every major section must work as a static composition. | If JS animation is unavailable, content remains understandable and visually coherent. |
| GLOB-013 | The demo must clearly avoid false commercial claims. | Fictional reviews/performance claims and demo bag behavior are labeled as concept content where appropriate. |
| GLOB-014 | The first load prioritizes the opening frame. | Hero-critical assets are prioritized; secondary sections lazy load progressively. |
| GLOB-015 | Implementation proceeds phase-by-phase. | Do not begin a later high-complexity phase before the current phase completion gate passes. |

## 5. Experience and Information Architecture

Narrative order:

`Preloader -> Header -> Hero -> Product Orbit -> Material Story -> Exploded Anatomy -> Performance -> Colorways -> Lifestyle -> Proof -> Fit/Demo Bag -> Finale/Footer`

Anchor IDs should remain stable so header navigation and QA can target sections directly.

## 6. Section Requirements

### S00 - PRELOADER / OPENING STATE

**Purpose:** Create a fast, confident opening that protects the hero from appearing half-loaded.

**Required content:**
- NEXO wordmark or compact loading mark.
- Optional minimal percentage/progress cue only if tied to real critical asset readiness.
- No long brand film or decorative loading delay.

**Layout:** Full viewport monochrome frame. Keep the composition minimal so the transition into the hero feels intentional.

**Motion:** Wordmark / counter resolves, then the frame splits, masks or fades directly into the final hero composition. Target perceived delay under about 1.5 seconds on a warm/fast load; skip the preloader if critical assets are already ready.

**Implementation:** React client component + GSAP for the one-time transition. Preload only hero-critical media.

**Mobile:** Use the same concept but shorten the exit and avoid asset-heavy intro sequences.

**Reduced motion:** Simple opacity transition or no preloader.

**Acceptance criteria:**
- [ ] No fake waiting period.
- [ ] Hero does not flash unstyled or partially composed.
- [ ] The intro runs once per session/navigation context as appropriate.
- [ ] User can still access content if animation initialization fails.

### S01 - HEADER / NAVIGATION

**Purpose:** Provide navigation without weakening the campaign composition.

**Required content:**
- NEXO wordmark.
- Anchor links: DESIGN, ANATOMY, COLORWAYS, FIT.
- Demo bag indicator.
- Mobile menu trigger.

**Layout:** Overlay header on hero. Spacious and editorial on desktop; compact on mobile. Avoid a generic ecommerce navigation bar.

**Motion:** Subtle contrast/background adjustment after leaving hero. Mobile menu opens as a clean full-screen or large-panel overlay.

**Implementation:** Semantic nav + Motion for overlay/state transitions. Anchor links scroll to named section IDs.

**Mobile:** Menu items large enough for touch. No hover-only behavior.

**Reduced motion:** Instant or short fade menu transitions.

**Acceptance criteria:**
- [ ] Keyboard-accessible navigation.
- [ ] Current section may be indicated only if it can be maintained reliably.
- [ ] Header never overlaps unreadably with section content.
- [ ] Bag state remains local/demo only.

### S02 - HERO - BUILT FOR MOTION.

**Purpose:** Deliver the strongest first impression and establish the sneaker as the continuous hero object.

**Required content:**
- Headline: BUILT FOR MOTION.
- Product name: NEXO ONE.
- Support copy: a concise one- or two-line performance/lifestyle statement.
- Primary CTA: EXPLORE THE BUILD.
- Hero sneaker render / sequence / optional 3D stage.

**Layout:** Oversized display typography, extreme but controlled whitespace, shoe crossing the typographic field, monochrome environment with precise lighting/shadow.

**Motion:** Headline masks in, shoe enters with believable weight, support copy resolves, then first scroll carries the shoe toward the next stage rather than replacing it with a new unrelated image.

**Implementation:** GSAP timeline + ScrollTrigger. Prefer transparent render / image sequence for baseline. 3D only behind a feature gate.

**Mobile:** Static or lightly animated hero angle. First-scroll hand-off can become a short scale/translate rather than a long pin.

**Reduced motion:** Final hero composition shown immediately with a short content fade.

**Acceptance criteria:**
- [ ] Portfolio-ready without any later section.
- [ ] No layout shift when product media resolves.
- [ ] CTA works with keyboard/touch.
- [ ] Hero remains readable from 320px mobile through wide desktop.
- [ ] Scroll transition never causes a visible snap.

### S03 - PRODUCT ORBIT / FORM STUDY

**Purpose:** Turn product shape into the first technical story and maintain continuity from the hero.

**Required content:**
- Side, three-quarter, heel, top and outsole views or equivalents.
- Minimal annotations for silhouette, support and geometry.
- Short editorial copy, not a dense spec sheet.

**Layout:** Pinned/sticky product stage on desktop with annotations entering around the object. Product remains large enough to inspect.

**Motion:** Scroll rotates or advances the shoe through consistent angles. Labels appear only when the relevant geometry is visible. Avoid free-spinning gimmicks.

**Implementation:** Preferred baseline: 24-60 frame image sequence or stepped render set. Optional R3F only if model quality and performance exceed the rendered approach.

**Mobile:** Swipeable or stepped angle viewer; no long scroll trap.

**Reduced motion:** Static angle gallery / tabs.

**Acceptance criteria:**
- [ ] No jitter between frames/angles.
- [ ] Annotations remain anchored visually.
- [ ] Pinned region releases cleanly.
- [ ] Mobile has a deliberate non-pinned interaction.
- [ ] Product aspect ratio and crop are consistent across variants.

### S04 - MATERIAL STORY

**Purpose:** Shift from silhouette to tactile detail and make the shoe feel physically premium.

**Required content:**
- Engineered upper.
- Heel structure.
- Foam / midsole texture.
- Outsole compound / grip pattern.
- 3-5 macro renders with concise material captions.

**Layout:** Editorial macro imagery mixed with very large words and close crops. Use negative space rather than multiple small feature cards.

**Motion:** Mask reveals, shallow parallax, macro push-ins and typography hand-offs. Product material detail should feel observed, not decorated.

**Implementation:** Next/Image, GSAP reveal/parallax. Avoid heavy blur filters and simultaneous animated layers.

**Mobile:** Single-column story with large crops and short reveals.

**Reduced motion:** Static image + copy composition.

**Acceptance criteria:**
- [ ] Macro assets remain sharp on retina screens.
- [ ] Text contrast is always sufficient.
- [ ] No more motion than needed to communicate material.
- [ ] Section remains premium without animation.

### S05 - EXPLODED ANATOMY

**Purpose:** Create the second signature showcase moment by revealing how the shoe is constructed.

**Required content:**
- Upper.
- Insole / sockliner.
- Adaptive midsole.
- Optional support plate / structural element.
- Outsole.
- Short labels and one-sentence explanation per layer.

**Layout:** Centered product assembly on a calm background with generous vertical room for separation. Labels stay editorial and minimal.

**Motion:** As the user scrolls, layers separate in controlled depth/vertical space, labels resolve, then the system either reassembles or transitions directly into the performance story.

**Implementation:** GSAP timeline with separated PNG layers or mesh groups. Never simulate an exploded view with mismatched crops.

**Mobile:** Pre-separated static composition or short tap/step sequence.

**Reduced motion:** Static exploded diagram with visible labels.

**Acceptance criteria:**
- [ ] Layer order is visually believable.
- [ ] No clipping at common viewport heights.
- [ ] Labels do not collide with the object.
- [ ] The sequence stays smooth on real target devices.
- [ ] Fallback composition is complete without JS-driven scrub.

### S06 - PERFORMANCE STORY

**Purpose:** Translate construction into fictional performance benefits without becoming a technical dashboard.

**Required content:**
- Lightweight build.
- Responsive cushioning.
- Grip/control.
- All-day comfort.
- Large numeric or typographic statements with explicit concept-demo wording where needed.

**Layout:** Oversized numerals / statements paired with sole or foam crops. Keep each screen focused on one message.

**Motion:** Horizontal sole movement, controlled compression/rebound suggestion, numbers settling into place, and one clean transition into colorways.

**Implementation:** GSAP for main timeline, CSS/SVG for simple diagrams.

**Mobile:** Static figures plus one short reveal. No dense technical chart.

**Reduced motion:** Static content.

**Acceptance criteria:**
- [ ] Claims are presented as fictional concept content.
- [ ] Numbers are readable before/during/after animation.
- [ ] No animation implies unsafe or unrealistic product behavior.
- [ ] Performance section does not exceed its narrative purpose.

### S07 - COLORWAYS - CHOOSE YOUR FREQUENCY.

**Purpose:** Create a high-impact interactive reset and demonstrate polished state transitions.

**Required content:**
- VOID.
- BONE.
- CHROME.
- SIGNAL.
- Swatch/name selector and matching product asset.
- Optional concise finish description.

**Layout:** Full-screen product stage with stable UI placement. Environment/background tone responds to selected finish.

**Motion:** Variant change crossfades/masks the shoe, adds a small scale/rotation response, and updates text/environment without layout jump.

**Implementation:** Typed local product data + React state + Motion. Use GSAP only for larger environment transition if needed.

**Mobile:** Horizontal selector with large tap targets and stable product stage.

**Reduced motion:** Instant or short crossfade between variants.

**Acceptance criteria:**
- [ ] Switch is immediate and deterministic.
- [ ] Keyboard/touch operable.
- [ ] No stale image flash or layout shift.
- [ ] Selected state is visually obvious without relying on color alone.
- [ ] Variant state can be reused by the fit/cart section.

### S08 - MOTION PROOF / LIFESTYLE INTERLUDE

**Purpose:** Add emotion and campaign context after the technical product story.

**Required content:**
- 1-2 premium campaign stills OR one short muted loop.
- Short kinetic phrase.
- Optional city/pavement/texture detail.

**Layout:** Full-bleed editorial frame or split panels with strong cropping. Do not introduce a stock-photo collage.

**Motion:** Differential panel speed, masked media entrance and restrained kinetic type.

**Implementation:** Optimized image preferred. Video only if the asset is genuinely premium and lightweight enough.

**Mobile:** Use a strong still if video or layered parallax hurts performance.

**Reduced motion:** Static campaign image.

**Acceptance criteria:**
- [ ] No janky autoplay.
- [ ] Media has poster/fallback.
- [ ] CPU/GPU load remains controlled.
- [ ] The section improves emotional pacing rather than extending the page unnecessarily.

### S09 - PROOF / EDITORIAL TESTIMONIAL

**Purpose:** Provide pacing and social-proof styling without turning the page into a standard ecommerce review block.

**Required content:**
- 2-4 fictional editorial quote fragments.
- Attribution clearly framed as concept/demo content.
- Optional micro-rating or category labels.

**Layout:** Oversized quotes, publication-style attribution and strong white space.

**Motion:** Slow marquee, snap carousel or controlled slide transition. Movement must pause/stop for reduced motion.

**Implementation:** CSS/GSAP marquee or Motion carousel using local data.

**Mobile:** Swipe-friendly cards/quotes with no tiny columns.

**Reduced motion:** Static stacked quotes.

**Acceptance criteria:**
- [ ] Readable at all times.
- [ ] No inaccessible infinite motion.
- [ ] No claim of real press/customer endorsement.
- [ ] Touch and keyboard interactions work if carousel controls exist.

### S10 - FIT / SIZE / DEMO BAG

**Purpose:** Make the concept feel complete and tactile while staying explicitly frontend-only.

**Required content:**
- Selected colorway.
- Size selector.
- Quantity control.
- Add to demo bag CTA.
- Bag drawer with line item, quantity and remove action.
- Clear demo-only checkout notice.

**Layout:** Large product frame and sparse controls. Avoid dense product-detail-page conventions.

**Motion:** Selector feedback, button attraction/press, bag drawer entrance and compact add confirmation.

**Implementation:** React local state + Motion. localStorage is optional, not required. No API calls.

**Mobile:** Bottom-sheet bag or full-width drawer, large touch targets.

**Reduced motion:** Short opacity/translate transitions only.

**Acceptance criteria:**
- [ ] All controls work with keyboard/touch.
- [ ] No dead checkout button masquerading as a real purchase flow.
- [ ] Bag can add/remove/change quantity.
- [ ] Refresh reset is acceptable unless localStorage is intentionally enabled.
- [ ] Demo disclaimer is present.

### S11 - FINALE / FOOTER - KEEP MOVING.

**Purpose:** End with a memorable campaign frame and a stable resting state.

**Required content:**
- Large NEXO wordmark.
- KEEP MOVING. closing line.
- Minimal anchor/social placeholder links if desired.
- Concept/demo legal line.
- Optional final shoe / outsole silhouette.

**Layout:** Large cropped wordmark and controlled final product composition. Utility links stay secondary.

**Motion:** Final product settles, wordmark masks/expands in, then motion resolves to rest.

**Implementation:** GSAP for final hand-off, semantic footer for links.

**Mobile:** Short reveal then static end state.

**Reduced motion:** Static footer.

**Acceptance criteria:**
- [ ] No infinite decorative movement at page end.
- [ ] Footer links are usable.
- [ ] End state is visually stable.
- [ ] Concept/demo nature of the project is clear.

## 7. Motion System

### 7.1 Ownership

- **GSAP + ScrollTrigger:** cinematic scroll timelines, pinning, scrubbed product movement, masks and major section hand-offs.
- **Motion for React:** navigation, drawer, selectors, hover/tap and state-driven local component transitions.
- **Lenis:** scroll feel only. It must not become a source of input delay.
- **CSS:** simple transforms, opacity, hover states and low-cost decorative motion.

### 7.2 Timing and Behavior Tokens

| Token | Target | Use |
| --- | --- | --- |
| Micro interaction | 160-260 ms | Buttons, selectors, chips, hover/tap feedback. |
| Standard reveal | 600-900 ms | Headings, editorial content and masked image entrances. |
| Cinematic transition | 900-1400 ms | Hero staging and major section hand-offs. |
| Product inertia | Heavier ease-out | Object movement should imply visual mass rather than float randomly. |
| Scrub response | Direct / low-lag | Keep catch-up subtle. Scroll input should never feel disconnected. |
| Reduced motion | No scrub / no continuous parallax | Use static composition plus short fades/masks only. |

### 7.3 Motion Rules

- Prefer transform, opacity and clip-path over layout-changing animation.
- Never animate the same property with multiple animation systems.
- Limit long pinned scenes to signature sections.
- No essential content appears only during a scrubbed timeline.
- Motion must settle. Avoid perpetual floating everywhere.
- Use visual inertia for the sneaker, but keep input response immediate.

## 8. Visual System

- Palette: near-black, off-white, controlled greys and metallic neutrals. SIGNAL may use one expressive accent color inside the product story.
- Typography: one bold/condensed display family plus one highly legible body family.
- Headings: oversized, cropped or masked where composition allows, but never at the expense of readability.
- Layout: editorial, asymmetrical when useful, large product scale, deliberate negative space.
- Avoid: generic ecommerce cards, heavy gradients, glassmorphism, excessive rounded cards, template-like icon grids and decorative motion with no narrative purpose.

## 9. Responsive and Accessibility Requirements

| Mode | Range / Trigger | Strategy |
| --- | --- | --- |
| Mobile | < 768 px | Composition-first. Minimal pinning, short reveals, swipe/step product angles, simplified anatomy. |
| Tablet | 768-1279 px | Shorter pinned distances, fewer concurrent layers, same narrative order. |
| Desktop | >= 1280 px | Full cinematic choreography, long-form product continuity and optional high-detail rendering. |
| Reduced motion / low power | Preference or runtime fallback | Static premium art direction, no continuous scroll-linked transforms. |

### Accessibility

- Honor `prefers-reduced-motion`.
- Preserve semantic heading order.
- All actionable controls are keyboard and touch operable.
- Provide visible focus state that fits the monochrome system.
- Product imagery gets meaningful alt text; decorative layers use empty alt/appropriate semantics.
- No critical information is communicated only by color or motion.
- Pinned content must not prevent normal scrolling or navigation.
- Ensure sufficient contrast for text and controls.

## 10. Data and UI State

| State | Type | Notes |
| --- | --- | --- |
| selectedColorway | `void \| bone \| chrome \| signal` | Default: `void`. Shared by Colorways and Fit/Bag areas. |
| selectedSize | string or null | No default selection unless design deliberately chooses one. |
| quantity | integer 1-5 | Demo quantity only. |
| bagOpen | boolean | Controls demo bag drawer. |
| bagItems | local array | One product line is sufficient for v1; variant + size + quantity. |
| menuOpen | boolean | Mobile/global navigation overlay state. |
| reducedMotion | derived boolean | From `prefers-reduced-motion`; may also be used by motion hooks. |
| isLowPowerMode | optional derived flag | Use only if needed; do not build a complex device-detection system. |

### 10.1 Suggested TypeScript Contract

```ts
export type ColorwayId = "void" | "bone" | "chrome" | "signal";

export interface Colorway {
  id: ColorwayId;
  name: string;
  swatch: string;
  description: string;
  heroAsset: string;
  fitAsset: string;
  environmentTone: string;
}

export interface ProductSpec {
  id: string;
  label: string;
  value: string;
  note?: string;
}

export interface NexoProduct {
  name: "NEXO ONE";
  tagline: string;
  description: string;
  colorways: Colorway[];
  sizes: string[];
  specs: ProductSpec[];
}
```

## 11. Asset Contract

| Asset | Required Form | Quality Rule |
| --- | --- | --- |
| Hero product | Transparent WebP/AVIF render or optimized GLB | At least one strong three-quarter angle; consistent studio light/shadow. |
| Orbit | 24-60 pre-rendered frames OR clean 3D model | All frames same crop/background/lighting. Pre-render baseline recommended. |
| Exploded view | Separated transparent layers OR mesh groups | Upper, insole, midsole, optional plate/support, outsole. |
| Macros | 3-5 high-resolution detail renders | Upper, heel, foam/midsole, outsole/grip. |
| Colorways | 4 matching product assets | VOID, BONE, CHROME, SIGNAL with consistent camera and silhouette. |
| Lifestyle | 1-2 premium stills or one short loop | Use only if visual quality matches the product renders. |
| Typography | One display family + one body family | Self-host if license permits; define font-display behavior. |
| Brand | Wordmark, favicon, OG/social preview | Monochrome master assets. |

### 11.1 Recommended Paths

- `/public/media/product/hero/` - hero renders / poster.
- `/public/media/product/orbit/void/` - ordered orbit frames (001.webp, 002.webp...).
- `/public/media/product/anatomy/` - transparent exploded layers or model textures.
- `/public/media/product/macros/` - material close-ups.
- `/public/media/product/colorways/` - consistent hero/fit renders per finish.
- `/public/media/lifestyle/` - campaign stills / optional video.
- `/public/media/brand/` - wordmark, favicon and social preview.
- `/public/models/` - optional GLB only after 3D decision gate.

### 11.2 3D Decision Gate

Add real-time 3D only if all conditions are met:

- A production-quality GLB exists with clean materials/mesh separation.
- Compressed model and textures meet the performance budget.
- Desktop and target mobile devices remain smooth in the intended scene.
- The 3D implementation is visibly better than the rendered sequence.
- The experience still has a static/poster fallback.

## 12. Performance and Quality Budgets

| Area | Target | Implementation Note |
| --- | --- | --- |
| Interaction target | Sustained visual smoothness | Aim for 60 fps on representative modern devices. Eliminate obvious sustained frame drops in signature sequences. |
| LCP | <= 2.5 s target on representative fast mobile/4G test | Hero poster/product and typography must be prioritized. |
| CLS | < 0.10 | Reserve media/canvas space and font metrics. |
| INP | < 200 ms target | Variant, menu and bag interactions should remain immediate. |
| Hero critical media | Prefer <= 1.5 MB combined initial visual payload | Use responsive formats and defer noncritical angles/frames. |
| Orbit frames | Progressive/predictive loading | Do not block hero on every orbit frame. Load nearby frames ahead of scroll demand. |
| Optional GLB | Prefer <= 4 MB compressed | Must use efficient textures and lazy load behind a poster. Reject 3D if it hurts the experience. |
| Video | Prefer <= 6 MB short muted loop | Poster required. Remove video if it creates decode or network jank. |
| Animated layers | Keep concurrent layers intentionally low | Avoid multiple heavy filters, huge blurs and needless translucent composites. |

## 13. Engineering Architecture

### 13.1 Folder Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── opengraph-image.*
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Preloader.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductOrbit.tsx
│   │   ├── MaterialStory.tsx
│   │   ├── ExplodedAnatomy.tsx
│   │   ├── PerformanceStory.tsx
│   │   ├── Colorways.tsx
│   │   ├── Lifestyle.tsx
│   │   ├── Proof.tsx
│   │   └── FitDemoBag.tsx
│   ├── product/
│   │   ├── ProductStage.tsx
│   │   ├── ProductImage.tsx
│   │   ├── OrbitSequence.tsx
│   │   └── ProductAnnotation.tsx
│   ├── motion/
│   │   ├── SmoothScrollProvider.tsx
│   │   ├── Reveal.tsx
│   │   └── MagneticButton.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Drawer.tsx
│       └── SelectorChip.tsx
├── data/
│   ├── product.ts
│   ├── testimonials.ts
│   └── navigation.ts
├── hooks/
│   ├── useReducedMotion.ts
│   └── useMediaQuery.ts
├── lib/
│   ├── gsap.ts
│   ├── lenis.ts
│   ├── motion-tokens.ts
│   └── utils.ts
└── public/
    ├── media/
    └── models/
```

### 13.2 Engineering Rules

- Use Next.js App Router and keep the primary route in `src/app/page.tsx` as a composition of section components.
- Each major section owns its markup and local animation setup. Do not create one giant page-level GSAP timeline file.
- Register GSAP plugins once and use scoped GSAP context / cleanup for client components.
- Centralize motion constants, easings, breakpoint values and shared scroll utilities in `src/lib` or `src/components/motion`.
- Keep product/content configuration in typed files under `src/data`.
- Avoid installing a heavy UI kit. Build custom primitives for button, chip, drawer and typography as needed.
- Use CSS transforms/opacity/clip-path for most animation. Avoid layout-thrashing top/left/width/height animation unless unavoidable.
- Do not animate the same property with CSS, Motion and GSAP simultaneously.
- Lazy-load secondary media and optional 3D. The hero must not wait for deep-page assets.
- Never make desktop pinning the only way to understand content. Tablet/mobile need intentional alternatives.
- Use semantic HTML beneath decorative canvas/layers. WebGL must never contain the only accessible copy or controls.
- Use `prefers-reduced-motion` as a first-class branch, not an afterthought.
- Keep console clean in production. No duplicate ScrollTriggers, hydration warnings or leaked requestAnimationFrame loops.
- All demo copy, assets and fabricated claims must avoid impersonating a real brand or real customer endorsement.

## 14. Phase-by-Phase Implementation Plan

### PHASE 0 - Creative and Technical Foundation

- [ ] Lock NEXO ONE product story, final section order and baseline copy.
- [ ] Choose product-media strategy: rendered sequence/layers as baseline; decide whether a GLB is even needed.
- [ ] Collect/produce hero, orbit, anatomy, macro and four colorway assets.
- [ ] Create typography, spacing, monochrome palette and motion token files.
- [ ] Initialize Next.js + TypeScript + Tailwind and install GSAP, ScrollTrigger, Lenis and Motion.
- [ ] Create static section skeleton and verify asset paths.

**Completion gate:** Gate: static homepage skeleton, fonts, spacing and critical assets are correct before advanced motion starts.

### PHASE 1 - Global Shell and Scroll System

- [ ] Build Header, MobileMenu, Footer and page anchor structure.
- [ ] Implement Lenis and synchronize it correctly with ScrollTrigger.
- [ ] Implement reduced-motion branch and shared motion utilities.
- [ ] Implement minimal preloader behavior.
- [ ] Verify native navigation, focus, anchor movement, resize cleanup and route/hot-reload behavior.

**Completion gate:** Gate: scrolling feels excellent on trackpad, wheel and touch before hero choreography is layered in.

### PHASE 2 - Signature Hero

- [ ] Build final hero composition using real product assets, not placeholders.
- [ ] Implement display-type masks and product entrance.
- [ ] Implement the first-scroll product hand-off into Product Orbit.
- [ ] Tune preloader-to-hero transition.
- [ ] Profile critical asset loading and remove visible layout shift.

**Completion gate:** Gate: the opening 5-8 seconds are portfolio-ready on their own.

### PHASE 3 - Product Form / Orbit

- [ ] Implement the product angle system using image sequence/stepped renders.
- [ ] Create pinned/sticky desktop stage and annotation choreography.
- [ ] Preserve continuity from hero object into orbit.
- [ ] Tune scrub response, frame loading and scroll distance.
- [ ] Build tablet/mobile stepped or swipe fallback.
- [ ] Optional 3D evaluation occurs only after baseline is stable.

**Completion gate:** Gate: product rotation is stable, annotations align, pinning releases cleanly and mobile has a deliberate alternative.

### PHASE 4 - Material and Exploded Anatomy

- [ ] Build material macro editorial section.
- [ ] Prepare separated product layers/meshes.
- [ ] Build exploded anatomy timeline and labels.
- [ ] Create static reduced-motion composition.
- [ ] Profile the heaviest signature sequence and simplify if necessary.

**Completion gate:** Gate: exploded anatomy is the second signature showcase moment and remains smooth on real devices.

### PHASE 5 - Performance and Colorway Story

- [ ] Build performance/sole narrative and large numeric statements.
- [ ] Implement typed colorway data model.
- [ ] Implement colorway selector and visual environment transitions.
- [ ] Add keyboard/touch behavior and shared selected-color state.
- [ ] Verify zero layout jump and no stale-asset flash.

**Completion gate:** Gate: variants feel immediate and premium; added interactivity does not reduce cinematic pacing.

### PHASE 6 - Lifestyle, Proof and Demo Commerce

- [ ] Add optimized lifestyle media if it meets the visual quality bar.
- [ ] Build editorial proof/testimonial area.
- [ ] Build size selector, quantity and demo bag drawer.
- [ ] Connect final CTA and footer finale.
- [ ] Add concept/demo disclaimers and polish copy/link behavior.

**Completion gate:** Gate: the page feels like a complete premium campaign even with no backend.

### PHASE 7 - Responsive Motion Pass

- [ ] Tune every section independently for tablet and mobile.
- [ ] Reduce pin distances, simultaneous layers and media cost.
- [ ] Verify touch interactions and orientation changes.
- [ ] Verify reduced-motion behavior section by section.
- [ ] Fix viewport-height, safe-area and browser chrome edge cases.

**Completion gate:** Gate: mobile feels designed, not downgraded.

### PHASE 8 - Performance, QA and Showcase Launch

- [ ] Audit image/video/model payload and lazy-loading behavior.
- [ ] Profile frame rate, long tasks and animation cleanup.
- [ ] Run keyboard, screen-reader smoke, reduced-motion and responsive QA.
- [ ] Cross-check current Chrome, Safari, Firefox and mobile Safari/Chrome.
- [ ] Add final metadata, OG image and favicon.
- [ ] Deploy to Vercel and complete final production-device review.

**Completion gate:** Gate: no visible jank, broken triggers, dead controls, major layout shifts, inaccessible interactions or misleading ecommerce behavior.

## 15. Testing and QA

### 15.1 Visual QA

- [ ] Hero composition remains intentional at common desktop widths and small mobile widths.
- [ ] Sneaker scale, crop and shadow remain believable throughout transitions.
- [ ] No background flash, z-index pop or sudden element teleport between sections.
- [ ] Heading masks never clip ascenders/descenders.
- [ ] Pinned scenes release cleanly and do not trap scroll.
- [ ] Colorway switches do not show stale assets or shift the layout.
- [ ] Exploded layers align before/after separation and labels remain readable.
- [ ] Footer ends in a stable non-looping composition.

### 15.2 Technical QA

- [ ] No duplicate ScrollTriggers after resize, Fast Refresh or route hydration.
- [ ] All GSAP contexts/triggers and custom RAF work are cleaned on unmount.
- [ ] No React hydration warnings or console errors in production.
- [ ] No horizontal overflow at target breakpoints.
- [ ] No missing media dimensions causing avoidable CLS.
- [ ] Reduced-motion mode removes scrub/parallax and remains complete.
- [ ] Menu, colorway, size, quantity and bag interactions work by keyboard and touch.
- [ ] No autoplay audio. Video, if present, is muted by default and has a poster/fallback.
- [ ] Lazy media does not pop into view after the user reaches a signature section.
- [ ] Page remains usable if optional 3D fails to initialize.

## 16. Risk Register

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Asset quality below concept quality | High | Use rendered-image baseline; do not force 3D. Replace weak media before adding motion complexity. |
| Over-smoothed scroll feels delayed | High | Tune Lenis on real hardware; responsive input is more important than visible smoothing. |
| Too much pinning creates fatigue | Medium | Limit long pins to signature scenes; use editorial flowing sections between them. |
| 3D/model payload hurts load and mobile | High | Keep 3D optional, lazy and behind poster. Reject if it does not clearly outperform renders. |
| GSAP timelines become monolithic | Medium | Keep animations section-local with centralized tokens/utilities. |
| Mobile becomes a reduced desktop clone | High | Design explicit mobile fallback for every pinned/complex scene before phase completion. |
| Fictional claims look like real endorsements | Medium | Use concept/demo wording for reviews, performance claims and bag/checkout interactions. |
| AI/vibe coding adds unnecessary libraries | Medium | PRD stack is authoritative; new dependency requires a clear problem statement and measurable benefit. |

## 17. SEO, Metadata and Deployment

- Page title: `NEXO ONE - Built for Motion`.
- Description: concise concept/demo description without implying a real commercial product.
- Add favicon and high-quality Open Graph image.
- Use a canonical URL once deployed.
- No analytics dependency in v1 unless explicitly requested.
- Deploy previews and production on Vercel.
- Final production QA must be performed on the deployed build, not only local development.

## 18. Definition of Done

The v1 experience is complete only when all of the following are true:

- [ ] All section acceptance criteria pass.
- [ ] Phase 8 completion gate passes.
- [ ] Desktop, tablet, mobile and reduced-motion experiences are intentionally designed.
- [ ] Signature Hero and Exploded Anatomy scenes are smooth on real devices.
- [ ] No backend, database, auth, real payment or real checkout is present.
- [ ] Demo bag/colorway/size interactions work with keyboard and touch.
- [ ] No major console error, hydration warning, broken ScrollTrigger or horizontal overflow remains.
- [ ] Critical assets load progressively without visible layout shift.
- [ ] The final site is visually coherent without animation and remains understandable if optional 3D fails.
- [ ] Fictional content and commercial behavior are clearly presented as concept/demo.
- [ ] Production deployment has been reviewed on real desktop and mobile hardware.

## 19. Implementation Authority

When code, design experimentation or AI-generated suggestions conflict with this PRD, this PRD wins unless the PRD itself is deliberately revised. Any material scope change should be documented before implementation.
