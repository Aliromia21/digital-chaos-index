// src/utils/validation.schemas.js
import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const snapshotSchema = Joi.object({
  date: Joi.date().optional(),
  browserTabs: Joi.number().min(0).required(),
  unusedBookmarks: Joi.number().min(0).required(),
  screenshots: Joi.number().min(0).required(),
  unusedApps: Joi.number().min(0).required(),
  desktopFiles: Joi.number().min(0).required(),
  downloadsFiles: Joi.number().min(0).required(),
  unreadEmails: Joi.number().min(0).required(),
  spamEmails: Joi.number().min(0).required(),
  notes: Joi.string().max(500).allow("", null),
});

export const snapshotUpdateSchema = Joi.object({
  date: Joi.date().optional(),
  browserTabs: Joi.number().min(0),
  unusedBookmarks: Joi.number().min(0),
  screenshots: Joi.number().min(0),
  unusedApps: Joi.number().min(0),
  desktopFiles: Joi.number().min(0),
  downloadsFiles: Joi.number().min(0),
  unreadEmails: Joi.number().min(0),
  spamEmails: Joi.number().min(0),
  notes: Joi.string().max(500).allow("", null),
}).min(1);

//  snapshots
export const paginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  // date | -date | chaosScore | -chaosScore
  sort: Joi.string()
    .valid("date", "-date", "chaosScore", "-chaosScore")
    .default("-date"),
});
