import { jobQueue } from "../queues/jobQueue.js";
import { createJob } from "../services/jobService.js";
import { createJobSchema } from "../validators/jobValidator.js";

export const createJobHandler = async (req, res) => {
  try {
    const { type, payload, delay, priority } = createJobSchema.parse(req.body);

    const job = await createJob({ type, payload });

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
      data: job
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};