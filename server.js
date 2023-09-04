require("dotenv").config(); // access .env

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const path = require("path");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json()); // to get (req => body data)
app.use(fileUpload());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const { saveFile, saveFiles, deleteFile } = require("./utils/gallery");

// const funky = (req, res, next) => {
//   res.json({ msg: "Comming with get method" });
// };

// const isLoggedIn = (req, res, next) => {
//   if (1 + 1 == 2) {
//     req.successMsg("We are good to go");
//     next();
//   } else {
//     next(new Error("You are not logged in "));
//   }
// };

// const isAdmin = (req, res, next) => {
//   if (4 == 4) {
//     console.log(req.successMsg);
//     next();
//   } else {
//     next(new Error("Only admin can access this route"));
//   }
// };

// app.get("/users", isLoggedIn, isAdmin, funky);

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.post("/gallery", saveFiles, async (req, res, next) => {
  // await deleteFile(req.body.filename);
  res.status(200).json({ msg: "File upload", filename: req.body.images });
});

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
