import { useEffect } from 'react';

export function useCardTilt(selector = '[data-tilt]', deps = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const cards = Array.from(document.querySelectorAll(selector));
    if (!cards.length) return undefined;

    const cleanups = cards.map((card) => {
      let frame = 0;
      const onMouseMove = (e) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5.5;
          const rotateY = ((x - centerX) / centerX) * 5.5;
          card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
          card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
          card.style.setProperty('--sheen-x', `${x.toFixed(1)}px`);
          card.style.setProperty('--sheen-y', `${y.toFixed(1)}px`);
          card.style.setProperty('--sheen-on', '1');
        });
      };

      const onMouseLeave = () => {
        cancelAnimationFrame(frame);
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--sheen-on', '0');
      };

      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave);

      return () => {
        cancelAnimationFrame(frame);
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, deps);
}
