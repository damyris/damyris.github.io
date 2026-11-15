import { z } from 'astro/zod';

export const projectStatuses = ['shipped', 'in-progress', 'planned', 'coming-soon'] as const;
export const folderColors = ['blue', 'ink', 'yellow', 'green', 'pink'] as const;

export const sheetSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('quiz'),
    label: z.string(),
    question: z.string(),
    answers: z.tuple([z.string(), z.string(), z.string(), z.string()]),
    correct: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  }),
  z.object({ type: z.literal('terminal'), lines: z.array(z.string()).min(1) }),
  z.object({ type: z.literal('ascii'), art: z.string(), caption: z.string() }),
  z.object({ type: z.literal('stamp') }),
]);

export const projectSchema = z.object({
  title: z.string(),
  order: z.number().int(),
  status: z.enum(projectStatuses),
  color: z.enum(folderColors).optional(),
  summary: z.string(),
  link: z.string().url().optional(),
  sheet: sheetSchema,
});

export const writeupSchema = z.object({
  title: z.string(),
  platform: z.string(),
  date: z.coerce.date(),
  difficulty: z.string().optional(),
  tags: z.array(z.string()).optional(),
  summary: z.string(),
});

export type Sheet = z.infer<typeof sheetSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type WriteupData = z.infer<typeof writeupSchema>;
export type ProjectStatus = (typeof projectStatuses)[number];
export type FolderColor = (typeof folderColors)[number];
