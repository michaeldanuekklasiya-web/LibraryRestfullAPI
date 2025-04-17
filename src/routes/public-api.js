import express from "express";
import healthController from "../controllers/health-controller.js";
import bookController from "../controllers/book-controller.js";

const publicRouter = new express.Router();

publicRouter.get("/up", healthController.ping);
publicRouter.post("/books", bookController.uploadBook);
publicRouter.get("/books", bookController.getAllBook);
publicRouter.get("/books/:id", bookController.getBookById);
publicRouter.put("/books/:id", bookController.updateBook);
publicRouter.delete("/books/:id", bookController.deleteBook);

export { publicRouter };
