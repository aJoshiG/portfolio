/** Shared content types. All site content lives in the files in this folder. */

export interface SocialLink {
  label: string;
  url: string;
  /** Key for the icon set (added in the layout step). */
  icon: 'github' | 'linkedin' | 'x' | 'email';
}

export interface Profile {
  name: string;
  role: string;
  /** One-liner used for SEO / link previews. */
  headline: string;
  /** Big line under the name in the hero. */
  tagline: string;
  /** Short paragraph in the hero. */
  intro: string;
  summary: string;
  location: string;
  /** Short status shown as a pill in the hero. Leave empty to hide it. */
  availability: string;
  avatar: string;
  /** Leave empty until public/resume.pdf exists; the Resume button hides itself. */
  resumeUrl: string;
  socials: SocialLink[];
  quickFacts: { label: string; value: string }[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  highlights: string[];
  certificateUrl?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  repoUrl?: string;
  demoUrl?: string;
  /** Optional note shown next to the demo link, e.g. hosting cold-start. */
  demoNote?: string;
  image?: { src: string; alt: string };
  featured: boolean;
}

export interface Achievement {
  kind: 'certification' | 'leadership';
  title: string;
  issuer: string;
  date?: string;
  detail?: string;
  url?: string;
}
