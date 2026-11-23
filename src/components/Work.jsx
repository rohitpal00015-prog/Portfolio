import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  categoryLabel,
  featuredProjects,
  archiveProjects,
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
  const previewRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All work', count: archiveProjects.length },
    ...Object.entries(categoryLabel).map(([id, label]) => ({
      id,
      label,
      count: archiveProjects.filter((project) => project.category === id).length
    }))
  ];
  const visibleProjects = filter === 'all'
    ? archiveProjects
    : archiveProjects.filter((project) => project.category === filter);

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

  useEffect(() => {
    if (reduced) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const preview = previewRef.current;
    const section = rootRef.current;
    if (!preview || !section) return undefined;

    gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.9 });
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      xTo(event.clientX);
      yTo(event.clientY);
    };
    section.addEventListener('mousemove', move);
    return () => {
      section.removeEventListener('mousemove', move);
      gsap.killTweensOf(preview);
    };
  }, [reduced]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    if (hovered && pointerRef.current.x === 0) {
      gsap.set(preview, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    gsap.to(preview, {
      autoAlpha: hovered ? 1 : 0,
      scale: hovered ? 1 : 0.92,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  }, [hovered]);

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
              Eight selected builds from a longer archive of {archiveProjects.length} — AI marketplaces,
              event platforms, community tools and shipped client work.
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
              <div className="work-panel__media">
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

      <div className="container work__archive">
        <div className="archive__head">
          <div>
            <h3>The full archive <span>({archiveProjects.length})</span></h3>
            <p>Every build, live product and experiment — filter by category, hover to preview.</p>
          </div>
          <div className="archive__filters" role="group" aria-label="Filter projects by category">
            {filters.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`archive__filter ${filter === item.id ? 'is-active' : ''}`}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label} <span>{String(item.count).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="archive__list" key={filter}>
          {visibleProjects.map((project, index) => {
            const dest = project.demo || project.github;
            const internal = dest?.startsWith('/');
            const Tag = internal ? Link : dest ? 'a' : 'div';
            const linkProps = internal
              ? { to: dest }
              : dest
                ? { href: dest, target: '_blank', rel: 'noreferrer' }
                : {};
            return (
              <Tag
                className="archive-row"
                key={project.id}
                style={{ '--row': index }}
                {...linkProps}
                onMouseEnter={() => setHovered(project)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(project)}
                onBlur={() => setHovered(null)}
              >
                <span className="archive-row__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="archive-row__title">{project.title}</span>
                <span className="archive-row__cat">{categoryLabel[project.category]}</span>
                <span className="archive-row__stack">{project.techStack.slice(0, 3).join(' · ')}</span>
                <span className="archive-row__arrow" aria-hidden="true">{dest ? '↗' : '·'}</span>
              </Tag>
            );
          })}
        </div>

        <a
          className="archive__all"
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          data-magnetic
        >
          Explore all repositories on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="work-preview" ref={previewRef} aria-hidden="true">
        {hovered && <Cover project={hovered} />}
      </div>
    </section>
  );
}
