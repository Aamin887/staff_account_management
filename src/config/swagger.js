const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinitions = {
  openapi: "3.0.0",
  info: {
    title: "Staff Account Manager Docs",
    version: "1.0.0",
    description: "Create, view accounts",
    lecense: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Aminmakes",
      url: "githud",
    },
  },
  servers: [
    {
      url: "url: http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinitions,
  apis: ["./routes/api/*.js", "./routes/v1/*.js", "./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerJSDoc;
