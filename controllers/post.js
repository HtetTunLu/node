const DB = require("../models/post");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  // populate = join table && "-password didn't get password attribute"
  let posts = await DB.find().populate("user", "-password -__v");
  Helper.fMsg(res, "All posts", posts);
};

const get = async (req, res, next) => {
  // populate = join table && "-password didn't get password attribute"
  const post = await DB.findById(req.params.id).populate(
    "user",
    "-password -__v"
  );
  if (post) {
    Helper.fMsg(res, "Single post", post);
  } else {
    next(new Error("No post with that id"));
  }
};

const post = async (req, res, next) => {
  const result = await new DB(req.body).save();
  Helper.fMsg(res, "Post added", result);
};

const patch = async (req, res, next) => {
  res.json({ msg: "edit" });
};

const drop = async (req, res, next) => {
  res.json({ msg: "delete" });
};

module.exports = { all, get, post, patch, drop };
