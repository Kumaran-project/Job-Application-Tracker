const nodemailer = require("nodemailer");
require("dotenv").config();
const sendReminderEmail = async (email, followUpDate) => {
  try{
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "kumarans2k16@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "kumarans2k16@gmail.com",
    to: email,
    subject: "Follow-Up Reminder",
    text: `This is a reminder to follow up on your job application. Follow-up date: ${new Date(followUpDate).toLocaleString()}`,
  };


    await transporter.sendMail(mailOptions);
    console.log("Reminder email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendReminderEmail("kumaranselvaraj08@gmail.com",new Date());

module.exports=sendReminderEmail;