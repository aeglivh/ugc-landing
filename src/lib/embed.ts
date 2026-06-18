function extractId(url: string): { id: string; provider: 'youtube' | 'vimeo' } | null {
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
  } catch {
    /* fall through */
  }
  return null;
}

/**
 * Convert a YouTube/Vimeo share URL into an iframe embed URL.
 * Returns null if the URL isn't recognised — caller can show a fallback.
 */
export function toEmbedUrl(url: string): { src: string; provider: 'youtube' | 'vimeo' } | null {
  const parsed = extractId(url);
  if (!parsed) return null;
  const src = parsed.provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${parsed.id}`
    : `https://player.vimeo.com/video/${parsed.id}`;
  return { src, provider: parsed.provider };
}

/**
 * Auto-derive a poster/thumbnail URL.
 * YouTube: official CDN (img.youtube.com).
 * Vimeo: vumbnail.com (free public service that resolves Vimeo IDs to thumbnails).
 * Returns null if URL isn't recognised — caller should show a fallback.
 */
export function toPosterUrl(url: string): string | null {
  const parsed = extractId(url);
  if (!parsed) return null;
  return parsed.provider === 'youtube'
    ? `https://img.youtube.com/vi/${parsed.id}/maxresdefault.jpg`
    : `https://vumbnail.com/${parsed.id}_large.jpg`;
}
