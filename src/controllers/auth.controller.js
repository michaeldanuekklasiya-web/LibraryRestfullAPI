import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import authService from "../services/auth.service.js";
import ResponseSuccess from "../utils/response.success.js";
import ResponseError from "../utils/response.error.js";
import { formatUserData } from "../utils/helper.js";
import User from "../models/User.js";
import UserSession from "../models/UserSession.js";

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    const response = ResponseSuccess.created("User created successfully", {
      user: formatUserData(user),
    });

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      throw ResponseError.unauthorized("Invalid credentials");
    }

    // Hapus semua session aktif sebelumnya
    await UserSession.update(
      { is_active: false },
      { where: { user_id: user.id, is_active: true } }
    );

    // Buat session baru
    const sessionId = uuidv4();
    await UserSession.create({
      session_id: sessionId,
      user_id: user.id,
      expired_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 hari
    });

    const token = jwt.sign({ session_id: sessionId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = ResponseSuccess.ok("User login successfully", {
      token,
    });

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw ResponseError.unauthorized("Unauthorized");

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const session = await UserSession.findOne({
      where: { session_id: payload.session_id },
    });

    if (!session || !session.is_active) {
      return res.status(200).json({
        error: false,
        message: "Already logged out",
      });
    }

    await session.update({ is_active: false });

    return res.status(200).json({
      error: false,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

// optional: refreshAccessToken kalau mau disesuaikan session based
const refreshAccessToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(ResponseError.unauthorized("Refresh token not provided"));
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const session = await UserSession.findOne({
      where: { session_id: payload.session_id, is_active: true },
    });

    if (!session) {
      throw ResponseError.unauthorized("Session expired or invalid");
    }

    const newAccessToken = jwt.sign({ session_id: session.session_id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const response = ResponseSuccess.ok("Access token refreshed", {
      accessToken: newAccessToken,
    });

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
};
