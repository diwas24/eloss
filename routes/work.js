const express = require("express");
const router = express.Router();
const Works = require("../models/works");

router.get("/", async (req, res) => {
  res.render("work/work");
});
router.get("/show", async (req, res) => {
  try {
    const data = await Works.find().lean();
    res.render("work/show", { data });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
router.get("/show/:id", getWork, async (req, res) => {
  res.json(res.work);
});
router.post("/add", async (req, res) => {
  console.log(req.body);
  const works = new Works({
    title: req.body.title,
    rep: req.body.rep,
    level: req.body.level,
    description: req.body.desc,
  });
  try {
    const newWork = await works.save();
    res.redirect("/work/show/" + newWork._id + "/");
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.patch("/:id", getWork, async (req, res) => {
  if (req.body.title) res.work.title = req.body.title;
  if (req.body.rep) res.work.rep = req.body.rep;
  if (req.body.level) res.work.level = req.body.level;
  if (req.body.description) res.work.description = req.body.description;
  try {
    const updt = await res.work.save();
    res.json({ msg: "Updated!!!" });
  } catch (error) {
    res.json({ msg: error.message });
  }
});
router.delete("/:id", getWork, async (req, res) => {
  try {
    await res.work.deleteOne();
    res.json({ msg: "Work removed" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
async function getWork(req, res, next) {
  let work;
  try {
    work = await Works.findById(req.params.id);
    if (!work) return res.status(404).json({ msg: "Work not found" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
  res.work = work;
  next();
}

module.exports = router;
