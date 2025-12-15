import request from "supertest";
import { app } from "./jest.setup.js";
import { getToken } from "./helpers/auth.js";
import { snapshotPayload } from "./helpers/factories.js";

describe("Snapshots", () => {
  const base = "/api/snapshots";

  it("creates snapshot", async () => {
    const t = await getToken();
    const res = await request(app)
      .post(base)
      .set("Authorization", `Bearer ${t}`)
      .send(snapshotPayload());
    expect(res.status).toBe(201);
  });

  it("rejects duplicate same-day snapshot", async () => {
    const t = await getToken();
    await request(app)
      .post(base)
      .set("Authorization", `Bearer ${t}`)
      .send(snapshotPayload());
    const second = await request(app)
      .post(base)
      .set("Authorization", `Bearer ${t}`)
      .send(snapshotPayload());
    expect(second.status).toBe(409);
  });

  it("paginates correctly", async () => {
    const t = await getToken();
    await request(app).post(base).set("Authorization", `Bearer ${t}`).send(snapshotPayload({ date: "2025-11-15T10:00:00Z" }));
    await request(app).post(base).set("Authorization", `Bearer ${t}`).send(snapshotPayload({ date: "2025-11-17T10:00:00Z" }));
    await request(app).post(base).set("Authorization", `Bearer ${t}`).send(snapshotPayload({ date: "2025-12-01T10:00:00Z" }));

    const res = await request(app)
      .get(`${base}?page=1&limit=2&sort=-date`)
      .set("Authorization", `Bearer ${t}`);
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(2);
  });
});
