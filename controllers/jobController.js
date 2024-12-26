const Job = require('../models/jobModel');
const User=require("../models/userModel");
const multer = require("multer");
const AWS = require("aws-sdk");


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadToS3 = (file, folder) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folder}/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    acl: 'public-read',
  };
  return s3.upload(params).promise();
};


// Create a new job entry
exports.createJob = async (req, res) => {
  try {
    console.log(req.body,"empty");
    const { company, jobTitle, jobDescription, jobType, jobSalary, jobStatus, appliedDate, followUp, jobLocation } =req.body;
    const user=await User.findByPk(req.user.id);
    const resume = await uploadToS3(req.files.resume[0], "resumes");
    const coverLetter = await uploadToS3(req.files.coverLetter[0], "coverLetters");
    
    const newJob = {company,jobTitle,jobDescription,jobType,jobSalary,jobStatus,appliedDate,followUp,jobLocation,resumeUrl: resume.Location,coverLetterUrl: coverLetter.Location,
    };

    
    const savedJob = await user.createJob(newJob);
    res.status(201).json({ success: true, data: savedJob });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const userId=req.user.id;
    const jobs = await Job.findAll({where:{userId}});
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a specific job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a job entry
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    const updatedJob = await job.update(req.body);
    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a job entry
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    await job.destroy();
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
