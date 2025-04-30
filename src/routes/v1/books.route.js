import express from "express";
import bookController from "../../controllers/book.controller.js";
import authenticateToken from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);
router.post("/", bookController.uploadBook);
router.get("/", bookController.getAllBook);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

export default router;
