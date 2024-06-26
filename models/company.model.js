import mongoose from "mongoose";

// Define the schema
const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    companyUserName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 6
    },
    companyLogo:{
        type: String,
        required: true,
        default: "" 
    },
    companyWebsite:{
        type:String,
        required:false,
    },
    companyTollfreeNumber:{
        type:Number,
        required:true
    },
    companyDescription:{
        type:String,
        required:true
    },
    companyEmail:{
        type:String,
        required:true
    }
}, { timestamps: true });

// Create the model
const Company = mongoose.model("Company", companySchema);
export default Company;