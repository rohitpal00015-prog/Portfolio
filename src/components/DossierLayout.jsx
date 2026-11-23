import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from './SiteFooter';
import usePageReveal from '../lib/usePageReveal';
import { scrollToTarget } from '../lib/scroll';

export function DossierSection({ id, index, kicker, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`dossier-section ${className}`}>
      <div className="container dossier-section__grid">
        <header className="dossier-section__head">
          <p className="dossier-section__index">{index}</p>
          <p className="dossier-section__kicker">{kicker}</p>
          <h2>{title}</h2>
          {intro && <p className="dossier-section__intro">{intro}</p>}
        </header>
        <div className="dossier-section__body">{children}</div>
      </div>
    </section>
  );
}

export function StatStrip({ items }) {
  return (
    <div className="dossier-stats" data-reveal-group>
      {items.map((item) => (
        <div className="dossier-stat" key={`${item.label}-${item.value}`}>
          <span className="dossier-stat__value">{item.value}</span>
          <span className="dossier-stat__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function DossierLink({ href, children, className = 'dossier-link' }) {
  if (href.startsWith('/')) {
    return <Link className={className} to={href}>{children}</Link>;
  }
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function DossierToc({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="dossier-toc" aria-label="Dossier sections">
      <div className="container dossier-toc__inner">
        <span className="dossier-toc__label">In this file</span>
        <div className="dossier-toc__links">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={active === section.id ? 'is-active' : ''}
              onClick={(event) => {
                event.preventDefault();
                scrollToTarget(`#${section.id}`);
              }}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function DossierLayout({
  index,
  eyebrow,
  title,
  lede,
  tags = [],
  meta = [],
  sections = [],
  next,
  tone = 'green',
  reduced,
  children
}) {
  const rootRef = useRef(null);
  usePageReveal(rootRef, reduced);

  return (
    <article className={`dossier dossier--${tone}`} ref={rootRef}>
      <header className="dossier-hero">
        <div className="dossier-hero__orb" aria-hidden="true" />
        <div className="container dossier-hero__inner">
          <div className="dossier-hero__top" data-hero-reveal>
            <Link className="dossier-back" to="/#dossiers">
              <span aria-hidden="true">←</span> All case files
            </Link>
            <span className="dossier-file">Case file {index}</span>
          </div>

          <div className="dossier-hero__grid">
            <div className="dossier-hero__copy">
              <p className="dossier-kicker" data-hero-reveal>{eyebrow}</p>
              <h1 data-hero-reveal>{title}</h1>
              <p className="dossier-lede" data-hero-reveal>{lede}</p>
              {tags.length > 0 && (
                <ul className="dossier-tags" data-hero-reveal>
                  {tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              )}
            </div>

            <aside className="dossier-meta" data-hero-reveal>
              <p className="dossier-meta__stamp">Verified dossier</p>
              {meta.map((item) => (
                <div className="dossier-meta__row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
              <span className="dossier-meta__rule" aria-hidden="true" />
              <p className="dossier-meta__note">Compiled from primary records, merged code and official documents.</p>
            </aside>
          </div>
        </div>
      </header>

      {sections.length > 1 && <DossierToc sections={sections} />}

      <div className="dossier-body">{children}</div>

      {next && (
        <Link className={`dossier-next dossier-next--${next.tone || 'blue'}`} to={next.href}>
          <span className="dossier-next__index">Next case file {next.index}</span>
          <span className="dossier-next__title">{next.title}</span>
          <span className="dossier-next__arrow" aria-hidden="true">→</span>
        </Link>
      )}

      <SiteFooter />
    </article>
  );
}
