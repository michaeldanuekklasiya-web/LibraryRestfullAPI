import express from "express";
import healthController from "../controllers/health-controller.js";
import userController from "../controllers/auth-controller.js";

const publicRouter = new express.Router();

/**
 * =====================
 *       Health Routes
 * =====================
 */
publicRouter.get("/up", healthController.ping);

/**
 * =====================
 *       Auth Routes
 * =====================
 */
publicRouter.post("/auth/register", userController.registerUser);
publicRouter.post("/auth/login", userController.loginUser);
publicRouter.post("/auth/refresh-token", userController.refreshAccessToken);

export { publicRouter };
