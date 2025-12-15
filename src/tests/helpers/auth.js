import request from "supertest";
import { app } from "../jest.setup.js";

export async function getToken(email = "ali@example.com") {
  await request(app).post("/api/auth/register").send({
    name: "Ali",
    email,
    password: "123456",
  });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password: "123456" });

  return res.body.token;
}
