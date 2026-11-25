import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCardTilt } from '../lib/useCardTilt';
import {
  categoryLabel,
  featuredProjects,
  asset,
  initials,
  profile
} from '../data';

const containIds = ['palbasket', 'zynoq', 'apcsip-portal'];

function Cover({ project, className = '' }) {
  const image = asset(project.image);
  if (image) {
    return (
      <img
        className={`${className} ${containIds.includes(project.id) ? 'is-contain' : ''}`}
        src={image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div className={`typo-cover typo-cover--${project.category} ${className}`} aria-hidden="true">
      <span className="typo-cover__initials">{initials(project.title)}</span>
      <small>{project.badge}</small>
    </div>
  );
}

export default function Work({ reduced }) {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const railRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);

  useCardTilt('.work-panel__media');

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const rail = railRef.current;
      const pin = pinRef.current;
      if (!rail || !pin) return undefined;
      const distance = () => Math.max(1, rail.scrollWidth - window.innerWidth);

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${0.05 + self.progress * 0.95})`;
            }
            if (countRef.current) {
              const index = Math.min(featuredProjects.length, Math.floor(self.progress * featuredProjects.length) + 1);
              countRef.current.textContent = `${String(index).padStart(2, '0')} / ${String(featuredProjects.length).padStart(2, '0')}`;
            }
          }
        }
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="work" className="work" ref={rootRef}>
      <div className="container work__head">
        <p className="section-label"><span>02</span> Selected Work</p>
        <div className="work__head-grid">
          <h2 className="work__title">
            Proof, not <em>promises</em>.
          </h2>
          <div className="work__head-note">
            <p>
              Eight selected production builds — AI marketplaces, event platforms, community tools and shipped client work.
            </p>
            {!reduced && (
              <span className="work__hint">Scroll to travel horizontally <span aria-hidden="true">→</span></span>
            )}
          </div>
        </div>
      </div>

      <div className={`work__pin ${reduced ? 'is-static' : ''}`} ref={pinRef}>
        <div className="work__rail" ref={railRef}>
          {featuredProjects.map((project, index) => (
            <article className="work-panel" key={project.id}>
              <div className="work-panel__media" data-tilt>
                <div className="work-panel__media-inner">
                  <Cover project={project} />
                  <span className="work-panel__index">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <div className="work-panel__meta">
                <p className="work-panel__cat">
                  <span>{categoryLabel[project.category]}</span>
                  <i />
                  {project.badge}
                </p>
                <h3>{project.title}</h3>
                <p className="work-panel__desc">{project.description}</p>
                <ul className="work-panel__stack">
                  {project.techStack.slice(0, 5).map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
                <div className="work-panel__links">
                  {project.demo && (
                    project.demo.startsWith('/') ? (
                      <Link to={project.demo}>Open dossier <span aria-hidden="true">↗</span></Link>
                    ) : (
                      <a href={project.demo} target="_blank" rel="noreferrer">Live site <span aria-hidden="true">↗</span></a>
                    )
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">Source <span aria-hidden="true">↗</span></a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="work__hud container">
          <span className="work__hud-label">Selected builds</span>
          <div className="work__progress"><span ref={barRef} /></div>
          <span className="work__count" ref={countRef}>01 / {String(featuredProjects.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="container work__callout-wrap">
        <div className="bento-github-callout">
          <div className="bento-github-callout__copy">
            <h4>Looking for deeper commits, experimental CLI tools &amp; forks?</h4>
            <p>All active development, upstream Gerrit patches, and research code are versioned publicly.</p>
          </div>
          <a
            className="glow-btn"
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            <span className="glow-btn__surface">
              <span>Explore GitHub Repositories</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
