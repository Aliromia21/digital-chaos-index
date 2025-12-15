// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import router from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import { setupSwagger } from "./docs/swagger.js";

const app = express();

// ==============================
// Security & Middlewares
// ==============================
app.use(helmet());

//Rate limiting
if (process.env.NODE_ENV !== "test" && process.env.RATE_LIMIT_DISABLED !== "true") {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,                 // 300 request per IP
  });
  app.use(limiter);
}

// CORS
app.use(cors({ origin: true, credentials: true }));

// Body parser
app.use(express.json());

// Logger Just in Development Mode)
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// ==============================
// Docs & Routes
// ==============================
setupSwagger(app);
app.use("/api", router);

// ==============================
// Global error handler
// ==============================
app.use(errorHandler);

export default app;
