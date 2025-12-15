import mongoose from "mongoose";

const snapshotSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },

    // Browser
    browserTabs: { type: Number, default: 0 },
    unusedBookmarks: { type: Number, default: 0 },

    // Mobile
    screenshots: { type: Number, default: 0 },
    unusedApps: { type: Number, default: 0 },

    // Files
    desktopFiles: { type: Number, default: 0 },
    downloadsFiles: { type: Number, default: 0 },

    // Email
    unreadEmails: { type: Number, default: 0 },
    spamEmails: { type: Number, default: 0 },

    chaosScore: { type: Number, required: true },

    dayKey: { type: String, required: true },

    notes: { type: String },
  },
  { timestamps: true }
);

snapshotSchema.index({ userId: 1, dayKey: 1 }, { unique: true });

const Snapshot = mongoose.model("Snapshot", snapshotSchema);
export default Snapshot;
