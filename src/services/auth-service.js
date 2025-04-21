import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import RefreshToken from '../models/RefreshToken.js';

const register = async (request) => {
  try {
    const { name, email, password } = request;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("Email already registered");

    const passwordHash = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: passwordHash
    });

    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to register user");
  }
};

const login = async (request) => {
  try {
    const { email, password } = request;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid email or password");

    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to login");
  }
};

const logout = async (decoded) => {
  try {
    await RefreshToken.destroy({
      where: {
        userId: decoded.id,
      },
    });
    
    const existingUser = await User.findByPk(decoded.id);
    if (!existingUser) throw new Error("Invalid email or password");

    return existingUser;
  } catch (error) {
    throw new Error(error.message || "Logout failed");
  }
};

const refresh = async (decoded, refreshToken) => {
  try {
    const tokenRecord = await RefreshToken.findOne({
      where: {
        token: refreshToken,
        userId: decoded.id,
      },
    });
    if (!tokenRecord) throw new Error("Invalid or expired refresh token");

    const existingUser = await User.findByPk(decoded.id);
    if (!existingUser) throw new Error("User not found");

    return existingUser;
  } catch (error) {
    throw new Error(error.message || "Refresh failed");
  }
}

const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const existingToken = await RefreshToken.findOne({
    where: { userId: user.id },
  });

  if (existingToken) {
    await RefreshToken.update(
      { token: refreshToken },
      { where: { userId: user.id } }
    );
  } else {
    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
    });
  }

  return { accessToken, refreshToken };
};

export default {
  register,
  login,
  logout,
  refresh,
  generateTokens
};