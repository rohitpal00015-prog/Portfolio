import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let lockCount = 0;

export function initSmoothScroll() {
  if (lenis) return lenis;
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential easeOut for authentic inertia
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false, // native touch on mobile for zero input lag
    wheelMultiplier: 1.0,
    touchMultiplier: 1.8,
    infinite: false
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  if (lockCount > 0) lenis.stop();
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToTarget(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.3, ...options });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: options.immediate ? 'auto' : 'smooth' });
  }
}

export function lockScroll() {
  lockCount += 1;
  if (lenis) lenis.stop();
  document.documentElement.classList.add('scroll-locked');
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;
  if (lenis) lenis.start();
  document.documentElement.classList.remove('scroll-locked');
}
