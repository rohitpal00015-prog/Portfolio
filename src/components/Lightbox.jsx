import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { lockScroll, unlockScroll } from '../lib/scroll';

export default function Lightbox({ items, index, onClose, onChange, label = 'Image' }) {
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const closingRef = useRef(false);
  const indexRef = useRef(index);
  indexRef.current = index;
  const current = index !== null ? items[index] : null;

  useEffect(() => {
    if (index === null) return undefined;
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
        onChange((indexRef.current + 1) % items.length);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onChange((indexRef.current - 1 + items.length) % items.length);
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
    };
  }, [index === null]);

  useEffect(() => {
    const img = overlayRef.current?.querySelector('.lightbox__img');
    if (!img) return;
    gsap.fromTo(img, { autoAlpha: 0, scale: 0.99 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
  }, [index]);

  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    const overlay = overlayRef.current;
    if (!overlay) {
      onClose();
      return;
    }
    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  if (!current) return null;

  return createPortal(
    <div
      className="lightbox"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.title || current.alt || label}
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button type="button" className="lightbox__close" onClick={close} ref={closeRef} aria-label="Close viewer">
        <span aria-hidden="true">×</span>
      </button>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={() => onChange((index - 1 + items.length) % items.length)}
        aria-label="Previous"
      >
        <span aria-hidden="true">←</span>
      </button>
      <figure className="lightbox__figure">
        <img className="lightbox__img" src={current.src} alt={current.alt || current.title || ''} />
        <figcaption>
          {current.category && <span className="lightbox__cat">{current.category}</span>}
          <strong>{current.title}</strong>
          {current.meta && <span>{current.meta}</span>}
        </figcaption>
      </figure>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={() => onChange((index + 1) % items.length)}
        aria-label="Next"
      >
        <span aria-hidden="true">→</span>
      </button>
      <span className="lightbox__count">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
    </div>,
    document.body
  );
}
