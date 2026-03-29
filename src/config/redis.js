import IORedis from "ioredis";

const isTest = process.env.NODE_ENV === "test";

export const redisConnection = isTest
  ? null
  : new IORedis({
      host: "127.0.0.1",
      port: 6379,
      maxRetriesPerRequest: null
    });

if (redisConnection) {
  redisConnection.on("connect", () => {
    console.log("Redis connected");
  });

  redisConnection.on("error", (error) => {
    console.error("Redis error:", error.message);
  });
}