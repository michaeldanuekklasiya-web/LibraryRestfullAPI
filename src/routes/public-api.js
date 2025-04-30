import express from "express";
import userController from "../controllers/auth.controller.js";

const publicRouter = new express.Router();

/**
 * =====================
 *       Auth Routes
 * =====================
 */
publicRouter.post("/auth/register", userController.registerUser);
publicRouter.post("/auth/login", userController.loginUser);

export { publicRouter };
