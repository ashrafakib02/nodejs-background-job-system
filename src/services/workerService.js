import prisma from "../config/prisma.js";

export const processJob = async ({ jobId, type, payload }) => {
  await prisma.job.update({
    where: { id: jobId },
    data: { status: "processing", failedReason: null }
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (type !== "email") {
    throw new Error("Unknown job type");
  }

  console.log("Sending email to:", payload.to);

  await prisma.job.update({
    where: { id: jobId },
    data: { status: "completed" }
  });

  return true;
};

export const markJobFailed = async (jobId, reason) => {
  await prisma.job.update({
    where: { id: jobId },
    data: {
      status: "failed",
      failedReason: reason
    }
  });
};