import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { initSmoothScroll, scrollToTarget, getLenis } from './lib/scroll';

const WikimediaPage = lazy(() => import('./pages/WikimediaPage'));
const FellowshipPage = lazy(() => import('./pages/FellowshipPage'));
const HackathonsPage = lazy(() => import('./pages/HackathonsPage'));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const titles = {
  '/': 'Rohit Pal | Full-Stack Developer, AI & Open Source Contributor',
  '/wikimedia': 'Wikimedia & Open Source — Rohit Pal',
  '/fellowship': 'UP Police Cyber Fellowship — Rohit Pal',
  '/hackathons': 'Hackathons & Leadership — Rohit Pal',
  '/certificates': 'Certificates & Verified Proof — Rohit Pal',
  '/resume': 'Résumé & Full Record — Rohit Pal'
};

export default function App() {
  const reduced = prefersReducedMotion();
  const location = useLocation();
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
    document.title = titles[location.pathname] || 'Page not found — Rohit Pal';
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (location.hash) {
      if (!started) return undefined;
      const jump = () => {
        ScrollTrigger.refresh();
        scrollToTarget(location.hash, { immediate: true });
      };
      const first = window.setTimeout(jump, 320);
      const settle = window.setTimeout(jump, 900);
      return () => {
        window.clearTimeout(first);
        window.clearTimeout(settle);
      };
    }
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => window.clearTimeout(refresh);
  }, [location.pathname, location.hash, started]);

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
  }, [started, reduced, location.pathname]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor enabled={!reduced} />
      <Preloader reduced={reduced} onDone={() => setStarted(true)} />
      <Header started={started} />
      <main id="main" className="route-view" key={location.pathname}>
        <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home started={started} reduced={reduced} />} />
            <Route path="/wikimedia" element={<WikimediaPage reduced={reduced} />} />
            <Route path="/fellowship" element={<FellowshipPage reduced={reduced} />} />
            <Route path="/hackathons" element={<HackathonsPage reduced={reduced} />} />
            <Route path="/certificates" element={<CertificatesPage reduced={reduced} />} />
            <Route path="/resume" element={<ResumePage reduced={reduced} />} />
            <Route path="/wikimedia-open-source.html" element={<Navigate to="/wikimedia" replace />} />
            <Route path="/up-police-internship.html" element={<Navigate to="/fellowship" replace />} />
            <Route path="/hackathons-leadership.html" element={<Navigate to="/hackathons" replace />} />
            <Route path="/certificates.html" element={<Navigate to="/certificates" replace />} />
            <Route path="/resume.html" element={<Navigate to="/resume" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
