import express from "express";
import { initializeDB } from "./db";
import { appConfig } from "./swagger/swagger.cofig";
require("dotenv").config();
var bodyParser = require("body-parser");
import swaggerUi from "swagger-ui-express";

//Initializing DB
initializeDB();

// rest of the code remains same
const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//Initializing Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(appConfig.swagger.swaggerDefinition)
);

app.use("/", require("./routes"));

// Starting the Node App
app.listen(process.env.PORT, () => {
  console.log(`⚡️Server is running at https://localhost:${process.env.PORT}`);
});
