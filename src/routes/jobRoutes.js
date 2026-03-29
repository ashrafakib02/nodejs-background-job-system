import express from "express";
import { createJobHandler } from "../controllers/jobController.js";
import { getJobStatus, getAllJobs } from "../controllers/jobStatusController.js";

const router = express.Router();
/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new background job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 example: email
 *               payload:
 *                 type: object
 *                 example:
 *                   to: test@example.com
 *                   subject: Hello
 *                   body: Test email
 *               delay:
 *                 type: integer
 *                 example: 5000
 *               priority:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Job created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 48
 *                     type:
 *                       type: string
 *                       example: email
 *                     payload:
 *                       type: object
 *                       example:
 *                         to: test@example.com
 *                         subject: Hello
 *                         body: Test email
 *                     status:
 *                       type: string
 *                       example: pending
 *                     failedReason:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-29T06:15:44.468Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-29T06:15:44.468Z
 *       400:
 *         description: Invalid request body
 */
router.post("/", createJobHandler);
/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs with pagination and filtering
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number (default = 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of jobs per page (default = 10)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, completed, failed]
 *         required: false
 *         description: Filter jobs by status
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Jobs fetched successfully
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 48
 *                       type:
 *                         type: string
 *                         example: email
 *                       payload:
 *                         type: object
 *                         properties:
 *                           to:
 *                             type: string
 *                             example: test@example.com
 *                       status:
 *                         type: string
 *                         enum: [pending, processing, completed, failed]
 *                         example: pending
 *                       failedReason:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-29T06:15:44.468Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-29T06:15:44.468Z
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 48
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 */
router.get("/", getAllJobs);
/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a single job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Job fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 48
 *                     type:
 *                       type: string
 *                       example: email
 *                     status:
 *                       type: string
 *                       enum: [pending, processing, completed, failed]
 *                       example: pending
 *                     failedReason:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-29T06:15:44.468Z
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Job not found
 */
router.get("/:id", getJobStatus);

export default router;