const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const user=require("../models/userModel");

const Company =sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.ENUM('Technology', 'Finance', 'Healthcare', 'Aviation'),
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM('0-10', '11-50', '51-200'),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Private', 'Public', 'Self-Employed'),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    linkedin: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    founded: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1800, // Minimum year constraint
        max: new Date().getFullYear(), // Maximum year is the current year
      },
    },
  }, {
    tableName: 'companies',
    timestamps: true, // Adds createdAt and updatedAt fields
  });

  user.hasMany(Company);
  Company.belongsTo(user);


  module.exports=Company;
