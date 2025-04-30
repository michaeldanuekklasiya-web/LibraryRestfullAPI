import express from "express";
import collectionController from "../../controllers/collection.controller.js";
import authenticateToken from "../../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authenticateToken);

router.post("/", collectionController.createCollection);
router.get("/", collectionController.getAllCollections);
router.delete("/:id", collectionController.deleteCollectionById);

export default router;
