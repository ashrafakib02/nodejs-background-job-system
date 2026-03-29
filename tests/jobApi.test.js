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

    console.log("API test response:", res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});