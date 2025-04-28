import express from "express";
import userController from "../controllers/auth.controller.js";
import bookController from "../controllers/book.controller.js";
import collectionController from "../controllers/collection.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const apiRouter = new express.Router();
apiRouter.use(authenticateToken);

/**
 * =====================
 *       Auth Routes
 * =====================
 */
apiRouter.post("/auth/logout", userController.logoutUser);

/**
 * =====================
 *       Book Routes
 * =====================
 */
apiRouter.post("/books", bookController.uploadBook);
apiRouter.get("/books", bookController.getAllBook);
apiRouter.get("/books/:id", bookController.getBookById);
apiRouter.put("/books/:id", bookController.updateBook);
apiRouter.delete("/books/:id", bookController.deleteBook);

/**
 * ==========================
 *     Collection Routes
 * ==========================
 */
apiRouter.post("/collections", collectionController.createCollection);
apiRouter.get("/collections", collectionController.getAllCollections);
apiRouter.delete("/collections/:id", collectionController.deleteCollectionById);
// apiRouter.delete("/collections", collectionController.deleteCollectionByUserAndBook);

export { apiRouter };
