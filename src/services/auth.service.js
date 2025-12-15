import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { signAccessToken } from "../config/jwt.js";

function createError(message, status = 400) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw createError("Name, email and password are required", 400);
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw createError("User already exists", 409);
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  const token = signAccessToken({ userId: user._id });

  const userSafe = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  return { user: userSafe, token };
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    throw createError("Email and password are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createError("Invalid credentials", 401);
  }

  const token = signAccessToken({ userId: user._id });

  const userSafe = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  return { user: userSafe, token };
}
