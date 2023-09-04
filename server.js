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

app.listen(3000, console.log("server is running at 3000"));
