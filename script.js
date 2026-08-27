// ==========================================
// Portfolio Logic & Interaction Scripts - Rohit Pal
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons & Particle Matrix Canvas
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initHeroParticleCanvas();
    initCardGlowTracker();

    // 2. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Full-Stack Web Developer",
        "Software Engineering Student",
        "AI Solutions Explorer",
        "B.Tech CSE Student @ UIT",
        "Open Source Contributor"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle transitions
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of the word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typewriterElement) {
        setTimeout(type, 1000);
    }

    // 3. Header Styling & Shrinking on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            
            // Toggle menu icon state (menu / X)
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                const isOpened = navMenu.classList.contains('open');
                icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons({
                        attrs: {
                            id: 'mobile-toggle-icon'
                        },
                        nameAttr: 'data-lucide'
                    });
                }
            }
        });

        // Close menu when clicking navigation links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            });
        });
    }

    // 5. Active Section Navigation Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 6. Project Filtration Mechanism
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status from sibling buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 7. High-Performance Standard Scroll Reveal (Instant & Butter-Smooth)
    const revealElements = document.querySelectorAll(
        '.glass-card, .section-header, .vercel-card, .skill-dash-card, .achievement-card, .project-card, .timeline-journey-item, .collab-action-card, .certificate-card, .program-card'
    );
    
    // Natural visibility by default for zero scroll lag
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.05,
            rootMargin: '0px 0px 50px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal-init');
            revealObserver.observe(el);
        });
    }

    // 8. Optimized Magnetic Card Hover (RequestAnimationFrame Throttled)
    const tiltCards = document.querySelectorAll('.vercel-card, .skill-dash-card, .project-card, .achievement-card, .collab-action-card, .program-card');
    let ticking = false;

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -2.5;
                    const rotateY = ((x - centerX) / centerX) * 2.5;
                    
                    card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // 9. Theme Toggle Handler
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
});

