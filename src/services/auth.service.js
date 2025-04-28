import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { validate } from "../validation/validation.js";
import { registerUserValidation, loginUserValidation } from "../validation/user.validation.js";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import ResponseError from "../utils/response.error.js";

const register = async (request) => {
  const { name, email, password } = validate(registerUserValidation, request);

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw ResponseError.conflict("Email already registered");

  const passwordHash = await bcryptjs.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: passwordHash,
  });

  return user;
};

const login = async (request) => {
  const { email, password } = validate(loginUserValidation, request);

  const user = await User.findOne({ where: { email } });
  if (!user) throw ResponseError.unauthorized("Invalid email or password");

  const passwordMatch = await bcryptjs.compare(password, user.password);
  if (!passwordMatch) throw ResponseError.unauthorized("Invalid email or password");

  return user;
};

const logout = async (decoded) => {
  await RefreshToken.destroy({
    where: {
      userId: decoded.id,
    },
  });

  const existingUser = await User.findByPk(decoded.id);
  if (!existingUser) throw ResponseError.unauthorized("User not found");

  return existingUser;
};

const refresh = async (decoded, refreshToken) => {
  const tokenRecord = await RefreshToken.findOne({
    where: {
      token: refreshToken,
      userId: decoded.id,
    },
  });

  if (!tokenRecord) throw ResponseError.unauthorized("Invalid or expired refresh token");

  const existingUser = await User.findByPk(decoded.id);
  if (!existingUser) throw ResponseError.notFound("User not found");

  return existingUser;
};

const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const existingToken = await RefreshToken.findOne({
    where: { userId: user.id },
  });

  if (existingToken) {
    await RefreshToken.update({ token: refreshToken }, { where: { userId: user.id } });
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
  generateTokens,
};
