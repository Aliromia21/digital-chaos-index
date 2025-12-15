import request from "supertest";
import { app } from "./jest.setup.js";
import { getToken } from "./helpers/auth.js";

describe("validateQuery.middleware", () => {
  it("returns 400 when query is invalid", async () => {
    const t = await getToken();
    const res = await request(app)
      .get("/api/snapshots?limit=0") // limit  
      .set("Authorization", `Bearer ${t}`);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Query validation error/i);
  });
});
