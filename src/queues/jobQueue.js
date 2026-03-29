import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const jobQueue = redisConnection
  ? new Queue("jobQueue", {
      connection: redisConnection
    })
  : null;