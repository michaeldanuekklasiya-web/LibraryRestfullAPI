import { v4 as uuidv4 } from 'uuid';
import logger from '../config/logger.js';
import ResponseError from "../utils/response.error.js";

const errorMiddleware = (err, req, res, next) => {
  const requestId = uuidv4();
  const errorMessage = err?.message || err?.toString() || "Unknown error";

  if (err instanceof ResponseError) {
    logger.warn(`Error occurred with Request ID: ${requestId}, Message: ${errorMessage}`, {
      request_id: requestId,
      error_stack: err.stack,
    });

    return res.status(err.status).json({
      error: true,
      message: errorMessage,
      ...(err.errors && { errors: err.errors }),
      request_id: requestId,
    });
  }

  logger.error(`Internal Server Error with Request ID: ${requestId}, Message: ${errorMessage}`, {
    request_id: requestId,
    error_stack: err.stack,
  });

  return res.status(500).json({
    error: true,
    message: "Internal Server Error",
    request_id: requestId,
  });
};

export default errorMiddleware;