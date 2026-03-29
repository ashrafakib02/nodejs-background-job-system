import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { processJob, markJobFailed } from "../services/workerService.js";

const worker = new Worker(
  "jobQueue",
  async (job) => {
    const start = Date.now();
    const { jobId, type, payload } = job.data;

    console.log(`Processing job ${job.id}, attempt ${job.attemptsMade + 1}`);

    try {
      await processJob({ jobId, type, payload });

      const duration = Date.now() - start;
      console.log(`Job ${jobId} completed in ${duration}ms`);
    } catch (error) {
      console.error(`Job ${jobId} failed on attempt ${job.attemptsMade + 1}`);

      if (job.attemptsMade + 1 >= job.opts.attempts) {
        await markJobFailed(jobId, error.message);
      }

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
  console.log(`Worker: Job ${job.id} failed`, err.message);
});