// 13. Event Details Modal Data & Handlers
const eventDetailsData = {
    'wiki-opensource-day': {
        title: '🏆 Open Source Day – WikiClubTech UIT',
        category: 'Open Source Double Achievement · Rank 6 Marathon & Rank 2 Quiz',
        location: 'WikiClubTech UIT Campus · 21 August',
        body: `
            <p class="modal-lead">Celebrated a major milestone in the open-source journey on Open Source Day with two distinguished achievements:</p>
            
            <div class="modal-section-block">
                <h4><i data-lucide="award"></i> Dual Open Source Honors</h4>
                <ul>
                    <li>🏆 <strong>Rank 6 in Open Source Marathon:</strong> Competed in the 1-week marathon leading up to Open Source Day, securing 6th Rank and receiving official Wikimedia goodies and swag from Reeti Singh Ma’am and WikiClubTech UIT.</li>
                    <li>🥈 <strong>Rank 2 in Live Technical Quiz:</strong> Secured 2nd Rank in the competitive on-spot Open Source Day technical quiz challenge.</li>
                </ul>
            </div>

            <div class="modal-section-block">
                <h4><i data-lucide="globe"></i> Wikimedia Ecosystem Learnings</h4>
                <p>Explored architecture, contribution channels, and review workflows for Wikimedia Foundation, MediaWiki, Phabricator, GitLab, Wikimedia Commons, and Wikibooks.</p>
            </div>

            <div class="modal-section-block">
                <h4><i data-lucide="heart"></i> Mentorship & Community</h4>
                <p>Heartfelt gratitude to <strong>Gautam Kumar Maurya (GKM)</strong>, <strong>Reeti Singh Ma'am</strong>, and <strong>Ankit Kumar Verma Sir</strong> for constant encouragement and workflow guidance.</p>
            </div>

            <div class="modal-actions" style="margin-top: 1.5rem;">
                <a href="https://www.linkedin.com/posts/rohit-pal-98230131a_opensource-wikimedia-wikiclubtech-activity-7496991574824820737-8hC3" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
                    <i class="fa-brands fa-linkedin"></i>
                    <span>Read Full Post on LinkedIn</span>
                </a>
            </div>
        `
    },
    'gdg-vibe-coding': {
        title: '🏆 GDG Prayagraj Vibe Coding Hackathon 2026',
        category: 'Agentic AI Project · Certificate of Achievement',
        location: 'Institute of Professional Studies, University of Allahabad · 31 July 2026',
        body: `
            <p class="modal-lead">Awarded <strong>Certificate of Achievement</strong> for exceptional performance, creativity, and dedication in the GDG Vibe-Coding Hackathon 2026 organized by Google Developer Group Prayagraj.</p>
            
            <div class="modal-section-block">
                <h4><i data-lucide="bot"></i> The Project: Agentic AI Browser Extension</h4>
                <ul>
                    <li><strong>Concept & Discovery:</strong> Walked in without a predefined idea and under pressure, decided to build an <strong>Agentic AI Browser Extension</strong> that understands natural language voice/text commands and performs browser actions autonomously.</li>
                    <li><strong>2-Hour Sprint Execution:</strong> Despite a tight 2-hour build window, implemented ~50% of the full product vision to demonstrate autonomous agent execution and browser DOM manipulation.</li>
                </ul>
            </div>

            <div class="modal-section-block">
                <h4><i data-lucide="users"></i> Team & Guidance</h4>
                <ul>
                    <li><strong>Teammate:</strong> Praveen Singh — for being an amazing co-developer throughout the intense build sprint.</li>
                    <li><strong>Ideation & Guidance:</strong> Gautam Kumar Maurya (GKM) — for continuously guiding the project ideation process.</li>
                </ul>
            </div>

            <div class="modal-section-block">
                <h4><i data-lucide="sparkles"></i> Evaluation Panel & Organizers</h4>
                <ul>
                    <li><strong>Jury Panel:</strong> Shivansh Singh Sir, Atul Singh Sir, and the faculty panel from the University of Allahabad for in-depth project evaluation and feedback.</li>
                    <li><strong>Special Mention:</strong> Ankit Kumar Verma Sir (GDG Prayagraj Organizer), Sanskar Dubey Sir, and the entire GDG Prayagraj organizing team for an inspiring event.</li>
                </ul>
            </div>

            <div class="modal-section-block">
                <h4><i data-lucide="quote"></i> Key Takeaway</h4>
                <p><em>"A great product isn't enough — you must communicate its vision just as effectively. Building under pressure taught me true engineering agility."</em></p>
            </div>
        `
    },
    'sih-internal': {
        title: '🏆 SIH Internal Hackathon',
        category: 'Core Organizing Team · Event Management · Leadership',
        location: 'Smart India Hackathon — Internal Hackathon (UIT Campus)',
        body: `
            <p class="modal-lead">Contributed to the end-to-end organization of the SIH Internal Hackathon, from planning and participant coordination to on-ground execution. Worked closely with faculty, participants, and fellow organizers to manage logistics, communication, and event operations.</p>
            
            <div class="modal-section-block">
                <h4><i data-lucide="award"></i> Key Event Details</h4>
                <ul>
                    <li><strong>Role:</strong> Core Organizing Team Member</li>
                    <li><strong>Event:</strong> Smart India Hackathon — Internal Hackathon</li>
                    <li><strong>Contribution:</strong> Planning · Coordination · Logistics · Event Execution · Team Collaboration</li>
                </ul>
            </div>

            <div class="modal-section-block">
                <h4><i data-lucide="camera"></i> Event Moments & Organizing Committee Gallery</h4>
                <div class="modal-photo-gallery">
                    <div class="modal-photo-item" title="SIH 2026 Core Organizing Team on Stage">
                        <img src="assets/images/sih/sih_team_stage.jpg" alt="SIH Core Organizing Team on Stage">
                        <div class="modal-photo-caption">Core Team on Stage</div>
                    </div>
                    <div class="modal-photo-item" title="Organizing Committee with Faculty Coordinators">
                        <img src="assets/images/sih/sih_group_faculty.jpg" alt="SIH Faculty and Organizers">
                        <div class="modal-photo-caption">Faculty & Organizers</div>
                    </div>
                    <div class="modal-photo-item" title="Hackathon Participants Seated in Auditorium">
                        <img src="assets/images/sih/sih_participants_hall.jpg" alt="SIH Hackathon Participants">
                        <div class="modal-photo-caption">Participating Squads</div>
                    </div>
                    <div class="modal-photo-item" title="Boardroom Coordination & Strategy Meeting">
                        <img src="assets/images/sih/sih_meeting_discussion.jpg" alt="SIH Strategy Meeting">
                        <div class="modal-photo-caption">Strategy & Alignment</div>
                    </div>
                    <div class="modal-photo-item" title="Core Organizing Student Committee Session">
                        <img src="assets/images/sih/sih_boardroom_team.jpg" alt="SIH Organizing Committee Meeting">
                        <div class="modal-photo-caption">Committee Boardroom</div>
                    </div>
                </div>
            </div>

            <div class="modal-section-block">
                <h4><i data-lucide="check-circle-2"></i> On-Ground Operations & Responsibilities</h4>
                <ul>
                    <li><strong>Event Logistics:</strong> Coordinated venue setup, technical infrastructure, scheduling, and problem statement dissemination for participating teams.</li>
                    <li><strong>Team Coordination:</strong> Managed communication channels, streamlined registration desks, and provided continuous on-ground assistance to student hackathon squads.</li>
                    <li><strong>Evaluation & Jury Flow:</strong> Assisted faculty coordinators and jury members in managing project presentation slots and scoring pipelines.</li>
                </ul>
            </div>
        `
    },
    'becon-2026': {
        title: 'BECon 2026 @ IIT Delhi',
        category: 'Entrepreneurship Conclave',
        location: 'Indian Institute of Technology, Delhi (30 Jan - 1 Feb 2026)',
        body: `
            <p class="modal-lead">Participated in BECon 2026 (Business & Entrepreneurship Conclave) at IIT Delhi — a 3-day national conclave bringing together founders, investors, policymakers, and industry leaders.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="mic"></i> Key Sessions & Panels</h4>
                <ul>
                    <li><strong>Policy & Innovation:</strong> Fireside chat featuring Anil Agarwal (CCI), Arvind Gupta (Digital India Foundation), and Alok Kumar (Additional Chief Secretary, Govt of UP).</li>
                    <li><strong>Shark Tank Panel:</strong> Practical founder mindset with Shaily Mehrotra (FIXDERMA) & Pratham Mittal (Masters' Union).</li>
                    <li><strong>Performance Strategy:</strong> Insights on discipline and focus strategy with Tanya Sachdev.</li>
                    <li><strong>VC & Startup Panel:</strong> Discussions with Raghav Chandra (Urban Company), Bipin Shah (Zeropearl VC), and Rishabh Goel (Credgenix).</li>
                    <li><strong>AI Future Panel:</strong> Exploring AI and automation opportunities with experts from Zoho, Observe AI, Sauce Labs, and Sanasai.</li>
                    <li><strong>Keynote:</strong> Consistency & integrity session with Nitin Vijay (NV Sir).</li>
                </ul>
            </div>
            <div class="modal-section-block">
                <h4><i data-lucide="wrench"></i> Workshops & Innovation Zones Explored</h4>
                <p>Google Workshop (Scaling Indian Startups Globally), Open Source Hardware Workshop, Defense Tech Workshop, Auto Spark, Launchpad & Startup Clinic, TechnoVerse, and Incubator Summit.</p>
            </div>
            <div class="modal-section-block">
                <h4><i data-lucide="sparkles"></i> Personal Takeaway</h4>
                <p>As a Tier-3 engineering college student, attending this large-scale entrepreneurship conclave at IIT Delhi provided invaluable exposure to startup building, venture capital expectations, AI trends, and national tech networking.</p>
            </div>
        `
    },
    'foss-united-uit': {
        title: 'FOSS UNITED – UIT Chapter Launch',
        category: 'Open Source Chapter',
        location: 'United Institute of Technology (UIT Campus)',
        body: `
            <p class="modal-lead">Official launch event of FOSS UNITED – UIT Chapter at United Institute of Technology, dedicated to promoting Free and Open Source Software (FOSS) and student open-source contributions.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="globe"></i> Event Highlights & Keynotes</h4>
                <ul>
                    <li><strong>Principal Address:</strong> Prof. (Dr.) Sanjay Srivastava emphasized UIT’s commitment to technical clubs that empower students beyond academics.</li>
                    <li><strong>DSW Vision:</strong> Dr. Manas Pandey (Dean Student Welfare, IITian) shared insights on growing as real-world problem solvers and open-source contributors.</li>
                    <li><strong>FOSS Introduction:</strong> Atul Sir gave an insightful talk on the significance of Open Source Software in modern tech stacks.</li>
                    <li>Attended the session with friends, enjoying technical talks, community discussions, and engaging campus quiz rounds.</li>
                </ul>
            </div>
            <div class="modal-section-block">
                <h4><i data-lucide="users"></i> Core Team & Organizers</h4>
                <p>Core Team: Prakhar Sir, Mohd Atib, Ishika Sharma, Harshali Malhotra, and Gaurav Jha. Volunteers: Sakshi and Nitesh.</p>
            </div>
        `
    },
    'srm-builds': {
        title: 'SRM BUILDS 7.0 (National Hackathon)',
        category: '36-Hour Offline Hackathon',
        location: 'SRM University Sonipat, Haryana (Delhi-NCR)',
        body: `
            <p class="modal-lead">Travelled to Sonipat, Haryana as Team Leader with teammates Praveen, Rohit Pal, and Anshuman to participate in SRM BUILDS 7.0 during VERGE 2026 tech fest.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="clock"></i> 36-Hour Continuous Sprint</h4>
                <ul>
                    <li>Built our project completely from scratch over 36 continuous hours with only 2–3 hours of sleep.</li>
                    <li>Evaluated across 6 intense rounds with 3 different evaluator panels, including a 1 AM evaluation round under extreme fatigue.</li>
                    <li>Balanced college sessional exams while traveling and competing across state lines.</li>
                </ul>
            </div>
            <div class="modal-section-block">
                <h4><i data-lucide="zap"></i> Tech Fest & Expos</h4>
                <p>Explored VERGE fest highlights: Robo War competitions, Car Expo, Tech Expo, Bike Expo, and student innovation showcases from across India.</p>
            </div>
        `
    },
    'techsprint-top10': {
        title: 'TechSprint Hackathon — Top 10 Finish',
        category: 'National Hackathon Achievement',
        location: 'TechSprint National Hackathon',
        body: `
            <p class="modal-lead">Achieved a Top 10 Rank among nationwide participant teams in the TechSprint Hackathon.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="trophy"></i> Sprint & Pitch Highlights</h4>
                <ul>
                    <li><strong>Rank:</strong> Top 10 Finalist Team out of competitive nationwide entries.</li>
                    <li><strong>Rapid Execution:</strong> Built a full-featured web solution prototype from scratch under strict hackathon deadlines.</li>
                    <li><strong>Technical Defense:</strong> Successfully presented system architecture, database schema, and live workflow to jury panels.</li>
                </ul>
            </div>
        `
    },
    'uhack-4': {
        title: 'UHack 4.0 Hackathon',
        category: 'Top 65 Grand Finale',
        location: 'United Group of Institutions (17-18 March)',
        body: `
            <p class="modal-lead">Advanced to the Top 65 teams out of nationwide applicants to qualify for the Grand Finale 24-hour offline hackathon sprint.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="code"></i> Hackathon Sprint Details</h4>
                <ul>
                    <li>Team Members: Gautam, Rohit Pal, Praveen Singh, Anshuman.</li>
                    <li>Built project from scratch — from ideation to working web application prototype within 24 hours.</li>
                    <li>Cleared Round 1 evaluation conducted at 2:00 AM; refined solution based on judges' feedback with only 1–2 hours sleep.</li>
                    <li>Interacted and exchanged insights with 10–12 competing teams across technical domains.</li>
                </ul>
            </div>
        `
    },
    'cloud-junction': {
        title: 'Cloud Junction Campus Ambassador',
        category: 'Community Leadership',
        location: 'Pan-India Selection (Selected out of 10,000+ Applicants)',
        body: `
            <p class="modal-lead">Selected as Cloud Junction Campus Ambassador from among 10,000+ national applications.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="users"></i> Responsibilities & Initiatives</h4>
                <ul>
                    <li>Leading student tech community initiatives and sharing learning opportunities around web development and cloud ecosystems.</li>
                    <li>Connecting peer developers with technical ambassador networks and mentorship programs.</li>
                </ul>
            </div>
        `
    },
    'build-with-ai': {
        title: 'GDG "Build with AI"',
        category: 'Google Developer Group Event',
        location: 'United Institute of Technology Campus, Prayagraj',
        body: `
            <p class="modal-lead">Attended "Build with AI" hosted by GDG on Campus - United Institute of Technology, Allahabad.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="bot"></i> Event Highlights & Mentors</h4>
                <ul>
                    <li>Dived into AI Fundamentals, Generative AI applications, and career pathways in artificial intelligence.</li>
                    <li>Interactive mentorship by Sarthak Singh (GDG Campus Organizer), Abhipsa Srivastava (Tech Lead ML), Syed Mohammad Aquib (Web Lead), Shailey Nayak, Reeti Singh, Shivaansh Singh, and Isha Chaudhary.</li>
                    <li><strong>Epic Quiz Challenge:</strong> Scored <strong>12th out of 56 participants</strong> in the Wayground (Quizizz) competition and earned official Google stickers.</li>
                </ul>
            </div>
        `
    },
    'devfest-2024': {
        title: 'DevFest Prayagraj 2024',
        category: 'GDG Developer Conference',
        location: 'UIT Auditorium, Prayagraj (26th October 2024)',
        body: `
            <p class="modal-lead">Received token & attended DevFest Prayagraj 2024 at UIT Auditorium.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="globe"></i> Sessions & Community</h4>
                <ul>
                    <li>Joined developers and Google Developer Experts (GDE) covering Generative AI, Cloud Computing, Flutter, and ML.</li>
                    <li>Engaged in technical networking with developers and open-source contributors from across Prayagraj.</li>
                </ul>
            </div>
        `
    },
    'startup-confluence': {
        title: 'Startup Confluence 2024',
        category: '2-Day Incubation Summit',
        location: 'United Incubation Hub, UIT Allahabad (Dec 11-12, 2024)',
        body: `
            <p class="modal-lead">2-day Startup Confluence organized by United Incubation Hub at UIT Allahabad.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="briefcase"></i> Highlights & Frameworks</h4>
                <ul>
                    <li>Inaugurated with Special Guest <strong>Nand Gopal Gupta ('Nandi')</strong>, Cabinet Minister, Govt of Uttar Pradesh.</li>
                    <li>Learned TAM, SAM, SOM market sizing models and the SLIP Product Framework (Build → Measure → Learn).</li>
                    <li>Analyzed case studies of BigBasket, Blinkit, Zomato, PhysicsWallah, and IIT Kanpur startups (Saptkrishi, ProSoc, Phool).</li>
                    <li>IPR Workshop: Patents (20 yrs), Designs (10 yrs), Trademarks (10 yrs renewable), Copyrights (Lifetime+60 yrs), and Trade Secrets.</li>
                    <li>Organizing Support: Shruti Sharma Ma'am, Shivesh Gaur Sir, Dr. Divya Bartaria Ma'am, Dr. Manas Pandey Sir, and team.</li>
                </ul>
            </div>
        `
    },
    'hc-verma-visit': {
        title: 'Historic Day — Meeting Prof. H.C. Verma Sir',
        category: 'Legendary Mentorship',
        location: 'United Group of Institutions (UGI Campus)',
        body: `
            <p class="modal-lead">Lived a dream moment at age 20 to see and listen to living legend Prof. H.C. Verma Sir, author of the legendary 'Concepts of Physics' book.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="heart"></i> Core Wisdom Shared</h4>
                <ul>
                    <li><em>"Excellence brings good marks, but marks alone don’t bring excellence."</em></li>
                    <li><em>"True learning gives both good marks and a good life."</em></li>
                    <li><em>"Earning money is good — but using it for society is greatness."</em></li>
                    <li>Special thanks to UGI, UCR, Dr. Divya Bhartariya Ma'am, and Shruti Sharma Ma'am for making this dream come true.</li>
                </ul>
            </div>
        `
    },
    'flowjam-2026': {
        title: 'FlowJam 2026 FlutterFlow Hackathon',
        category: 'Low-Code Hackathon',
        location: 'Shambhunath Institute of Engineering & Technology (SIET)',
        body: `
            <p class="modal-lead">Participated in FlowJam 2026 FlutterFlow hackathon at SIET Prayagraj under dynamic team reshuffling.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="shuffle"></i> Adaptability & Rapid Execution</h4>
                <ul>
                    <li>Reshuffled at event start to collaborate with new teammates Palak Tiwari (SIET) & Mukesh Kumar (BBS).</li>
                    <li>Rapidly aligned task workflows and built a working web app prototype using FlutterFlow under strict time limits.</li>
                    <li>Organizers & Mentors: Ankit Kumar Verma & Atul Singh.</li>
                </ul>
            </div>
        `
    },
    'gdg-mobyte': {
        title: 'GDG Prayagraj MoByte & CampusLink',
        category: 'Project Showcase Event',
        location: 'United Institute of Technology, Prayagraj',
        body: `
            <p class="modal-lead">Attended GDG Prayagraj MoByte event at UIT and showcased web project 'CampusLink' built with team (Gautam & Praveen).</p>
            <div class="modal-section-block">
                <h4><i data-lucide="layers"></i> Project & Mentorship</h4>
                <ul>
                    <li>Built 'CampusLink' to preserve college memories, alumni connections, and student project showcases.</li>
                    <li>Mentorship & Networking with Ankit Kumar Verma, Hridyesh Gupta, Atul Singh, Reeti Singh, Mohd Shadab (Wiki Tech), and Abhishek Sahu (GDG Lucknow).</li>
                </ul>
            </div>
        `
    },
    'sankalp-2026': {
        title: 'SANKALP 2026 National Summit',
        category: '3-Day Leadership Summit',
        location: 'MNNIT Allahabad',
        body: `
            <p class="modal-lead">3-day national summit at MNNIT Allahabad covering Aatmanirbhar leadership, startup exhibitions, media scaling, and cross-college networking.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="compass"></i> 3-Day Journey</h4>
                <ul>
                    <li><strong>Day 1:</strong> Aatmanirbhar leadership, Navachar Exhibition, blending Gita philosophy with AI, Srijan concert.</li>
                    <li><strong>Day 2:</strong> Startup scaling keynotes with Manish Pandey (BeerBiceps Media) & Ideabaaz team.</li>
                    <li><strong>Day 3:</strong> Networking with VIT Vellore students & YourStory representatives; concert by Pt. Vishwa Mohan Bhatt.</li>
                </ul>
            </div>
        `
    },
    'nhrd-talks': {
        title: 'NHRD UNITED Talks Session',
        category: 'Leadership & Mindset',
        location: 'UIT Auditorium (21st April 2025)',
        body: `
            <p class="modal-lead">Attended NHRD Coimbatore & Prayagraj Chapter session by Mr. Advait Dikshit under the UNITED Talks series.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="quote"></i> Key Takeaways</h4>
                <ul>
                    <li><em>"Dreams are the beginning, but action gives them life. Mindset > Motivation — stay consistent."</em></li>
                    <li><em>"Turn your why into how, and how into now."</em></li>
                    <li>Special thanks to mentor Shruti Sharma Ma'am and Praveen Singh.</li>
                </ul>
            </div>
        `
    },
    'pw-sankalp': {
        title: 'PhysicsWallah PW Sankalp Session',
        category: 'Educational Leaders Event',
        location: 'United Group of Institutions (UGI Campus)',
        body: `
            <p class="modal-lead">Surreal experience as a Sankalp batch student (PW Only IAS) meeting educational visionaries on campus.</p>
            <div class="modal-section-block">
                <h4><i data-lucide="award"></i> Mentors & Educators Met</h4>
                <ul>
                    <li>Met Alakh Pandey Sir, Sumit Rewati Sir, Dr. Saleem Sir (Science & Tech), Aadarsh Sir (Polity), and JJ Sir live on campus.</li>
                    <li>Gained inspiration and purpose from educators who revolutionized education across India.</li>
                </ul>
            </div>
        `
    },
    'nxtwave-ai': {
        title: 'NxtWave Generative AI Workshop',
        category: 'Hands-On AI Workshop',
        location: 'Online Workshop',
        body: `
            <p class="modal-lead">Completed hands-on workshop covering Generative AI architecture, LLM prompt engineering, and building custom generative models.</p>
        `
    },
    'open-source-wiki': {
        title: 'Wikimedia Open Source Contributor',
        category: 'Global Community Contributions',
        location: 'Wikimedia / Gerrit / Phabricator',
        body: `
            <p class="modal-lead">Active Wikimedia Open Source Contributor delivering code reviews, technical contributions, and localization improvements using tools like <strong>Gerrit</strong> and <strong>Phabricator</strong> (Fabricator).</p>
        `
    }
};

