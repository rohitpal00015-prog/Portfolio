import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data';
import { scrollToTarget } from '../lib/scroll';

const links = [
  { label: 'Résumé', to: '/resume' },
  { label: 'UP Police', to: '/fellowship' },
  { label: 'Wikimedia', to: '/wikimedia' },
  { label: 'Hackathons', to: '/hackathons' },
  { label: 'Certificates', to: '/certificates' }
];

export default function SiteFooter() {
  const { pathname } = useLocation();

  const backToTop = (event) => {
    if (pathname === '/') {
      event.preventDefault();
      scrollToTarget('#home');
    }
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Link className="footer__brand" to="/" aria-label="Rohit Pal — home">
          RP<span>®</span>
        </Link>
        <p className="footer__copy">© {new Date().getFullYear()} {profile.name} · Prayagraj, India</p>
        <div className="footer__links">
          {links.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
          <Link to="/#home" onClick={backToTop}>Back to top ↑</Link>
        </div>
        <p className="footer__note">React · GSAP · Lenis</p>
      </div>
    </footer>
  );
}
