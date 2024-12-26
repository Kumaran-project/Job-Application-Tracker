const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db'); 
const user=require("./userModel");

const Job = sequelize.define('Job', {
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.ENUM('full-time', 'part-time', 'freelance'),
    allowNull: false,
  },
  jobSalary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobStatus: {
    type: DataTypes.ENUM('Pending', 'Applied', 'Interviewed', 'Rejected', 'Accepted'),
    allowNull: false,
  },
  appliedDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  followUp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resumeUrl:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  coverLetterUrl:{
    type: DataTypes.STRING,
    allowNull: true,
  }

});

user.hasMany(Job);
Job.belongsTo(user);

module.exports = Job;
