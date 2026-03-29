import express from "express";
import { createJobHandler } from "../controllers/jobController.js";
import { getAllJobs } from "../controllers/jobStatusController.js";

const router = express.Router();

router.post("/", createJobHandler);
router.get("/", getAllJobs);
export default router;