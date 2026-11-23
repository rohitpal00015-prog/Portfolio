import { useState } from 'react';
import DossierLayout, {
  DossierSection,
  DossierLink,
  StatStrip
} from '../components/DossierLayout';
import Lightbox from '../components/Lightbox';
import { asset, milestones, profile } from '../data';

const gallery = [
  { src: 'assets/images/sih/sih_team_stage.jpg', title: 'On the SIH stage', meta: 'Team CyberEye presenting the build to evaluators.' },
  { src: 'assets/images/sih/sih_boardroom_team.jpg', title: 'Boardroom sprint', meta: 'Late-night problem framing and architecture reviews.' },
  { src: 'assets/images/sih/sih_meeting_discussion.jpg', title: 'Mentor reviews', meta: 'Iterating the pitch with faculty and industry mentors.' },
  { src: 'assets/images/sih/sih_group_faculty.jpg', title: 'Cohort & faculty', meta: 'The team behind the Smart India Hackathon run.' },
  { src: 'assets/images/sih/sih_participants_hall.jpg', title: 'Participant hall', meta: 'Hundreds of builders, one shared deadline.' }
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
      title={<>Hackathons —<br /><em>rooms that shaped me.</em></>}
      lede={
        <>
          Twenty-two milestones across <strong>national hackathon finals, 600+ student conclaves, campus
          organizing teams and open-source sprints.</strong> A running log of the rooms, teams and builds
          behind the work.
        </>
      }
      tags={['SIH', 'SRM BUILDS', 'GDG', 'Community', 'Leadership']}
      meta={[
        { label: 'Window', value: '2024 — 2026' },
        { label: 'Milestones', value: '22 logged' },
        { label: 'Podiums', value: '3x national finalist' },
        { label: 'Largest room', value: '600+ participants' }
      ]}
      sections={[
        { id: 'ledger', label: 'Full ledger' },
        { id: 'gallery', label: 'From the floor' }
      ]}
      next={{ index: '04', title: 'Certificates & proof', href: '/certificates', tone: 'amber' }}
      reduced={reduced}
    >
      <div className="container dossier-overview">
        <StatStrip
          items={[
            { value: '22', label: 'milestones on the record' },
            { value: '3x', label: 'national finalist' },
            { value: '600+', label: 'student conclave' },
            { value: '10k+', label: 'ambassador community' }
          ]}
        />
      </div>

      <DossierSection
        id="ledger"
        index="01"
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
        index="02"
        kicker="From the floor"
        title={<>Proof it actually<br />happened.</>}
        intro="Five frames from the Smart India Hackathon run with Team CyberEye at United Institute of Technology."
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
