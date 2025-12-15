import request from "supertest";
import { app } from "./jest.setup.js";
import { getToken } from "./helpers/auth.js";

describe("Dashboard empty states", () => {
  it("returns null/empty when no snapshots exist", async () => {
    const t = await getToken("empty@example.com");
    const today = await request(app).get("/api/dashboard/today").set("Authorization", `Bearer ${t}`);
    expect(today.status).toBe(200);
    expect(today.body.success).toBe(true);

    const week = await request(app).get("/api/dashboard/week").set("Authorization", `Bearer ${t}`);
    expect(week.status).toBe(200);
    expect(Array.isArray(week.body.trend)).toBe(true);

    const stats = await request(app).get("/api/dashboard/stats").set("Authorization", `Bearer ${t}`);
    expect(stats.status).toBe(200);
    expect(stats.body.success).toBe(true);
  });
});
