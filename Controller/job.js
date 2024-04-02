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

    const id = req.userID

    const newJob = Job.create({
      companyName,
      logoUrl,
      jobTitle,
      jobDescription,
      jobLocation,
      salary,
      jobType,
      skills,
      refUserId : id,
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

const getJobDetailsByID = async (req,res)=>{
  try{
    const jobId = req.params.jobId;

      const jobDetails = await Job.findById(jobId);
      if(!jobDetails){
          return res.status(400).json({
              message:"Bad Request" 
          })
      }
      res.json({data : jobDetails});
  }catch(err){
      res.status(500).json({
          message:"Internal Server Error"
      })
  }
}

module.exports = { createJob, getJobDetailsByID};
