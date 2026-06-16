/**
 * Convert a YouTube/Vimeo share URL into an iframe embed URL.
 * Returns null if the URL isn't recognised — caller can show a fallback.
 */
export function toEmbedUrl(url: string): { src: string; provider: 'youtube' | 'vimeo' } | null {
  try {
    const u = new URL(url);

    // YouTube
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      if (id) return { src: `https://www.youtube-nocookie.com/embed/${id}`, provider: 'youtube' };
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return { src: `https://www.youtube-nocookie.com/embed/${id}`, provider: 'youtube' };
    }

    // Vimeo
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return { src: `https://player.vimeo.com/video/${id}`, provider: 'vimeo' };
    }
  } catch {
    /* fall through */
  }
  return null;
}
