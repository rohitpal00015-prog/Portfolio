import { useState } from 'react';
import DossierLayout, {
  DossierSection,
  DossierLink,
  StatStrip
} from '../components/DossierLayout';
import Lightbox from '../components/Lightbox';
import { asset, milestones, profile, uccEvents, uccGallery } from '../data';

const sihAndHacktoberfestGallery = [
  { src: 'assets/images/wikimedia/hacktoberfest/hacktoberfest_hack_day_2026_by_wikiclub_tech_uit_-_orgnising_team.jpg', title: 'Hacktoberfest 3.0 Core Team', meta: 'WikiClub Tech organizing crew on the Grand Finale stage at UIT.' },
  { src: 'assets/images/wikimedia/hacktoberfest/winners_of_the_hactoberfest_hackday_by_wikiclub_tech_uit_1.jpg', title: 'Hacktoberfest Winners Celebration', meta: 'Track winners of Hacktoberfest Hack Day honored by college leadership.' },
  { src: 'assets/images/wikimedia/hacktoberfest/hacktoberfest_hack_day_2026_by_wikiclub_tech_uit_-_edition_2.0_-_opening_ceremony.jpg', title: 'Hacktoberfest 2.0 Sprint', meta: 'MediaWiki upstream sprint and technical orientation session.' },
  { src: 'assets/images/sih/sih_team_stage.jpg', title: 'On the SIH stage', meta: 'Team CyberEye presenting the build to evaluators.' },
  { src: 'assets/images/sih/sih_boardroom_team.jpg', title: 'Boardroom sprint', meta: 'Late-night problem framing and architecture reviews.' },
  { src: 'assets/images/sih/sih_meeting_discussion.jpg', title: 'Mentor reviews', meta: 'Iterating the pitch with faculty and industry mentors.' },
  { src: 'assets/images/sih/sih_group_faculty.jpg', title: 'Cohort & faculty', meta: 'The team behind the Smart India Hackathon run.' },
  { src: 'assets/images/sih/sih_participants_hall.jpg', title: 'Participant hall', meta: 'Hundreds of builders, one shared deadline.' }
];

const gallery = [
  ...uccGallery,
  ...sihAndHacktoberfestGallery
].map((item) => ({ ...item, src: asset(item.src), alt: item.title }));

const normalize = (category) => (category && category.startsWith('hackathon') ? 'hackathons' : category);

const filters = [
  { id: 'all', label: 'Everything' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'opensource', label: 'Open source' }
];

