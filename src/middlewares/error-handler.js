import ResponseError from "../utils/response-error.js";

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    return res.status(err.status).json({
      error: true,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  return res.status(500).json({
    error: true,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;
