import { getURLDataByID, saveNewEntry, updateShortURL } from "../db";
import { getShortURL, getUrlID } from "../utils";

export async function getNewShortURL(longUrl: string, password: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const generatedID: any = await saveNewEntry(longUrl, password);
      const updatedID: number = Number(generatedID) + 9999;

      const shortURL = getShortURL(updatedID);

      await updateShortURL(generatedID.toString(), shortURL);
      resolve(shortURL);
    } catch (err: any) {
      reject(err);
    }
  });
}

export async function getLongURLFromShort(shortURL: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedID = getUrlID(shortURL);
      const generatedID: number = Number(updatedID) - 9999;

      const urlData = await getURLDataByID(generatedID.toString());
      resolve(urlData);
    } catch (err: any) {
      reject(err);
    }
  });
}
