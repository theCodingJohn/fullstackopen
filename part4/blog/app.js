import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blogsRouter from "./controllers/blog.controller.js";
import logger from "./utils/logger.js";
import config from "./utils/config.js";

const app = express();

const mongoUrl = config.MONGODB_URI;

logger.info("Connecting to DB...");
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("Connected to DB");
  })
  .catch((error) => {
    logger.info("Connection Error", error);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

export default app;
