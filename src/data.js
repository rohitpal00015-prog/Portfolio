import raw from '../data/portfolio-data.json';

export const profile = raw.profile;
export const education = raw.education;
export const metrics = raw.keyMetrics;
export const focusAreas = raw.focusAreas;
export const experience = raw.experience;
export const projects = raw.projects;
export const certificates = raw.certificates;
export const milestones = raw.hackathonsAndMilestones;
export const skills = raw.skills;
export const upPolice = raw.upPoliceFellowship;
export const wikimedia = raw.wikimediaOpenSource;
export const collaborationHub = raw.collaborationHub;
export const uccEvents = raw.uccEvents || [];
export const uccGallery = raw.assetsCatalog?.uccGallery || [];

export const asset = (path) => (path ? `/${path.replace(/^\.?\//, '')}` : null);

export const categoryLabel = {
  'python-ai': 'AI / Python',
  fullstack: 'Full-Stack',
  'community-tools': 'Community',
  cybersecurity: 'Security'
};

const featuredIds = [
  'shilpsetu',
  'devfest-prayagraj',
  'prayagraj-rooms',
  'palbasket',
  'zynoq',
  'nexora',
  'sourcewiki',
  'apcsip-portal'
];

export const featuredProjects = featuredIds
  .map((id) => projects.find((p) => p.id === id))
  .filter(Boolean);

export const archiveProjects = projects;

export const initials = (title) =>
  title
    .replace(/[—–|]/g, ' ')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

export const navLinks = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'work', label: 'Work', index: '02' },
  { id: 'dossiers', label: 'Dossiers', index: '03' },
  { id: 'timeline', label: 'Milestones', index: '04' },
  { id: 'stack', label: 'Stack', index: '05' },
  { id: 'credentials', label: 'Proof', index: '06' }
];

