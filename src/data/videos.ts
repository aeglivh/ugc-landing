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
  /** Optional one-line quote shown under the tile */
  quote?: string;
  /** Set true on a single video to feature it in the hero portfolio slot */
  featured?: boolean;
};

export const videos: Video[] = [
  {
    id: 'sample-1',
    title: 'Replace me — featured reel',
    brand: 'Your brand',
    niche: 'b2b-saas',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    featured: true,
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
