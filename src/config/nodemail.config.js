const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
  logger: true,
});

module.exports = mailTransporter;
