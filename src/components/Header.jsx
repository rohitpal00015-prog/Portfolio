import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, profile } from '../data';
import { lockScroll, scrollToTarget, unlockScroll } from '../lib/scroll';

const sections = ['home', 'about', 'work', 'dossiers', 'timeline', 'stack', 'credentials', 'contact'];

export default function Header({ started }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const barRef = useRef(null);
  const lockedRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActive(pathname === '/certificates' ? 'credentials' : pathname === '/resume' ? '' : 'dossiers');
      return undefined;
    }
    setActive('home');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, pathname]);

  useEffect(() => {
    if (open && !lockedRef.current) {
      lockScroll();
      lockedRef.current = true;
    }
    if (!open && lockedRef.current) {
      unlockScroll();
      lockedRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => () => {
    if (lockedRef.current) unlockScroll();
  }, []);

  const go = (event, id) => {
    if (!isHome) return;
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToTarget(id === 'home' ? '#home' : `#${id}`), open ? 120 : 0);
  };

  return (
    <>
      <header className={`site-header ${started ? 'is-ready' : ''} ${open ? 'is-open' : ''}`}>
        <Link className="brand" to="/" onClick={(event) => go(event, 'home')} aria-label="Rohit Pal — home">
          <span className="brand__mark">RP<span>®</span></span>
          <span className="brand__name">
            Rohit Pal
            <small>Software developer</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={isHome ? `#${link.id}` : `/#${link.id}`}
              className={active === link.id ? 'is-active' : ''}
              onClick={(event) => go(event, link.id)}
            >
              <span className="site-nav__dot" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <span className="availability"><i /> Open to work</span>
          <a className="btn btn--mini" href="mailto:rohitpal00015@gmail.com" data-magnetic>
            Let's talk <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className={`menu-toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-toggle__label">{open ? 'Close' : 'Menu'}</span>
            <span className="menu-toggle__bars" aria-hidden="true"><i /><i /></span>
          </button>
        </div>

        <div className="scroll-progress" aria-hidden="true"><span ref={barRef} /></div>
      </header>

      <div id="mobile-menu" className={`menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="menu-overlay__inner">
          <nav className="menu-nav" aria-label="Mobile">
            {[...navLinks, { id: 'contact', label: 'Contact' }].map((link, index) => (
              <Link
                key={link.id}
                to={isHome ? `#${link.id}` : `/#${link.id}`}
                className="menu-link"
                onClick={(event) => {
                  setOpen(false);
                  go(event, link.id);
                }}
                tabIndex={open ? 0 : -1}
              >
                <span className="menu-link__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="menu-link__label">{link.label}</span>
                <span className="menu-link__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <div className="menu-meta">
            <div>
              <p className="menu-meta__label">Reach out</p>
              <a href="mailto:rohitpal00015@gmail.com" tabIndex={open ? 0 : -1}>{profile.email}</a>
            </div>
            <div>
              <p className="menu-meta__label">Elsewhere</p>
              <div className="menu-socials">
                <a href={profile.socials.github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>GitHub</a>
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>LinkedIn</a>
                <a href={profile.socials.twitter} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>X</a>
              </div>
            </div>
            <Link className="menu-resume" to="/resume" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              Résumé <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="menu-foot">Prayagraj, India · {new Date().getFullYear()} — designed &amp; built by Rohit Pal</p>
        </div>
      </div>
    </>
  );
}
