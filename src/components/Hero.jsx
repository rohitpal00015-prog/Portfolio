import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Marquee from './Marquee';
import { profile, metrics, asset } from '../data';
import { scrollToTarget } from '../lib/scroll';

const roles = profile.typewriterRoles;

function RotatingRole({ reduced }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % roles.length), 2800);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <span className="hero__role" key={roles[index]}>
      {roles[index]}
    </span>
  );
}

function SplitName({ text }) {
  return text.split('').map((char, index) => (
    <span className="char-mask" key={`${char}-${index}`}>
      <span className="char">{char}</span>
    </span>
  ));
}

export default function Hero({ started, reduced }) {
  const rootRef = useRef(null);
  const visualRef = useRef(null);

  useLayoutEffect(() => {
    if (!started || reduced) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero__eyebrow', { y: 18, opacity: 0, duration: 0.7 })
        .from(
          '.hero__name .char',
          { yPercent: 120, duration: 1.05, stagger: 0.045, ease: 'power4.out' },
          '-=0.35'
        )
        .from('.hero__serif', { y: 40, opacity: 0, rotate: 5, duration: 0.9 }, '-=0.6')
        .from('.hero__lede', { y: 22, opacity: 0, duration: 0.7 }, '-=0.6')
        .from('.hero__roles', { y: 16, opacity: 0, duration: 0.5 }, '-=0.45')
        .from('.hero__cta > *', { y: 18, opacity: 0, duration: 0.55, stagger: 0.08 }, '-=0.35')
        .from('.hero__facts span', { y: 14, opacity: 0, duration: 0.4, stagger: 0.06 }, '-=0.3')
        .from('.portrait', { yPercent: 12, opacity: 0, rotate: -4, duration: 1.1 }, 0.15)
        .from('.portrait .chip, .portrait__stamp', { opacity: 0, y: 18, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .from('.hero__foot > *', { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.4');
    }, rootRef);

    return () => ctx.revert();
  }, [started, reduced]);

  useEffect(() => {
    if (!started || reduced) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const root = rootRef.current;
    const visual = visualRef.current;
    if (!root || !visual) return undefined;

    const xTo = gsap.quickTo(visual, 'x', { duration: 0.9, ease: 'power3.out' });
    const yTo = gsap.quickTo(visual, 'y', { duration: 0.9, ease: 'power3.out' });

    const move = (event) => {
      const rect = root.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      xTo(relX * 26);
      yTo(relY * 20);
    };

    root.addEventListener('mousemove', move);
    return () => {
      root.removeEventListener('mousemove', move);
      gsap.killTweensOf(visual);
    };
  }, [started, reduced]);

  return (
    <section id="home" className="hero" ref={rootRef}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__orb hero__orb--blue" />
        <span className="hero__orb hero__orb--yellow" />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner container">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__pulse" /> Prayagraj, India <span className="hero__slash">/</span> Portfolio 2026
          </p>

          <h1 className="hero__title">
            <span className="hero__name hero__name--solid"><SplitName text="ROHIT" /></span>
            <span className="hero__name-line">
              <span className="hero__name hero__name--outline"><SplitName text="PAL" /></span>
              <span className="hero__serif">
                builds<br />things<span className="hero__asterisk">*</span>
              </span>
            </span>
          </h1>

          <p className="hero__lede">
            Full-stack developer &amp; AI builder turning ambitious ideas into shipped products — from a
            voice-first artisan marketplace for SIH 2026 to accessible interfaces and merged Wikimedia code.
          </p>

          <p className="hero__roles">
            <span className="hero__roles-prefix">Currently —</span>
            <RotatingRole reduced={reduced} />
            <span className="hero__roles-caret" aria-hidden="true" />
          </p>

          <div className="hero__cta">
            <a
              href="#work"
              className="btn btn--primary"
              data-magnetic
              onClick={(event) => {
                event.preventDefault();
                scrollToTarget('#work');
              }}
            >
              Explore selected work <span aria-hidden="true">↘</span>
            </a>
            <a className="btn btn--ghost" href="/resume.html">
              Download résumé <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="hero__facts">
            <span><b>{metrics.projectsCount}</b> projects built</span>
            <span><b>{metrics.hackathonsFinalist}</b> hackathon podiums</span>
            <span><b>PR #88</b> merged</span>
          </div>
        </div>

        <div className="hero__visual">
          <div className="portrait" ref={visualRef}>
            <div className="portrait__glow" aria-hidden="true" />
            <div className="portrait__frame">
              <img
                src={asset(profile.avatar)}
                alt="Rohit Pal — full-stack developer and AI builder"
                width="652"
                height="800"
                fetchPriority="high"
              />
              <div className="portrait__shade" aria-hidden="true" />
            </div>
            <span className="chip chip--tl"><i className="chip__dot" /> SIH 2026 · Team CyberEye</span>
            <span className="chip chip--br"><i className="chip__dot chip__dot--green" /> Wikimedia PR merged</span>
            <span className="portrait__stamp">Open<br />to work</span>
            <span className="portrait__ring" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="hero__foot container">
        <button type="button" className="scroll-cue" onClick={() => scrollToTarget('#about')}>
          <span className="scroll-cue__line"><i /></span>
          Scroll to explore
        </button>
        <span className="hero__foot-meta">B.Tech CSE ’28 · United Institute of Technology</span>
        <a className="hero__foot-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>

      <Marquee
        className="hero__marquee"
        items={['Available for work', 'Full-stack development', 'AI solutions', 'Open source', 'Flutter', 'GSAP motion']}
        ariaHidden
      />
    </section>
  );
}
