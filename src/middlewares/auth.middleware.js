import jwt from "jsonwebtoken";
import ResponseError from "../utils/response.error.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(ResponseError.unauthorized("Access token required"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ← penting!
    next();
  } catch (err) {
    next(ResponseError.unauthorized("Invalid access token"));
  }
};

export default authenticateToken;
