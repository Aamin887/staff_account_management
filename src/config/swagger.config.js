const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Staff Account Manager Documentation",
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
      url: "http://localhost:5500/api",
      description: "Development server",
    },
    {
      url: "url: https://staff-account-manager-lwhvn8hjk-aamin887s-projects.vercel.app/api/v1/users",
      description: "Production server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/v1/*.js", "./src/routes/api/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
