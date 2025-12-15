import request from "supertest";
import { app } from "./jest.setup.js";
import { getToken } from "./helpers/auth.js";
import { snapshotPayload } from "./helpers/factories.js";

describe("Snapshot update collisions", () => {
  const base = "/api/snapshots";

  it("returns 409 when updating date to a day that already exists", async () => {
    const t = await getToken();
    const s1 = await request(app).post(base).set("Authorization", `Bearer ${t}`).send(snapshotPayload({ date: "2025-11-15T10:00:00Z" }));
    const s2 = await request(app).post(base).set("Authorization", `Bearer ${t}`).send(snapshotPayload({ date: "2025-11-17T10:00:00Z" }));
    const upd = await request(app)
      .patch(`${base}/${s2.body.data._id}`)
      .set("Authorization", `Bearer ${t}`)
      .send({ date: "2025-11-15T09:00:00Z" });
    expect(upd.status).toBe(409);
  });

  it("recalculates chaosScore when relevant fields change", async () => {
    const t = await getToken("recalc@example.com");
    const created = await request(app).post(base).set("Authorization", `Bearer ${t}`).send(snapshotPayload());
    const id = created.body.data._id;
    const oldScore = created.body.data.chaosScore;

    const upd = await request(app)
      .patch(`${base}/${id}`)
      .set("Authorization", `Bearer ${t}`)
      .send({ browserTabs: 0, unreadEmails: 0, spamEmails: 0 });
    expect(upd.status).toBe(200);
    expect(upd.body.data.chaosScore).toBeLessThanOrEqual(oldScore);
  });
});
