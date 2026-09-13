// ==========================================================================
// ROHIT PAL — MODERN MINIMAL PORTFOLIO INTERACTION LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Typewriter Effect
    initTypewriter();

    // 3. Header Scroll Effects & Active Link Tracking
    initHeaderScroll();

    // 4. Mobile Menu Toggle
    initMobileNav();

    // 5. Projects Filter Mechanism
    initProjectFilter();

    // 6. Theme Toggle (Dark / Light Mode)
    initThemeToggle();

    // 7. Standard Quality Scroll Reveal Animations
    initScrollAnimations();
});

// --------------------------------------------------------------------------
// Typewriter Engine
// --------------------------------------------------------------------------
function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;

    const roles = [
        "Full-Stack Web Developer",
        "Software Engineering Student",
        "AI Solutions Explorer",
        "B.Tech CSE Student @ UIT",
        "Open Source Contributor"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentWord = roles[roleIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2200; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 450; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 800);
}

// --------------------------------------------------------------------------
// Header Navigation & Scroll Tracking
// --------------------------------------------------------------------------
function initHeaderScroll() {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (!header) return;

        // Header background shrink
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active section link highlighting
        let currentId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// --------------------------------------------------------------------------
// Mobile Menu Navigation
// --------------------------------------------------------------------------
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            const isOpen = navMenu.classList.contains('open');
            icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    });

    // Close mobile nav when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    });
}

// --------------------------------------------------------------------------
// Projects Category Filtration
// --------------------------------------------------------------------------
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-chip-btn');
    const projectCards = document.querySelectorAll('.project-card-clean');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filterVal === 'all' || cat === filterVal) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==========================================================================
