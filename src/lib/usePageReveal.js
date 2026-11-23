import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function usePageReveal(ref, reduced) {
  useLayoutEffect(() => {
    if (reduced || !ref.current) return undefined;
    const root = ref.current;
    const ctx = gsap.context(() => {
      const heroItems = root.querySelectorAll('[data-hero-reveal]');
      if (heroItems.length) {
        gsap.from(heroItems, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.12
        });
      }

      root.querySelectorAll('[data-reveal]').forEach((node) => {
        gsap.from(node, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 91%', once: true }
        });
      });

      root.querySelectorAll('[data-reveal-group]').forEach((group) => {
        gsap.from(group.children, {
          y: 30,
          opacity: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 88%', once: true }
        });
      });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [ref, reduced]);
}
