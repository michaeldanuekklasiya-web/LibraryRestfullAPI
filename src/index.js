import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "../src/routes/index.js";
import sequelize from "./config/db.js";
import errorMiddleware from "./middlewares/error.handler.js";

dotenv.config();

try {
  await sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
