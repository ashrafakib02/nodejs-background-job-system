import prisma from "../config/prisma.js";
import { jobQuerySchema } from "../validators/jobQueryValidator.js";
import { getJobs } from "../services/jobService.js";

export const getJobStatus = async (req, res) => {
  const job = await prisma.job.findUnique({
    where: { id: Number(req.params.id) }
  });

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Job fetched successfully",
    data: {
      id: job.id,
      type: job.type,
      status: job.status,
      failedReason: job.failedReason,
      createdAt: job.createdAt
    }
  });
};

export const getAllJobs = async (req, res) => {
  try {
    const query = jobQuerySchema.parse(req.query);
    const result = await getJobs(query);

    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      ...result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};