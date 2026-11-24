import { EXPERIENCE } from './experience';

export interface NavItem {
  /** Matches the section element's id on the home page. */
  id: string;
  label: string;
}

/** Page sections in order. Used by the navbar, section numbering and scroll spy. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  ...(EXPERIENCE.length ? [{ id: 'experience', label: 'Experience' }] : []),
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

/** "01", "02", ... for a section id, matching its position in the nav. */
export function sectionNumber(id: string): string {
  return String(NAV_ITEMS.findIndex((item) => item.id === id) + 1).padStart(2, '0');
}
