import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { timeline } from '../data';

export default function Timeline({ reduced }) {
  const rootRef = useRef(null);
  const fillRef = useRef(null);

  useLayoutEffect(() => {
    if (reduced) {
      if (fillRef.current) fillRef.current.style.transform = 'scaleY(1)';
      return undefined;
    }
    const ctx = gsap.context(() => {
      gsap.from('.tl-head > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' }
      });

      if (fillRef.current) {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.tl-list',
              start: 'top 75%',
              end: 'bottom 70%',
              scrub: 0.6
            }
          }
        );
      }

      gsap.utils.toArray('.tl-item').forEach((item) => {
        gsap.from(item, {
          y: 34,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 86%' }
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="timeline" className="timeline" ref={rootRef}>
      <div className="container">
        <header className="tl-head">
          <p className="section-label"><span>03</span> Trajectory</p>
          <h2 className="tl-title">
            A trajectory,<br /> not a <em>résumé.</em>
          </h2>
          <p className="tl-intro">
            From campus org teams to national hackathon finals, government fellowships and merged open-source
            code — the milestones that shaped how I build.
          </p>
        </header>

        <div className="tl-list">
          <div className="tl-line" aria-hidden="true"><span ref={fillRef} /></div>
          {timeline.map((item, index) => (
            <article className={`tl-item ${index % 2 === 0 ? 'tl-item--left' : 'tl-item--right'}`} key={item.id}>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-card">
                <p className="tl-card__meta">
                  <span className="tl-card__type">{item.type}</span>
                  <span className="tl-card__date">{item.date}</span>
                </p>
                <h3>{item.title}</h3>
                <p className="tl-card__org">{item.org}</p>
                <p className="tl-card__summary">{item.summary}</p>
                <ul className="tl-card__tags">
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <a className="tl-card__link" href={item.link} target="_blank" rel="noreferrer">
                  Learn more <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="tl-foot">
          <a className="btn btn--ghost" href="/hackathons-leadership.html">
            Full milestone log <span aria-hidden="true">↗</span>
          </a>
          <span className="tl-foot__note">22 milestones · 2024 — 2026</span>
        </div>
      </div>
    </section>
  );
}
