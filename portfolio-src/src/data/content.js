// ============================================================
//  PORTFOLIO CONTENT — single source of truth.
//  Edit the values below to update the whole site.
//  Fields marked  // TODO  are placeholders / possibly outdated
//  from the original CV — update them with current details.
// ============================================================

export const profile = {
  name: 'Trần Quang Phong',
  shortName: 'Phong',
  role: 'Full-stack Web Developer',
  // A short, punchy hero line.
  headline: ['I build reliable', 'web products & APIs.'],
  tagline:
    'Full-stack developer focused on clean architecture, scalable APIs and the details that make products feel solid.',
  location: 'Hà Nội, Việt Nam',
  available: true, // shows the "open to work" status dot
  // The CV PDF lives in /public and is bundled at /portfolio/...
  resumeUrl: '/portfolio/Tran-Quang-Phong-CV.pdf',
  email: 'phongtq@hqgroups.vn', // current work email
  altEmail: 'jarvis.ejr@gmail.com', // TODO: confirm / remove if unused
  phone: '+84 374 110 298',
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/mockingbitch', icon: 'github' },
  { label: 'Facebook', href: 'https://www.facebook.com/jarvis.ejr', icon: 'facebook' },
  { label: 'Email', href: 'mailto:phongtq@hqgroups.vn', icon: 'mail' },
]

// Short metrics shown under the hero / about.
export const stats = [
  { value: '5+', label: 'Years building for the web' },
  { value: '4', label: 'Companies & teams' },
  { value: '10+', label: 'Projects shipped' },
]

export const about = {
  eyebrow: 'About',
  title: 'A developer who cares about what happens after launch.',
  paragraphs: [
    "Hello — I'm Trần Quang Phong, a full-stack web developer with 5+ years of experience across the stack. I started on the front-end, moved deep into back-end and APIs, and today I enjoy owning features end to end.",
    'My day-to-day lives mostly in the PHP ecosystem (Laravel & Symfony) for the back-end and React on the front-end, with a strong focus on clean code, SOLID principles, design patterns and testing.',
    "I'm comfortable taking a product from database schema to deployed server — building RESTful APIs, wiring up CI/CD, and operating the infrastructure that keeps it running.",
  ],
  facts: [
    { label: 'Based in', value: 'Hà Nội, Việt Nam' },
    { label: 'Focus', value: 'Back-end & APIs' },
    { label: 'Open to', value: 'Full-time & freelance' },
    { label: 'Email', value: 'phongtq@hqgroups.vn' },
  ],
}

// Skills grouped by area. `level` (0-100) drives the meter width.
export const skillGroups = [
  {
    name: 'Back-end',
    icon: 'server',
    skills: [
      { name: 'PHP', level: 90 },
      { name: 'Laravel', level: 88 },
      { name: 'Symfony', level: 80 },
      { name: 'Java', level: 65 },
      { name: 'RESTful API', level: 88 },
      { name: 'MySQL', level: 82 },
    ],
  },
  {
    name: 'Front-end',
    icon: 'layout',
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 82 },
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'Tailwind / Bootstrap', level: 85 },
      { name: 'jQuery / Ajax', level: 80 },
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: 'terminal',
    skills: [
      { name: 'Docker', level: 78 },
      { name: 'Nginx', level: 75 },
      { name: 'CI/CD', level: 72 },
      { name: 'AWS', level: 68 },
      { name: 'Git', level: 88 },
      { name: 'Linux', level: 75 },
    ],
  },
]

// Engineering practices — shown as a tag cloud.
export const practices = [
  'SOLID',
  'Design Patterns',
  'Unit Testing',
  'Clean Architecture',
  'Code Review',
  'Agile / Scrum',
  'RESTful Design',
]

// Work history, newest first.
export const experience = [
  {
    role: 'Full-stack Web Developer',
    company: 'JVB Vietnam',
    period: 'Mar 2022 — Present', // TODO: update if you have since moved (e.g. HQ Groups)
    type: 'Full-time',
    points: [
      'Build and maintain APIs for a large e-commerce platform.',
      'Own features end to end across front-end and back-end.',
      'Manage and operate production servers and deployments.',
    ],
    stack: ['Laravel', 'Symfony', 'React', 'Docker', 'AWS'],
  },
  {
    role: 'Back-end Developer',
    company: 'SmartOSC',
    period: 'Nov 2021 — Mar 2022',
    type: 'Full-time',
    points: [
      'Designed and fixed APIs for e-commerce projects.',
      'Worked within an established codebase following team standards.',
    ],
    stack: ['PHP', 'RESTful API', 'MySQL'],
  },
  {
    role: 'Web Manager',
    company: 'TY Orgafood',
    period: 'Mar 2021 — Nov 2021',
    type: 'Full-time',
    points: [
      'Designed the user interface and overall web experience.',
      'Managed and operated the company website.',
    ],
    stack: ['JavaScript', 'PHP', 'UI/UX'],
  },
  {
    role: 'Front-end Developer',
    company: 'Walther Digital',
    period: 'Dec 2020 — Feb 2021',
    type: 'Full-time',
    points: [
      'Designed UI/UX for client websites.',
      'Built reusable modules and components.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
]

// Featured projects. The wedding invitation is live in this same repo.
export const projects = [
  {
    title: 'Cinematic Wedding Invitation',
    blurb:
      'A luxury, cinematic wedding invitation experience — animated preloader, smooth scrolling, parallax gallery, countdown, QR gifting and a guestbook.',
    tags: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'Lenis'],
    href: '/wedding/',
    repo: 'https://github.com/mockingbitch/mockingbitch.github.io',
    featured: true,
    accent: 'A real, deployed project — lives at /wedding/ on this site.',
  },
  {
    title: 'E-commerce API Platform',
    blurb:
      'RESTful APIs powering an e-commerce platform — catalog, cart, checkout and order flows, built for scale and maintained in production.',
    tags: ['Laravel', 'Symfony', 'MySQL', 'REST'],
    href: null, // TODO: add a link / case study if available
    repo: null,
    featured: false,
    accent: 'Work at JVB Vietnam & SmartOSC.',
  },
  {
    title: 'Containerized Deployments',
    blurb:
      'Dockerized application stacks with Nginx reverse proxies and CI/CD pipelines for repeatable, zero-drama deployments.',
    tags: ['Docker', 'Nginx', 'CI/CD', 'AWS'],
    href: null, // TODO: add a link / write-up if available
    repo: null,
    featured: false,
    accent: 'Infrastructure & operations.',
  },
]

export const contact = {
  eyebrow: 'Contact',
  title: "Let's build something.",
  text: "Have a project, a role, or just want to say hi? I'm happy to talk.",
  email: 'phongtq@hqgroups.vn',
  phone: '+84 374 110 298',
  location: 'Hà Nội, Việt Nam',
}

// Order + labels for the nav and scroll-spy.
export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
