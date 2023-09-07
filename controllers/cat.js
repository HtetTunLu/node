const { exist } = require("joi");
const DB = require("../models/cat");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  const cats = await DB.find();
  Helper.fMsg(res, "All categories", cats);
};

const get = async (req, res, next) => {
  const cat = await DB.findById(req.params.id);
  if (cat) {
    Helper.fMsg(res, "Single Category", cat);
  } else {
    next(new Error("No post with that id"));
  }
};

const post = async (req, res, next) => {
  const existCat = await DB.findOne({ name: req.body.name });
  if (existCat) {
    next(new Error("Category is already in used"));
    return;
  }
  const result = await new DB(req.body).save();
  Helper.fMsg(res, "Category added", result);
};

const patch = async (req, res, next) => {
  console.log(req.params.id);
  const existCat = await DB.findById(req.params.id);
  if (existCat) {
    await DB.findByIdAndUpdate(existCat._id, req.body);
    // const result = await DB.findById(req.params.id);
    const result = await DB.findById(existCat._id);
    Helper.fMsg(res, "Category Updated", result);
  } else {
    next(new Error("No category with that id"));
  }
};

const drop = async (req, res, next) => {
  let existCat = await DB.findById(req.params.id);
  if (existCat) {
    await DB.findByIdAndDelete(existCat._id);
    Helper.fMsg(res, "Category delete successfully");
  } else {
    next(new Error("No category with that id"));
  }
};

module.exports = { all, get, post, patch, drop };