function openEventModal(eventId) {
    const data = eventDetailsData[eventId];
    if (!data) return;

    const titleEl = document.getElementById('modal-title');
    const catEl = document.getElementById('modal-category');
    const locEl = document.getElementById('modal-location');
    const bodyEl = document.getElementById('modal-body');

    if (titleEl) titleEl.innerText = data.title;
    if (catEl) catEl.innerText = data.category;
    if (locEl) locEl.innerHTML = `<i data-lucide="map-pin"></i> ${data.location}`;
    if (bodyEl) bodyEl.innerHTML = data.body;

    const overlay = document.getElementById('event-modal-overlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Global window aliases for modal triggers
window.openEventModal = openEventModal;
window.openEventDetailsModal = openEventModal;

function closeEventModal(event) {
    if (event.target.id === 'event-modal-overlay') {
        closeEventModalDirect();
    }
}

function closeEventModalDirect() {
    const overlay = document.getElementById('event-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeEventModalDirect();
    }
});

// 15. View More Events Toggle Function
function toggleMoreEvents() {
    const hiddenCards = document.querySelectorAll('.event-card-hidden');
    const toggleBtn = document.getElementById('toggle-events-btn');
    if (!toggleBtn) return;

    const isExpanded = toggleBtn.classList.contains('active');

    hiddenCards.forEach(card => {
        if (isExpanded) {
            card.classList.add('hidden');
        } else {
            card.classList.remove('hidden');
        }
    });

    const spanText = toggleBtn.querySelector('span');

    if (isExpanded) {
        toggleBtn.classList.remove('active');
        if (spanText) spanText.innerText = 'View More Events (10 More)';
        document.getElementById('hackathons').scrollIntoView({ behavior: 'smooth' });
    } else {
        toggleBtn.classList.add('active');
        if (spanText) spanText.innerText = 'Show Less';
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// 16. Tech Matrix Particle Canvas Engine (Lightweight & Auto-Pausing)
function initHeroParticleCanvas() {
    const canvas = document.getElementById('hero-particle-canvas');
    if (!canvas) return;
    const heroSection = canvas.closest('.hero-section') || canvas.parentElement;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    let isVisible = true;
    let animationFrameId = null;

    // Auto-pause canvas when hero is scrolled out of view
    if ('IntersectionObserver' in window && heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible && !animationFrameId) {
                    animate();
                } else if (!isVisible && animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            });
        }, { threshold: 0.05 });
        observer.observe(heroSection);
    }

    window.addEventListener('resize', () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    }, { passive: true });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 35), 35);
    const mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => {
        if (!isVisible) return;
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    }, { passive: true });

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 1.8 + 1,
            alpha: Math.random() * 0.4 + 0.2
        });
    }

    function animate() {
        if (!isVisible) {
            animationFrameId = null;
            return;
        }

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 90) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(16, 185, 129, ${0.14 * (1 - dist / 90)})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();
}

