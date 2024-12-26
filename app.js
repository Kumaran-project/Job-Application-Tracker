const express = require("express");
const cors = require("cors");
const fs=require("fs");
require("dotenv").config();
const {sequelize} = require("./config/db");

const userRoutes=require("./routes/user");
const jobRoutes=require("./routes/job");
const CompanyRoutes=require("./routes/company");
const profileRoutes=require("./routes/profile");


const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json())
app.use(express.static("./public"));

app.use("/api/user",userRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/companies",CompanyRoutes);
app.use("/api/profile",profileRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

//   const secret = require('crypto').randomBytes(64).toString('hex');
// console.log('JWT Secret:', secret);