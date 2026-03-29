import { z } from "zod";

export const jobQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  status: z.enum(["pending", "processing", "completed", "failed"]).optional()
});
