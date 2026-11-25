import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { asset, certificates } from '../data';
import { lockScroll, unlockScroll } from '../lib/scroll';
import { useCardTilt } from '../lib/useCardTilt';

export default function Credentials({ reduced }) {
  const rootRef = useRef(null);
  const [index, setIndex] = useState(null);
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const closingRef = useRef(false);

  useCardTilt('.cert-card');

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.cred__eyebrow, .cred__title, .cred__intro', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 72%' }
      });
      gsap.from('.cert-card', {
        y: 34,
        opacity: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cert-grid', start: 'top 82%' }
      });
      gsap.from('.cred__actions > *', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cred__actions', start: 'top 90%' }
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (index === null) return undefined;
    lastFocus.current = document.activeElement;
    const root = document.getElementById('root');
    if (root) root.inert = true;
    lockScroll();
    closingRef.current = false;
    const overlay = overlayRef.current;
    if (overlay) {
      gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        overlay.querySelector('.lightbox__figure'),
        { y: 24, scale: 0.97, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setIndex((value) => (value + 1) % certificates.length);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setIndex((value) => (value - 1 + certificates.length) % certificates.length);
      }
      if (event.key === 'Tab') {
        const focusables = overlay.querySelectorAll('button');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      if (root) root.inert = false;
      unlockScroll();
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus({ preventScroll: true });
    };
  }, [index === null]);

  useEffect(() => {
    if (index === null) return;
    const img = overlayRef.current?.querySelector('.lightbox__img');
    if (!img) return;
    gsap.fromTo(img, { autoAlpha: 0, scale: 0.99 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
  }, [index]);

  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    const overlay = overlayRef.current;
    if (!overlay) {
      setIndex(null);
      return;
    }
    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setIndex(null)
    });
  };

  const current = index !== null ? certificates[index] : null;

  return (
    <section id="credentials" className="credentials" ref={rootRef}>
      <div className="container">
        <header className="cred__head">
          <p className="section-label cred__eyebrow"><span>06</span> Proof</p>
          <h2 className="cred__title">Certified.<br /><em>Verified.</em></h2>
          <p className="cred__intro">
            National finalist certificates, government fellowship proof and Google developer community
            recognitions — receipts for the work.
          </p>
        </header>

        <div className="cert-grid">
          {certificates.map((cert, certIndex) => (
            <button
              type="button"
              className="cert-card"
              key={cert.id}
              onClick={() => setIndex(certIndex)}
              aria-label={`Open ${cert.title} certificate`}
              data-tilt
            >
              <span className="cert-card__media">
                <img
                  src={asset(cert.image)}
                  alt={`${cert.title} certificate`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="cert-card__view" aria-hidden="true">View <span>↗</span></span>
              </span>
              <span className="cert-card__meta">
                <span className="cert-card__cat">{cert.category}</span>
                <span className="cert-card__title">{cert.title}</span>
                <span className="cert-card__issuer">{cert.issuer}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="cred__actions">
          <Link className="btn btn--primary" to="/certificates" data-magnetic>
            All 8 certificates <span aria-hidden="true">↗</span>
          </Link>
          <Link className="btn btn--ghost" to="/hackathons">
            Hackathon milestones <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      {current && createPortal(
        <div
          className="lightbox"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          tabIndex={-1}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button type="button" className="lightbox__close" onClick={close} ref={closeRef} aria-label="Close certificate">
            <span aria-hidden="true">×</span>
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => setIndex((value) => (value - 1 + certificates.length) % certificates.length)}
            aria-label="Previous certificate"
          >
            <span aria-hidden="true">←</span>
          </button>
          <figure className="lightbox__figure">
            <img className="lightbox__img" src={asset(current.image)} alt={`${current.title} certificate`} />
            <figcaption>
              <span className="lightbox__cat">{current.category}</span>
              <strong>{current.title}</strong>
              <span>{current.issuer} · {current.date}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => setIndex((value) => (value + 1) % certificates.length)}
            aria-label="Next certificate"
          >
            <span aria-hidden="true">→</span>
          </button>
          <span className="lightbox__count">{String(index + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}</span>
        </div>,
        document.body
      )}
    </section>
  );
}
