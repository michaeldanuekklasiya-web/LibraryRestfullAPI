import jwt from "jsonwebtoken";
import authService from "../services/auth.service.js";
import ResponseSuccess from "../utils/response.success.js";
import ResponseError from "../utils/response.error.js";
import { formatUserData } from "../utils/helper.js";

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
    const user = await authService.login(req.body);

    const { accessToken, refreshToken } = await authService.generateTokens(user.id);

    const response = ResponseSuccess.ok("User login successfully", {
      user: formatUserData(user),
      accessToken,
      refreshToken,
    });

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const user = await authService.logout(req.user);

    const response = ResponseSuccess.ok("User logout successfully", {
      user: formatUserData(user),
    });

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(ResponseError.unauthorized("Refresh token not provided"));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await authService.refresh(decoded, refreshToken);

    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const response = ResponseSuccess.ok("Access token refreshed", {
      user: formatUserData(user),
      accessToken,
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
