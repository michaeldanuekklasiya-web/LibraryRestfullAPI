import express from "express";
import authRoutes from "../v1/auth.route.js";
import bookRoutes from "../v1/books.route.js";
import collectionRoutes from "./collections.route.js";

const v1Router = express.Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/books", bookRoutes);
v1Router.use("/collections", collectionRoutes);

export default v1Router;
