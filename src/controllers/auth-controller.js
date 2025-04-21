import jwt from 'jsonwebtoken';
import authService from "../services/auth-service.js";

const registerUser = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      error: false,
      message: "User created successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
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

    return res.status(200).json({
      error: false,
      message: "User login successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: error.message || "Login failed"
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized, token not found",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid or expired token",
      });
    }

    const user = await authService.logout(decoded);

    if (user) {
      return res.status(200).json({
        error: false,
        message: "User logout successfully",
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        }
      });
    }

    return res.status(400).json({
      error: true,
      message: "Failed to log out",
    });
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

    return res.status(200).json({
      error: false,
      message: "Access token refreshed",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        accessToken
      }
    });
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
