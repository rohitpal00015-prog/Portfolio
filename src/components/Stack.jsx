import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Marquee from './Marquee';
import { stackColumns, securitySkills, skills } from '../data';

const marqueeItems = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'FastAPI', 'Flutter',
  'PostgreSQL', 'Gemini 2.5', 'GSAP', 'Lenis', 'Vue.js', 'Supabase'
];

export default function Stack({ reduced }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.stack__eyebrow, .stack__title, .stack__intro', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' }
      });
      gsap.from('.stack-col', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stack__grid', start: 'top 82%' }
      });
      gsap.from('.stack-col__item', {
        opacity: 0,
        x: -12,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.stack__grid', start: 'top 78%' }
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="stack" className="stack" ref={rootRef}>
      <div className="container">
        <header className="stack__head">
          <p className="section-label stack__eyebrow"><span>04</span> Arsenal</p>
          <h2 className="stack__title">
            The stack behind<br /> the <em>shipping.</em>
          </h2>
          <p className="stack__intro">
            Chosen for leverage, not hype. I reach for what gets a reliable product into real hands fastest.
          </p>
        </header>

        <div className="stack__grid">
          {stackColumns.map((column, index) => (
            <div className="stack-col" key={column.label}>
              <div className="stack-col__head">
                <span>0{index + 1}</span>
                <h3>{column.label}</h3>
              </div>
              <ul>
                {column.items.map((item, itemIndex) => (
                  <li className="stack-col__item" key={item}>
                    <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="stack__aside">
          <div className="stack__security">
            <p className="stack__security-label">Also trained in</p>
            <div className="stack__security-tags">
              {securitySkills.slice(0, 6).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <p className="stack__languages">
            <span>Languages</span> {skills.programmingLanguages.join(' · ')}
          </p>
        </div>
      </div>

      <Marquee className="stack__marquee" items={marqueeItems} speed={44} />
    </section>
  );
}
