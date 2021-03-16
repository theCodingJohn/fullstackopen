import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
import cors from "cors";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";

// Routers
import blogsRouter from "./controllers/blog.controller.js";
import usersRouter from "./controllers/user.controller.js";
import loginRouter from "./controllers/login.controller.js";

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

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);

export default app;
