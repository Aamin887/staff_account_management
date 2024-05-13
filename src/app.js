const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const errorHandler = require("./middleware/errorHandler.middleware");
const rateLimit = require("./middleware/ratelimiter.middleware");
const cors = require("cors");
const dbConnect = require("./config/db.connection");
const corsOptions = require("./config/cors.options");
const { userAuth } = require("./middleware/auth.middleware");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5500;

const app = express();

app.use(cookieParser());

dbConnect();

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// root routes
app.use("/", require("./routes/root.routes"));

app.use(rateLimit);
// authentication routes
app.use("/api/auth", require("./routes/api/auth.routes"));

// users routes
app.use("/api/v1/users", userAuth, require("./routes/v1/users.routes"));

// accounts routes
app.use("/api/v1/accounts", userAuth, require("./routes/v1/account.routes"));

app.use("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (res.accepts("json")) {
    res.json({ "message ": "404, page not found" });
  } else {
    res.type("txt").send("404, page not found");
  }
});

// error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is active on port: ${PORT}`);
});

module.exports = app;
