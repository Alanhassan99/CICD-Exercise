const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(middleware.tokenExtractor);
app.use("/api/users", usersRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

if (process.env.NODE_ENV === "test") {
  console.log("NODE_ENV is:", process.env.NODE_ENV);
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

module.exports = app;
