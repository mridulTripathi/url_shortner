var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("shorturl.db", (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to Short URL DB");

    db.serialize(() => {
      db.prepare(
        `CREATE TABLE IF NOT EXISTS urlInfo ( ShortURL_ID INTEGER PRIMARY KEY AUTOINCREMENT, longURL TEXT NOT NULL, shortURL TEXT, dateTimeCreated TEXT, dateTimeModified TEXT)`
      )
        .run()
        .finalize();

      var stmt = db.prepare(
        "INSERT INTO urlInfo (longURL, shortURL, dateTimeCreated, dateTimeModified) VALUES (?,?,?,?)"
      );
      for (var i = 0; i < 10; i++) {
        var date = new Date();
        var dateUTC = date.toUTCString();
        stmt.run(
          "https://www.w3schools.com/SQl/sql_autoincrement.asp",
          "www.random.com",
          dateUTC,
          dateUTC
        );
      }

      stmt.finalize();

      db.each("SELECT * from urlInfo", (err: Error, row: any) => {
        console.log("Row value\n" + JSON.stringify(row));
      });
      db.close();
    });
  }
});

export function initializeDB() {
  return db;
}
