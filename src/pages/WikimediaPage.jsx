import DossierLayout, {
  DossierSection,
  DossierLink,
  StatStrip
} from '../components/DossierLayout';
import { belief, metrics, wikimedia, wikimediaLinks } from '../data';

const sections = [
  { id: 'contributions', label: 'Contributions' },
  { id: 'receipts', label: 'Receipts' },
  { id: 'milestones', label: 'Merged work' },
  { id: 'impact', label: 'Why it matters' }
];

export default function WikimediaPage({ reduced }) {
  return (
    <DossierLayout
      index="01"
      tone="green"
      eyebrow="Open source dossier"
      title={<>Wikimedia —<br /><em>code in the open.</em></>}
      lede={
        <>
          Accessibility-first contributions to <strong>MediaWiki, Codex and community skins</strong> — plus
          free photography, Hindi Wikipedia campaigns and documentation that helps the next contributor
          start faster.
        </>
      }
      tags={['MediaWiki', 'Codex', 'Gerrit', 'Commons', 'Hindi Wikipedia']}
      meta={[
        { label: 'Role', value: 'Open source contributor' },
        { label: 'Ecosystem', value: 'Wikimedia Foundation' },
        { label: 'Merged', value: 'PR #88 · patch #1347603' },
        { label: 'Since', value: '2025 — present' }
      ]}
      sections={sections}
      next={{ index: '02', title: 'UP Police Fellowship', href: '/fellowship', tone: 'amber' }}
      reduced={reduced}
    >
      <div className="container dossier-overview">
        <StatStrip
          items={[
            { value: 'PR #88', label: 'merged into Wikitermbase' },
            { value: '#1347603', label: 'merged in ContentTranslation' },
            { value: metrics.openSourceMarathonRank, label: 'Road to Wiki marathon' },
            { value: '9+', label: 'verified patchsets' }
          ]}
        />
      </div>

      <DossierSection
        id="contributions"
        index="01"
        kicker="Contribution areas"
        title={<>Five places the work<br />becomes <em>real.</em></>}
        intro="Not a reading list — actual patches, reviews and tasks inside a production open-source ecosystem."
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
        id="receipts"
        index="02"
        kicker="Primary records"
        title={<>Find the <em>receipts.</em></>}
        intro="Everything below is public — profile, patchsets, tasks and uploads you can verify yourself."
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
              <p className="wiki-belief__hi" lang="hi">{belief.hindi}</p>
              <p className="wiki-belief__en">{belief.english}</p>
            </blockquote>
            <figcaption>{belief.caption}</figcaption>
          </figure>
        </div>
      </DossierSection>

      <DossierSection
        id="milestones"
        index="03"
        kicker="Merged work"
        title={<>Accepted, not just<br />attempted.</>}
        intro="The three milestones I point to when someone asks what open source has actually taught me."
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
        index="04"
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
    </DossierLayout>
  );
}
