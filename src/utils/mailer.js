const mailTransporter = require("../config/nodemail.config");
const asyncHandler = require("express-async-handler");

const content = (firstNames) => `<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Welcome Email</title>
</head>
<body>
  <h2>Hello ${firstNames}! </h2>
  <p>We're glad to have you on board at {{company}}. </p>
  <p>To complete your request for the account, Head over to the dashboard to fill in a request form.</p>
  <p>Need any assistance navigating through our platform? Don't hesitate to reach out to our support team.</p>
  <p>. Here's to streamlining your operations and maximizing productivity! </p>
  

</body>
</html>`;

const mailer = asyncHandler(async (toMail, firstNames) => {
  const mailOption = {
    from: "alhassanamin96@gmail.com",
    to: toMail,
    subject: "Testing my email service",
    html: content(firstNames),
  };

  const sentMail = await mailTransporter.sendMail(mailOption);

  if (!sentMail) {
    throw new Error("error sending mail");
  }

  console.log(sentMail);
});

module.exports = mailer;
