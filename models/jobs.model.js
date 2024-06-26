import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    jobTitle:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    companyWebsite:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    jobLocation:{
        type:String,
        required:true
    },
    jobExperience:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    jobIncome:{
        type:Number,
        required:true
    },
    applyBeforeDate:{
        type:Date,
        required:true
    },
    jobPosts:{
        type:Number,
        required:true
    },
    jobURL:{
        type:String,
        required:true
    }


},{timestamps:true})

const Job = mongoose.model("Job",jobsSchema);
export default Job;