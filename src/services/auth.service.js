import bcryptjs from "bcryptjs";
import { validate } from "../validation/validation.js";
import { registerUserValidation, loginUserValidation } from "../validation/user.validation.js";
import User from "../models/User.js";
import { ResponseError } from "../utils/response.default.js";
// import ResponseError from "../utils/response.error.js";
import logger from "../config/logger.js";

const register = async (request) => {
  const { name, email, password } = validate(registerUserValidation, request);

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser)
    throw ResponseError.conflict("Validation failed", [
      { field: "email", message: "Email already registered" }
    ]);

  const passwordHash = await bcryptjs.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: passwordHash,
  });

  logger.info(`User registered successfully: ${user.id} - ${user.email}`);
  return user;
};

const login = async (request) => {
  const { email, password } = validate(loginUserValidation, request);

  const user = await User.findOne({ where: { email } });
  if (!user) throw ResponseError.unauthorized("Invalid email or password");

  const passwordMatch = await bcryptjs.compare(password, user.password);
  if (!passwordMatch) throw ResponseError.unauthorized("Invalid email or password");

  logger.info(`User logged in successfully: ${user.id} - ${user.email}`);
  return user;
};

const logout = async (decoded) => {
  // await RefreshToken.destroy({
  //   where: {
  //     userId: decoded.id,
  //   },
  // });

  const existingUser = await User.findByPk(decoded.id);
  if (!existingUser) throw ResponseError.unauthorized("User not found");

  logger.info(`User logged out successfully: ${existingUser.id} - ${existingUser.email}`);
  return existingUser;
};

export default {
  register,
  login,
  logout,
};
