const {sequelize,DataTypes} = require('../config/db'); 
const User = require('./userModel'); 

const Profile = sequelize.define('Profile', {
  name: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  college:{
    type:DataTypes.STRING,
    allowNull:false

  },
  degree:{
    type:DataTypes.STRING,
    allowNull:false

  },
  careerGoals: {
    type: DataTypes.TEXT, 
    allowNull: true, 
  },
  linkedInUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});


User.hasOne(Profile, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', 
});

Profile.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = Profile;
