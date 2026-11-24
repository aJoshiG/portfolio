import { Achievement } from './models';

export const ACHIEVEMENTS: Achievement[] = [
  {
    kind: 'certification',
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI · Stanford Online (Coursera)',
    date: 'Feb 2025',
    detail: 'Taught by Andrew Ng',
    url: 'https://coursera.org/verify/specialization/IZJM5KK1L9MF',
  },
  {
    kind: 'leadership',
    title: 'Executive, Akshar',
    issuer: 'Literary Society, JNU',
    detail: 'Hosted open mics and literary events',
  },
  {
    kind: 'leadership',
    title: 'Executive, Kreeda',
    issuer: 'Sports Club, JNU',
    detail: 'Organized the annual sports competition',
  },
  {
    kind: 'leadership',
    title: 'Executive, Phoenix',
    issuer: 'Entrepreneurship Club, JNU',
    detail: 'Helped plan startup-related events',
  },
];
