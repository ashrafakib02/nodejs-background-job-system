import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import prisma from "../config/prisma.js";

const worker = new Worker(
  "jobQueue",
  async (job) => {
    console.log("Processing job:", job.data);

    const { jobId, type, payload } = job.data;

    try {
      await prisma.job.update({
        where: { id: jobId },
        data: { status: "processing" }
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
        data: { status: "completed" }
      });

      console.log("Job completed:", jobId);
    } catch (error) {
      console.error("Job failed:", jobId, error.message);

      await prisma.job.update({
        where: { id: jobId },
        data: { status: "failed" }
      });

      throw error;
    }
  },
  {
    connection: redisConnection
  }
);

worker.on("completed", (job) => {
  console.log(`Worker: Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Worker: Job ${job?.id} failed`, err.message);
});