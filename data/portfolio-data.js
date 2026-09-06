// ==========================================================
// MASTER PORTFOLIO DATA REPOSITORY - ROHIT PAL
// Single Source of Truth for Design & Development
// ==========================================================

const PORTFOLIO_DATA = {
  profile: {
    name: "Rohit Pal",
    title: "Full-Stack Web Developer & Software Engineering Student",
    subtitle: "Pre-final year B.Tech CSE Student @ United Institute of Technology, Prayagraj",
    typewriterRoles: [
      "Full-Stack Web Developer",
      "Software Engineering Student",
      "AI Solutions Explorer",
      "B.Tech CSE Student @ UIT",
      "Open Source Contributor"
    ],
    aboutShort: "Pre-final year Computer Science student at United Institute of Technology with a strong interest in full-stack web development. I enjoy designing and developing web applications using modern technologies while learning through real projects, team collaborations, and hackathons. My goal is to build software that is reliable, secure, scalable, and easy to use.",
    aboutLong: "I am a Pre-final year Computer Science student at United Institute of Technology with a strong focus on full-stack web engineering. Beyond academics, I am actively involved in developer communities like TechEraa, UDTech India, and Cloud Junction. I am also a Wikimedia Open Source Contributor working with Vue.js design systems (Codex), Gerrit, and Phabricator, and have completed an official state law enforcement Cyber Security Fellowship with Amroha Police Cyber Crime Cell (UP Police).",
    location: "Prayagraj, Uttar Pradesh, India",
    email: "rohitpal00015@gmail.com",
    status: "Available for Web Dev Roles",
    socials: {
      github: "https://github.com/rohitpal00015-prog",
      linkedin: "https://linkedin.com/in/rohit-pal-98230131a",
      instagram: "https://www.instagram.com/rohitpal08_/",
      twitter: "https://twitter.com/rohitpal00015"
    },
    avatar: "assets/images/profile/rohit.png",
    resume: "assets/docs/Rohit_Pal_Resume.pdf"
  },
  education: {
    institution: "United Institute of Technology (UIT)",
    location: "Prayagraj, Uttar Pradesh, India",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering (CSE)",
    period: "2024 - 2028",
    status: "Pre-Final Year"
  },
  keyMetrics: {
    projectsCount: "15+",
    hackathonsFinalist: "3x",
    verifiedCredentials: "8+",
    ambassadorPool: "10,000+",
    openSourceMarathonRank: "Rank 6",
    policeFellowshipDays: "15 Days",
    officersAndExpertsMet: "45+"
  },
  focusAreas: [
    {
      id: "01",
      title: "Full-Stack Web Applications",
      description: "Building clean, responsive, and high-performance web applications with modern frontend & backend architectures.",
      tags: ["React.js", "Node.js", "JavaScript / TS"]
    },
    {
      id: "02",
      title: "REST APIs & Database Architecture",
      description: "Designing resilient, scalable backend schemas, endpoints, and authentication workflows with MongoDB, Express, and MySQL.",
      tags: ["Express.js", "MongoDB", "MySQL"]
    },
    {
      id: "03",
      title: "AI Integrations & Web Automation",
      description: "Integrating intelligent LLM API endpoints and building custom workflow automation assistants (like Zynoq AI).",
      tags: ["Gemini API", "AI Workflows", "Prompt Eng"]
    },
    {
      id: "04",
      title: "Open Source & Code Reviews",
      description: "Actively contributing to global open-source ecosystems, managing patchsets on Gerrit, and solving Phabricator tasks.",
      tags: ["Gerrit Review", "Phabricator", "Git Pipelines"]
    }
  ],
  skills: {
    fullStackWeb: [
      "React.js",
      "JavaScript (ES6+)",
      "Node.js",
      "Express.js",
      "MongoDB & Mongoose",
      "MySQL",
      "HTML5 & Semantic Web",
      "CSS3 / Flexbox & Grid",
      "RESTful API Design",
      "Firebase BaaS & Auth",
      "Responsive UI/UX Design",
      "Single Page Applications (SPA)",
      "Vue.js (Wikimedia Codex)"
    ],
    programmingLanguages: [
      "JavaScript",
      "Python",
      "Java",
      "C Language"
    ],
    aiAndWebTools: [
      "Gemini API",
      "Zynoq AI Assistant",
      "Postman API Testing",
      "Git & GitHub",
      "Gerrit Code Review",
      "Phabricator",
      "Vercel",
      "Netlify"
    ],
    cybersecurityExposure: [
      "OSINT & Digital Footprints",
      "Web Security Basics",
      "Mobile Safety & APK Analysis",
      "Digital Hygiene & Ethics",
      "CDR & IPDR Analysis",
      "Sandboxed Malware Auditing",
      "Digital Evidence Preservation",
      "IT Act 2000 & DPDP Act 2023"
    ]
  },
  experience: [
    {
      id: "heisyn",
      role: "Full-Stack Developer Intern",
      company: "Heisyn Pvt. Ltd.",
      period: "Present",
      status: "Active Role",
      description: "Developing responsive frontend interfaces & scalable Node.js APIs with clean, production-ready JavaScript code.",
      techChips: ["React.js", "Node.js", "REST APIs"]
    },
    {
      id: "wikimedia",
      role: "Wikimedia Open Source Contributor",
      company: "Wikimedia Ecosystem",
      period: "Present",
      status: "Global Open Source",
      description: "Delivering code reviews, technical contributions, and localization improvements using Gerrit & Phabricator across Wikimedia Codex (Vue.js) and MediaWiki.",
      techChips: ["Gerrit", "Phabricator", "TranslateWiki", "Vue.js", "Codex"]
    },
    {
      id: "cloud-junction",
      role: "Cloud Junction Campus Ambassador",
      company: "Cloud Junction",
      period: "Present",
      status: "Selected (10k+ Applicants)",
      description: "Leading student developer initiatives, technical workshops, and cloud networking across campus networks. Selected from over 10,000+ applicants.",
      techChips: ["Tech Ambassador", "Community Growth", "Cloud Ecosystems"]
    },
    {
      id: "techeraa",
      role: "Technical Associate",
      company: "TechEraa & UDTech India",
      period: "Present",
      status: "Hackathon Builder",
      description: "Building frontend UI platforms for national hackathons and collaborating on developer community initiatives and participant management systems.",
      techChips: ["Hackathon Platform", "React UI", "Community Building"]
    },
    {
      id: "up-police-apcsip",
      role: "Cyber Security Intern / Fellow",
      company: "Uttar Pradesh Police (APCSIP-2026)",
      period: "Completed (June 2026)",
      status: "UP Police Fellowship",
      description: "15-day official government Cyber Security Fellowship with Amroha Police Cyber Crime Cell under DSP Anjali Kataria Ma'am. Trained in OSINT investigations, mobile security concepts, digital forensics, CDR analysis, and cyber laws.",
      techChips: ["OSINT", "Digital Forensics", "Malware Analysis", "CDR/IPDR"]
    },
    {
      id: "uit-academic",
      role: "B.Tech Computer Science & Engineering",
      company: "United Institute of Technology",
      period: "2024 - 2028",
      status: "Pre-Final Year",
      description: "Strengthening core CS fundamentals, algorithms, and practical full-stack web software engineering while actively organizing and competing in national hackathons.",
      techChips: ["Core CS", "Algorithms", "Full Stack", "Software Architecture"]
    }
  ],
  projects: [
    {
      id: "palbasket",
      title: "PalGrocery (PalBasket)",
      category: "fullstack",
      badge: "Grocery Platform",
      image: "assets/images/projects/Palbasket logo.png",
      techStack: ["HTML5/CSS3", "JavaScript", "PHP/MySQL"],
      description: "An online grocery ordering platform featuring product catalog management, smart shopping cart, customer checkout, user authentication, and an admin management dashboard.",
      github: "https://github.com/rohitpal00015-prog/PalGrocery",
      demo: "https://palbasket.vercel.app/"
    },
    {
      id: "prayagraj-rooms",
      title: "Prayagraj Rooms",
      category: "fullstack",
      badge: "Live Project",
      image: "assets/images/projects/prayagrajrooms_logo.png",
      techStack: ["HTML5/CSS3", "JavaScript", "MongoDB/MySQL"],
      description: "A web platform designed to simplify accommodation discovery for students and working professionals in Prayagraj with room browsing, custom filters, and database management.",
      github: "https://github.com/rohitpal00015-prog/prayagraj-rooms",
      demo: "https://prayagrajrooms.in/"
    },
    {
      id: "zynoq",
      title: "Zynoq AI Assistant",
      category: "python-ai",
      badge: "AI Assistant",
      image: "assets/images/projects/ok.png",
      techStack: ["Python", "AI APIs", "Workflow Automation"],
      description: "An AI-powered assistant developed to experiment with API integrations, intelligent responses, and practical workflow automation within web applications.",
      github: "https://github.com/rohitpal00015-prog",
      demo: "https://znoq.netlify.app/"
    },
    {
      id: "campuslink",
      title: "CampusLink",
      category: "fullstack",
      badge: "GDG MoByte",
      image: null,
      techStack: ["JavaScript", "React/Web", "Full-Stack"],
      description: "Developed during GDG Prayagraj MoByte to preserve college memories, showcase student projects, and strengthen alumni engagement through a centralized digital platform.",
      github: "https://github.com/rohitpal00015-prog/CampusLink",
      demo: null
    },
    {
      id: "techeraa",
      title: "TechEraa Hackathon Platform",
      category: "community-tools",
      badge: "TechEraa Platform",
      image: null,
      techStack: ["React.js", "Node.js", "Express"],
      description: "A web platform developed for managing registrations, event information, problem statements, and participant workflows for a national-level hackathon.",
      github: "https://github.com/rohitpal00015-prog/tech-era",
      demo: null
    },
    {
      id: "agriverse",
      title: "AgriVerse",
      category: "fullstack",
      badge: "Coming Soon",
      image: "assets/images/projects/logo.png",
      techStack: ["Node.js", "JavaScript", "Firebase"],
      description: "A concept-driven platform supporting farmers by delivering agricultural information, market prices, government schemes, and digital services in a single interface.",
      github: "https://github.com/rohitpal00015-prog",
      demo: null
    },
    {
      id: "agentic-browser-extension",
      title: "Agentic AI Browser Extension",
      category: "python-ai",
      badge: "GDG Hackathon Award",
      image: null,
      techStack: ["Agentic AI", "JavaScript", "DOM Automation", "LLM APIs"],
      description: "An autonomous Agentic AI browser extension built in a high-pressure 2-hour sprint at GDG Prayagraj Vibe Coding Hackathon. Understands natural language voice/text prompts and executes browser actions autonomously.",
      github: "https://github.com/rohitpal00015-prog",
      demo: null
    },
    {
      id: "apcsip-portal",
      title: "UP Police Cyber Security Fellowship (APCSIP-2026)",
      category: "cybersecurity",
      badge: "UP Police Cyber Cell",
      image: "assets/images/up-police/logos/APCSIP -2026.jpg",
      techStack: ["Cyber Forensics", "OSINT & CDR", "Malware Analysis"],
      description: "Official 15-day state law enforcement fellowship report covering OSINT investigations, mobile digital forensics, CDR sorting, and cyber laws under DSP Anjali Kataria Ma'am.",
      github: null,
      demo: "up-police-internship.html"
    }
  ],
  certificates: [
    { id: 1, title: "SRM BUILDS 7.0 (Offline Round)", issuer: "SRM University, Sonepat (Delhi-NCR)", category: "National Hackathon", date: "Verge 2026", image: "assets/images/certificates/1.png" },
    { id: 2, title: "Codefront 2.0 Participation", issuer: "GDG on Campus J.K. Institute of Applied Physics", category: "Google Developer Groups", date: "2025", image: "assets/images/certificates/3.png" },
    { id: 3, title: "TechSprint Hackathon 2025", issuer: "GDG on Campus REC Ramgarh", category: "Google Developer Groups", date: "National 2025", image: "assets/images/certificates/2.png" },
    { id: 4, title: "Codefront 2.0 Top 10 Merit", issuer: "GDG on Campus J.K. Institute of Applied Physics", category: "Merit Award", date: "2025", image: "assets/images/certificates/4.png" },
    { id: 5, title: "Google Student Ambassador Pitch Night Recognition", issuer: "Google Student Ambassador Program", category: "Leadership / Pitch", date: "2025", image: "assets/images/certificates/5.png" },
    { id: 6, title: "TechSprint NCU Appreciation", issuer: "GDG on Campus NCU (Gautam Kumar)", category: "Google Developer Groups", date: "2025", image: "assets/images/certificates/6.png" },
    { id: 7, title: "SRM BUILDS 7.0 of Verge 2026", issuer: "SRM University, Sonepat", category: "National Hackathon", date: "2026", image: "assets/images/certificates/7.png" },
    { id: 8, title: "GDG Vibe-Coding Hackathon 2026", issuer: "Google Developer Group Prayagraj · University of Allahabad", category: "Google Developer Groups · Hackathon", date: "31 July 2026", image: "assets/images/certificates/8.png" }
  ]
};

// Node.js & Browser compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
