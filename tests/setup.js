import prisma from "../src/config/prisma.js";
import { redisConnection } from "../src/config/redis.js";
import { jobQueue } from "../src/queues/jobQueue.js";

afterAll(async () => {
  await jobQueue.close();
  await prisma.$disconnect();
  await redisConnection.quit();
});