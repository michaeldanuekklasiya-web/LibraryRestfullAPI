import jwt from "jsonwebtoken";
import UserSession from "../models/UsersSession.js";
import {ResponseError} from "../utils/response.default.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw ResponseError.unauthorized("Session failed", [
        { field: "session", message: "Session expired or invalid" }
      ]);
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw ResponseError.unauthorized("Session failed", [
        { field: "session", message: "Session expired or invalid" }
      ]);
    }

    const session = await UserSession.findOne({
      where: { session_id: payload.session_id, is_active: true },
    });

    if (!session || new Date() > session.expired_at) {
      throw ResponseError.unauthorized("Session failed", [
        { field: "session", message: "Session expired or invalid" }
      ]);
    }

    req.user = {
      id: session.user_id,
      session_id: session.session_id,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;