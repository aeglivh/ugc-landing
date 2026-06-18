import { useEffect, useMemo, useState } from 'react';
import { videos } from '../../data/videos';
import { services, process as steps, niches } from '../../data/services';
import VideoEmbed from './VideoEmbed';

const SITE_NAME = 'Andrea Egli';
const TAGLINE = 'Product video and UGC for B2B SaaS and AI tools.';
const EMAIL = 'aegliaegli@gmail.com';

/** Paste your Formspree endpoint here once you've created the form at https://formspree.io.
 *  Looks like 'https://formspree.io/f/xyzabc'. Leave empty to fall back to a mailto form. */
const FORMSPREE_URL = 'https://formspree.io/f/mnjykpjd';

export default function LandingPage() {
  // Lenis smooth scroll (respect reduced motion)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.05 });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <main style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <Nav />
      <Hero />
      <NichesStrip />
      <Portfolio />
      <Services />
      <Process />
      <About />
      <Rates />
      <Contact />
      <Footer />
    </main>
  );
}

/* ─────────────────────────  NAV  ───────────────────────── */
function Nav() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(244, 243, 239, 0.85)',
        backdropFilter: 'saturate(140%) blur(10px)',
        borderBottom: '1px solid var(--rule-soft)',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a href="#top" style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none' }}>
          {SITE_NAME}
        </a>
        <nav style={{ display: 'flex', gap: 24, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          <a href="#work" style={navLink}>Work</a>
          <a href="#services" style={navLink}>Services</a>
          <a href="#rates" style={navLink}>Rates</a>
          <a href="#contact" style={navLink}>Contact</a>
        </nav>
      </div>
    </header>
  );
}
const navLink: React.CSSProperties = { color: 'var(--ink)', textDecoration: 'none' };

