import { registerUser, loginUser } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const result = await registerUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.user,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginUser(req.body);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result.user,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
}
