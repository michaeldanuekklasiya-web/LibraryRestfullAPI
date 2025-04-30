import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import authService from "../services/auth.service.js";
import ResponseSuccess from "../utils/response.success.js";
import ResponseError from "../utils/response.error.js";
import { formatUserData } from "../utils/helper.js";
import User from "../models/User.js";
import UsersSession from "../models/UsersSession.js";

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

    await UsersSession.update(
      { is_active: false },
      { where: { user_id: user.id, is_active: true } }
    );

    const sessionId = uuidv4();
    await UsersSession.create({
      session_id: sessionId,
      user_id: user.id,
      expired_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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

    const session = await UsersSession.findOne({
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

export default {
  registerUser,
  loginUser,
  logoutUser,
};
