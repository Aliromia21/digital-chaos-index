import request from "supertest";
import { app } from "./jest.setup.js";
import { getToken } from "./helpers/auth.js";

describe("error.middleware", () => {
  it("handles cast errors gracefully", async () => {
    const t = await getToken();
    const res = await request(app)
      .get("/api/snapshots/NOT_AN_OBJECT_ID")
      .set("Authorization", `Bearer ${t}`);
    expect([400, 500]).toContain(res.status);
    expect(res.body.success).toBe(false);
  });
});
