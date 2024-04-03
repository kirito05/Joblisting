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
    const title = req.query.jobTitle || "";
    const jobs = await Job.find({title : {$regex: "jobTitle",$option:"i"}},{companyName:1, jobTile:1});
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
