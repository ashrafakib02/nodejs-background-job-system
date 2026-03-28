import express from "express";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Job system API running" });
});
app.use("/api/jobs", jobRoutes);

export default app;