import { jest } from "@jest/globals";            //  ESM
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

//  (MongoMemoryServer)
jest.setTimeout(30000);

let mongo;

const noop = () => {};
if (process.env.NODE_ENV === "test") {
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}

let app;
export { app };

beforeAll(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
  process.env.MONGO_URI = process.env.MONGO_URI || "";
  process.env.NODE_ENV = "test";
  process.env.RATE_LIMIT_DISABLED = "true";

  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri(), { dbName: "testdb" });

  const mod = await import("../app.js");
  app = mod.default;
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});
