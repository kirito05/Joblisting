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
    const jobs = await Job.find();
    res.json(jobs);
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
