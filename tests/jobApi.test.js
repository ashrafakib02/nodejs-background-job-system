import request from "supertest";
import app from "../src/app.js";

describe("Job API", () => {
  it("should create a job", async () => {
    const res = await request(app).post("/api/jobs").send({
      type: "email",
      payload: {
        to: "test@example.com"
      }
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.type).toBe("email");
  });

  it("should fail when job type is missing", async () => {
    const res = await request(app).post("/api/jobs").send({
      payload: {
        to: "test@example.com"
      }
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should get all jobs", async () => {
    const res = await request(app).get("/api/jobs");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.jobs)).toBe(true);
  });

    it("should get a job by id", async () => {
    const createRes = await request(app).post("/api/jobs").send({
      type: "email",
      payload: {
        to: "single@example.com"
      }
    });

    const jobId = createRes.body.data.id;

    const res = await request(app).get(`/api/jobs/${jobId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(jobId);
  });
    it("should return 404 for non-existing job", async () => {
    const res = await request(app).get("/api/jobs/999999");

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
    it("should filter jobs by status", async () => {
    const res = await request(app).get("/api/jobs?status=pending");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.jobs)).toBe(true);
  });
    it("should paginate jobs", async () => {
    const res = await request(app).get("/api/jobs?page=1&limit=2");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.pagination).toHaveProperty("page");
    expect(res.body.pagination).toHaveProperty("limit");
  });
});