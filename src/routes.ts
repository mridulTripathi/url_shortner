import express, { Request, Response } from "express";
import { getLongURLFromShort, getNewShortURL } from "./services/dbServices";
import { body, param, validationResult } from "express-validator";
import { UrlResponseModel } from "./models/urlResponse";
let router = express.Router();

router.post(
  "/generate",
  [body("longURL").isURL()],
  async (req: Request, res: Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const urlResponse: UrlResponseModel = await getNewShortURL(
      req.body.longURL
    );
    res.status(200).json(urlResponse);
  }
);

router.get(
  "/:shortURL",
  [
    // username must be an email
    param("shortURL").isLength({ min: 1 }),
    // password must be at least 5 chars long
    // body("password").isLength({ min: 5 }),
  ],
  async (req: Request, res: Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const urlResponse: any = await getLongURLFromShort(req.params.shortURL);
    res.status(200).json(urlResponse);
  }
);

module.exports = router;
