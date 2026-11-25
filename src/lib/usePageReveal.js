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
        gsap.fromTo(
          heroItems,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.07,
            ease: 'power3.out',
            clearProps: 'all',
            delay: 0.08
          }
        );
      }

      root.querySelectorAll('[data-reveal]').forEach((node) => {
        const inView = node.getBoundingClientRect().top < window.innerHeight * 0.95;
        if (inView) {
          gsap.fromTo(
            node,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'all', delay: 0.1 }
          );
        } else {
          gsap.fromTo(
            node,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: 'power3.out',
              clearProps: 'all',
              scrollTrigger: { trigger: node, start: 'top 95%', once: true }
            }
          );
        }
      });

      root.querySelectorAll('[data-reveal-group]').forEach((group) => {
        const inView = group.getBoundingClientRect().top < window.innerHeight * 0.95;
        if (inView) {
          gsap.fromTo(
            group.children,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.05,
              ease: 'power3.out',
              clearProps: 'all',
              delay: 0.12
            }
          );
        } else {
          gsap.fromTo(
            group.children,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: 'power3.out',
              clearProps: 'all',
              scrollTrigger: { trigger: group, start: 'top 95%', once: true }
            }
          );
        }
      });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [ref, reduced]);
}