/* ─────────────────────────  HERO  ───────────────────────── */
function Hero() {
  const featured = useMemo(() => videos.find((v) => v.featured) ?? videos[0], []);
  return (
    <section id="top" style={{ borderBottom: '1px solid var(--rule)' }}>
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '88px 24px 64px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: 48,
          alignItems: 'end',
        }}
        className="hero-grid"
      >
        <div>
          <p className="kicker" style={{ marginBottom: 20 }}>UGC creator · Available for bookings</p>
          <h1
            className="display"
            style={{ fontSize: 'clamp(44px, 9vw, 124px)', marginBottom: 24 }}
          >
            If your product takes 10 minutes to explain, I'll do it in <span className="mark">60 seconds</span>.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-soft)', maxWidth: 540 }}>
            {TAGLINE}
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#contact" style={btnPrimary}>Book a shoot</a>
            <a href="#work" style={btnSecondary}>See the work</a>
          </div>
        </div>
        <div>
          {featured && <VideoEmbed url={featured.url} title={featured.title} aspect={featured.aspect ?? '9 / 16'} poster={featured.thumbnail} />}
        </div>
      </div>
      <style>{`@media (max-width: 880px) { .hero-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

const btnPrimary: React.CSSProperties = {
  display: 'inline-block',
  padding: '14px 24px',
  background: 'var(--ink)',
  color: 'var(--paper)',
  textDecoration: 'none',
  fontFamily: 'var(--mono)',
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};
const btnSecondary: React.CSSProperties = {
  display: 'inline-block',
  padding: '14px 24px',
  background: 'transparent',
  color: 'var(--ink)',
  border: '1px solid var(--ink)',
  textDecoration: 'none',
  fontFamily: 'var(--mono)',
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

/* ─────────────────────────  NICHES  ───────────────────────── */
function NichesStrip() {
  return (
    <section style={{ borderBottom: '1px solid var(--rule-soft)' }}>
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '24px',
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span className="kicker" style={{ color: 'var(--ink-soft)' }}>Niches</span>
        {niches.map((n) => (
          <span
            key={n.value}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              borderBottom: '1px solid var(--rule-soft)',
              paddingBottom: 2,
            }}
          >
            {n.label}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────  PORTFOLIO  ───────────────────────── */
function Portfolio() {
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? videos : videos.filter((v) => v.niche === filter);

  return (
    <section id="work" style={{ borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <div>
            <p className="kicker" style={{ marginBottom: 12 }}>01 / Selected work</p>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Recent <span className="mark">work</span>.
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterChip>
            {niches.map((n) => (
              <FilterChip key={n.value} active={filter === n.value} onClick={() => setFilter(n.value)}>
                {n.label}
              </FilterChip>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: 'var(--ink-soft)', fontFamily: 'var(--mono)', fontSize: 13 }}>No videos in this niche yet.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 24,
            }}
          >
            {filtered.map((v) => (
              <article key={v.id}>
                <VideoEmbed url={v.url} title={v.title} aspect={v.aspect ?? '9 / 16'} poster={v.thumbnail} />
                <p style={{ paddingTop: 12, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  {v.brand}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterChip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '8px 14px',
        background: active ? 'var(--ink)' : 'transparent',
        color: active ? 'var(--paper)' : 'var(--ink)',
        border: '1px solid var(--ink)',
        fontFamily: 'var(--mono)',
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────  SERVICES  ───────────────────────── */
function Services() {
  return (
    <section id="services" style={{ borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 24px' }}>
        <p className="kicker" style={{ marginBottom: 12 }}>02 / What I do</p>
        <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 56 }}>
          Video <span className="mark">for every funnel stage</span>.
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 0,
            border: '1px solid var(--rule)',
          }}
        >
          {services.map((s, i) => (
            <article
              key={s.title}
              style={{
                padding: 28,
                borderRight: i < services.length - 1 ? '1px solid var(--rule)' : undefined,
                background: 'var(--paper)',
              }}
              className="service-card"
            >
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-soft)', marginBottom: 12 }}>
                {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 500, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{s.description}</p>
            </article>
          ))}
        </div>
        <style>{`@media (max-width: 720px) {
          .service-card { border-right: none !important; border-bottom: 1px solid var(--rule); }
          .service-card:last-child { border-bottom: none; }
        }`}</style>
      </div>
    </section>
  );
}

/* ─────────────────────────  PROCESS  ───────────────────────── */
function Process() {
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', background: 'var(--paper-alt)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 24px' }}>
        <p className="kicker" style={{ marginBottom: 12 }}>03 / How it works</p>
        <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 56 }}>
          Brief to delivery in <span className="mark">5 days</span>.
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.number}
              style={{
                padding: 24,
                borderRight: i < steps.length - 1 ? '1px solid var(--rule)' : undefined,
                borderLeft: i === 0 ? '1px solid var(--rule)' : undefined,
                borderTop: '1px solid var(--rule)',
                borderBottom: '1px solid var(--rule)',
                background: 'var(--paper)',
              }}
              className="step-cell"
            >
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 16 }}>
                {s.number} / 04
              </p>
              <h3 style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{s.description}</p>
            </div>
          ))}
        </div>
        <style>{`@media (max-width: 720px) {
          .step-cell { border-right: none !important; border-left: 1px solid var(--rule) !important; border-bottom: none; }
          .step-cell:last-child { border-bottom: 1px solid var(--rule); }
        }`}</style>
      </div>
    </section>
  );
}

/* ─────────────────────────  ABOUT  ───────────────────────── */
function About() {
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '96px 24px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: 56,
          alignItems: 'start',
        }}
        className="about-grid"
      >
        <div
          style={{
            aspectRatio: '4 / 5',
            background: 'var(--paper-deep)',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--ink-soft)',
            fontFamily: 'var(--mono)',
            fontSize: 12,
          }}
        >
          Photo of you
        </div>
        <div>
          <p className="kicker" style={{ marginBottom: 12 }}>04 / About</p>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 32 }}>
            I make complex products <span className="mark">easy to understand</span>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 20 }}>
            I'm a certified web developer based in Vienna. I've spent years on camera explaining technical products, the kind brands struggle to make feel human on screen.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 20 }}>
            That means when you send me a brief, I actually understand what I'm filming. No 45-minute onboarding call. No scripts that sound like a features list. Just clear, natural video that makes your product click for the right buyer.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
            If you want to see my long-form content, you can check it out{' '}
            <a
              href="https://www.youtube.com/@andreaegli"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
      <style>{`@media (max-width: 880px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ─────────────────────────  RATES  ───────────────────────── */
function Rates() {
  return (
    <section id="rates" style={{ borderBottom: '1px solid var(--rule)', background: 'var(--paper-alt)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 24px' }}>
        <p className="kicker" style={{ marginBottom: 12 }}>05 / Rates</p>
        <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 48 }}>
          Simple <span className="mark">pricing</span>.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          <RateCard title="Single video" price="€350" lines={['1 concept', '9:16 + 1:1 deliverables', '2 rounds of edits', '5-day turnaround']} />
          <RateCard title="3-video bundle" price="€900" lines={['3 concepts', '9:16 + 1:1 deliverables', '2 rounds of edits each', '7-day turnaround']} highlight />
          <RateCard title="Custom" price="On request" lines={['Long-form, batch shoots', 'Whitelisted ads', 'Retainer pricing', 'Reply within 24h']} />
        </div>
      </div>
    </section>
  );
}

