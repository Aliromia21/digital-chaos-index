import express from "express";
import authRoutes from "./auth.routes.js";
import snapshotRoutes from "./snapshot.routes.js";
import dashboardRoutes from "./dashboard.routes.js";



const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Digital Chaos API is running 👌🔥" });
});

router.use("/auth", authRoutes);
router.use("/snapshots", snapshotRoutes);
router.use("/dashboard", dashboardRoutes);


export default router;
