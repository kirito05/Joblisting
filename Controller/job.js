const Job = require("../Models/jobs");

const createJob = async (req, res) => {
  try {
    const {
      companyName,
      logoUrl,
      jobTitle,
      jobDescription,
      jobLocation,
      salary,
      jobType,
      skills,
      refUserId,
    } = req.body;
    if (
      !companyName ||
      !logoUrl ||
      !jobTitle ||
      !jobDescription ||
      !jobLocation ||
      !salary ||
      !jobType ||
      !skills
    ) {
      return res.status(400).json({
        errorMessage: "Please enter all the required fields",
      });
    }

    const id = req.userID;

    const newJob = Job.create({
      companyName,
      logoUrl,
      jobTitle,
      jobDescription,
      jobLocation,
      salary,
      jobType,
      skills,
      refUserId: id,
    });

    res.status(200).json({
      message: "Job created successfully",
      job: newJob.jobTitle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMessage: "internal error",
    });
  }
};

const getJobDetailsByID = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
    res.json({ data: jobDetails });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateJobDetailsById = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const usrID = req.userID;
    const {
      companyName,
      logoUrl,
      jobTitle,
      jobDescription,
      jobLocation,
      salary,
      jobType,
      skills,
      refUserId
    } = req.body;
    if (
      !companyName ||
      !logoUrl ||
      !jobTitle ||
      !jobDescription ||
      !jobLocation ||
      !salary ||
      !jobType ||
      !skills
    ) {
      return res.status(400).json({
        errorMessage: "Please enter all the required fields",
      });
    }

    // const isJobExist = await job.findOne({ _id: jobId, refUserId: usrID });
    // if (!isJobExist) {
    //   return res.status(400).json({
    //     message: "Bad Request",
    //   });
    // }
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, refUserId: usrID},
      {
        companyName,
        logoUrl,
        jobTitle,
        jobDescription,
        jobLocation,
        salary,
        jobType,
        skills,
        refUserId: usrID,
      },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
    res.json({ data: updatedJob });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const usrID = req.userID;
    const job = await Job.findOneAndDelete({ _id: jobId, refUserId: usrID }); 
    if (!job) {
      return res.status(400).json({
        message: "Bad Request",
      });
    } 
    res.status(200).json({
      message:"Job Deleted Successfully"
    })

  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
module.exports = { createJob, getJobDetailsByID , updateJobDetailsById, deleteJobById};
