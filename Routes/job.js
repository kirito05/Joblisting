const express = require("express");
const router = express.Router();
const jobController = require("../Controller/job");
const verifyToken = require("../Middleware/verification");


router.post("/create", verifyToken, jobController.createJob);
router .get("/getJobDetails/:jobId", jobController.getJobDetailsByID);

module.exports = router;