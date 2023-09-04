require("dotenv").config(); // access .env

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json()); // to get (req => body data)

const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.use((err, req, res, next) => {
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

app.get("*", (req, res) => {
  res.json({ msg: "No Route Found!" });
});

app.listen(
  process.env.PORT,
  console.log(`Server is running at ${process.env.PORT}`)
);
