import { jobQueue } from "../queues/jobQueue.js";
import { createJob } from "../services/jobService.js";

export const createJobHandler = async (req, res) => {
  try {
    const { type, payload, delay = 0, priority = 0  } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Job type is required"
      });
    }

    // save job in DB
    const job = await createJob({ type, payload });

    // push to queue
   await jobQueue.add(
  "job",
  {
    jobId: job.id,
    type,
    payload
  },
  {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000
    },
    delay,
    priority,
    removeOnComplete: true,
    removeOnFail: false
  }
);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    });
    console.log("Job pushed to queue:", job.id);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};