// 17. 3D Card Spotlight & Mouse Tracker
function initCardGlowTracker() {
    const cards = document.querySelectorAll('[data-glow], [data-glow-mini], .glass-card, .vercel-card, .project-card, .skill-dash-card, .certificate-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ==========================================
// 18. Certificate Lightbox Slideshow Engine
// ==========================================
const certificatesData = [
    { img: 'assets/images/certificates/1.png', title: 'SRM Builds 7.0 (Offline Round)', issuer: 'SRM University, Sonepat', category: 'Hackathon' },
    { img: 'assets/images/certificates/3.png', title: 'Codefront 2.0 Participation', issuer: 'GDG on Campus J.K. Institute', category: 'Google Developer Groups' },
    { img: 'assets/images/certificates/2.png', title: 'TechSprint Hackathon 2025', issuer: 'GDG on Campus REC Ramgarh', category: 'Google Developer Groups' },
    { img: 'assets/images/certificates/4.png', title: 'Codefront 2.0 Top 10 Merit', issuer: 'GDG on Campus J.K. Institute', category: 'Google Developer Groups' },
    { img: 'assets/images/certificates/5.png', title: 'Google Student Ambassador Pitch Night', issuer: 'Google Student Ambassador Program', category: 'Leadership / Pitch' },
    { img: 'assets/images/certificates/6.png', title: 'TechSprint NCU Appreciation', issuer: 'GDG on Campus NCU (Gautam Kumar)', category: 'Google Developer Groups' },
    { img: 'assets/images/certificates/7.png', title: 'SRM Builds 7.0 of Verge 2026', issuer: 'SRM University, Sonepat', category: 'Hackathon' },
    { img: 'assets/images/certificates/8.png', title: 'GDG Vibe-Coding Hackathon', issuer: 'Google Developer Group Prayagraj', category: 'Google Developer Groups' }
];

let currentCertIndex = 0;

function openCertificateLightbox(index) {
    currentCertIndex = index;
    updateLightboxContent();

    const lightbox = document.getElementById('certificate-lightbox');
    if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function closeCertificateLightbox(event) {
    if (event.target.id === 'certificate-lightbox') {
        closeCertificateLightboxDirect();
    }
}

function closeCertificateLightboxDirect() {
    const lightbox = document.getElementById('certificate-lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function changeCertificate(direction) {
    currentCertIndex = (currentCertIndex + direction + certificatesData.length) % certificatesData.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    const data = certificatesData[currentCertIndex];
    if (!data) return;

    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const issuerEl = document.getElementById('lightbox-issuer');
    const counterEl = document.getElementById('lightbox-counter');

    if (imgEl) {
        imgEl.src = data.img;
        imgEl.alt = data.title;
    }
    if (titleEl) titleEl.innerText = data.title;
    if (issuerEl) issuerEl.innerText = `${data.category} | ${data.issuer}`;
    if (counterEl) counterEl.innerText = `${currentCertIndex + 1} of ${certificatesData.length}`;
}

// Keyboard navigation and closing events
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('certificate-lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeCertificateLightboxDirect();
        } else if (e.key === 'ArrowRight') {
            changeCertificate(1);
        } else if (e.key === 'ArrowLeft') {
            changeCertificate(-1);
        }
    }
});
