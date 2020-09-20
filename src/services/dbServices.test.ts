import { getLongURLFromShort, getNewShortURL } from "./dbServices";

test("Checking if new short URL is generated", async () => {
  expect(await getNewShortURL("https://www.google.com/")).toBeDefined();
});

test("Checking if long URL is obtained from existing short URL", async () => {
  expect(await getLongURLFromShort("bxi")).toBeDefined();
});
