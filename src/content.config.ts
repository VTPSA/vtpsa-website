import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
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

const documents = defineCollection({
  loader: file("./src/data/documents.json"),
  schema: z.object({
    title: z.string(),
    category: z.enum(["constitution", "rulebooks", "minutes", "reports"]),
    date: z.coerce.date(),
    file: z.string().startsWith("/documents/"),
  }),
});

export const collections = { clubs, documents };