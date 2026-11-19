import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Marquee from './Marquee';
import { profile, asset, wikimediaLinks } from '../data';
import { scrollToTarget } from '../lib/scroll';

const socials = [
  { label: 'GitHub', href: profile.socials.github },
  { label: 'LinkedIn', href: profile.socials.linkedin },
  { label: 'X / Twitter', href: profile.socials.twitter },
  { label: 'Instagram', href: profile.socials.instagram }
];

function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());
    setTime(format());
    const timer = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <span className="contact__time">{time} IST</span>;
}

export default function Contact({ reduced }) {
  const rootRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.contact__eyebrow, .contact__title .line > span', {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%' }
      });
      gsap.from('.contact__row > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__row', start: 'top 88%' }
      });
      gsap.from('.contact__wiki', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__wiki', start: 'top 92%' }
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="contact" ref={rootRef}>
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__inner">
        <p className="section-label contact__eyebrow"><span>06</span> Contact</p>

        <h2 className="contact__title">
          <span className="line"><span>Let's build</span></span>
          <span className="line"><span>something worth</span></span>
          <span className="line"><span><em>shipping.</em></span></span>
        </h2>

        <div className="contact__row">
          <p className="contact__lede">
            Have a product, an AI idea, an open-knowledge collaboration, or a role in mind? My inbox is open — I reply within a day.
          </p>
          <div className="contact__actions">
            <a className="contact__mail" href={`mailto:${profile.email}`} data-magnetic>
              {profile.email} <span aria-hidden="true">↗</span>
            </a>
            <button type="button" className="contact__copy" onClick={copyEmail}>
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
          </div>
        </div>

        <div className="contact__meta">
          <div className="contact__block">
            <span className="contact__label">Now</span>
            <p><span className="avail-dot" /> {profile.status}</p>
          </div>
          <div className="contact__block">
            <span className="contact__label">Based in</span>
            <p>{profile.location}</p>
          </div>
          <div className="contact__block">
            <span className="contact__label">Local time</span>
            <p><LocalTime /></p>
          </div>
          <div className="contact__block">
            <span className="contact__label">Elsewhere</span>
            <p className="contact__socials">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  {social.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </p>
          </div>
        </div>

        <div className="contact__wiki">
          <span className="contact__label">Wikimedia ecosystem</span>
          <div className="contact__wiki-links">
            {wikimediaLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact__signature">
          <img src={asset(profile.avatar)} alt="" width="652" height="800" loading="lazy" decoding="async" />
          <p>Designed &amp; built with intent — React, GSAP and Lenis.</p>
        </div>
      </div>

      <Marquee
        className="contact__marquee"
        items={['Open for full-stack roles', 'AI product collaborations', 'Open source', 'Freelance builds']}
        reverse
        speed={38}
      />

      <footer className="footer">
        <div className="container footer__inner">
          <a className="footer__brand" href="#home" onClick={(event) => { event.preventDefault(); scrollToTarget('#home'); }}>
            RP<span>®</span>
          </a>
          <p className="footer__copy">© {new Date().getFullYear()} Rohit Pal · Prayagraj, India</p>
          <div className="footer__links">
            <a href="/resume.html">Résumé</a>
            <a href="/up-police-internship.html">UP Police</a>
            <a href="/wikimedia-open-source.html">Wikimedia</a>
            <button type="button" onClick={() => scrollToTarget('#home')}>Back to top ↑</button>
          </div>
          <p className="footer__note">React · GSAP · Lenis</p>
        </div>
      </footer>
    </section>
  );
}
