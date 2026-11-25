import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { profile, metrics, asset } from '../data';
import { scrollToTarget } from '../lib/scroll';

const devRoles = profile.typewriterRoles || [
  'Full-Stack Developer',
  'AI Systems Builder',
  'Frontend Engineer',
  'React & Node Architect'
];

const ossRoles = [
  'WikiClub Tech UIT Team',
  '20+ Gerrit Merges',
  'MediaWiki Core Contributor',
  'Codex UI Contributor',
  'Hacktoberfest Co-Organizer'
];

function RotatingRole({ roles, colorClass = '', caretClass = '', reduced }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % roles.length), 2600);
    return () => window.clearInterval(timer);
  }, [reduced, roles]);

  return (
    <>
      <span className={`hero__role ${colorClass}`} key={roles[index]}>
        {roles[index]}
      </span>
      <span className={`hero__roles-caret ${caretClass}`} aria-hidden="true" />
    </>
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
  const stageRef = useRef(null);
  const visualDevRef = useRef(null);
  const visualOssRef = useRef(null);
  const [activePage, setActivePage] = useState(0); // 0 = Developer, 1 = Open Source

  // Scroll Trigger 3D Flip
  useLayoutEffect(() => {
    if (!started || reduced) return undefined;
    const ctx = gsap.context(() => {
      // Entrance animation for front face
      const entranceTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      entranceTl
        .from('.hero__persona-bar', { y: -16, opacity: 0, duration: 0.6 })
        .from('.hero__face--front .hero__eyebrow', { y: 18, opacity: 0, duration: 0.7 }, '-=0.3')
        .from(
          '.hero__face--front .hero__name .char',
          { yPercent: 120, duration: 1.05, stagger: 0.045, ease: 'power4.out' },
          '-=0.35'
        )
        .from('.hero__face--front .hero__serif', { y: 40, opacity: 0, rotate: 5, duration: 0.9 }, '-=0.6')
        .from('.hero__face--front .hero__lede', { y: 22, opacity: 0, duration: 0.7 }, '-=0.6')
        .from('.hero__face--front .hero__roles', { y: 16, opacity: 0, duration: 0.5 }, '-=0.45')
        .from('.hero__face--front .hero__cta > *', { y: 18, opacity: 0, duration: 0.55, stagger: 0.08 }, '-=0.35')
        .from('.hero__face--front .hero__facts span', { y: 14, opacity: 0, duration: 0.4, stagger: 0.06 }, '-=0.3')
        .from('.hero__face--front .portrait', { yPercent: 12, opacity: 0, rotate: -4, duration: 1.1 }, 0.15)
        .from('.hero__face--front .portrait .chip, .hero__face--front .portrait__stamp', { opacity: 0, y: 18, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .from('.hero__foot > *', { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.4');

      // 3D Flip Timeline scrubbed to ScrollTrigger
      const flipTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          onUpdate: (self) => {
            const isOss = self.progress >= 0.46;
            setActivePage(isOss ? 1 : 0);
          }
        }
      });

      // Rotate stage 180 degrees
      flipTl.to(
        stageRef.current,
        {
          rotateY: 180,
          ease: 'power2.inOut',
          duration: 1
        },
        0
      );

      // 3D perspective depth dip
      flipTl
        .to(stageRef.current, { scale: 0.93, duration: 0.5, ease: 'power1.in' }, 0)
        .to(stageRef.current, { scale: 1, duration: 0.5, ease: 'power1.out' }, 0.5);

      // Atmosphere orb transitions (amber/blue -> green/cyan)
      flipTl
        .to('.hero__orb--blue', { opacity: 0.15, duration: 0.5 }, 0)
        .to('.hero__orb--yellow', { opacity: 0.05, duration: 0.5 }, 0)
        .to('.hero__orb--green', { opacity: 0.5, duration: 0.5 }, 0.45);
    }, rootRef);

    return () => ctx.revert();
  }, [started, reduced]);

  // Mouse Parallax on visual frames
  useEffect(() => {
    if (!started || reduced) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const root = rootRef.current;
    const vDev = visualDevRef.current;
    const vOss = visualOssRef.current;
    if (!root) return undefined;

    const xDev = vDev ? gsap.quickTo(vDev, 'x', { duration: 0.9, ease: 'power3.out' }) : null;
    const yDev = vDev ? gsap.quickTo(vDev, 'y', { duration: 0.9, ease: 'power3.out' }) : null;
    const xOss = vOss ? gsap.quickTo(vOss, 'x', { duration: 0.9, ease: 'power3.out' }) : null;
    const yOss = vOss ? gsap.quickTo(vOss, 'y', { duration: 0.9, ease: 'power3.out' }) : null;

    const move = (event) => {
      const rect = root.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      if (xDev && yDev) {
        xDev(relX * 24);
        yDev(relY * 18);
      }
      if (xOss && yOss) {
        xOss(relX * -24); // Inverted relative to backface
        yOss(relY * 18);
      }
    };

    root.addEventListener('mousemove', move);
    return () => root.removeEventListener('mousemove', move);
  }, [started, reduced]);

  // Pill click helper
  const flipTo = (targetPage) => {
    if (reduced) {
      setActivePage(targetPage);
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    const heroTop = root.offsetTop;
    const pinDistance = window.innerHeight;

    if (targetPage === 1) {
      window.scrollTo({
        top: heroTop + pinDistance * 0.95,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: heroTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className={`hero ${activePage === 1 ? 'is-oss-mode' : ''}`} ref={rootRef}>
      {/* Dynamic Background Atmosphere */}
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__orb hero__orb--blue" />
        <span className="hero__orb hero__orb--yellow" />
        <span className="hero__orb hero__orb--green" />
        <div className="hero__grid" />
      </div>

      {/* Top Segmented Persona Pill Switcher */}
      <div className="hero__persona-bar container">
        <div className="hero__persona-switch" role="tablist" aria-label="Hero persona profile">
          <button
            type="button"
            className={`persona-pill ${activePage === 0 ? 'is-active' : ''}`}
            onClick={() => flipTo(0)}
            role="tab"
            aria-selected={activePage === 0}
            title="Switch to Software Developer Profile"
          >
            <span className="persona-pill__dot" />
            <span>01 Developer</span>
          </button>
          <button
            type="button"
            className={`persona-pill persona-pill--oss ${activePage === 1 ? 'is-active' : ''}`}
            onClick={() => flipTo(1)}
            role="tab"
            aria-selected={activePage === 1}
            title="Switch to Wikimedia & Open Source Contributor Profile"
          >
            <span className="persona-pill__dot persona-pill__dot--green" />
            <span>02 Wikimedia &amp; OSS</span>
          </button>
        </div>

        <div className="hero__persona-hint" aria-hidden="true">
          <span>{activePage === 0 ? 'Scroll to flip persona' : 'Scroll down for About'}</span>
          <span className={`hero__persona-arrow ${activePage === 1 ? 'is-down' : ''}`}>
            {activePage === 0 ? '↷' : '↓'}
          </span>
        </div>
      </div>

      {/* 3D Flip Stage */}
      <div className="hero__flip-wrap">
        <div className="hero__stage" ref={stageRef}>
          {/* ===================================================================
              PAGE 1: DEVELOPER FACE (Front)
              =================================================================== */}
          <div className={`hero__face hero__face--front ${activePage === 0 ? 'is-active' : 'is-inactive'}`}>
            <div className="hero__inner container">
              <div className="hero__copy">
                <p className="hero__eyebrow">
                  <span className="hero__pulse" /> Prayagraj, India <span className="hero__slash">/</span> Software Developer &amp; Systems Builder
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
                  Full-stack developer &amp; AI systems builder turning ambitious architectures into shipped products — SIH 2026, web scale platforms, real-time engines and modern cloud applications.
                </p>

                <p className="hero__roles">
                  <span className="hero__roles-prefix">Currently —</span>
                  <RotatingRole roles={devRoles} reduced={reduced} />
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
                  <Link className="btn btn--ghost" to="/resume">
                    Résumé &amp; dossier <span aria-hidden="true">↗</span>
                  </Link>
                </div>

                <div className="hero__facts">
                  <span><b>{metrics.projectsCount || '16+'}</b> projects built</span>
                  <span><b>{metrics.hackathonsFinalist || '3x'}</b> hackathon podiums</span>
                  <span><b>SIH 2026</b> Team CyberEye</span>
                </div>
              </div>

              <div className="hero__visual">
                <div className="portrait portrait--dev" ref={visualDevRef}>
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
                  <span className="chip chip--br"><i className="chip__dot chip__dot--green" /> React · Python · Cloud</span>
                  <span className="portrait__stamp">Open<br />to work</span>
                  <span className="portrait__ring" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              PAGE 2: OPEN SOURCE & WIKIMEDIA CONTRIBUTOR FACE (Back)
              =================================================================== */}
          <div className={`hero__face hero__face--back ${activePage === 1 ? 'is-active' : 'is-inactive'}`}>
            <div className="hero__inner container">
              <div className="hero__copy">
                <p className="hero__eyebrow">
                  <span className="hero__pulse hero__pulse--green" /> Wikimedia Foundation <span className="hero__slash">/</span> WikiClub Tech UIT Team
                </p>

                <h1 className="hero__title hero__title--oss">
                  <span className="hero__name hero__name--solid"><SplitName text="OPEN" /></span>
                  <span className="hero__name-line">
                    <span className="hero__name hero__name--outline"><SplitName text="SOURCE" /></span>
                    <span className="hero__serif hero-oss__serif">
                      in the open<span className="hero__asterisk">*</span>
                    </span>
                  </span>
                </h1>

                <p className="hero__lede">
                  Core team member at <strong>WikiClub Tech UIT</strong> with <strong>20+ merged upstream production patches on Gerrit</strong> across MediaWiki core and Codex. Co-organizer of the <strong>Hacktoberfest Hack Day</strong> trilogy.
                </p>

                <p className="hero__roles">
                  <span className="hero__roles-prefix">Upstream —</span>
                  <RotatingRole
                    roles={ossRoles}
                    colorClass="hero-oss__role"
                    caretClass="hero-oss__caret"
                    reduced={reduced}
                  />
                </p>

                <div className="hero__cta">
                  <Link className="btn btn-oss--primary" to="/wikimedia" data-magnetic>
                    Explore Wikimedia dossier <span aria-hidden="true">↗</span>
                  </Link>
                  <a
                    className="btn btn-oss--ghost"
                    href="https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Team"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WikiClub Tech UIT Team <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <div className="hero__facts hero-oss__facts">
                  <span><b>20+</b> Gerrit Merges</span>
                  <span><b>Co-Organizer</b> Hacktoberfest 1.0–3.0</span>
                  <span><b>Core Member</b> WikiClub Tech UIT</span>
                </div>
              </div>

              <div className="hero__visual">
                <div className="portrait portrait--oss" ref={visualOssRef}>
                  <div className="portrait__glow portrait__glow--oss" aria-hidden="true" />
                  <div className="portrait__frame portrait__frame--oss">
                    <img
                      src={asset(profile.avatar)}
                      alt="Rohit Pal — Wikimedia & Open Source Contributor"
                      width="652"
                      height="800"
                      fetchPriority="high"
                    />
                    <div className="portrait__shade portrait__shade--oss" aria-hidden="true" />
                  </div>
                  <span className="chip chip--tl chip--oss">
                    <i className="chip__dot chip__dot--green" /> WikiClub Tech UIT · Core Team
                  </span>
                  <span className="chip chip--br chip--oss">
                    <i className="chip__dot chip__dot--green" /> 20+ Gerrit Merges · Codex
                  </span>
                  <span className="portrait__stamp portrait__stamp--oss">Wiki<br />Club</span>
                  <span className="portrait__ring portrait__ring--oss" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Foot Indicator & Links */}
      <div className="hero__foot container">
        <span className={`hero__foot-meta ${activePage === 1 ? 'hero__foot-meta--oss' : ''}`}>
          {activePage === 0
            ? 'B.Tech CSE ’28 · United Institute of Technology'
            : 'MediaWiki · Codex · Gerrit · Commons'}
        </span>
        {activePage === 0 ? (
          <a className="hero__foot-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        ) : (
          <a
            className="hero__foot-mail hero__foot-mail--oss"
            href={profile.socials.gerrit}
            target="_blank"
            rel="noreferrer"
          >
            gerrit.wikimedia.org ↗
          </a>
        )}
      </div>
    </section>
  );
}
