const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ msg: "all posts" });
});

router.post("/", (req, res) => {
  res.json({ msg: "create" });
});

router
  .route("/:id")
  .get((req, res) => res.json({ msg: "Get Post id is" + req.params.id }))
  .patch((req, res) => res.json({ msg: "Edit id is" + req.params.id }))
  .delete((req, res) => res.json({ msg: "Delete id is" + req.params.id }));

module.exports = router;
