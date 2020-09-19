const SHORT_URL_CHARACTER_SET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function getShortURL(urlID: number) {
  var shortURL = "";

  while (urlID > 0) {
    shortURL =
      SHORT_URL_CHARACTER_SET.charAt(urlID % SHORT_URL_CHARACTER_SET.length) +
      shortURL;
    urlID = Math.floor(urlID / SHORT_URL_CHARACTER_SET.length);
  }

  return shortURL;
}

export function getUrlID(shortURL: string) {
  var urlId = 0;
  var power = 0;

  while (shortURL.length > 0) {
    var charValue = shortURL.slice(-1);
    shortURL = shortURL.slice(0, -1);

    urlId =
      urlId +
      SHORT_URL_CHARACTER_SET.indexOf(charValue) *
        Math.pow(SHORT_URL_CHARACTER_SET.length, power);

    power++;
  }

  return urlId;
}

export function isValidURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
