import request from "supertest";
import { app } from "./jest.setup.js";
import { getToken } from "./helpers/auth.js";
import { snapshotPayload } from "./helpers/factories.js";

describe("Dashboard", () => {
  it("responds correctly", async () => {
    const t = await getToken();
    const base = "/api/snapshots";

    await request(app).post(base).set("Authorization", `Bearer ${t}`).send(snapshotPayload({ date: "2025-11-15T10:00:00Z" }));
    await request(app).post(base).set("Authorization", `Bearer ${t}`).send(snapshotPayload({ date: "2025-11-17T10:00:00Z" }));
    await request(app).post(base).set("Authorization", `Bearer ${t}`).send(snapshotPayload({ date: "2025-12-01T10:00:00Z" }));

    const today = await request(app).get("/api/dashboard/today").set("Authorization", `Bearer ${t}`);
    expect(today.status).toBe(200);

    const week = await request(app).get("/api/dashboard/week").set("Authorization", `Bearer ${t}`);
    expect(week.status).toBe(200);
    expect(Array.isArray(week.body.trend)).toBe(true);

    const stats = await request(app).get("/api/dashboard/stats").set("Authorization", `Bearer ${t}`);
    expect(stats.status).toBe(200);
    expect(stats.body.data).toHaveProperty("avg");
  });
});
