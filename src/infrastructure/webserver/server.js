import express from "express";
import mongoose from "mongoose";
import UserController from "../../interfaces/controllers/UserController.js";
import config from "../../config/index.js";

const app = express();
app.use(express.json());

app.use("/users", UserController);

mongoose
  .connect(config.dbUri)
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection error:", error));

export const start = (port) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
