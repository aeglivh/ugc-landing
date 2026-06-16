import { useState } from 'react';
import { toEmbedUrl } from '../../lib/embed';

type Props = {
  url: string;
  title: string;
  /** '9 / 16' for vertical UGC, '16 / 9' for landscape */
  aspect?: '9 / 16' | '16 / 9' | '1 / 1';
};

export default function VideoEmbed({ url, title, aspect = '9 / 16' }: Props) {
  const [active, setActive] = useState(false);
  const embed = toEmbedUrl(url);

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
          src={`${embed.src}?autoplay=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
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
            background: 'transparent',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--paper)',
          }}
        >
          <span
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--accent)',
              color: 'var(--ink)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 24,
              fontWeight: 600,
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
