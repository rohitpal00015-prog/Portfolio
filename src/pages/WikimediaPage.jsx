import { useState } from 'react';
import DossierLayout, {
  DossierSection,
  DossierLink,
  StatStrip
} from '../components/DossierLayout';
import Lightbox from '../components/Lightbox';
import { asset, belief, metrics, wikimedia, wikimediaLinks } from '../data';

const sections = [
  { id: 'contributions', label: 'Contributions' },
  { id: 'hacktoberfest', label: 'Hacktoberfest' },
  { id: 'receipts', label: 'Receipts' },
  { id: 'milestones', label: 'Merged work' },
  { id: 'impact', label: 'Why it matters' }
];

export default function WikimediaPage({ reduced }) {
  const [shot, setShot] = useState(null);

  const hacktoberfestMoments = (wikimedia.hacktoberfestPhotos || []).map((photo) => ({
    src: asset(photo.file),
    alt: photo.title,
    title: photo.title,
    meta: photo.desc
  }));

  return (
    <DossierLayout
      index="01"
      tone="green"
      eyebrow="Open source dossier"
      title={<>Wikimedia &amp; WikiClub Tech —<br /><em>code &amp; community in the open.</em></>}
      lede={
        <>
          Core team member of <strong>WikiClub Tech UIT</strong> with <strong>20+ merged production patches on Gerrit</strong> across
          MediaWiki, ContentTranslation, and Codex — plus co-organizing the <strong>Hacktoberfest Hack Day trilogy</strong> and
          documenting heritage on Wikimedia Commons.
        </>
      }
      tags={['MediaWiki', '20+ Gerrit Merges', 'WikiClub Tech UIT', 'Hacktoberfest Co-Organizer', 'Codex', 'Commons']}
      meta={[
        { label: 'Role', value: 'WikiClub Tech Team & Contributor' },
        { label: 'Ecosystem', value: 'Wikimedia Foundation' },
        { label: 'Gerrit Status', value: '20+ Merged Patches' },
        { label: 'Events', value: 'Hacktoberfest 1.0, 2.0 & 3.0' }
      ]}
      sections={sections}
      next={{ index: '02', title: 'UP Police Fellowship', href: '/fellowship', tone: 'amber' }}
      reduced={reduced}
    >
      <div className="container dossier-overview">
        <StatStrip
          items={[
            { value: '20+', label: 'merged patches on Gerrit' },
            { value: 'Co-Organizer', label: 'Hacktoberfest 1.0, 2.0 & 3.0' },
            { value: 'Team Member', label: 'WikiClub Tech UIT' },
            { value: 'PR #88', label: 'merged into Wikitermbase' }
          ]}
        />
      </div>

      <DossierSection
        id="contributions"
        index="01"
        kicker="Contribution areas"
        title={<>Six pillars where the work<br />becomes <em>real.</em></>}
        intro="Not a reading list — actual production code review, upstream merges, bug triage, and leadership inside the Wikimedia ecosystem."
      >
        <div className="wiki-areas" data-reveal-group>
          {wikimedia.coreAreas.map((area, index) => (
            <article className="wiki-area" key={area.area}>
              <div className="wiki-area__top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{area.tech}</p>
              </div>
              <h3>{area.area}</h3>
              <p className="wiki-area__desc">{area.description}</p>
              {area.tasks && (
                <ul className="wiki-area__tasks">
                  {area.tasks.map((task) => <li key={task}>{task}</li>)}
                </ul>
              )}
              {area.url && <DossierLink href={area.url}>Open source thread <span aria-hidden="true">↗</span></DossierLink>}
            </article>
          ))}
        </div>
      </DossierSection>

      <DossierSection
        id="hacktoberfest"
        index="02"
        kicker="Campus Leadership &amp; Hackathons"
        title={<>Hacktoberfest Hack Day<br /><em>Trilogy (1.0, 2.0 &amp; 3.0).</em></>}
        intro="Co-organized the multi-day open source festival with WikiClub Tech UIT, mobilizing 120+ student developers across upstream MediaWiki workflows, architecture labs, and an inter-college Grand Finale."
      >
        <div className="moments-grid" data-reveal-group>
          {hacktoberfestMoments.map((item, index) => (
            <button
              type="button"
              className="moment"
              key={item.title}
              onClick={() => setShot(index)}
            >
              <div className="moment__media">
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <span className="moment__view">View photo <span aria-hidden="true">↗</span></span>
              </div>
              <div className="moment__meta">
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="dossier-links-bar" style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <DossierLink href="https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Events/Hacktoberfest_Hack_Day_3.0">
            Grand Finale 3.0 on Meta-Wiki ↗
          </DossierLink>
          <DossierLink href="https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Events/Hacktoberfest_Hack_Day_2.0">
            Sprint 2.0 on Meta-Wiki ↗
          </DossierLink>
          <DossierLink href="https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Events/Hacktoberfest_Hack_Day_1.0">
            Kickoff 1.0 on Meta-Wiki ↗
          </DossierLink>
          <DossierLink href="https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Team">
            WikiClub Tech Team Page ↗
          </DossierLink>
        </div>
      </DossierSection>

      <DossierSection
        id="receipts"
        index="03"
        kicker="Primary records"
        title={<>Find the <em>receipts.</em></>}
        intro="Everything below is public — team roster, Gerrit patchsets, Meta-Wiki event pages, and Commons galleries you can verify yourself."
      >
        <div className="wiki-receipts">
          <div className="wiki-links" data-reveal-group>
            {wikimediaLinks.map((link, index) => (
              <DossierLink className="wiki-link" key={link.label} href={link.href}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{link.label}</strong>
                <span aria-hidden="true">↗</span>
              </DossierLink>
            ))}
          </div>
          <figure className="wiki-belief" data-reveal>
            <blockquote>
              <p className="wiki-belief__en">{belief.quote}</p>
            </blockquote>
            <figcaption>{belief.caption}</figcaption>
          </figure>
        </div>
      </DossierSection>

      <DossierSection
        id="milestones"
        index="04"
        kicker="Merged work"
        title={<>Accepted, not just<br />attempted.</>}
        intro="Key milestones on the record — merged Gerrit patchsets, national open source marathon finish, and event leadership."
      >
        <div className="wiki-milestones" data-reveal-group>
          {wikimedia.milestones.map((item, index) => (
            <article className="wiki-milestone" key={item.title}>
              <span className="wiki-milestone__index">{String(index + 1).padStart(2, '0')}</span>
              <p className="wiki-milestone__rank">{item.rank}</p>
              <h3>{item.title}</h3>
              <p className="wiki-milestone__event">{item.event}</p>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </DossierSection>

      <DossierSection
        id="impact"
        index="05"
        kicker="Why it matters"
        title={<>What this work<br />actually <em>builds.</em></>}
        intro="Open source is a collaboration protocol. These are the muscles it trains."
      >
        <ol className="impact-list" data-reveal-group>
          {wikimedia.impact.map((item, index) => {
            const [lead, ...rest] = item.split(':');
            return (
              <li key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p><strong>{lead}.</strong>{rest.join(':')}</p>
              </li>
            );
          })}
        </ol>
      </DossierSection>

      {shot !== null && (
        <Lightbox items={hacktoberfestMoments} index={shot} onClose={() => setShot(null)} onChange={setShot} label="Hacktoberfest" />
      )}
    </DossierLayout>
  );
}
