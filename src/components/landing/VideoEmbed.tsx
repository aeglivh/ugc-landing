import { useState } from 'react';
import { toEmbedUrl, toPosterUrl } from '../../lib/embed';

type Props = {
  url: string;
  title: string;
  /** '9 / 16' for vertical UGC, '16 / 9' or '4 / 3' for landscape */
  aspect?: '9 / 16' | '16 / 9' | '4 / 3' | '1 / 1';
  /** Optional manual thumbnail path. If omitted, auto-derived from Vimeo/YouTube. */
  poster?: string;
};

export default function VideoEmbed({ url, title, aspect = '9 / 16', poster }: Props) {
  const [active, setActive] = useState(false);
  const embed = toEmbedUrl(url);
  const posterUrl = poster ?? toPosterUrl(url);

  if (!embed) {
    return (
      <div
        style={{
          aspectRatio: aspect,
          background: 'var(--paper-deep)',
          color: 'var(--ink-soft)',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'var(--mono)',
          fontSize: 12,
          padding: 24,
          textAlign: 'center',
        }}
      >
        Unsupported URL — paste a YouTube or Vimeo link
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', aspectRatio: aspect, background: 'var(--ink)', overflow: 'hidden' }}>
      {active ? (
        <iframe
          src={`${embed.src}${embed.src.includes('?') ? '&' : '?'}autoplay=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play ${title}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            padding: 0,
            background: 'transparent',
            cursor: 'pointer',
            display: 'block',
          }}
        >
          {posterUrl && (
            <img
              src={posterUrl}
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}
          <span
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--accent)',
              color: 'var(--ink)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 22,
              fontWeight: 600,
              boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
            }}
            aria-hidden="true"
          >
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
