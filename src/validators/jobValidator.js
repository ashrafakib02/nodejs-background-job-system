import { z } from "zod";

export const createJobSchema = z.object({
  type: z.string().min(1, "Job type is required"),
  payload: z.record(z.any()).optional().default({}),
  delay: z.number().int().min(0).optional().default(0),
  priority: z.number().int().min(0).optional().default(0)
});