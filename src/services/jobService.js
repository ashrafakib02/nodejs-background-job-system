import prisma from "../config/prisma.js";

export const createJob = async ({ type, payload }) => {
  return prisma.job.create({
    data: {
      type,
      payload
    }
  });
};

export const updateJobStatus = async (id, status) => {
  return prisma.job.update({
    where: { id },
    data: { status }
  });
};