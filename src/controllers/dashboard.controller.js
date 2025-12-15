import { getTodaySnapshot, getWeekTrend, getGlobalStats } from "../services/dashboard.service.js";

export async function today(req, res, next) {
  try {
    const data = await getTodaySnapshot(req.user.id);
    return res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
}

export async function week(req, res, next) {
  try {
    const data = await getWeekTrend(req.user.id);
    return res.status(200).json({ success: true, ...data });
  } catch (err) { next(err); }
}

export async function stats(req, res, next) {
  try {
    const data = await getGlobalStats(req.user.id);
    return res.status(200).json({ success: true, data });
  } catch (err) { next(err); }
}
