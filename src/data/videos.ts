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
  /** Optional manual thumbnail. If omitted, auto-derived from Vimeo/YouTube. Path relative to /public, e.g. '/thumbnails/pingo.jpg'. */
  thumbnail?: string;
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
    url: 'https://www.tella.tv/video/vid_cmqjitm50007d04jxhyuf441q',
    thumbnail: '/thumbnails/pingo-ai.webp',
    featured: true,
  },
  {
    id: 'anim-addons',
    title: 'anim addons short',
    brand: 'Animation Add Ons',
    niche: 'b2b-saas',
    url: 'https://www.tella.tv/video/vid_cmqji7cw203pw04kzdq5n0h4c',
    thumbnail: '/thumbnails/anim-addons.webp',
  },
  {
    id: 'cloudways',
    title: 'Cloudways Cloud Bootcamp',
    brand: 'Cloudways',
    niche: 'b2b-saas',
    url: 'https://www.tella.tv/video/vid_cmqjiweoz00k504l54qwahzdt',
    thumbnail: '/thumbnails/cloudways.webp',
  },
];