// TIMELINE MILESTONES DATA & MODAL LOGIC (Bottom-To-Top Growth Root)
// ==========================================================================
const timelineMilestonesData = {
    'uit-foundation': {
        title: 'B.Tech Computer Science & Engineering',
        category: 'Root Origin · Academic Foundation',
        period: '2024 — 2028 (Pre-Final Year)',
        org: 'United Institute of Technology (UIT), Prayagraj',
        body: `
            <p>The core foundation where Rohit's technical journey, programming passion, and hackathon exploration started.</p>
            <ul>
                <li><strong>Academic Discipline:</strong> Mastering Core Data Structures & Algorithms, Object-Oriented Programming, Database Systems, and Operating Systems.</li>
                <li><strong>Engineering Exploration:</strong> Building scalable full-stack web applications and collaborating on team prototypes.</li>
                <li><strong>Campus Leadership:</strong> Active in university tech clubs, mentoring juniors, and co-organizing the Smart India Hackathon internal rounds.</li>
            </ul>
        `,
        tags: ['Core CS', 'Algorithms', 'Prayagraj', 'Full-Stack'],
        link: null
    },
    'up-police': {
        title: 'Cyber Security Fellowship (APCSIP-2026)',
        category: 'Official State Government Fellowship',
        period: 'June 2026 · 15 Days Intensive',
        org: 'Amroha Police Cyber Crime Cell, UP Police',
        body: `
            <p>Selected via a competitive statewide examination (Intern ID: APCSIP/2026/794) for an official state law enforcement fellowship mentored by DSP Anjali Kataria Ma'am.</p>
            <ul>
                <li><strong>OSINT Reconnaissance:</strong> Digital footprint tracking and passive intelligence gathering using Maltego, Shodan, Google Dorks, and DeHashed.</li>
                <li><strong>CDR & IPDR Sorting:</strong> Analyzing call records, cellular tower logs, and telecommunication trail linkages for cybercrime investigations.</li>
                <li><strong>Digital Evidence Forensics:</strong> Bit-stream imaging, hash verification (MD5/SHA-256), Android APK reverse engineering, and court evidence documentation.</li>
                <li><strong>Valedictory Defense:</strong> Defended technical forensic case findings before senior review panel and awarded Official Fellowship Certificate.</li>
            </ul>
        `,
        tags: ['OSINT', 'Digital Forensics', 'UP Police', 'Malware Analysis', 'CDR/IPDR'],
        link: 'up-police-internship.html'
    },
    'techeraa': {
        title: 'Technical Associate',
        category: 'Community Engineering & Hackathon Infrastructure',
        period: 'Present · Active Engagement',
        org: 'TechEraa & UDTech India',
        body: `
            <p>Contributing as a Technical Associate building developer community platforms and national hackathon registration engines.</p>
            <ul>
                <li><strong>Platform Architecture:</strong> Developing responsive React.js UI interfaces and participant workflow management dashboards.</li>
                <li><strong>Hackathon Operations:</strong> Supporting problem statement dissemination, team registrations, and technical coordination for national competitions.</li>
                <li><strong>Peer Growth:</strong> Collaborating with student developers across universities to encourage open-source engagement.</li>
            </ul>
        `,
        tags: ['React UI', 'Hackathon Platform', 'Community', 'Frontend Architecture'],
        link: null
    },
    'cloud-junction': {
        title: 'Cloud Junction Campus Ambassador',
        category: 'National Leadership Selection',
        period: 'Present · Pan-India',
        org: 'Cloud Junction (Selected from 10,000+ Applicants)',
        body: `
            <p>Handpicked from a competitive national pool of over 10,000+ engineering student applicants across India.</p>
            <ul>
                <li><strong>Campus Initiatives:</strong> Leading tech workshops, sharing web dev roadmaps, and onboarding peers to modern cloud ecosystems.</li>
                <li><strong>Community Outreach:</strong> Connecting engineering students with national hackathon circuits, developer grants, and cloud learning resources.</li>
            </ul>
        `,
        tags: ['Campus Ambassador', '10k+ Selection', 'Cloud Computing', 'Leadership'],
        link: null
    },
    'wikimedia': {
        title: 'Wikimedia Open Source Contributor',
        category: 'Global Open Source Ecosystem',
        period: 'Present · Global Community',
        org: 'Wikimedia Foundation & MediaWiki Ecosystem',
        body: `
            <p>Active open-source contributor delivering code reviews, technical contributions, and design system engineering.</p>
            <ul>
                <li><strong>Wikimedia Codex:</strong> Contributing to Vue.js components and CSS design-system tokens for Wikipedia's official design system.</li>
                <li><strong>Gerrit & Git Pipelines:</strong> Managing commits, patchsets, automated testing gates, and strict branch protection protocols.</li>
                <li><strong>Phabricator Development:</strong> Resolving development tasks including T434524 and T434753, bug reproduction, and triage discussions.</li>
                <li><strong>Wiki Marathon Honor:</strong> Achieved Rank 6 in Road to Wiki Marathon and Rank 2 in live technical quiz on Open Source Day.</li>
            </ul>
        `,
        tags: ['Vue.js Codex', 'Gerrit Code Review', 'Phabricator', 'MediaWiki'],
        link: 'wikimedia-open-source.html'
    },
    'heisyn': {
        title: 'Full-Stack Developer Intern',
        category: 'Peak Canopy · Active Industry Role',
        period: 'Present · Active Professional Role',
        org: 'Heisyn Pvt. Ltd.',
        body: `
            <p>Working on enterprise web software engineering, high-performance UI components, and scalable backend RESTful endpoints.</p>
            <ul>
                <li><strong>Frontend Engineering:</strong> Crafting responsive, accessible user interfaces using React.js, modern CSS layout paradigms, and state management.</li>
                <li><strong>Backend Architecture:</strong> Designing modular Node.js & Express.js APIs with robust error handling and database integrations.</li>
                <li><strong>Code Quality:</strong> Following industry code review guidelines, agile sprint cycles, and clean code principles.</li>
            </ul>
        `,
        tags: ['React.js', 'Node.js', 'REST APIs', 'Production Web', 'JavaScript'],
        link: null
    }
};

