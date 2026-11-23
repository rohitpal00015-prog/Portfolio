import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { dossiers } from '../data';

export default function Dossiers({ reduced }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.dossiers__head > *', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 74%' }
      });
      gsap.from('.dossier-card', {
        y: 48,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.dossiers__grid', start: 'top 84%' }
      });
      gsap.from('.dossiers__more a', {
        y: 14,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.dossiers__more', start: 'top 94%' }
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="dossiers" className="dossiers" ref={rootRef}>
      <div className="container">
        <header className="dossiers__head">
          <p className="section-label"><span>03</span> Case Files</p>
          <div className="dossiers__head-grid">
            <h2 className="dossiers__title">
              Go deeper than<br /> the <em>feed.</em>
            </h2>
            <div className="dossiers__head-note">
              <p>
                Three dossiers that show how the work actually happens — <strong>merged code</strong>,
                <strong> government field operations</strong> and <strong>rooms full of builders</strong>.
              </p>
              <span>Primary records, not highlights.</span>
            </div>
          </div>
        </header>

        <div className="dossiers__grid">
          {dossiers.map((item) => (
            <Link className={`dossier-card dossier-card--${item.tone}`} key={item.id} to={item.href}>
              <div className="dossier-card__top">
                <span className="dossier-card__index">{item.index}</span>
                <span className="dossier-card__open">Open case file <span aria-hidden="true">↗</span></span>
              </div>
              <p className="dossier-card__eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p className="dossier-card__subtitle">{item.subtitle}</p>
              <p className="dossier-card__summary">{item.summary}</p>
              <div className="dossier-card__stats">
                {item.stats.map((stat) => (
                  <span key={stat.label}>
                    <strong>{stat.value}</strong>
                    {stat.label}
                  </span>
                ))}
              </div>
              <ul className="dossier-card__tags">
                {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </Link>
          ))}
        </div>

        <div className="dossiers__more">
          <Link to="/certificates">
            All 8 verified certificates <span aria-hidden="true">↗</span>
          </Link>
          <Link to="/resume">
            Full résumé <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
