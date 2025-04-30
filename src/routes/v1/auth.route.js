import express from "express";
import userController from "../../controllers/auth.controller.js";
import authenticateToken from "../../middlewares/auth.middleware.js";

const authRouter = express.Router();

// Tambahkan middleware hanya pada rute yang memerlukan autentikasi
authRouter.post("/logout", authenticateToken, userController.logoutUser);

export default authRouter;
