import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const clubs = defineCollection({
  loader: glob({ base: "./src/content/clubs", pattern: "*.json" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image(),
      website: z.string().url().optional(),
      location: z.string(),
      contact: z.object({
        name: z.string(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
      }),
    }),
});

export const collections = { clubs };