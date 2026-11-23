import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="container notfound__inner">
        <p className="section-label"><span>404</span> Off the map</p>
        <h1>This page<br />isn't <em>built.</em></h1>
        <p>
          The link is broken or the case file moved. Start from the homepage, or jump straight into the
          dossiers.
        </p>
        <div className="notfound__actions">
          <Link className="btn btn--primary" to="/">Back to homepage <span aria-hidden="true">↖</span></Link>
          <Link className="btn btn--ghost" to="/wikimedia">Wikimedia dossier</Link>
          <Link className="btn btn--ghost" to="/hackathons">Hackathons</Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
