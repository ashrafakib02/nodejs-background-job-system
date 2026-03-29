import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import prisma from "../config/prisma.js";

const worker = new Worker(
  "jobQueue",
  async (job) => {
    console.log("Processing job:", job.data);

    const { jobId, type, payload } = job.data;
    const start = Date.now();
    const duration = Date.now() - start;
    console.log(`Job ${jobId} took ${duration}ms`);

    
    try {
      await prisma.job.update({
        where: { id: jobId },
        data: { status: "processing" },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Job type inside worker:", type);
      if (type === "email") {
        console.log("Sending email to:", payload.to);
      } else {
        throw new Error("Unknown job type");
      }

      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "failed",
          failedReason: error.message,
        },
      });

      console.log("Job completed:", jobId);

      await jobQueue.add(
        "job",
        {
          jobId: job.id,
          type,
          payload,
        },
        {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 2000,
          },
          removeOnComplete: true,
          removeOnFail: false,
        },
      );
    } catch (error) {
      console.error("Job failed:", jobId, error.message);

      await prisma.job.update({
        where: { id: jobId },
        data: { status: "failed", failedReason: error.message },
      });

      throw error;
    }
  },
  {
    connection: redisConnection,
  },
);

worker.on("completed", (job) => {
  console.log(`Worker: Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Worker: Job ${job?.id} failed`, err.message);
});
