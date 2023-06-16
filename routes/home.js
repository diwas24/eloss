const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.findOne().lean();
    res.render("home", { user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
module.exports = router;
