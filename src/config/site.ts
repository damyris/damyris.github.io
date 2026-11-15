import type { ImageMetadata } from 'astro';
import studyAppHome from '../assets/study-app/home.webp';

export interface SiteConfig {
  name: string;
  fullName: string;
  pills: [string, string];
  notes: { left: string; right: string };
  status: string;
  headline: { before: string; after: string };
  bio: string;
  certs: { name: string; state: 'done' | 'in-progress' }[];
  otherBadges: { url: string; items: string[] };
  skills: string[];
  socials: { github?: string; linkedin?: string; tryhackme?: string };
  email: string;
  resume: string;
  photo?: { src: ImageMetadata; alt: string; caption: string };
  setup: { lines: string[]; caption: string };
}

// Everything personal on the site lives here. Edit freely.
export const site: SiteConfig = {
  name: 'damaris ingram',
  fullName: 'Damaris Ingram',
  pills: ['breaks things', 'learns in public'],
  notes: { left: 'Networking Student, Atlantic Tech College', right: 'Aspiring Pentester' },
  status: 'open to labs, CTFs and good problems',
  headline: { before: 'I learn how networks work', after: 'so I can learn how they break.' },
  bio:
    "I'm a networking student at Atlantic Tech College who gets a little too curious about how things break. " +
    "I'm CompTIA A+, Tech+ and AI Fundamentals certified, I daily-drive Linux (Arch, Debian, Ubuntu, Fedora), " +
    "and I build tools that make studying actually stick. Now I'm teaching myself pentesting, one lab at a time.",
  certs: [
    { name: 'CompTIA A+', state: 'done' },
    { name: 'CompTIA Tech+', state: 'done' },
    { name: 'CompTIA AI Fundamentals', state: 'done' },
  ],
  otherBadges: {
    url: 'https://www.credly.com/users/damaris-ingram',
    items: [
      'IC3 Digital Literacy GS6 Master',
      'PMI Project Management Ready',
      'ESB: Entrepreneurship and Small Business',
      'Intuit QuickBooks Online Certified User',
    ],
  },
  skills: [
    'Linux (Arch · Debian · Ubuntu · Fedora)',
    'Networking fundamentals',
    'Hardware & troubleshooting',
    'HTML/CSS/JavaScript',
    'Git & GitHub Pages',
  ],
  socials: {
    github: 'https://github.com/damyris',
    linkedin: 'https://www.linkedin.com/in/damarisingram/',
    // tryhackme: 'https://tryhackme.com/p/your-username',  // add when you have one
  },
  email: 'damarisingramprof@gmail.com',
  resume: '/damaris-ingram-resume.pdf',
  photo: {
    src: studyAppHome,
    alt: 'Home screen of my CompTIA study app',
    caption: 'my study app',
  },
  setup: {
    lines: ['$ whoami', 'damaris', '$ echo $DISTROS', 'arch debian', 'ubuntu fedora', '$ _'],
    caption: 'my setup',
  },
};