function openTimelineDetail(id) {
    const data = timelineMilestonesData[id];
    if (!data) return;

    const modalOverlay = document.getElementById('timeline-modal-overlay');
    const titleEl = document.getElementById('timeline-modal-title');
    const catEl = document.getElementById('timeline-modal-category');
    const subEl = document.getElementById('timeline-modal-subtitle');
    const bodyEl = document.getElementById('timeline-modal-body');
    const tagsEl = document.getElementById('timeline-modal-tags');
    const linkBtn = document.getElementById('timeline-modal-link');

    if (titleEl) titleEl.innerText = data.title;
    if (catEl) catEl.innerText = data.category;
    if (subEl) subEl.innerHTML = `<i data-lucide="briefcase"></i> ${data.org} · <span style="color: var(--blue-primary); font-weight: 600;">${data.period}</span>`;
    if (bodyEl) bodyEl.innerHTML = data.body;

    if (tagsEl) {
        tagsEl.innerHTML = data.tags.map(t => `<span class="micro-tag">${t}</span>`).join('');
    }

    if (linkBtn) {
        if (data.link) {
            linkBtn.href = data.link;
            linkBtn.style.display = 'inline-flex';
        } else {
            linkBtn.style.display = 'none';
        }
    }

    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeTimelineModal() {
    const modalOverlay = document.getElementById('timeline-modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Global modal triggers
window.openTimelineDetail = openTimelineDetail;
window.closeTimelineModal = closeTimelineModal;

// ==========================================================================
// CERTIFICATE LIGHTBOX ENGINE
// ==========================================================================
const certificatesData = [
    { img: 'assets/images/certificates/1.png', title: 'SRM BUILDS 7.0 (Offline Round)', issuer: 'SRM University, Sonepat (Delhi-NCR)', category: 'National Hackathon · Finalist' },
    { img: 'assets/images/certificates/3.png', title: 'Codefront 2.0 Participation', issuer: 'GDG on Campus J.K. Institute', category: 'Google Developer Groups' },
    { img: 'assets/images/certificates/2.png', title: 'TechSprint Hackathon 2025', issuer: 'GDG on Campus REC Ramgarh', category: 'Google Developer Groups · Top 10' },
    { img: 'assets/images/certificates/4.png', title: 'Codefront 2.0 Top 10 Merit', issuer: 'GDG on Campus J.K. Institute', category: 'Merit Distinction Award' },
    { img: 'assets/images/certificates/5.png', title: 'Google Student Ambassador Pitch Night', issuer: 'Google Student Ambassador Program', category: 'Leadership / Startup Pitch' },
    { img: 'assets/images/certificates/6.png', title: 'TechSprint NCU Appreciation', issuer: 'GDG on Campus NCU (Gautam Kumar)', category: 'Google Developer Groups' },
    { img: 'assets/images/certificates/7.png', title: 'SRM BUILDS 7.0 of Verge 2026', issuer: 'SRM University, Sonepat', category: 'National Fest Hackathon' },
    { img: 'assets/images/certificates/8.png', title: 'GDG Vibe-Coding Hackathon 2026', issuer: 'Google Developer Group Prayagraj · Univ of Allahabad', category: 'Certificate of Achievement' }
];

let activeCertIdx = 0;

function openCertificateLightbox(index) {
    activeCertIdx = index;
    updateCertLightbox();

    const lightbox = document.getElementById('cert-lightbox-modal');
    if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertificateLightbox() {
    const lightbox = document.getElementById('cert-lightbox-modal');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function nextCertificate() {
    activeCertIdx = (activeCertIdx + 1) % certificatesData.length;
    updateCertLightbox();
}

function prevCertificate() {
    activeCertIdx = (activeCertIdx - 1 + certificatesData.length) % certificatesData.length;
    updateCertLightbox();
}

function updateCertLightbox() {
    const data = certificatesData[activeCertIdx];
    if (!data) return;

    const img = document.getElementById('lightbox-cert-img');
    const title = document.getElementById('lightbox-cert-title');
    const issuer = document.getElementById('lightbox-cert-issuer');
    const counter = document.getElementById('lightbox-cert-counter');

    if (img) img.src = data.img;
    if (title) title.innerText = data.title;
    if (issuer) issuer.innerText = `${data.category} · ${data.issuer}`;
    if (counter) counter.innerText = `${activeCertIdx + 1} of ${certificatesData.length}`;
}

window.openCertificateLightbox = openCertificateLightbox;
window.closeCertificateLightbox = closeCertificateLightbox;
window.nextCertificate = nextCertificate;
window.prevCertificate = prevCertificate;

// ==========================================================================
// HACKATHON & EVENT DETAILS MODAL
// ==========================================================================
const eventModalData = {
    'sih-internal': {
        title: 'Smart India Hackathon (SIH 2024) Internal Round',
        category: 'Core Organizing Team · Leadership & Operations',
        location: 'UIT Campus, Prayagraj',
        body: `
            <p>Contributed to end-to-end planning, coordination, and execution of the Smart India Hackathon Internal Round at United Institute of Technology.</p>
            <ul>
                <li><strong>Venue & Infrastructure:</strong> Coordinated high-speed networking, power backup, problem statement distribution, and presentation rigs.</li>
                <li><strong>Team Flow:</strong> Managed student registration desks, continuous squad assistance, and on-ground logistics.</li>
                <li><strong>Jury Operations:</strong> Assisted faculty coordinators and evaluators in managing scoring pipelines smoothly.</li>
            </ul>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span class="micro-tag">Event Operations</span>
                <span class="micro-tag">SIH 2024</span>
                <span class="micro-tag">Leadership</span>
            </div>
        `
    },
    'wiki-opensource-day': {
        title: 'Open Source Day – WikiClubTech UIT',
        category: 'Double Winner 🏆🥈 · Open Source Day',
        location: 'WikiClubTech UIT Campus · 21 August',
        body: `
            <p>Celebrated a landmark milestone on Open Source Day with two major honors:</p>
            <ul>
                <li>🏆 <strong>Rank 6 in Open Source Marathon:</strong> Competed in the 1-week marathon and won official Wikimedia goodies and swag.</li>
                <li>🥈 <strong>Rank 2 in Live Technical Quiz:</strong> Ranked 2nd in the competitive on-spot Open Source Day technical challenge.</li>
                <li><strong>Ecosystem Learnings:</strong> Explored Wikimedia Foundation, MediaWiki, Phabricator, Gerrit, GitLab, Wikimedia Commons, and Wikibooks.</li>
            </ul>
        `
    },
    'gdg-vibe-coding': {
        title: 'GDG Prayagraj Vibe Coding Hackathon 2026',
        category: 'Certificate of Achievement · Agentic AI',
        location: 'Institute of Professional Studies, University of Allahabad',
        body: `
            <p>Awarded <strong>Certificate of Achievement</strong> for building an Agentic AI Browser Extension in an intense 2-hour sprint with teammate Praveen Singh.</p>
            <ul>
                <li><strong>Autonomous AI Agent:</strong> Built an extension that processes natural language voice/text commands and executes DOM actions autonomously.</li>
                <li><strong>2-Hour Execution:</strong> Implemented ~50% of the working product prototype within strict hackathon constraints.</li>
                <li><strong>Jury Defense:</strong> Evaluated by Shivansh Singh Sir, Atul Singh Sir, and University of Allahabad faculty.</li>
            </ul>
        `
    },
    'srm-builds': {
        title: 'SRM BUILDS 7.0 (36-Hour National Offline Hackathon)',
        category: 'National Finalist · Team Leader',
        location: 'SRM University Sonipat, Haryana',
        body: `
            <p>Led a 4-member squad in a 36-hour non-stop national offline hackathon during the VERGE 2026 tech fest.</p>
            <ul>
                <li>Built a complete prototype from scratch with only 2–3 hours of sleep over 36 continuous hours.</li>
                <li>Defended project across 6 intense evaluation rounds with 3 different evaluator panels, including a 1:00 AM midnight round.</li>
            </ul>
        `
    },
    'techsprint-top10': {
        title: 'TechSprint Hackathon — Top 10 National Finish',
        category: 'Top 10 Finalist Team',
        location: 'TechSprint National Hackathon',
        body: `
            <p>Secured Top 10 national ranking among nationwide competing teams.</p>
            <ul>
                <li>Architected and pitched a full-featured web solution prototype under aggressive sprint deadlines.</li>
                <li>Successfully defended system architecture, database schema, and live workflow to jury panels.</li>
            </ul>
        `
    }
};

function openEventModal(eventId) {
    const data = eventModalData[eventId];
    if (!data) return;

    const overlay = document.getElementById('event-modal-overlay') || document.getElementById('event-modal');
    const titleEl = document.getElementById('event-modal-title') || document.getElementById('modal-title');
    const catEl = document.getElementById('event-modal-category') || document.getElementById('modal-category');
    const locEl = document.getElementById('event-modal-loc') || document.getElementById('modal-location');
    const bodyEl = document.getElementById('event-modal-body') || document.getElementById('modal-body');

    if (titleEl) titleEl.innerText = data.title;
    if (catEl) catEl.innerText = data.category;
    if (locEl) locEl.innerHTML = `<i data-lucide="map-pin"></i> ${data.location}`;
    if (bodyEl) bodyEl.innerHTML = data.body;

    if (overlay) {
        overlay.classList.add('active');
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeEventModal() {
    const overlay = document.getElementById('event-modal-overlay') || document.getElementById('event-modal');
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = '';
        document.body.style.overflow = '';
    }
}

window.openEventModal = openEventModal;
window.closeEventModal = closeEventModal;

// Keyboard Escape listener
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTimelineModal();
        closeCertificateLightbox();
        closeEventModal();
    }
});

// ==========================================================================
// THEME TOGGLE ENGINE (Dark / Light with LocalStorage Persistence)
// ==========================================================================
function initThemeToggle() {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    if (!toggleBtns.length) return;

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', nextTheme);
            try {
                localStorage.setItem('portfolio-theme', nextTheme);
            } catch (err) {
                console.warn('LocalStorage not available for theme saving', err);
            }

            // Haptic-like micro-animation
            btn.classList.add('theme-toggle-active');
            setTimeout(() => {
                btn.classList.remove('theme-toggle-active');
            }, 500);

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
}

// ==========================================================================
// STANDARD HIGH-QUALITY SCROLL REVEAL ANIMATIONS
// Hardware-accelerated, subtle, non-distracting staggered entrance
// ==========================================================================
function initScrollAnimations() {
    const animTargets = document.querySelectorAll(
        '.project-card-clean, .milestone-card-full, .cert-card-full, .police-stat-card, ' +
        '.police-domain-card, .police-quote-card, .pipeline-card, .officer-card, ' +
        '.wiki-stat-card, .wiki-pillar-card, .wiki-task-card, .wiki-tool-card, ' +
        '.timeline-node-card, .stat-cyber-card, .about-highlight-card, .contact-card'
    );

    if (!animTargets.length) return;

    // Staggered delay within each parent grid / container
    const parentCounts = new Map();
    animTargets.forEach(el => {
        const parent = el.parentElement || document.body;
        const count = parentCounts.get(parent) || 0;
        parentCounts.set(parent, count + 1);

        el.classList.add('reveal-init');
        const delayIdx = (count % 4) + 1;
        el.classList.add(`delay-${delayIdx}`);
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        animTargets.forEach(el => observer.observe(el));
    } else {
        animTargets.forEach(el => el.classList.add('reveal-visible'));
    }
}
