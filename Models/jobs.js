const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({

    companyName:{
        type:String,
        required:true
    },
    logoUrl:{
        type:String,
        required:true
    },
    jobTitle:{
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
    salary:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    skills:{
        type:Array,
        required:true
    },
    refUserId:{
        type:mongoose.ObjectId,
    },

})
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;