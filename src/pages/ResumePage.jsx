import { Link } from 'react-router-dom';
import DossierLayout, { DossierSection, DossierLink, StatStrip } from '../components/DossierLayout';
import { asset, education, experience, focusAreas, metrics, profile, skills } from '../data';

const roles = experience.filter((entry) => entry.statusType !== 'education');

const skillGroups = [
  { label: 'Frontend & product', items: skills.fullStackWeb.slice(0, 9) },
  { label: 'Languages', items: skills.programmingLanguages },
  { label: 'Backend & data', items: skills.backendAndDatabases.slice(0, 8) },
  { label: 'AI, tooling & review', items: skills.aiAndWebTools.slice(0, 9) },
  { label: 'Security exposure', items: skills.cybersecurityExposure }
];

export default function ResumePage({ reduced }) {
  return (
    <DossierLayout
      index="05"
      tone="green"
      eyebrow="One-page dossier"
      title={<>The full<br /><em>record.</em></>}
      lede={
        <>
          Full-stack developer and AI builder, pre-final year B.Tech CSE at UIT Prayagraj — currently
          shipping production interfaces at <strong>Heisyn</strong>, contributing to <strong>Wikimedia</strong>,
          and holding a <strong>government cyber-security fellowship</strong>.
        </>
      }
      tags={['Full-stack', 'AI products', 'Open source', 'Security']}
      meta={[
        { label: 'Location', value: profile.location },
        { label: 'Status', value: profile.status },
        { label: 'Email', value: profile.email },
        { label: 'Education', value: 'B.Tech CSE, 2024 — 2028' }
      ]}
      sections={[
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'honors', label: 'Honours' }
      ]}
      next={{ index: '01', title: 'Wikimedia open source', href: '/wikimedia', tone: 'green' }}
      reduced={reduced}
    >
      <div className="container dossier-overview">
        <StatStrip
          items={[
            { value: metrics.projectsCount, label: 'projects built' },
            { value: metrics.hackathonsFinalist, label: 'hackathon podiums' },
            { value: metrics.verifiedCredentials, label: 'verified credentials' },
            { value: '15', label: 'days · police fellowship' }
          ]}
        />
        <div className="resume-actions" data-reveal-group>
          <a className="btn btn--primary" href={asset(profile.resume)} target="_blank" rel="noreferrer" data-magnetic>
            Download PDF résumé <span aria-hidden="true">↘</span>
          </a>
          <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="btn btn--ghost" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <DossierSection
        id="experience"
        index="01"
        kicker="Experience"
        title={<>Where the work<br />actually <em>shipped.</em></>}
        intro="Internships, fellowships and volunteer leadership — newest first."
      >
        <div className="cv-list" data-reveal-group>
          {roles.map((role) => (
            <article className="cv-role" key={role.id}>
              <div className="cv-role__head">
                <div>
                  <p className="cv-role__period">{role.period}</p>
                  <h3>{role.role}</h3>
                  <p className="cv-role__org">{role.company} · {role.location}</p>
                </div>
                <span className={`cv-role__status cv-role__status--${role.statusType}`}>{role.status}</span>
              </div>
              <p className="cv-role__desc">{role.description}</p>
              <ul className="cv-role__chips">
                {role.techChips.map((chip) => <li key={chip}>{chip}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="dossier-footnote">
          Deep dives: <Link to="/wikimedia">Wikimedia</Link>, <Link to="/fellowship">UP Police fellowship</Link>,{' '}
          <Link to="/hackathons">hackathons & leadership</Link>.
        </p>
      </DossierSection>

      <DossierSection
        id="education"
        index="02"
        kicker="Education"
        title={<>The academic<br /><em>base.</em></>}
      >
        <article className="edu-card" data-reveal>
          <div>
            <p className="edu-card__period">{education.period}</p>
            <h3>{education.degree} — {education.field}</h3>
            <p className="edu-card__org">{education.institution}</p>
            <p className="edu-card__loc">{education.location}</p>
          </div>
          <span className="edu-card__status">{education.status}</span>
          <ul className="edu-card__focus">
            {education.focusAreas.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </DossierSection>

      <DossierSection
        id="skills"
        index="03"
        kicker="Capabilities"
        title={<>The toolkit,<br />in <em>plain sight.</em></>}
        intro="Chosen for leverage, not hype — what I actually reach for when a product has to ship."
      >
        <div className="skills-board" data-reveal-group>
          {skillGroups.map((group) => (
            <article className="skills-set" key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </DossierSection>

      <DossierSection
        id="honors"
        index="04"
        kicker="Honours & focus"
        title={<>Selected <em>signals.</em></>}
      >
        <div className="honors" data-reveal-group>
          <div className="honor">
            <span>Samsung</span>
            <h3>Samsung Innovation Campus — ISWDP Cohort 9</h3>
            <p>Selected for the Samsung Fellowship software development programme.</p>
          </div>
          <div className="honor">
            <span>Google GSA</span>
            <h3>Google Student Ambassador</h3>
            <p>Pitch-night recognition and active participation in student developer initiatives.</p>
          </div>
          <div className="honor">
            <span>SIH</span>
            <h3>Smart India Hackathon core organizer</h3>
            <p>Hackathon operations and technical setup for 600+ participants.</p>
          </div>
          <div className="honor">
            <span>Wikimedia</span>
            <h3>20+ Merged Patches &amp; WikiClub Tech</h3>
            <p>20+ merged upstream Gerrit patches in MediaWiki/Codex, and Co-Organizer of Hacktoberfest Hack Day series.</p>
          </div>
        </div>
        <ul className="focus-tags" data-reveal-group>
          {focusAreas.map((area) => (
            <li key={area.id}>
              <strong>{area.title}</strong>
              <span>{area.description}</span>
              <ul>{area.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </li>
          ))}
        </ul>
        <div className="resume-close">
          <p>Need the formal document, references or a portfolio walkthrough?</p>
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            Email Rohit <span aria-hidden="true">↗</span>
          </a>
        </div>
      </DossierSection>
    </DossierLayout>
  );
}
