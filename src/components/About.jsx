import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  aboutHighlights,
  aboutRich,
  belief,
  focusAreas,
  metrics,
  profile,
  wikimediaLinks,
  wikimediaPillars
} from '../data';

function Counter({ value, reduced }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    const match = String(value).match(/^([\d,]+)(.*)$/);
    if (!match) return undefined;
    const end = Number(match[1].replace(/,/g, ''));
    const suffix = match[2];
    const state = { number: 0 };
    const node = ref.current;
    if (!node) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(state, {
          number: end,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            node.textContent = Math.round(state.number).toLocaleString('en-US') + suffix;
          }
        });
      }
    });

    return () => trigger.kill();
  }, [value, reduced]);

  return <span ref={ref}>{value}</span>;
}

export default function About({ reduced }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.about__eyebrow, .about__title, .about__sig', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' }
      });
      gsap.from('.about__copy > *:not(.about__highlights)', {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__copy', start: 'top 80%' }
      });
      gsap.from('.about__highlight', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__highlights', start: 'top 88%' }
      });
      gsap.from('.about__belief', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__belief', start: 'top 86%' }
      });
      gsap.from('.about__open-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__open', start: 'top 82%' }
      });
      gsap.from('.about__open-card', {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__open-grid', start: 'top 88%' }
      });
      gsap.from('.about__open-links', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__open-links', start: 'top 92%' }
      });
      gsap.from('.about__stat', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__stats', start: 'top 88%' }
      });
      gsap.from('.focus-row', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__focus', start: 'top 85%' }
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  const stats = [
    { value: metrics.projectsCount, label: 'Products built & shipped' },
    { value: metrics.hackathonsFinalist, label: 'Hackathon finals' },
    { value: metrics.ambassadorPool, label: 'Developer community reach' },
    { value: metrics.openSourceMarathonRank, label: 'Open-source sprint rank' }
  ];

  return (
    <section id="about" className="about" ref={rootRef}>
      <div className="container about__grid">
        <aside className="about__aside">
          <p className="section-label about__eyebrow">
            <span>01</span> About
          </p>
          <h2 className="about__title">
            Engineer by <em>craft</em>,
            <br /> builder by instinct.
          </h2>
          <p className="about__sig">— Rohit Pal, Prayagraj</p>
        </aside>

        <div className="about__main">
          <div className="about__copy">
            <p className="about__lede">{profile.aboutShort}</p>
            <p className="about__body">
              {aboutRich.map((part, partIndex) => (
                part.tone ? (
                  <strong className={`hl hl--${part.tone}`} key={partIndex}>{part.text}</strong>
                ) : (
                  <span key={partIndex}>{part.text}</span>
                )
              ))}
            </p>
            <div className="about__now">
              <span className="about__now-dot" />
              <p>
                <strong>Currently —</strong> building ShilpSetu for Smart India Hackathon 2026 and shipping
                production interfaces at Heisyn. In parallel, contributing accessible Codex patches and
                documenting Prayagraj's living heritage on Wikimedia Commons.
              </p>
            </div>

            <div className="about__highlights">
              {aboutHighlights.map((item, itemIndex) => {
                const internal = item.href?.startsWith('/');
                const Tag = internal ? Link : item.href ? 'a' : 'article';
                const linkProps = internal
                  ? { to: item.href }
                  : item.href
                    ? { href: item.href, ...(item.external ? { target: '_blank', rel: 'noreferrer' } : {}) }
                    : {};
                return (
                  <Tag
                    className={`about__highlight about__highlight--${item.tone}${item.href ? ' about__highlight--link' : ''}`}
                    key={item.title}
                    {...linkProps}
                  >
                    <span className="about__highlight-index">{String(itemIndex + 1).padStart(2, '0')}</span>
                    {item.href && <span className="about__highlight-arrow" aria-hidden="true">↗</span>}
                    <h3>{item.title}</h3>
                    <p className="about__highlight-kicker">{item.kicker}</p>
                    <p className="about__highlight-desc">{item.description}</p>
                  </Tag>
                );
              })}
            </div>
          </div>

          <figure className="about__belief">
            <blockquote>
              <p className="about__belief-hi" lang="hi">{belief.hindi}</p>
              <p className="about__belief-en">{belief.english}</p>
            </blockquote>
            <figcaption><span aria-hidden="true">↳</span> {belief.caption}</figcaption>
          </figure>

          <div className="about__open">
            <div className="about__open-head">
              <p className="about__open-kicker">Open knowledge <span>/</span> beyond the patch queue</p>
              <h3>Code is only one way to contribute.</h3>
              <p>
                The Wikimedia movement shaped how I think about software: interfaces should include
                people, knowledge should stay open, and contribution is bigger than a commit. Three
                places where that belief becomes practice.
              </p>
            </div>

            <div className="about__open-grid">
              {wikimediaPillars.map((pillar) => (
                <article className="about__open-card" key={pillar.id}>
                  <span className="about__open-card-kicker">{pillar.kicker}</span>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.description}</p>
                  <ul>
                    {pillar.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </article>
              ))}
            </div>

            <div className="about__open-links">
              <span>Find the receipts</span>
              {wikimediaLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="about__stats">
            {stats.map((stat) => (
              <div className="about__stat" key={stat.label}>
                <span className="about__stat-value"><Counter value={stat.value} reduced={reduced} /></span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="about__focus">
            {focusAreas.map((area) => (
              <article className="focus-row" key={area.id}>
                <span className="focus-row__index">{area.id}</span>
                <div className="focus-row__body">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
                <ul className="focus-row__tags">
                  {area.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
