const express = require("express");
const User = require("../Models/user");
const Job = require("../Models/jobs");
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      Service: "Job Listing Server",
      Status: "Inactive",
      Time: new Date().toLocaleString(),
    });
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const title = req.query.title;
    const skills = req.query.skills;
    let filter = {};
    let filterSkills;
    let titleFilter = {};


    if (title) {
      titleFilter = { title: { $regex: title, $options: "i" } };
    }

    if (skills) {
      filterSkills = skills.split(",");
      const caseInsensitiveFilteredSkills = filterSkills.map(
        (element) => new RegExp(element, "i")
      );
      filter = { skills: { $in: caseInsensitiveFilteredSkills } };
    }

    const jobs = await Job.find({
      ...titleFilter,
      ...filter,
    });
    res.json({data : jobs});
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      Service: "Job Listing Server",
      Status: "Inactive",
      Time: new Date().toLocaleString(),
    });
  }
});

module.exports = router;