export default function HackathonsPage({ reduced }) {
  const [filter, setFilter] = useState('all');
  const [shot, setShot] = useState(null);
  const visible = filter === 'all' ? milestones : milestones.filter((item) => normalize(item.category) === filter);

  return (
    <DossierLayout
      index="03"
      tone="blue"
      eyebrow="Build log dossier"
      title={<>Hackathons &amp; Campus Leadership —<br /><em>rooms that shaped me.</em></>}
      lede={
        <>
          Core organizing team and Executive Council at <strong>UIT Coding Club (UCC)</strong>, spearheading
          <strong> Code Aarambh 2026 (500+ student coders), Code Utsav 2026, and Code Gyan 4.0</strong> — plus
          national hackathon podiums at <strong>SIH 2026 &amp; GDG</strong>.
        </>
      }
      tags={['UIT Coding Club (UCC)', 'Code Aarambh (500+)', 'Code Utsav', 'Code Gyan', 'SIH 2026', 'Leadership']}
      meta={[
        { label: 'UCC Leadership', value: 'Core Team & Organizer' },
        { label: 'Largest Contest', value: '500+ Coders (Aarambh)' },
        { label: 'Hackathons', value: 'SIH & National Finalist' },
        { label: 'Campus Community', value: '1,000+ Students' }
      ]}
      sections={[
        { id: 'ucc-events', label: 'UIT Coding Club' },
        { id: 'ledger', label: 'Full ledger' },
        { id: 'gallery', label: 'From the floor' }
      ]}
      next={{ index: '04', title: 'Certificates & proof', href: '/certificates', tone: 'amber' }}
      reduced={reduced}
    >
      <div className="container dossier-overview">
        <StatStrip
          items={[
            { value: '500+', label: 'participants in Code Aarambh' },
            { value: '3 Flagship', label: 'UCC events organized' },
            { value: '3x', label: 'national hackathon finalist' },
            { value: '1,000+', label: 'developer community' }
          ]}
        />
      </div>

      <DossierSection
        id="ucc-events"
        index="01"
        kicker="UIT Coding Club (UCC)"
        title={<>Flagship campus events<br />built with <em>the team.</em></>}
        intro="As an Executive Council member and Core Organizer at UIT Coding Club (UCC), I collaborated with faculty leadership and student leads to organize major competitive programming, DSA sprints, and campus coding tournaments."
      >
        <div className="ucc-grid" data-reveal-group>
          {uccEvents.map((event, index) => (
            <article className="ucc-card" key={event.id}>
              <div className="ucc-card__media">
                <img src={asset(event.image)} alt={event.title} loading="lazy" decoding="async" />
                <span className="ucc-card__badge">{event.badge}</span>
                <span className="ucc-card__index">0{index + 1}</span>
              </div>
              <div className="ucc-card__body">
                <div className="ucc-card__meta">
                  <span className="ucc-card__cohort">{event.cohort}</span>
                  <span className="ucc-card__date">{event.date}</span>
                </div>
                <h3>{event.title}</h3>
                <p className="ucc-card__subtitle">{event.subtitle}</p>
                <p className="ucc-card__summary">{event.summary}</p>
                <ul className="ucc-card__highlights">
                  {event.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="ucc-card__foot">
                  <ul className="ucc-card__tags">
                    {event.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  {event.link && (
                    <DossierLink href={event.link}>
                      View on LinkedIn <span aria-hidden="true">↗</span>
                    </DossierLink>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </DossierSection>

      <DossierSection
        id="ledger"
        index="02"
        kicker="Full ledger"
        title={<>Every milestone,<br />no <em>filter.</em></>}
        intro="Filter by the kind of room. Each entry links to the actual build, post or certificate where one exists."
      >
        <div className="ledger__filters" role="group" aria-label="Filter milestones">
          {filters.map((item) => {
            const count = item.id === 'all'
              ? milestones.length
              : milestones.filter((milestone) => normalize(milestone.category) === item.id).length;
            return (
              <button
                type="button"
                key={item.id}
                className={`ledger__filter ${filter === item.id ? 'is-active' : ''}`}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label} <span>{String(count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        <div className="ledger" key={filter} data-reveal-group>
          {visible.map((item, index) => (
            <article className="ledger__item" key={item.id}>
              <div className="ledger__rail">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i />
              </div>
              <div className="ledger__body">
                <p className="ledger__meta">
                  <span>{normalize(item.category) === 'hackathons' ? 'Hackathon' : normalize(item.category) === 'leadership' ? 'Leadership' : 'Open source'}</span>
                  <span>{item.date}</span>
                </p>
                <h3>{item.title}</h3>
                <p className="ledger__place">{item.badge} · {item.location}</p>
                <p className="ledger__summary">{item.summary}</p>
                {item.bullets && (
                  <ul className="ledger__bullets">
                    {item.bullets.slice(0, 2).map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                <ul className="ledger__tags">
                  {item.tags.slice(0, 5).map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                {item.link && <DossierLink href={item.link}>Open record <span aria-hidden="true">↗</span></DossierLink>}
              </div>
            </article>
          ))}
        </div>
      </DossierSection>

      <DossierSection
        id="gallery"
        index="03"
        kicker="From the floor"
        title={<>Proof it actually<br />happened.</>}
        intro="Frames from UIT Coding Club (UCC) flagship events, Hacktoberfest Hack Day, and Smart India Hackathon at United Institute of Technology."
      >
        <div className="floor" data-reveal-group>
          {gallery.map((item, index) => (
            <button
              type="button"
              className={`floor__shot floor__shot--${index}`}
              key={item.src}
              onClick={() => setShot(index)}
            >
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
        <p className="dossier-footnote">
          More context on the{' '}
          <DossierLink href={profile.socials.github}>GitHub profile</DossierLink> and{' '}
          <DossierLink href={profile.socials.linkedin}>LinkedIn build log</DossierLink>.
        </p>
      </DossierSection>

      {shot !== null && (
        <Lightbox items={gallery} index={shot} onClose={() => setShot(null)} onChange={setShot} label="Hackathon gallery" />
      )}
    </DossierLayout>
  );
}