const aboutHighlightsMap = [
  ['MediaWiki', 'blue'],
  ['Codex design system and community skins', 'blue'],
  ["documenting India's cultural heritage on Wikimedia Commons", 'amber'],
  ['supporting Hindi Wikipedia campaigns', 'green']
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const aboutRich = (() => {
  const tones = new Map(aboutHighlightsMap);
  const pattern = new RegExp(
    `(${aboutHighlightsMap.map(([phrase]) => escapeRegex(phrase)).join('|')})`,
    'g'
  );
  return profile.aboutLong
    .split(pattern)
    .filter(Boolean)
    .map((part) => ({ text: part, tone: tones.get(part) || null }));
})();

export const aboutHighlights = [
  {
    tone: 'blue',
    stat: '500+ Coders',
    title: 'UIT Coding Club (UCC)',
    kicker: 'Code Aarambh, Utsav & Gyan',
    description: 'Executive Council member organizing Code Aarambh (500+ first years), Code Utsav DSA challenge, and Code Gyan 4.0 with faculty leadership.',
    action: 'Explore UCC Events & Ledger',
    href: '/hackathons'
  },
  {
    tone: 'blue',
    stat: 'Cohort 9',
    title: 'Samsung Fellowship',
    kicker: 'Samsung ISWDP Selection',
    description: 'Selected for competitive industry software engineering fellowship program.',
    action: 'Inspect Credentials',
    href: '/resume'
  },
  {
    tone: 'amber',
    stat: 'Core Lead',
    title: 'SIH Core Organizer',
    kicker: 'Smart India Hackathon',
    description: 'Directed end-to-end hackathon technical setup, participant desks & evaluation pipelines.',
    action: 'See Operations Ledger',
    href: '/hackathons'
  },
  {
    tone: 'amber',
    stat: 'Citiblock FPC',
    title: 'Vindhya Millets Platform',
    kicker: 'Web & Digital Strategy',
    description: 'Architected brand website, digital product catalog & multi-channel campaign communication.',
    action: 'Visit Brand Platform',
    href: 'https://lnkd.in/p/gvAK4ghJ',
    external: true
  },
  {
    tone: 'blue',
    stat: 'Live Startup',
    title: 'Prayagraj Rooms',
    kicker: 'Founder & Web Architect',
    description: 'Production student accommodation discovery engine with verified local property listings.',
    action: 'Launch prayagrajrooms.in',
    href: 'https://prayagrajrooms.in',
    external: true
  },
  {
    tone: 'amber',
    stat: 'Law Enforcement',
    title: 'UP Police Cyber Fellow',
    kicker: 'APCSIP-2026 Fellowship',
    description: '15-day state cyber crime cell fellowship under DSP Anjali Kataria · OSINT & Digital Forensics.',
    action: 'Read Police Case File',
    href: '/fellowship'
  },
  {
    tone: 'green',
    stat: '20+ Merges',
    title: 'Wikimedia & WikiClub Tech',
    kicker: 'Gerrit & Hacktoberfest',
    description: '20+ merged upstream Gerrit patches in MediaWiki/Codex, WikiClub Tech team member & Hack Day Co-Organizer.',
    action: 'Explore Open Source Dossier',
    href: '/wikimedia'
  }
];

export const belief = {
  quote:
    'Code in the open, built for everyone. Upstream contribution is about maintaining software that millions rely on daily for free knowledge.',
  caption: 'Wikimedia & Open Source Principles'
};

export const wikimediaPillars = [
  {
    id: 'a11y',
    kicker: 'Code',
    title: 'Accessible by default',
    description:
      'I write and review patches across MediaWiki, Codex and community skins with one question in mind: does this make the interface clearer for everyone, including editors and readers who rely on assistive technology?',
    tags: ['Codex', 'MediaWiki', 'a11y']
  },
  {
    id: 'commons',
    kicker: 'Culture',
    title: 'Keeping memory public',
    description:
      "On Wikimedia Commons I share original photography from India's festivals and heritage — including the Magh Mela series from Prayagraj — under free licenses, with multilingual descriptions so the images can travel across wikis.",
    tags: ['Commons', 'Free license', 'Magh Mela']
  },
  {
    id: 'community',
    kicker: 'Community',
    title: 'Opening the door wider',
    description:
      'I support Hindi Wikipedia campaigns, maintain documentation on Meta-Wiki, and help students and first-time contributors find their first issue, first review, and first merged patch.',
    tags: ['Hindi Wikipedia', 'Meta-Wiki', 'Mentorship']
  }
];

export const wikimediaLinks = [
  { label: 'WikiClub Tech UIT Team', href: 'https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Team' },
  { label: 'Hacktoberfest Hack Day 3.0', href: 'https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Events/Hacktoberfest_Hack_Day_3.0' },
  { label: 'Hacktoberfest Hack Day 2.0', href: 'https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Events/Hacktoberfest_Hack_Day_2.0' },
  { label: 'Hacktoberfest Hack Day 1.0', href: 'https://meta.wikimedia.org/wiki/WikiClub_Tech_%E2%80%93_UIT/Events/Hacktoberfest_Hack_Day_1.0' },
  { label: 'Gerrit 20+ Merges Dashboard', href: profile.socials.gerrit },
  { label: 'Meta-Wiki User Profile', href: profile.socials.meta },
  { label: 'Phabricator Workspace', href: profile.socials.phabricator },
  { label: 'Commons Uploads Gallery', href: profile.socials.commons }
];

export const dossiers = [
  {
    id: 'wikimedia',
    index: '01',
    tone: 'green',
    eyebrow: 'Open source',
    title: 'Wikimedia & WikiClub Tech',
    subtitle: 'Code, Commons, and Hacktoberfest.',
    summary:
      '20+ merged upstream Gerrit patches across MediaWiki core and Codex, WikiClub Tech UIT core team member, Hacktoberfest Hack Day co-organizer, and Commons documentation.',
    stats: [
      { value: '20+', label: 'Gerrit merges' },
      { value: 'Organizer', label: 'Hacktoberfest' },
      { value: 'Core Team', label: 'WikiClub Tech' }
    ],
    tags: ['MediaWiki', 'Codex', 'WikiClub Tech', 'Hacktoberfest', 'Gerrit'],
    href: '/wikimedia'
  },
  {
    id: 'fellowship',
    index: '02',
    tone: 'amber',
    eyebrow: 'Government fellowship',
    title: 'UP Police',
    subtitle: 'Inside the cyber crime cell.',
    summary:
      'A 15-day official fellowship with Amroha Police — OSINT, digital forensics, CDR analysis and field operations with serving officers.',
    stats: [
      { value: '15', label: 'days' },
      { value: '13', label: 'field ops' },
      { value: '12', label: 'officers' }
    ],
    tags: ['OSINT', 'Forensics', 'CDR / IPDR', 'Cyber law'],
    href: '/fellowship'
  },
  {
    id: 'hackathons',
    index: '03',
    tone: 'blue',
    eyebrow: 'Build log',
    title: 'Hackathons',
    subtitle: '22 milestones. 3 national podiums.',
    summary:
      'From SIH organizing teams to national finals and 600+ student conclaves — the rooms, teams and builds that shaped the work.',
    stats: [
      { value: '22', label: 'milestones' },
      { value: '3x', label: 'finalist' },
      { value: '600+', label: 'conclave' }
    ],
    tags: ['SIH', 'SRM BUILDS', 'GDG', 'Leadership'],
    href: '/hackathons'
  }
];

export const timeline = [
  {
    id: 'ucc-lead',
    date: '2025 — Present',
    category: 'work',
    type: 'Leadership',
    title: 'Executive Council & Flagship Event Lead',
    org: 'UIT Coding Club (UCC) · United Institute of Technology',
    summary:
      'Executive lead organizing Code Aarambh 2026 (500+ participants across 3 computer labs), Code Utsav 2026, and Code Gyan 4.0. Mentoring student coders in DSA, full-stack development, and hackathons.',
    tags: ['Leadership', '500+ Coders', 'Code Aarambh', 'Mentorship'],
    link: '/hackathons'
  },
  {
    id: 'shilpsetu-sih',
    date: 'Nov 2026 — Present',
    category: 'hackathon',
    type: 'National Build',
    title: 'ShilpSetu — SIH 2026 & SPARK 2 SCALE',
    org: 'Team CyberEye · Smart India Hackathon',
    summary:
      'Leading a voice-first, offline-first artisan marketplace across two national problem statements, built with Flutter, FastAPI, Gemini 2.5 and Groq.',
    tags: ['SIH 2026', 'Flutter', 'FastAPI', 'Gemini 2.5'],
    link: 'https://github.com/rohitpal00015-prog/shilpsetu'
  },
  {
    id: 'vindhya',
    date: 'Sept 2026 — Present',
    category: 'work',
    type: 'Strategy & Web',
    title: 'Web & Digital Strategy Lead — Vindhya Millets',
    org: 'Citiblock Farmer Producer Company (Indian Army Supplier)',
    summary:
      'Architected the brand website, digital product catalog, and campaign assets for Citiblock FPC (Vindhya Millets) to support regional agricultural outreach.',
    tags: ['Brand', 'Web Architecture', 'Catalog', 'Army Supplier'],
    link: 'https://lnkd.in/p/gvAK4ghJ'
  },
  {
    id: 'heisyn',
    date: 'June 2026 — Present',
    category: 'work',
    type: 'Internship',
    title: 'Full-Stack Developer Intern',
    org: 'Heisyn Pvt. Ltd. · Remote',
    summary:
      'Shipping responsive production interfaces and scalable Node.js APIs across React UI, REST integrations and code reviews inside agile sprints.',
    tags: ['React', 'Node.js', 'REST', 'Agile'],
    link: 'https://github.com/rohitpal00015-prog'
  },
  {
    id: 'up-police',
    date: 'June 2026',
    category: 'opensource',
    type: 'Govt. Fellowship',
    title: 'UP Police Cyber Security Fellow — APCSIP-2026',
    org: 'Amroha Police Cyber Crime Cell, UP Police',
    summary:
      'Selected for an official 15-day government fellowship covering OSINT, digital forensics, cybercrime response, CDR analysis and field operations with police officers.',
    tags: ['Cyber Security', 'OSINT', 'Govt. of UP', 'Forensics'],
    link: '/fellowship'
  },
  {
    id: 'wikimedia',
    date: '2025 — Present',
    category: 'opensource',
    type: 'Open Source',
    title: 'Wikimedia & WikiClub Tech UIT — Code & Community',
    org: 'Wikimedia Foundation Ecosystem · Gerrit',
    summary:
      '20+ merged Gerrit patches across MediaWiki, Codex and Community tools. Co-organizer of Hacktoberfest Hack Day 1.0, 2.0 & 3.0 at UIT. Merged Wikitermbase PR #88 and ContentTranslation patch #1347603.',
    tags: ['20+ Merged Patches', 'Codex', 'MediaWiki', 'Gerrit', 'Commons'],
    link: '/wikimedia'
  },
  {
    id: 'gdg-vibe',
    date: '31 July 2026',
    category: 'hackathon',
    type: 'Winner (1st)',
    title: 'GDG Vibe-Coding Hackathon Winner',
    org: 'Google Developer Group Prayagraj',
    summary:
      'Built and shipped a working prototype under time pressure with the Google Student Ambassador cohort, earning the Certificate of Achievement.',
    tags: ['GDG', 'Hackathon Winner', 'Google Ambassador'],
    link: '/certificates'
  },
  {
    id: 'srm-builds',
    date: 'Verge 2026',
    category: 'hackathon',
    type: 'Finalist',
    title: 'SRM BUILDS 7.0 — National Finalist',
    org: 'SRM University, Sonipat',
    summary:
      'Reached the national finals of a 36-hour offline build sprint with a working product and a live judging round against teams from across India.',
    tags: ['Hackathon', 'Finalist', '36h Sprint'],
    link: '/hackathons'
  },
  {
    id: 'techsprint',
    date: '2025',
    category: 'hackathon',
    type: 'Top 10',
    title: 'TechSprint Hackathon — Top 10',
    org: 'GDG on Campus REC Ramgarh',
    summary:
      'Placed in the national top ten with an engineering-focused build, alongside a Codefront 2.0 merit award and a TechSprint NCU appreciation.',
    tags: ['Hackathon', 'Top 10', 'REC Ramgarh'],
    link: '/certificates'
  },
  {
    id: 'uhack',
    date: 'March 2025',
    category: 'hackathon',
    type: 'Finalist',
    title: 'UHack 4.0 — Top 65 Grand Finale',
    org: 'University Hackathon',
    summary:
      'Cleared multiple evaluation rounds to reach the grand finale, shipping a complete prototype with a small team.',
    tags: ['Hackathon', 'Top 65', 'Grand Finale'],
    link: '/hackathons'
  }
];

export const stackColumns = [
  {
    label: 'Frontend & Product',
    items: skills.fullStackWeb.slice(0, 11)
  },
  {
    label: 'Backend & Data',
    items: skills.backendAndDatabases.slice(0, 9)
  },
  {
    label: 'AI, Tools & Craft',
    items: skills.aiAndWebTools.slice(0, 10)
  }
];

export const securitySkills = skills.cybersecurityExposure || [];
