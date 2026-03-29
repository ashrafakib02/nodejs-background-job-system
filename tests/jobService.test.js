import { createJob } from "../src/services/jobService.js";
import prisma from "../src/config/prisma.js";

describe("Job Service", () => {
  it("should create a job", async () => {
    const job = await createJob({
      type: "email",
      payload: { to: "test@example.com" }
    });

    expect(job).toHaveProperty("id");
    expect(job.type).toBe("email");
  });
});