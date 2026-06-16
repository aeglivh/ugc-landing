# ugc-landing

Personal UGC creator portfolio. Static Astro + React 18 + Tailwind v4.

## Adding content (no code knowledge needed)

- **Videos** → edit `src/data/videos.ts`. Paste a YouTube or Vimeo URL, give it a title + brand + niche, deploy.
- **Brands** → edit `src/data/brands.ts`. Drop a logo SVG/PNG into `public/brands/` and reference it.
- **Services / process / niches** → edit `src/data/services.ts`.
- **Accent color** → change `--accent` in `src/styles/globals.css` (one hex, one line).
- **Display font** → change `--font-display` in the same file. To use a custom font, drop the .woff2 in `public/fonts/` and add an `@font-face` block at the top of `globals.css`.

## Stack

- Astro 6 (static output, Vercel adapter)
- React 18 (only for the LandingPage island)
- Tailwind v4 via Vite plugin (mostly inline styles — Tailwind v4 spacing utilities are flaky)
- Lenis smooth scroll (respects `prefers-reduced-motion`)
- Self-hosted Inter + JetBrains Mono (GDPR-safe, no external font CDN)

## Project structure

```
src/
  pages/index.astro          — entry, single page
  layouts/BaseLayout.astro   — head/meta wrapper
  components/landing/
    LandingPage.tsx          — all 9 sections in one file
    VideoEmbed.tsx           — click-to-play YouTube/Vimeo embed
  data/                      — content lives here (videos, brands, services)
  lib/embed.ts               — URL → iframe src helper
  styles/globals.css         — palette, fonts, signature patterns
public/
  fonts/                     — self-hosted woff2
  brands/                    — brand logos (drop SVG/PNG here)
```

## Development

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # static output to dist/
```

## Sections

1. Nav (sticky, mono links)
2. Hero with featured reel
3. Niches strip
4. Portfolio (video grid with niche filter)
5. Brands worked with (inverted ink section)
6. Services (4-card rail)
7. Process (4-step rail with mono numerals)
8. About (photo + 2 paragraphs)
9. Rates (3 cards: single / bundle / custom)
10. Contact (form posts via mailto, plus direct email)
11. Footer

## Notes / quirks

- Tailwind v4 spacing classes are unreliable in this stack; use inline `style={{ marginTop: 24 }}` instead.
- Self-host any new font (do NOT use Google Fonts CDN) — GDPR.
- Featured video = whichever entry in `videos.ts` has `featured: true`. Falls back to first entry.
