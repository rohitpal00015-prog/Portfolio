import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { lockScroll, unlockScroll } from '../lib/scroll';

const introKey = 'rp-intro-2026';

export default function Preloader({ reduced, onDone }) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (reduced) return false;
    try {
      return sessionStorage.getItem(introKey) !== 'done';
    } catch {
      return true;
    }
  });
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!visible) {
      onDoneRef.current();
      return undefined;
    }

    lockScroll();
    window.scrollTo(0, 0);
    const counter = { value: 0 };
    let timeline;

    const ctx = gsap.context(() => {
      timeline = gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            if (doneRef.current) return;
            doneRef.current = true;
            try {
              sessionStorage.setItem(introKey, 'done');
            } catch {
              /* private mode */
            }
            unlockScroll();
            onDoneRef.current();
            setVisible(false);
          }
        })
        .from('.preloader__name .char', {
          yPercent: 118,
          duration: 0.9,
          stagger: 0.035,
          ease: 'power4.out'
        })
        .from('.preloader__meta', { opacity: 0, y: 12, duration: 0.6 }, '-=0.5')
        .to(
          counter,
          {
            value: 100,
            duration: 1.15,
            ease: 'power2.inOut',
            onUpdate: () => setCount(Math.round(counter.value))
          },
          0.15
        )
        .to('.preloader__bar span', { scaleX: 1, duration: 1.15, ease: 'power2.inOut' }, 0.15)
        .to('.preloader__name .char', {
          yPercent: -118,
          duration: 0.55,
          stagger: 0.02,
          ease: 'power3.in'
        }, '+=0.05')
        .to(rootRef.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.15');
    }, rootRef);

    return () => {
      ctx.revert();
      if (!doneRef.current) unlockScroll();
    };
  }, [visible]);

  if (!visible) return null;

  const name = 'ROHIT PAL';

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__top">
        <span>Portfolio © 2026</span>
        <span>Prayagraj, IN</span>
      </div>
      <div className="preloader__name">
        {name.split('').map((char, index) => (
          <span className="char-mask" key={`${char}-${index}`}>
            <span className="char">{char === ' ' ? '\u00A0' : char}</span>
          </span>
        ))}
      </div>
      <div className="preloader__bottom">
        <div className="preloader__meta">
          <span>Building the experience</span>
          <span>Full-Stack · AI · Open Source</span>
        </div>
        <span className="preloader__count">{String(count).padStart(3, '0')}</span>
      </div>
      <div className="preloader__bar"><span /></div>
    </div>
  );
}
