import express from "express";
import path from "path";
import { initializeDB } from "./db";
require("dotenv").config();

//Initializing DB
initializeDB();

// rest of the code remains same
const app = express();

//Server Test End Point
app.get("/", (req, res) => res.send("Server Up and Running!!"));

//Load View Engines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//View Renders
app.get("/init", (req, res) => {
  res.render("index", {
    title: "The Real Name",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`⚡️Server is running at https://localhost:${process.env.PORT}`);
});
