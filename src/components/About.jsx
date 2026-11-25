import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  aboutHighlights,
  aboutRich,
  focusAreas,
  metrics,
  profile
} from '../data';

function Counter({ value, reduced }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    const match = String(value).match(/^(.*?)(\d[\d,]*)(.*)$/);
    if (!match) return undefined;
    const prefix = match[1];
    const end = Number(match[2].replace(/,/g, ''));
    const suffix = match[3];
    const state = { number: 0 };
    const node = ref.current;
    if (!node) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: 'top 95%',
      once: true,
      onEnter: () => {
        gsap.to(state, {
          number: end,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            node.textContent = prefix + Math.round(state.number).toLocaleString('en-US') + suffix;
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
      gsap.fromTo('.about__stat',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: '.about__stats', start: 'top 95%', once: true }
        }
      );
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
    {
      value: metrics.projectsCount,
      label: 'Products built & shipped',
      theme: 'emerald',
      meaning: 'Shipping & Growth'
    },
    {
      value: metrics.hackathonsFinalist,
      label: 'Hackathon finals',
      theme: 'amber',
      meaning: 'Podiums & Victory'
    },
    {
      value: metrics.ambassadorPool,
      label: 'Developer community reach',
      theme: 'blue',
      meaning: 'Scale & Community'
    },
    {
      value: metrics.openSourceMarathonRank,
      label: 'Open-source sprint rank',
      theme: 'rose',
      meaning: 'Sprint Distinction'
    }
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
                    <div className="about__highlight-top">
                      <span className="about__highlight-index">{String(itemIndex + 1).padStart(2, '0')}</span>
                      <span className="about__highlight-kicker">{item.kicker}</span>
                      {item.stat && <span className="about__highlight-stat">{item.stat}</span>}
                    </div>
                    <h3>{item.title}</h3>
                    <p className="about__highlight-desc">{item.description}</p>
                    {item.href && (
                      <div className="about__highlight-action">
                        <span>{item.action || 'Explore record'}</span>
                        <span className="about__highlight-arrow" aria-hidden="true">↗</span>
                      </div>
                    )}
                  </Tag>
                );
              })}
            </div>
          </div>

          <div className="about__stats">
            {stats.map((stat) => (
              <div className={`about__stat about__stat--${stat.theme}`} key={stat.label}>
                <div className="about__stat-top">
                  <span className={`about__stat-dot about__stat-dot--${stat.theme}`} />
                  <span className={`about__stat-kicker about__stat-kicker--${stat.theme}`}>{stat.meaning}</span>
                </div>
                <span className={`about__stat-value about__stat-value--${stat.theme}`}>
                  <Counter value={stat.value} reduced={reduced} />
                </span>
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
