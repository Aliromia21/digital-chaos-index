import mongoose from "mongoose";
import Snapshot from "../models/Snapshot.model.js";

export async function getTodaySnapshot(userId) {
  return Snapshot.findOne({ userId })
    .sort({ date: -1, createdAt: -1 })
    .lean();
}

export async function getWeekTrend(userId) {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 6); 
  const data = await Snapshot.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), date: { $gte: sevenDaysAgo } } },
    {
      $addFields: {
        day: {
          $dateToString: { format: "%Y-%m-%d", date: "$date" }
        }
      }
    },
    {
      $group: {
        _id: "$day",
        avgScore: { $avg: "$chaosScore" },
        minScore: { $min: "$chaosScore" },
        maxScore: { $max: "$chaosScore" },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const allScores = await Snapshot.find({
    userId,
    date: { $gte: sevenDaysAgo }
  }).select("chaosScore").lean();

  const scores = allScores.map(s => s.chaosScore);
  const summary = scores.length
    ? {
        avg: Number((scores.reduce((a,b)=>a+b,0) / scores.length).toFixed(2)),
        min: Math.min(...scores),
        max: Math.max(...scores),
        count: scores.length
      }
    : { avg: 0, min: 0, max: 0, count: 0 };

  return { trend: data, summary };
}

export async function getGlobalStats(userId) {
  const overall = await Snapshot.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        avg: { $avg: "$chaosScore" },
        min: { $min: "$chaosScore" },
        max: { $max: "$chaosScore" },
        count: { $sum: 1 }
      }
    }
  ]);

  const avg = overall[0]?.avg ? Number(overall[0].avg.toFixed(2)) : 0;
  const min = overall[0]?.min ?? 0;
  const max = overall[0]?.max ?? 0;
  const count = overall[0]?.count ?? 0;

  const best = await Snapshot.findOne({ userId }).sort({ chaosScore: 1, date: 1 }).lean();
  const worst = await Snapshot.findOne({ userId }).sort({ chaosScore: -1, date: -1 }).lean();

  return {
    avg, min, max, count,
    bestDay: best ? { date: best.date, score: best.chaosScore, id: best._id } : null,
    worstDay: worst ? { date: worst.date, score: worst.chaosScore, id: worst._id } : null
  };
}
