require("dotenv").config(); // access .env

const express = require("express");
const app = express();

app.use(express.json()); // to get (req => body data)

const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.get("*", (req, res) => {
  res.json({ msg: "No Route Found!" });
});

app.listen(
  process.env.PORT,
  console.log(`Server is running at ${process.env.PORT}`)
);
