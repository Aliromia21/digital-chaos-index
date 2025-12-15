import Snapshot from "../models/Snapshot.model.js";
import { calculateChaosScore } from "../utils/chaosCalculator.js";

function toDayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ===== Helpers  =====
const ALLOWED_SORT_FIELDS = new Set(["date", "createdAt", "chaosScore"]);
function buildSort(sort = "-date") {
  const dir = sort.startsWith("-") ? -1 : 1;
  const field = sort.replace(/^-/, "");
  return ALLOWED_SORT_FIELDS.has(field) ? { [field]: dir } : { date: -1 };
}

// CREATE
export async function createSnapshot(userId, data) {
  const now = data.date ? new Date(data.date) : new Date();
  const chaosScore = calculateChaosScore(data);

  const snapshot = await Snapshot.create({
    userId,
    ...data,
    date: now,
    dayKey: toDayKey(now),
    chaosScore,
  });

  return snapshot;
}

export async function getSnapshots(userId) {
  return Snapshot.find({ userId }).sort({ createdAt: -1 });
}

export async function getSnapshotsPaged(
  userId,
  { page = 1, limit = 10, sort = "-date" } = {}
) {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));
  const sortObj = buildSort(sort);

  const query = { userId };

  const [items, total] = await Promise.all([
    Snapshot.find(query)
      .sort(sortObj)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Snapshot.countDocuments(query),
  ]);

  return {
    items,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum) || 1,
    limit: limitNum,
    sort: Object.keys(sortObj)[0] === "date" && sortObj.date === -1 ? "-date" : sort,
  };
}

export async function getSnapshotById(userId, id) {
  return Snapshot.findOne({ _id: id, userId });
}

export async function updateSnapshot(userId, id, data) {
  const patch = { ...data };

  if (data.date) {
    const dt = new Date(data.date);
    patch.date = dt;
    patch.dayKey = toDayKey(dt);
  }

  const scoreFields = [
    "browserTabs",
    "unusedBookmarks",
    "screenshots",
    "unusedApps",
    "desktopFiles",
    "downloadsFiles",
    "unreadEmails",
    "spamEmails",
  ];
  if (scoreFields.some((k) => k in patch)) {
    const current = await Snapshot.findOne({ _id: id, userId }).lean();
    if (!current) return null;
    const merged = { ...current, ...patch };
    patch.chaosScore = calculateChaosScore(merged);
  }

  return Snapshot.findOneAndUpdate(
    { _id: id, userId },
    { $set: patch },
    { new: true, runValidators: true }
  );
}

// DELETE
export async function deleteSnapshot(userId, id) {
  return Snapshot.findOneAndDelete({ _id: id, userId });
}
