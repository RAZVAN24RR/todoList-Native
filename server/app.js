const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./src/routes/userRoutes");
const todoElRouter = require("./src/routes/todoRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋!");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/users", userRouter);
app.use("/api/todoEl", todoElRouter);

module.exports = app;
