import express, { Request, Response } from "express";
import path from "path";
import { initializeDB } from "./db";
import { getLongURLFromShort, getNewShortURL } from "./services/dbServices";
import { isValidURL } from "./utils";
require("dotenv").config();
var bodyParser = require("body-parser");

//Initializing DB
initializeDB();

// rest of the code remains same
const app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//Load View Engines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Rendering the initial load view
app.get("/", async (req: Request, res: Response) => {
  res.render("index");
});

//Handling Form Submission for a URL
app.post("/", async (req: Request, res: Response) => {
  if (req.body && req.body.longURL && isValidURL(req.body.longURL)) {
    const shortURL = await getNewShortURL(req.body.longURL, req.body.password);
    console.log("shortURL", shortURL);

    res.render("shortURL", {
      title: "Congratulations, your short URL is ready!",
      shortUrl: `${process.env.BASE_URL}${shortURL}`,
    });
  } else {
    res.render("shortURL", {
      shortUrl: "There is something Wrong with your URL! Please retry.",
    });
  }
});

// Redirecting to the origional URL
app.get("/:shortURL", async (req: Request, res: Response) => {
  if (req.params && req.params.shortURL) {
    const urlData: any = await getLongURLFromShort(req.params.shortURL);

    if (urlData) {
      console.log();
      return res.redirect(urlData.longURL);
    }
  }
  res.render("shortURL", {
    shortUrl:
      "Sorry, looks like you have used a wrong URL. Kindly check it and try again",
  });
});

// Starting the Node App
app.listen(process.env.PORT, () => {
  console.log(`⚡️Server is running at https://localhost:${process.env.PORT}`);
});
