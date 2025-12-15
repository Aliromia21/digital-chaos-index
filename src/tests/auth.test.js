import request from "supertest";
import { app } from "./jest.setup.js";

describe("Auth", () => {
  const base = "/api/auth";

  it("registers a user", async () => {
    const res = await request(app).post(`${base}/register`).send({
      name: "Ali",
      email: "ali@example.com",
      password: "123456",
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe("ali@example.com");
  });

  it("logs in a user", async () => {
    await request(app).post(`${base}/register`).send({
      name: "Ali",
      email: "ali@example.com",
      password: "123456",
    });
    const res = await request(app).post(`${base}/login`).send({
      email: "ali@example.com",
      password: "123456",
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });
});