function RateCard({ title, price, lines, highlight }: { title: string; price: string; lines: string[]; highlight?: boolean }) {
  return (
    <div
      style={{
        padding: 32,
        background: highlight ? 'var(--ink)' : 'var(--paper)',
        color: highlight ? 'var(--paper)' : 'var(--ink)',
        border: `1px solid ${highlight ? 'var(--ink)' : 'var(--rule)'}`,
      }}
    >
      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: highlight ? 'var(--accent)' : 'var(--ink-soft)', marginBottom: 16 }}>
        {title}
      </p>
      <p className="display" style={{ fontSize: 44, marginBottom: 24, color: 'inherit' }}>{price}</p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
        {lines.map((line) => (
          <li key={line} style={{ fontSize: 14, lineHeight: 1.5, opacity: highlight ? 0.85 : 1, color: highlight ? 'var(--paper)' : 'var(--ink-soft)' }}>
            — {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────  CONTACT  ───────────────────────── */
function Contact() {
  return (
    <section id="contact" className="dark-section" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '96px 24px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 56,
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        <div>
          <p className="kicker" style={{ marginBottom: 12 }}>06 / Book a shoot</p>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--paper)' }}>
            Let's <span className="mark">make</span> something.
          </h2>
          <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.6, color: 'var(--ink-text-dim)', maxWidth: 420 }}>
            Tell me about your product and what you need it to do. I'll get back to you within 24 hours.
          </p>
          <p style={{ marginTop: 32, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.12em', color: 'var(--ink-text-dim)' }}>
            Or email directly: <a href={`mailto:${EMAIL}`} style={{ color: 'var(--accent)' }}>{EMAIL}</a>
          </p>
        </div>
        <ContactForm />
      </div>
      <style>{`@media (max-width: 880px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const hasFormspree = FORMSPREE_URL.length > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!hasFormspree) return; // let the browser handle mailto natively
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
        <p className="kicker" style={{ color: 'var(--accent)', marginBottom: 12 }}>Brief received</p>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--paper)' }}>
          Thanks. I'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      action={hasFormspree ? FORMSPREE_URL : `mailto:${EMAIL}`}
      method="POST"
      encType={hasFormspree ? undefined : 'text/plain'}
      onSubmit={handleSubmit}
      style={{ display: 'grid', gap: 16 }}
    >
      <Field label="Your name" name="name" />
      <Field label="Brand / company" name="brand" />
      <Field label="Email" name="email" type="email" required />
      <Field label="What do you want to make?" name="message" textarea />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          ...btnPrimary,
          background: 'var(--accent)',
          color: 'var(--ink)',
          border: 0,
          marginTop: 8,
          justifySelf: 'start',
          cursor: status === 'sending' ? 'wait' : 'pointer',
          opacity: status === 'sending' ? 0.6 : 1,
        }}
      >
        {status === 'sending' ? 'Sending…' : 'Send brief →'}
      </button>
      {status === 'error' && (
        <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)' }}>
          Something went wrong. Email me directly at <a href={`mailto:${EMAIL}`} style={{ color: 'var(--accent)' }}>{EMAIL}</a>.
        </p>
      )}
    </form>
  );
}

function Field({ label, name, type = 'text', textarea, required }: { label: string; name: string; type?: string; textarea?: boolean; required?: boolean }) {
  const shared: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 0,
    borderBottom: '1px solid rgba(255,255,255,0.24)',
    padding: '10px 0',
    color: 'var(--paper)',
    fontFamily: 'var(--sans)',
    fontSize: 15,
    outline: 'none',
  };
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-text-dim)' }}>
        {label}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} required={required} style={shared} />
      ) : (
        <input type={type} name={name} required={required} style={shared} />
      )}
    </label>
  );
}

/* ─────────────────────────  FOOTER  ───────────────────────── */
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--ink-text-dim)', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '32px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'space-between',
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span>© {new Date().getFullYear()} {SITE_NAME}</span>
        <span><a href={`mailto:${EMAIL}`} style={{ color: 'var(--ink-text-dim)' }}>{EMAIL}</a></span>
      </div>
    </footer>
  );
}
