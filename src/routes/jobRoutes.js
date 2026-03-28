import express from "express";
import { createJobHandler } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJobHandler);

export default router;