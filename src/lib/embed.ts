type Provider = 'youtube' | 'vimeo' | 'tella';

function extractId(url: string): { id: string; provider: Provider } | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      if (id) return { id, provider: 'youtube' };
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return { id, provider: 'youtube' };
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return { id, provider: 'vimeo' };
    }
    if (u.hostname.includes('tella.tv')) {
      // /video/vid_xxxxx[/embed]
      const parts = u.pathname.split('/').filter(Boolean);
      const idx = parts.indexOf('video');
      const id = idx >= 0 ? parts[idx + 1] : undefined;
      if (id) return { id, provider: 'tella' };
    }
  } catch {
    /* fall through */
  }
  return null;
}

/**
 * Convert a video share URL into an iframe embed URL.
 * Returns null if the URL isn't recognised — caller can show a fallback.
 */
export function toEmbedUrl(url: string): { src: string; provider: Provider } | null {
  const parsed = extractId(url);
  if (!parsed) return null;
  let src: string;
  if (parsed.provider === 'youtube')      src = `https://www.youtube-nocookie.com/embed/${parsed.id}`;
  else if (parsed.provider === 'vimeo')   src = `https://player.vimeo.com/video/${parsed.id}`;
  // Tella: a=0 disables autoplay so the player shows its own poster + play button
  // (one click on our overlay loads it, one click in Tella plays with sound).
  else                                    src = `https://www.tella.tv/video/${parsed.id}/embed?b=0&title=0&a=0&loop=0&t=0&muted=0&wt=0&o=1`;
  return { src, provider: parsed.provider };
}

/**
 * Auto-derive a poster/thumbnail URL.
 * YouTube: official CDN (img.youtube.com).
 * Vimeo: vumbnail.com (free public service that resolves Vimeo IDs to thumbnails).
 * Tella: signed/expiring URLs only — caller must provide a manual thumbnail path.
 * Returns null if no auto-thumbnail is available.
 */
export function toPosterUrl(url: string): string | null {
  const parsed = extractId(url);
  if (!parsed) return null;
  if (parsed.provider === 'youtube') return `https://img.youtube.com/vi/${parsed.id}/maxresdefault.jpg`;
  if (parsed.provider === 'vimeo')   return `https://vumbnail.com/${parsed.id}_large.jpg`;
  return null;
}
