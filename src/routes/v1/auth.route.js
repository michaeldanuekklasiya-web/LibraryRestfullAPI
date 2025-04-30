import express from "express";
import userController from "../../controllers/auth.controller.js";
import authenticateToken from "../../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", userController.registerUser);
authRouter.post("/login", userController.loginUser);


authRouter.post("/logout", authenticateToken, userController.logoutUser);

export default authRouter;
