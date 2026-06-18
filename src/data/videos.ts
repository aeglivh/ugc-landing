/**
 * Add a UGC video by appending an entry below.
 *
 *   url    Vimeo or YouTube share URL. Pasting the page link is enough.
 *          (https://vimeo.com/123456789  or  https://youtu.be/abc123)
 *   featured  Set `true` on ONE video to show it as the hero reel.
 *
 * No build step needed beyond `npm run dev` / Vercel auto-deploy.
 */

export type Video = {
  id: string;
  title: string;
  brand: string;
  niche: 'b2b-saas' | 'ai-tools';
  url: string;
  /** Tile aspect ratio. Defaults to '9 / 16' (vertical UGC). Use '16 / 9' or '4 / 3' for landscape. */
  aspect?: '9 / 16' | '16 / 9' | '4 / 3' | '1 / 1';
  /** Optional one-line quote shown under the tile */
  quote?: string;
  /** Set true on a single video to feature it in the hero portfolio slot */
  featured?: boolean;
};

export const videos: Video[] = [
  {
    id: 'pingo-ai',
    title: 'Pingo AI UGC',
    brand: 'Pingo AI',
    niche: 'ai-tools',
    url: 'https://vimeo.com/1202481284',
    featured: true,
  },
  {
    id: 'anim-addons',
    title: 'anim addons short',
    brand: 'anim addons',
    niche: 'ai-tools',
    url: 'https://vimeo.com/1202485085',
    aspect: '4 / 3',
  },
  {
    id: 'sample-2',
    title: 'AI tool walkthrough',
    brand: 'Sample brand',
    niche: 'ai-tools',
    url: 'https://vimeo.com/76979871',
  },
  {
    id: 'sample-3',
    title: 'B2B SaaS explainer',
    brand: 'Sample brand',
    niche: 'b2b-saas',
    url: 'https://vimeo.com/76979871',
  },
];
