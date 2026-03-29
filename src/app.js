import express from "express";
import jobRoutes from "./routes/jobRoutes.js";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.json({ message: "Job system API running" });
});
app.use("/api/jobs", jobRoutes);
app.use(morgan("dev"));


export default app;