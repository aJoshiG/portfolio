import { Project } from './models';

/** To add a project, append an entry. Featured projects get the large card layout. */
export const PROJECTS: Project[] = [
  {
    slug: 'skillswap',
    title: 'SkillSwap',
    tagline: 'Trade what you know for what you want to learn.',
    description:
      'A full-stack peer-to-peer skill-exchange platform. People list what they can teach and what they want to learn, ' +
      'get ranked matches, send swap requests, chat in real time and schedule sessions paid for with time credits.',
    highlights: [
      'Smart matching in a single MongoDB aggregation pipeline that ranks two-way swaps first and weighs ratings with a Bayesian average',
      'Real-time chat over JWT-authenticated sockets with typing indicators, read receipts and online presence',
      'Time-credit economy with escrow, refunds and auto-completion, each step in a MongoDB transaction with an append-only ledger',
      'Secure auth: in-memory access token plus rotating httpOnly refresh token with reuse detection',
    ],
    tech: ['Angular', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Playwright', 'Docker'],
    repoUrl: 'https://github.com/aJoshiG/skillswap',
    demoUrl: 'https://skillswap-7dfr.onrender.com',
    demoNote: 'Use the demo account. The free server can take ~50s to wake up.',
    image: {
      src: '/projects/skillswap/matches.png',
      alt: 'SkillSwap matches page ranking people whose skills line up with yours, two-way swaps first',
    },
    featured: true,
  },
  {
    slug: 'portfolio',
    title: 'This Portfolio',
    tagline: 'The site you are looking at.',
    description:
      'A prerendered Angular site with a dark and light theme, scroll-aware navigation and an EmailJS contact form, ' +
      'built for speed and accessibility.',
    highlights: [],
    tech: ['Angular', 'TypeScript', 'SSG', 'CSS'],
    featured: false,
  },
];
