import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  postImg: z.string().url().optional(),
  likes: z.array(z.string().length(24)).optional().default([]),
  comments: z.array(z.string().length(24)).optional().default([]),
});

export type PostType = z.infer<typeof PostSchema>;
