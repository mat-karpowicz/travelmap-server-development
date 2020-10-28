require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const placesRouter = require("./Routes/PlaceRoutes");

// APP USE
const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.json());
app.use("/api", placesRouter);

// DB CONNECTION
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB CONNECTED");
});

// NOT FOUND
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});

// ERROR HANDLER
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
  });
});

// PORT AND LISTENER
const PORT = process.env.PORT || 2137;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
