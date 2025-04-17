import express from "express";
import healthController from "../controllers/health-controller.js";
import bookController from "../controllers/book-controller.js";
import collectionController from "../controllers/collection-controller.js";

const publicRouter = new express.Router();

// Books Route
publicRouter.get("/up", healthController.ping);
publicRouter.post("/books", bookController.uploadBook);
publicRouter.get("/books", bookController.getAllBook);
publicRouter.get("/books/:id", bookController.getBookById);
publicRouter.put("/books/:id", bookController.updateBook);
publicRouter.delete("/books/:id", bookController.deleteBook);

// Collection Routes
publicRouter.post("/collections", collectionController.createCollection);
publicRouter.get("/collections", collectionController.getAllCollections);
publicRouter.delete("/collections/:id", collectionController.deleteCollectionById);
publicRouter.delete("/collections", collectionController.deleteCollectionByUserAndBook);
export { publicRouter };
