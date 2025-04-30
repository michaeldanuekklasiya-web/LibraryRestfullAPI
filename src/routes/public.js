import express from "express";
import userController from "../controllers/auth.controller.js";

const publicRouter = new express.Router();

publicRouter.post("/auth/register", userController.registerUser);
publicRouter.post("/auth/login", userController.loginUser);

export default publicRouter;

export { publicRouter };
