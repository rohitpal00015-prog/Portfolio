import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Timeline from './components/Timeline';
import Stack from './components/Stack';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import { initSmoothScroll, scrollToTarget, getLenis } from './lib/scroll';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const reduced = prefersReducedMotion();
  const [started, setStarted] = useState(false);
  const magneticCleanup = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    initSmoothScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => {
      window.removeEventListener('load', refresh);
      getLenis()?.destroy();
    };
  }, [reduced]);

  useEffect(() => {
    if (!started) return undefined;
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    if (window.location.hash) {
      const hashTimer = window.setTimeout(() => {
        scrollToTarget(window.location.hash);
      }, 250);
      return () => {
        window.clearTimeout(timer);
        window.clearTimeout(hashTimer);
      };
    }
    return () => window.clearTimeout(timer);
  }, [started]);

  useLayoutEffect(() => {
    if (!started || reduced) return undefined;
    const nodes = Array.from(document.querySelectorAll('[data-magnetic]'));
    const handlers = nodes.map((node) => {
      const xTo = gsap.quickTo(node, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(node, 'y', { duration: 0.5, ease: 'power3.out' });
      const move = (event) => {
        const rect = node.getBoundingClientRect();
        xTo((event.clientX - rect.left - rect.width / 2) * 0.22);
        yTo((event.clientY - rect.top - rect.height / 2) * 0.28);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      node.addEventListener('mousemove', move);
      node.addEventListener('mouseleave', leave);
      return () => {
        node.removeEventListener('mousemove', move);
        node.removeEventListener('mouseleave', leave);
        gsap.set(node, { x: 0, y: 0 });
      };
    });
    magneticCleanup.current = () => handlers.forEach((fn) => fn());
    return () => {
      magneticCleanup.current?.();
      magneticCleanup.current = null;
    };
  }, [started, reduced]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor enabled={!reduced} />
      <Preloader reduced={reduced} onDone={() => setStarted(true)} />
      <Header started={started} />
      <main id="main">
        <Hero started={started} reduced={reduced} />
        <About reduced={reduced} />
        <Work reduced={reduced} />
        <Timeline reduced={reduced} />
        <Stack reduced={reduced} />
        <Credentials reduced={reduced} />
        <Contact reduced={reduced} />
      </main>
    </>
  );
}
