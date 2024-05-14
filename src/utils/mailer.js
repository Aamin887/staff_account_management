const mailTransporter = require("../config/nodemail.config");

const mailer = () => {
  const mailOption = {
    from: "alhassanamin96@gmail.com",
    to: "forkahamin@yahoo.co.uk",
    subject: "Testing my email service",
    text: "This is a test your nodemailer.",
  };

  mailTransporter.sendMail(mailOption, (err, info) => {
    if (err) {
      throw new Error(err);
    } else {
      return `Email sent , ${info.response}`;
    }
  });
};

module.exports = mailer;
