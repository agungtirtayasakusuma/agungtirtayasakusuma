// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      type: z.enum(['article', 'log']).default('article'), // article vs activity log
      tags: z.array(z.string()).default([]),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      status: z.enum(['completed', 'in-progress', 'planned']).default('completed'),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
      tags: z.array(z.string()).default([]),
      protocols: z.array(z.string()).default([]),   // e.g. OSPF, BGP, STP
      devices: z.array(z.string()).default([]),      // e.g. "3x Cisco 2911"
      topology: image().optional(),                  // topology diagram
      packetTracerFile: z.string().optional(),       // e.g. /downloads/ospf-lab.pkt
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, projects };