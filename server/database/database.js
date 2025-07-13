import Database from 'better-sqlite3';

const db = new Database('./database/data.db');
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS Users (
    ID INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    profilePicture TEXT NOT NULL, 
    bannerImage TEXT NOT NULL, 
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    premiumStatus BOOLEAN NOT NULL DEFAULT 0,
    isAdmin INTEGER NOT NULL DEFAULT 0

      
  )
`
).run();



db.prepare(
  `
  CREATE TABLE IF NOT EXISTS Posts (
    PostID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    PostImagePath TEXT,
    LikeCount INTEGER NOT NULL DEFAULT 0,
    RePostCount INTEGER NOT NULL DEFAULT 0,
    CommentCount INTEGER NOT NULL DEFAULT 0,
    StatCount INTEGER NOT NULL DEFAULT 0,
    PostContent TEXT NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
  )
`
).run();

db.prepare(
  `
CREATE TABLE IF NOT EXISTS Messages (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    SenderID INTEGER NOT NULL,
    ReceiverID INTEGER NOT NULL,
    Message TEXT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SenderID) REFERENCES Users(ID) ON DELETE CASCADE,
    FOREIGN KEY (ReceiverID) REFERENCES Users(ID) ON DELETE CASCADE
);

`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS Likes (
    LikeID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    PostID INTEGER NOT NULL,
    LikedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(ID) ON DELETE CASCADE,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID) ON DELETE CASCADE,
    UNIQUE(UserID, PostID)
  )
`
).run();

let data = {
  users: [],
  Posts: [],
  Messages: [],
  Likes: [],
};

function loadData() {
  const table = Object.keys(data);
  table.forEach((tablo) => {
    const rows = db.prepare(`SELECT * FROM ${tablo}`).all();
    data[tablo] = rows;
  });
}

function generateRandomId(length = 6) {
  return Math.floor(
    Math.random() * Math.pow(10, length - 1) * 9 + Math.pow(10, length - 1)
  );
}

function insertData(table, dataObject) {
  const primaryKeys = {
    Users: 'ID',
    Posts: 'PostID',
    Messages: 'ID',
    Likes: 'LikeID',
  };

  const primaryKey = primaryKeys[table];

  if (primaryKey && !dataObject[primaryKey]) {
    let randomId;
    let isUnique = false;

    while (!isUnique) {
      randomId = generateRandomId();
      const exists = db
        .prepare(`SELECT 1 FROM ${table} WHERE ${primaryKey} = ?`)
        .get(randomId);
      if (!exists) isUnique = true;
    }

    dataObject[primaryKey] = randomId;
  }

  const columns = Object.keys(dataObject);
  const values = Object.values(dataObject);
  const placeholders = columns.map(() => '?').join(', ');
  const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

  const stmt = db.prepare(query);
  const result = stmt.run(...values);

  console.log(`Eklenen Veri: ${JSON.stringify(dataObject)}`);
  return result;
}

function updateData(table, primaryKeyValue, updateFields) {
  const primaryKeys = {
    Users: 'ID',
    Posts: 'PostID',
    Messages: 'ID',
  };

  const primaryKey = primaryKeys[table];
  if (!primaryKey) {
    throw new Error('Bilinmeyen tablo veya primary key bulunamadı.');
  }

  const setClause = Object.keys(updateFields)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = Object.values(updateFields);

  const query = `UPDATE ${table} SET ${setClause} WHERE ${primaryKey} = ?`;

  const stmt = db.prepare(query);
  const result = stmt.run(...values, primaryKeyValue);

  loadData();

  console.log(
    `Güncellenen veri: Tablo=${table}, ID=${primaryKeyValue}, Güncellenen Alanlar=${JSON.stringify(updateFields)}`
  );
  return result;
}

loadData();

export { db, data, loadData, insertData, updateData };
