import Job from "../models/jobs.model.js";

export const saveJobIntoDb = async (req,res) =>{
    try {
        const {jobTitle, companyName, companyWebsite, jobDescription, jobType, jobExperience, jobLocation, jobIncome, jobPosts, applyBeforeDate, jobURL, companyId} = req.body
        if (!jobTitle || !companyName || !companyWebsite || !jobDescription || !jobLocation || !jobIncome || !applyBeforeDate || !jobURL || !jobPosts || !companyId){
            return res.status(400).json({error: "Please fill all the details"})
        };
        const newJob = new Job({
            companyId,
            jobTitle, 
            companyName, 
            companyWebsite, 
            jobDescription,
            jobType, 
            jobLocation, 
            jobExperience,
            jobIncome, 
            jobPosts,
            applyBeforeDate, 
            jobURL,
        });
        if (newJob){
            await newJob.save();
            return res.status(201).json({
                _id: newJob._id,
                companyId: newJob.companyId,
                jobTitle: newJob.jobTitle,
                jobDescription: newJob.jobDescription,
                jobIncome: newJob.jobIncome
            });
        }else{
            return res.status(400).json({error:"Invalid Job data"});
        }  
    } catch (error) {
        console.log("Error in saving job,",error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const fetchAllJobs = async (req,res) =>{
    try {
        const jobs = await Job.find(); // Fetch all jobs from the database
        res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in fetching job,",error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const fetchCompanyJobs = async(req,res) =>{

    try {
        const jobs = await Job.find({companyId :req.params.id});
        res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in fetching company job,",error.message);
        res.status(500).json({error: "Internal Server Error"}) 
    }
}

export const deleteCompanyJob = async(req,res) =>{
    try {
    const success = await Job.findByIdAndDelete(req.params.id) 
    if(success){
        res.status(200).json("Job post deleted successfully");
    }
    } catch (error) {
        console.log("Error in deleting job,",error.message);
        res.status(500).json({error: "Internal Server Error"}) 
    }
}

export const searchJobs = async(req,res) =>{
    try {
    const {jobType, jobLocation, jobExperience, jobTitle} = req.body;

    const jobs = await Job.find({
        jobType: jobType || { $exists: true },
        jobLocation: jobLocation || { $exists: true },
        jobExperience: jobExperience || { $exists: true },
        jobTitle: jobTitle || { $exists: true },
      });
      if(jobs){
      res.status(200).json(jobs);
      }
    } catch (error) {
        console.log("Error is searching job", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}