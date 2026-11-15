import type { FolderColor, ProjectData, ProjectStatus, Sheet, WriteupData } from './schemas';

export type Entry<T> = { id: string; data: T };

export type FolderSheet = Sheet | { type: 'list'; items: { title: string; href: string }[]; count: number };

export interface FolderModel {
  number: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  statusText: string;
  color: FolderColor;
  href: string;
  external: boolean;
  linkLabel: string;
  sheet: FolderSheet;
}

const palette: FolderColor[] = ['blue', 'ink', 'yellow', 'green', 'pink'];

const statusText: Record<ProjectStatus, string> = {
  shipped: 'shipped',
  'in-progress': 'in progress',
  planned: 'planned',
  'coming-soon': 'coming soon',
};

export function statusLabel(s: ProjectStatus): string {
  return statusText[s];
}

/** Newest first; ties broken by title so the order never flickers between builds. */
export function newestFirst<T extends Entry<WriteupData>>(writeups: T[]): T[] {
  return [...writeups].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime() || a.data.title.localeCompare(b.data.title),
  );
}

/** When tabs would overlap enough to hide their numbers, show the compact "01" label instead. */
export function tabLayout(count: number): { compactWide: boolean; compactNarrow: boolean } {
  return { compactWide: count > 4, compactNarrow: count > 2 };
}

export function buildFolders(projects: Entry<ProjectData>[], writeups: Entry<WriteupData>[]): FolderModel[] {
  const sorted = [...projects].sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));

  const folders: Omit<FolderModel, 'number'>[] = sorted.map((p, i) => ({
    title: p.data.title,
    summary: p.data.summary,
    status: p.data.status,
    statusText: statusLabel(p.data.status),
    color: p.data.color ?? palette[i % palette.length],
    href: p.data.link ?? `/projects/${p.id}/`,
    external: Boolean(p.data.link),
    linkLabel: 'View project ↗',
    sheet: p.data.sheet,
  }));

  const recent = newestFirst(writeups);
  const status: ProjectStatus = recent.length ? 'in-progress' : 'coming-soon';
  folders.push({
    title: 'Lab Writeups',
    summary: 'Every box I root, written up: recon, foothold, and what the defender should fix.',
    status,
    statusText: statusLabel(status),
    color: 'green',
    href: '/writeups/',
    external: false,
    linkLabel: 'View writeups ↗',
    sheet: recent.length
      ? {
          type: 'list',
          items: recent.slice(0, 3).map((w) => ({ title: w.data.title, href: `/writeups/${w.id}/` })),
          count: recent.length,
        }
      : { type: 'stamp' },
  });

  return folders.map((f, i) => ({ ...f, number: String(i + 1).padStart(2, '0') }));
}
