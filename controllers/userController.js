const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const user = require("../models/userModel");

require("dotenv").config(); 

module.exports.postUser = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({ userName, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


function generateToken(id){
return jwt.sign({id},process.env.TOKEN_SECRET,{expiresIn:"1h"});
}



module.exports.loginUser = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const existingUser = await user.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "404, No user found" });
    } 
      const isMatch=await bcrypt.compare(password, existingUser.password)
        if (isMatch) {
         console.log(existingUser)
          res
            .status(200).json({success:true,redirectUrl:"http://localhost:3000/index.html",token:generateToken(existingUser.id)});
            
        } else {

          res
            .status(401)
            .json({
              success: true,
              message: "Authentication failed, Invalid password",
            });
        }
     
    }
   catch (error) {
    console.log(error);
  }
};
