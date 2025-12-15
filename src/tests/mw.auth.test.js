import request from "supertest";
import { app } from "./jest.setup.js";
import { getToken } from "./helpers/auth.js";

describe("auth.middleware", () => {
  it("rejects when token is missing", async () => {
    const res = await request(app).get("/api/snapshots");
    expect(res.status).toBe(401);
  });

  it("rejects when token is malformed", async () => {
    const res = await request(app).get("/api/snapshots").set("Authorization", "Bearer BAD.TOKEN");
    expect(res.status).toBe(401);
  });

  it("allows when token is valid", async () => {
    const t = await getToken();
    const res = await request(app).get("/api/snapshots").set("Authorization", `Bearer ${t}`);
    expect([200, 204].includes(res.status)).toBe(true);
  });
});
