import { useState } from 'react';
import DossierLayout, { DossierSection, StatStrip } from '../components/DossierLayout';
import Lightbox from '../components/Lightbox';
import { asset, certificates, metrics, profile } from '../data';

const items = certificates.map((certificate) => ({
  src: asset(certificate.image),
  alt: certificate.title,
  title: certificate.title,
  category: `${certificate.category} · ${certificate.subCategory}`,
  meta: `${certificate.issuer} — ${certificate.date}. ${certificate.description}`
}));

export default function CertificatesPage({ reduced }) {
  const [shot, setShot] = useState(null);

  return (
    <DossierLayout
      index="04"
      tone="amber"
      eyebrow="Verified proof"
      title={<>Receipts,<br />not <em>claims.</em></>}
      lede={
        <>
          Eight verified credentials from <strong>national hackathon finals, Google Developer Group
          circuits, Google Student Ambassador programmes and leadership sprints</strong> — every certificate
          viewable in full resolution.
        </>
      }
      tags={['SRM BUILDS', 'GDG', 'Google GSA', 'National finalist', 'Merit']}
      meta={[
        { label: 'Credentials', value: `${certificates.length} verified` },
        { label: 'Finalist runs', value: metrics.hackathonsFinalist },
        { label: 'Window', value: '2025 — 2026' },
        { label: 'Formats', value: 'PDF + certificate' }
      ]}
      sections={[{ id: 'vault', label: 'Certificate vault' }]}
      next={{ index: '05', title: 'Résumé & dossier', href: '/resume', tone: 'green' }}
      reduced={reduced}
    >
      <div className="container dossier-overview">
        <StatStrip
          items={[
            { value: '08', label: 'certificates on file' },
            { value: '3x', label: 'national finalist' },
            { value: '02', label: 'Top-10 finishes' },
            { value: '2026', label: 'latest award' }
          ]}
        />
      </div>

      <DossierSection
        id="vault"
        index="01"
        kicker="Certificate vault"
        title={<>Open any frame.<br />Read the fine <em>print.</em></>}
        intro="Tap a certificate to open it full-screen. Use the arrow keys or the on-screen controls to move through the vault."
      >
        <div className="proof-grid" data-reveal-group>
          {certificates.map((certificate, index) => (
            <button
              type="button"
              className="proof"
              key={certificate.code}
              onClick={() => setShot(index)}
            >
              <div className="proof__media">
                <img src={asset(certificate.image)} alt={certificate.title} loading="lazy" decoding="async" />
                <span className="proof__view">View <span aria-hidden="true">↗</span></span>
              </div>
              <div className="proof__meta">
                <p>{certificate.category} · {certificate.date}</p>
                <h3>{certificate.title}</h3>
                <p className="proof__issuer">{certificate.issuer}</p>
                <span className="proof__tag">{certificate.subCategory}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="dossier-footnote">
          Prefer a one-page summary? The <a href={asset(profile.resume)} target="_blank" rel="noreferrer">PDF résumé</a> collects
          the full record in a single document.
        </p>
      </DossierSection>

      {shot !== null && (
        <Lightbox items={items} index={shot} onClose={() => setShot(null)} onChange={setShot} label="Certificates" />
      )}
    </DossierLayout>
  );
}
