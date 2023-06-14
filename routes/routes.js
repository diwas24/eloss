const express = require("express");
const sTTs = require("../static/modules");
const router = express.Router();
const path = require("path");
const poly = new sTTs(undefined, 300, 20);
router.get("/", (req, res) => {
  res.render("home");
});
router.use("/work", require("./work"));
router.get("/createSet", (req, res) => {
  res.render("createSets");
});

module.exports = router;
