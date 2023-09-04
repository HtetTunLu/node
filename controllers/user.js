const DB = require("../dbs/user");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  const users = await DB.find();
  Helper.fMsg(res, "All users", users);
};

const get = async (req, res, next) => {
  const user = await DB.findById(req.params.id);
  Helper.fMsg(res, "Single user", user);
};

const post = async (req, res, next) => {
  const result = await new DB(req.body).save();
  Helper.fMsg(res, "User added", result);
};

const patch = async (req, res, next) => {
  const user = await DB.findById(req.params.id);
  if (user) {
    await DB.findByIdAndUpdate(user._id, req.body);
    const updatedUser = await DB.findById(user._id);
    Helper.fMsg(res, "Updated user", updatedUser);
  } else {
    res.json({ msg: "error" });
  }
};

const drop = async (req, res, next) => {
  await DB.findByIdAndDelete(req.params.id);
  Helper.fMsg(res, "User deleted");
};

module.exports = { all, get, post, patch, drop };
