import raw from '../data/portfolio-data.json';

export const profile = raw.profile;
export const metrics = raw.keyMetrics;
export const focusAreas = raw.focusAreas;
export const experience = raw.experience;
export const projects = raw.projects;
export const certificates = raw.certificates;
export const milestones = raw.hackathonsAndMilestones;
export const skills = raw.skills;

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
  { id: 'work', label: 'Work', index: '02' },
  { id: 'about', label: 'About', index: '01' },
  { id: 'timeline', label: 'Trajectory', index: '03' },
  { id: 'stack', label: 'Stack', index: '04' },
  { id: 'credentials', label: 'Proof', index: '05' }
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
    tone: 'amber',
    title: '600+ Students',
    kicker: 'Community & Events',
    description: 'Gemini Builder event with GSA UIT.',
    href: '/hackathons-leadership.html'
  },
  {
    tone: 'blue',
    title: 'Samsung Fellowship',
    kicker: 'ISWDP Cohort 9',
    description: 'Selected for Samsung Fellowship.',
    href: '/resume.html'
  },
  {
    tone: 'green',
    title: 'SIH Core Organizer',
    kicker: 'Smart India Hackathon',
    description: 'Hackathon operations & tech setup.',
    href: '/hackathons-leadership.html'
  },
  {
    tone: 'amber',
    title: 'Vindhya Millets',
    kicker: 'Digital Media Exec',
    description: 'Web & ops · Indian Army supplier.',
    href: 'https://lnkd.in/p/gvAK4ghJ',
    external: true
  },
  {
    tone: 'blue',
    title: 'Rohit Pal — Software Developer and Open Source Contributor',
    kicker: 'Marketing Lead',
    description: 'prayagrajrooms.in',
    href: 'https://prayagrajrooms.in',
    external: true
  },
  {
    tone: 'amber',
    title: 'APCSIP-2026',
    kicker: 'UP Police Fellow',
    description: 'Read the fellowship case study',
    href: '/up-police-internship.html'
  },
  {
    tone: 'green',
    title: 'Wikimedia',
    kicker: 'Gerrit Contributor',
    description: 'Explore the open-source contributions',
    href: '/wikimedia-open-source.html'
  }
];

export const belief = {
  hindi: 'ज्ञान वह दीपक है जो जितने लोगों में बाँटा जाए, उतना ही अधिक प्रकाश फैलाता है।',
  english:
    'Knowledge is a lamp that illuminates wider horizons the more it is shared with the world.',
  caption: 'The idea behind my Wikimedia work'
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
  { label: 'Meta-Wiki profile', href: profile.socials.meta },
  { label: 'Gerrit dashboard', href: profile.socials.gerrit },
  { label: 'Phabricator', href: profile.socials.phabricator },
  { label: 'Commons uploads', href: profile.socials.commons }
];

export const timeline = [
  {
    id: 'shilpsetu-sih',
    date: 'Nov 2026 — Present',
    title: 'ShilpSetu — SIH 2026 & SPARK 2 SCALE',
    org: 'Team CyberEye · United Institute of Technology',
    summary:
      'Leading a voice-first, offline-first artisan marketplace across two national problem statements, built with Flutter, FastAPI, Gemini 2.5 and Groq.',
    tags: ['SIH 2026', 'Flutter', 'FastAPI', 'Gemini 2.5'],
    link: 'https://github.com/rohitpal00015-prog/shilpsetu',
    type: 'Build'
  },
  {
    id: 'vindhya',
    date: 'Sept 2026 — Present',
    title: 'Digital & Brand Executive — Vindhya Millets',
    org: 'Citiblock Farmer Producer Company',
    summary:
      'Directing brand, web and content for a millet brand now supplied to the Indian Army. Built the official site and campaign roadmap from scratch.',
    tags: ['Brand', 'Web', 'Content'],
    link: 'https://lnkd.in/p/gvAK4ghJ',
    type: 'Role'
  },
  {
    id: 'gdg-vibe',
    date: '31 July 2026',
    title: 'GDG Vibe-Coding Hackathon Winner',
    org: 'Google Developer Group Prayagraj',
    summary:
      'Built and shipped a working prototype under time pressure with the Google Student Ambassador cohort, earning the Certificate of Achievement.',
    tags: ['GDG', 'Hackathon', 'Certificate'],
    link: '/certificates.html',
    type: 'Award'
  },
  {
    id: 'heisyn',
    date: 'June 2026 — Present',
    title: 'Full-Stack Developer Intern',
    org: 'Heisyn Pvt. Ltd. · Remote',
    summary:
      'Shipping responsive production interfaces and scalable Node.js APIs across React UI, REST integrations and code reviews inside agile sprints.',
    tags: ['React', 'Node.js', 'REST'],
    link: 'https://github.com/rohitpal00015-prog',
    type: 'Role'
  },
  {
    id: 'up-police',
    date: 'June 2026',
    title: 'UP Police Cyber Security Fellow — APCSIP',
    org: 'Amroha Police Cyber Crime Cell, UP Police',
    summary:
      'Selected for a 15-day official government fellowship covering OSINT, digital forensics, cybercrime response and field operations with UP Police officers.',
    tags: ['Cyber Security', 'OSINT', 'Govt. of UP'],
    link: '/up-police-internship.html',
    type: 'Fellowship'
  },
  {
    id: 'srm-builds',
    date: 'Verge 2026',
    title: 'SRM BUILDS 7.0 — National Finalist',
    org: 'SRM University, Sonipat',
    summary:
      'Reached the national finals of a 36-hour offline build sprint with a working product and a live judging round against teams from across India.',
    tags: ['Hackathon', 'Finalist', '36h'],
    link: '/hackathons-leadership.html',
    type: 'Award'
  },
  {
    id: 'wikimedia',
    date: '2025 — Present',
    title: 'Wikimedia — Code, Commons & Community',
    org: 'Wikimedia Foundation ecosystem',
    summary:
      'Contributing across MediaWiki, Codex and community tools with accessibility at the centre — merged Wikitermbase PR #88 and ContentTranslation patch #1347603, alongside Commons photography and Hindi Wikipedia participation.',
    tags: ['Codex', 'A11y', 'Commons', 'Hindi Wikipedia'],
    link: '/wikimedia-open-source.html',
    type: 'Open Source'
  },
  {
    id: 'techsprint',
    date: '2025',
    title: 'TechSprint Hackathon — Top 10',
    org: 'GDG on Campus REC Ramgarh',
    summary:
      'Placed in the national top ten with an engineering-focused build, alongside a Codefront 2.0 merit award and a TechSprint NCU appreciation.',
    tags: ['Hackathon', 'Top 10'],
    link: '/certificates.html',
    type: 'Award'
  },
  {
    id: 'uhack',
    date: 'March 2025',
    title: 'UHack 4.0 — Top 65 Grand Finale',
    org: 'University Hackathon',
    summary:
      'Cleared multiple evaluation rounds to reach the grand finale, shipping a complete prototype with a small team.',
    tags: ['Hackathon', 'Top 65'],
    link: '/hackathons-leadership.html',
    type: 'Award'
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
