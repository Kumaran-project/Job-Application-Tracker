const express = require('express');
const multer = require("multer");

const authController=require("../middleware/auth")
const jobController = require('../controllers/jobController');


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post('/',authController.authenticateUser,upload.fields([{ name: "resume" }, { name: "coverLetter" }]), jobController.createJob);        
router.get('/',authController.authenticateUser, jobController.getAllJobs);        
router.get('/:id',authController.authenticateUser, jobController.getJobById);    
router.put('/:id',authController.authenticateUser, jobController.updateJob);     
router.delete('/:id',authController.authenticateUser, jobController.deleteJob);  

module.exports = router;
