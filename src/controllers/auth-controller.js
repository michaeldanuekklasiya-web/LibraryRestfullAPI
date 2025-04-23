import jwt from 'jsonwebtoken';
import authService from "../services/auth-service.js";
import ResponseSuccess from '../utils/response-success.js';
import { formatUserData } from '../utils/helper.js';

const registerUser = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    const response = ResponseSuccess.created("User created successfully", {
      user: formatUserData(user)
    });

    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error"
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await authService.login(req.body);
    const { accessToken, refreshToken } = await authService.generateTokens(user);

    const response = ResponseSuccess.ok("User login successfully", {
      user: formatUserData(user),
      accessToken,
      refreshToken
    });

    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: error.message || "Login failed"
    });
  }
};

const logoutUser = async (req, res) => {

  try {
    const user = await authService.logout(decoded);

    const response = ResponseSuccess.ok("User logout successfully", {
      user: formatUserData(user)
    })

    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      error: true,
      message: "Refresh token not provided",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await authService.refresh(decoded, refreshToken);

    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const response = ResponseSuccess.ok("Access token refreshed", {
      user: formatUserData(user),
      accessToken
    });

    return res.status(response.status).json(response);
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      error: true,
      message: error.message || "Failed to refresh access token",
    });
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken
};