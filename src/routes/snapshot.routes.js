// src/routes/snapshot.routes.js
import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  addSnapshot,
  listSnapshots,
  getOneSnapshot,
  updateSnapshotCtrl,
  deleteSnapshotCtrl,
} from "../controllers/snapshot.controller.js";
import {
  snapshotSchema,
  snapshotUpdateSchema,
  paginationQuerySchema,      // ✅ سكيمة كويري الترقيم
} from "../utils/validation.schemas.js";
import validate from "../middleware/validate.middleware.js";
import validateQuery from "../middleware/validateQuery.middleware.js"; // ✅ ميدل وير للتحقق من req.query

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Snapshots
 *   description: Manage user digital chaos snapshots
 */

/**
 * @openapi
 * /snapshots:
 *   post:
 *     summary: Create a new snapshot
 *     description: Creates a new daily snapshot and calculates the chaos score.
 *     tags: [Snapshots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SnapshotInput'
 *     responses:
 *       201:
 *         description: Snapshot created successfully
 *       409:
 *         description: Snapshot already exists for this day
 *       400:
 *         description: Validation error
 */
router.post("/", auth, validate(snapshotSchema), addSnapshot);

/**
 * @openapi
 * /snapshots:
 *   get:
 *     summary: Get paginated snapshots for the authenticated user
 *     tags: [Snapshots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Page size (max 100)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [date, -date, chaosScore, -chaosScore]
 *           default: -date
 *         description: Sort field and direction
 *     responses:
 *       200:
 *         description: Paged snapshot list
 */
router.get(
  "/",
  auth,
  validateQuery(paginationQuerySchema), // ✅ يتحقق من page/limit/sort
  listSnapshots
);

/**
 * @openapi
 * /snapshots/{id}:
 *   get:
 *     summary: Get a single snapshot by ID
 *     tags: [Snapshots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Snapshot ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Snapshot found
 *       404:
 *         description: Snapshot not found
 */
router.get("/:id", auth, getOneSnapshot);

/**
 * @openapi
 * /snapshots/{id}:
 *   patch:
 *     summary: Update an existing snapshot
 *     tags: [Snapshots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Snapshot ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SnapshotUpdateInput'
 *     responses:
 *       200:
 *         description: Snapshot updated successfully
 *       404:
 *         description: Snapshot not found
 *       409:
 *         description: Snapshot for that day already exists
 */
router.patch("/:id", auth, validate(snapshotUpdateSchema), updateSnapshotCtrl);

/**
 * @openapi
 * /snapshots/{id}:
 *   delete:
 *     summary: Delete a snapshot by ID
 *     tags: [Snapshots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Snapshot ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Snapshot deleted successfully
 *       404:
 *         description: Snapshot not found
 */
router.delete("/:id", auth, deleteSnapshotCtrl);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     SnapshotInput:
 *       type: object
 *       required:
 *         - browserTabs
 *         - unusedBookmarks
 *         - screenshots
 *         - unusedApps
 *         - desktopFiles
 *         - downloadsFiles
 *         - unreadEmails
 *         - spamEmails
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-12-01T10:00:00Z"
 *         browserTabs:
 *           type: integer
 *           example: 12
 *         unusedBookmarks:
 *           type: integer
 *           example: 5
 *         screenshots:
 *           type: integer
 *           example: 8
 *         unusedApps:
 *           type: integer
 *           example: 2
 *         desktopFiles:
 *           type: integer
 *           example: 20
 *         downloadsFiles:
 *           type: integer
 *           example: 10
 *         unreadEmails:
 *           type: integer
 *           example: 150
 *         spamEmails:
 *           type: integer
 *           example: 30
 *         notes:
 *           type: string
 *           example: "Today's digital chaos snapshot"
 *
 *     SnapshotUpdateInput:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-12-02T09:30:00Z"
 *         browserTabs:
 *           type: integer
 *           example: 5
 *         unusedBookmarks:
 *           type: integer
 *         screenshots:
 *           type: integer
 *         unusedApps:
 *           type: integer
 *         desktopFiles:
 *           type: integer
 *         downloadsFiles:
 *           type: integer
 *         unreadEmails:
 *           type: integer
 *         spamEmails:
 *           type: integer
 *         notes:
 *           type: string
 *           example: "Cleaned my desktop"
 */
