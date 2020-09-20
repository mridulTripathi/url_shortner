//Initializing SQLite database
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

      db.close();
    });
  }
});

// Retreiving Records by ID
export async function getURLDataByID(id: string) {
  return new Promise(async (resolve, reject) => {
    let db = new sqlite3.Database("shorturl.db");

    db.all(
      "SELECT * FROM urlInfo where ShortURL_ID = $id",
      {
        $id: id,
      },
      (error: Error, rows: any) => {
        // console.log("rows", rows);
        if (error) {
          reject(error.message);
        }
        resolve(rows[0]);
      }
    );

    // close the database connection
    db.close();
  });
}

// Adding a new record
export async function saveNewEntry(longUrl: string) {
  return new Promise(async (resolve, reject) => {
    let db = new sqlite3.Database("shorturl.db");
    var date = new Date();
    var dateUTC = date.toUTCString();

    // insert one row into the langs table
    db.run(
      `INSERT INTO urlInfo (longURL, shortURL, dateTimeCreated, dateTimeModified) VALUES (?,?,?,?)`,
      [longUrl, "", dateUTC, dateUTC],
      function (this: any, err: any) {
        if (err) {
          reject(err.message);
        }
        // get the last insert id
        // console.log(`A row has been inserted with rowid ${this.lastID}`);
        resolve(this.lastID);
      }
    );

    // close the database connection
    db.close();
  });
}

// Updating an existing record
export async function updateShortURL(id: string, shortURL: string) {
  return new Promise(async (resolve, reject) => {
    let db = new sqlite3.Database("shorturl.db");
    var date = new Date();
    var dateUTC = date.toUTCString();

    let data = [shortURL, dateUTC, id];
    let sql = `UPDATE urlInfo SET shortURL = ?, dateTimeModified = ? WHERE ShortURL_ID = ?`;

    db.run(sql, data, function (this: any, err: any) {
      if (err) {
        // return console.error(err.message);
        reject(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
      resolve(this.changes);
    });

    // close the database connection
    db.close();
  });
}

export function initializeDB() {
  return db;
}
