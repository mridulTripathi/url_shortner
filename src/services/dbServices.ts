import { getURLDataByID, saveNewEntry, updateShortURL } from "../db";
import { UrlResponseModel } from "../models/urlResponse";
import { getShortURL, getUrlID } from "../utils";

// Method to generate a new short URL
export async function getNewShortURL(
  longUrl: string
): Promise<UrlResponseModel> {
  return new Promise(async (resolve, reject) => {
    try {
      const generatedID: any = await saveNewEntry(longUrl);
      const updatedID: number = Number(generatedID) + 9999; // Adding a random number to get at least 3 character short URL

      const shortURL = getShortURL(updatedID);

      await updateShortURL(generatedID.toString(), shortURL);

      const urlResponseModel: UrlResponseModel = {
        longURL: longUrl,
        shortURL: `${process.env.BASE_URL}${shortURL}`,
        extension: shortURL,
        details: await getURLDataByID(generatedID.toString()),
      };
      resolve(urlResponseModel);
    } catch (err: any) {
      reject(err);
    }
  });
}

// Mthod to Retreive original URL
export async function getLongURLFromShort(shortURL: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedID = getUrlID(shortURL);
      const generatedID: number = Number(updatedID) - 9999; // Reducing the initially added random number

      const urlData: any = await getURLDataByID(generatedID.toString());
      if (urlData) {
        const urlResponseModel: Partial<UrlResponseModel> = {
          shortURL: `${process.env.BASE_URL}${shortURL}`,
          extension: shortURL,
          details: urlData,
        };
        resolve(urlResponseModel);
      } else {
        resolve({ error: "wrong short url" });
      }
    } catch (err: any) {
      reject(err);
    }
  });
}
