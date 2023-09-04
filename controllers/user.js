const all = async (req, res, next) => {
    res.json({ msg: "All users" });
  };
  
  const get = async (req, res, next) => {
    res.json({ msg: "one user" });
  };
  
  const post = async (req, res, next) => {
    res.json({ msg: "create" });
  };
  const patch = async (req, res, next) => {
    res.json({ msg: "edit" });
  };
  
  const drop = async (req, res, next) => {
    res.json({ msg: "delete" });
  };
  
  module.exports = { all, get, post, patch, drop };
  