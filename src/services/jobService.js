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

export const getJobs = async ({ status, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const where = {
    ...(status ? { status } : {})
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.job.count({ where })
  ]);

  return {
    jobs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};