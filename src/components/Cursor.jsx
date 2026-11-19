import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    let shown = false;
    const move = (event) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const isInteractive = (target) =>
      target instanceof Element && target.closest('a, button, [data-cursor], input, textarea');
    const activate = () => ring.classList.add('is-active');
    const deactivate = () => ring.classList.remove('is-active');

    const leave = () => {
      shown = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', (event) => {
      if (isInteractive(event.target)) activate();
    });
    document.addEventListener('mouseout', (event) => {
      if (isInteractive(event.target)) deactivate();
    });
    document.documentElement.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
      gsap.killTweensOf([dot, ring]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true"><span /></div>
    </>
  );
}
