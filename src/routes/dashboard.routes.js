import express from "express";
import auth from "../middleware/auth.middleware.js";
import { today, week, stats } from "../controllers/dashboard.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Dashboard
 *   description: Analytics & insights for your digital chaos
 */

/**
 * @openapi
 * /dashboard/today:
 *   get:
 *     summary: Get the latest snapshot (today/most recent)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest snapshot (or null if none)
 */
router.get("/today", auth, today);

/**
 * @openapi
 * /dashboard/week:
 *   get:
 *     summary: Get trend & summary for the last 7 days
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weekly trend and summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 trend:
 *                   type: array
 *                   description: Aggregated daily scores for last 7 days
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "2025-11-25"
 *                       avgScore:
 *                         type: number
 *                         example: 62.5
 *                       minScore:
 *                         type: number
 *                         example: 40
 *                       maxScore:
 *                         type: number
 *                         example: 90
 *                       count:
 *                         type: integer
 *                         example: 2
 *                 summary:
 *                   type: object
 *                   properties:
 *                     avg:
 *                       type: number
 *                       example: 58.3
 *                     min:
 *                       type: number
 *                       example: 20
 *                     max:
 *                       type: number
 *                       example: 100
 *                     count:
 *                       type: integer
 *                       example: 7
 */
router.get("/week", auth, week);

/**
 * @openapi
 * /dashboard/stats:
 *   get:
 *     summary: Get global stats (best/worst day, averages)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Global stats across all snapshots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     avg:
 *                       type: number
 *                       example: 47.8
 *                     min:
 *                       type: number
 *                       example: 5
 *                     max:
 *                       type: number
 *                       example: 100
 *                     count:
 *                       type: integer
 *                       example: 23
 *                     bestDay:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-11-20T10:00:00.000Z"
 *                         score:
 *                           type: number
 *                           example: 12
 *                         id:
 *                           type: string
 *                           example: "6543a1b2c3..."
 *                     worstDay:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         date:
 *                           type: string
 *                           format: date-time
 *                         score:
 *                           type: number
 *                         id:
 *                           type: string
 */
router.get("/stats", auth, stats);

export default router;
