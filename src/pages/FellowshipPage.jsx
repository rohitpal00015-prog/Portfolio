import { useState } from 'react';
import DossierLayout, {
  DossierSection,
  DossierLink,
  StatStrip
} from '../components/DossierLayout';
import Lightbox from '../components/Lightbox';
import { asset, upPolice } from '../data';

const sections = [
  { id: 'selection', label: 'Selection' },
  { id: 'domains', label: 'Domains' },
  { id: 'operations', label: 'Field ops' },
  { id: 'people', label: 'Officers' },
  { id: 'archive', label: 'Archive' }
];

export default function FellowshipPage({ reduced }) {
  const [shot, setShot] = useState(null);
  const moments = upPolice.momentsPhotos.map((photo) => ({
    src: asset(photo.file),
    alt: photo.title,
    title: photo.title,
    meta: photo.desc
  }));

  return (
    <DossierLayout
      index="02"
      tone="amber"
      eyebrow="Government fellowship dossier"
      title={<>UP Police —<br /><em>inside the cyber cell.</em></>}
      lede={
        <>
          A <strong>15-day official fellowship with Amroha Police</strong> — OSINT reconnaissance, digital
          forensics, CDR analysis and field operations, mentored by serving officers and defended before a
          valedictory review panel.
        </>
      }
      tags={['APCSIP-2026', 'OSINT', 'Digital forensics', 'CDR / IPDR', 'Cyber law']}
      meta={[
        { label: 'Programme', value: 'APCSIP-2026' },
        { label: 'Role', value: upPolice.fellowshipRole },
        { label: 'Mentor', value: 'DSP Anjali Kataria' },
        { label: 'Duration', value: '10 — 24 June 2026' },
        { label: 'Intern ID', value: upPolice.internId }
      ]}
      sections={sections}
      next={{ index: '03', title: 'Hackathons & Leadership', href: '/hackathons', tone: 'blue' }}
      reduced={reduced}
    >
      <div className="container dossier-overview">
        <StatStrip
          items={[
            { value: '15', label: 'days inside the cyber cell' },
            { value: '13', label: 'operational field days' },
            { value: '12', label: 'officers & experts' },
            { value: '1st', label: 'official govt. fellowship' }
          ]}
        />
      </div>

      <DossierSection
        id="selection"
        index="01"
        kicker="Selection pipeline"
        title={<>Eight gates between<br />application and <em>badge.</em></>}
        intro="A competitive government selection — screening, a 50-question exam, document verification and an official offer signed by the Superintendent of Police."
      >
        <ol className="pipeline" data-reveal-group>
          {upPolice.selectionPipeline.map((step) => (
            <li className="pipeline__step" key={step.stage}>
              <span className="pipeline__stage">{String(step.stage).padStart(2, '0')}</span>
              <div>
                <p className="pipeline__date">{step.date}</p>
                <h3>{step.name}</h3>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </DossierSection>

      <DossierSection
        id="domains"
        index="02"
        kicker="Core domains"
        title={<>Six disciplines,<br />one <em>case file.</em></>}
        intro="The technical curriculum — each domain tied to live investigations and admissible evidence, not just theory."
      >
        <div className="domain-grid" data-reveal-group>
          {upPolice.keyDomains.map((domain, index) => (
            <article className="domain-card" key={domain.name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{domain.name}</h3>
              <p>{domain.desc}</p>
            </article>
          ))}
        </div>
      </DossierSection>

      <DossierSection
        id="operations"
        index="03"
        kicker="Field operations"
        title={<>Thirteen days,<br />logged <em>honestly.</em></>}
        intro="Every operational day with the sessions run and the takeaway that stayed with me. Open a day to read the field notes."
      >
        <div className="ops" data-reveal-group>
          {upPolice.dailyOperations.map((op) => (
            <details className="op" key={op.op}>
              <summary>
                <span className="op__tag">{op.op}</span>
                <span className="op__date">{op.date}</span>
                <span className="op__title">{op.title}</span>
                <span className="op__chevron" aria-hidden="true">+</span>
              </summary>
              <div className="op__body">
                <p><strong>Field notes.</strong> {op.sessions}</p>
                <p><strong>Takeaway.</strong> {op.findings}</p>
                {op.linkedin && (
                  <a className="op__link" href={op.linkedin} target="_blank" rel="noreferrer">
                    Field log on LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </DossierSection>

      <DossierSection
        id="people"
        index="04"
        kicker="Officers & faculty"
        title={<>Taught by people<br />who do the <em>work.</em></>}
        intro="Serving officers, DFIR specialists, cyber lawyers and payment-security consultants — the room I got to learn in."
      >
        <div className="people-grid" data-reveal-group>
          {upPolice.officersAndFaculty.map((person) => (
            <article className="person" key={person.name}>
              <div className="person__photo">
                <img src={asset(person.photo)} alt={`${person.name} — ${person.rank}`} loading="lazy" decoding="async" />
              </div>
              <h3>{person.name}</h3>
              <p className="person__rank">{person.rank}</p>
              <p className="person__dept">{person.dept}</p>
              <ul>{person.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
        </div>
      </DossierSection>

      <DossierSection
        id="archive"
        index="05"
        kicker="Primary evidence"
        title={<>The paper trail<br />and the <em>moments.</em></>}
        intro="Official selection letter, the certificate presented by the DSP, and the cohort it happened with."
      >
        <div className="moments" data-reveal-group>
          {moments.map((moment, index) => (
            <button
              type="button"
              className="moment"
              key={moment.src}
              onClick={() => setShot(index)}
            >
              <img src={moment.src} alt={moment.alt} loading="lazy" decoding="async" />
              <span className="moment__meta">
                <strong>{moment.title}</strong>
                <small>{moment.meta}</small>
              </span>
            </button>
          ))}
        </div>
        <DossierLink className="dossier-inline-link" href="/certificates">
          See the verified certificate <span aria-hidden="true">↗</span>
        </DossierLink>
      </DossierSection>

      {shot !== null && (
        <Lightbox
          items={moments}
          index={shot}
          onClose={() => setShot(null)}
          onChange={setShot}
          label="Fellowship archive"
        />
      )}
    </DossierLayout>
  );
}
