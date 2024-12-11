const express = require("express");
const cors = require("cors");
const fs=require("fs");
const path=require('path');
require("dotenv").config();
const sequelize = require("./config/db");


const app = express();
const PORT = 3000;

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
