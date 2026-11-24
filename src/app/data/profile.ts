import { Profile } from './models';

export const PROFILE: Profile = {
  name: 'Aditya Joshi',
  role: 'Full-Stack Developer',
  headline:
    'Full-stack developer building real-time web apps, with a growing focus on machine learning.',
  tagline: 'I build real-time web apps.',
  intro:
    'Full-stack developer and CS student at JNU, New Delhi. I work across Angular, Node.js and MongoDB, ' +
    "and I'm going deeper into machine learning.",
  summary:
    "I'm a Computer Science student at JNU, New Delhi, doing a dual B.Tech + M.Tech degree. " +
    'I like building complete products, from the database and API to the interface people use, ' +
    'and I care about the details that make software feel reliable. ' +
    "Right now I'm going deeper into machine learning and looking for internships where I can ship real features.",
  location: 'New Delhi, India',
  availability: 'Open to internships',
  avatar: '/avatar.svg',
  resumeUrl: '',
  socials: [
    { label: 'GitHub', url: 'https://github.com/aJoshiG', icon: 'github' },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aditya-joshi-358b2132a',
      icon: 'linkedin',
    },
    { label: 'X', url: 'https://x.com/AdityaAdi0310', icon: 'x' },
    { label: 'Email', url: 'mailto:aditya.adi0310@gmail.com', icon: 'email' },
  ],
  quickFacts: [
    { label: 'University', value: 'JNU, New Delhi' },
    { label: 'Degree', value: 'B.Tech + M.Tech, CSE' },
    { label: 'Graduating', value: '2027' },
    { label: 'Focus', value: 'Full-stack · ML' },
  ],
};
