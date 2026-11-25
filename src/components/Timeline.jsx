import { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { timeline } from '../data';

const FILTERS = [
  { id: 'all', label: 'All Milestones' },
  { id: 'work', label: 'Roles & Leadership' },
  { id: 'hackathon', label: 'Hackathons & Podiums' },
  { id: 'opensource', label: 'Open Source & Fellowships' }
];

export default function Timeline({ reduced }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const rootRef = useRef(null);
  const railRef = useRef(null);
  const listRef = useRef(null);

  const filteredItems = activeFilter === 'all'
    ? timeline
    : timeline.filter((item) => item.category === activeFilter);

  // GSAP entrance animations for section header, metrics, rail
  useLayoutEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.tl-head > *', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' }
      });

      gsap.from('.tl-metrics-strip > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.tl-metrics-strip', start: 'top 85%' }
      });

      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.tl-rail-wrapper',
              start: 'top 75%',
              end: 'bottom 70%',
              scrub: 0.5
            }
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  // Smooth immediate entrance for cards on mount & filter tab switch
  useLayoutEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tl-vcard',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [activeFilter, reduced]);

  return (
    <section id="timeline" className="timeline" ref={rootRef}>
      <div className="container">
        {/* Section Header - Clean, direct, modern */}
        <header className="tl-head">
          <div className="tl-eyebrow">
            <span className="tl-eyebrow__badge">TRACK RECORD</span>
            <span className="tl-eyebrow__sep">/</span>
            <span className="tl-eyebrow__range">2024 — 2026</span>
          </div>

          <h2 className="tl-title">
            Experience &amp; <em>Milestones</em>
          </h2>

          <p className="tl-intro">
            Directly showcasing verified engineering roles, campus leadership at UIT Coding Club (UCC),
            national hackathon podiums, government cyber fellowship, and merged upstream open source contributions.
          </p>
        </header>

        {/* Impact Metrics Summary Strip */}
        <div className="tl-metrics-strip">
          <div className="tl-metric-box">
            <div className="tl-metric-num">500<span>+</span></div>
            <div className="tl-metric-label">Coders Led &amp; Mentored in UCC</div>
          </div>
          <div className="tl-metric-box">
            <div className="tl-metric-num">20<span>+</span></div>
            <div className="tl-metric-label">Merged Gerrit Patches (Wikimedia)</div>
          </div>
          <div className="tl-metric-box">
            <div className="tl-metric-num">Top 10</div>
            <div className="tl-metric-label">National Hackathon Podiums</div>
          </div>
          <div className="tl-metric-box">
            <div className="tl-metric-num">Govt.</div>
            <div className="tl-metric-label">UP Police Cyber Security Fellow</div>
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="tl-filter-bar">
          <span className="tl-filter-bar__label">FILTER BY:</span>
          <div className="tl-filter-pills" role="tablist">
            {FILTERS.map((f) => {
              const count = f.id === 'all'
                ? timeline.length
                : timeline.filter((i) => i.category === f.id).length;
              const isActive = activeFilter === f.id;

              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`tl-filter-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  <span className="tl-filter-btn__text">{f.label}</span>
                  <span className="tl-filter-btn__count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modern Single-Rail Timeline */}
        <div className="tl-rail-wrapper" ref={listRef}>
          {/* Vertical Progress Rail */}
          <div className="tl-rail-line" aria-hidden="true">
            <div className="tl-rail-fill" ref={railRef} />
          </div>

          <div className="tl-stream">
            {filteredItems.map((item, index) => {
              const isExternal = item.link && !item.link.startsWith('/');
              const categoryClass = `cat--${item.category || 'work'}`;

              return (
                <article
                  className={`tl-vcard ${categoryClass}`}
                  key={item.id}
                  data-index={index}
                >
                  {/* Timeline Rail Node / Dot */}
                  <div className="tl-node-anchor" aria-hidden="true">
                    <span className="tl-node-dot" />
                    <span className="tl-node-ring" />
                  </div>

                  {/* Card Main Body */}
                  <div className="tl-card-inner">
                    {/* Header Row */}
                    <div className="tl-card-header">
                      <div className="tl-card-badges">
                        <span className={`tl-badge tl-badge--${item.category || 'work'}`}>
                          <span className="tl-badge__bullet" />
                          {item.type}
                        </span>
                        <span className="tl-date-pill">{item.date}</span>
                      </div>
                      <span className="tl-index-num">#{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    {/* Card Title & Organization */}
                    <h3 className="tl-card-title">{item.title}</h3>
                    <div className="tl-card-org">
                      <svg
                        className="tl-org-icon"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 21h18" />
                        <path d="M5 21V7l8-4v18" />
                        <path d="M19 21V11l-6-4" />
                        <path d="M9 9v.01" />
                        <path d="M9 12v.01" />
                        <path d="M9 15v.01" />
                        <path d="M9 18v.01" />
                      </svg>
                      <span>{item.org}</span>
                    </div>

                    {/* Description */}
                    <p className="tl-card-summary">{item.summary}</p>

                    {/* Tech / Skills Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <ul className="tl-tag-list">
                        {item.tags.map((tag) => (
                          <li key={tag} className="tl-tag-chip">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Action CTA Link */}
                    {item.link && (
                      <div className="tl-card-footer">
                        {isExternal ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tl-action-link"
                          >
                            <span>Explore Milestone</span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="7" y1="17" x2="17" y2="7" />
                              <polyline points="7 7 17 7 17 17" />
                            </svg>
                          </a>
                        ) : (
                          <Link to={item.link} className="tl-action-link">
                            <span>Read Full Case / Details</span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="7" y1="17" x2="17" y2="7" />
                              <polyline points="7 7 17 7 17 17" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Section Footer */}
        <div className="tl-foot">
          <Link className="btn btn--ghost" to="/hackathons">
            View All 22+ Hackathons &amp; Events <span aria-hidden="true">↗</span>
          </Link>
          <span className="tl-foot__note">10 Featured Milestones · 2024 — 2026</span>
        </div>
      </div>
    </section>
  );
}
