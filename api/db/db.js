import mysql from "mysql2/promise";
import dbConfig from "./db.config.js";

const { host, user, password, database, notesTable, userTable } = dbConfig;

const connection = await mysql.createConnection({ host, user, password });

connection.connect((error) => {
  if (error) throw error;
  console.log(`Connected to database ${database} at ${host}`);
});

try {
  const create = await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${database}`
  );

  if (create[0].serverStatus === 2)
    console.log(`Database ${database} created or already exists.`);

  const use = await connection.query(`USE ${database}`);

  if (use[0].serverStatus === 2) console.log(`Using database ${database}`);

  console.log(`Dropping tables ${userTable}, ${notesTable} for testing...`);

  await connection.query(`DROP TABLE IF EXISTS ?`, notesTable);
  await connection.query(`DROP TABLE IF EXISTS ?`, userTable);

  console.log(`Attempting to create empty tables ${notesTable}, ${userTable}`);

  const createdNotesTable =
    await connection.query(`CREATE TABLE IF NOT EXISTS \`${notesTable}\` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    created DATETIME NOT NULL,
    modified DATETIME NOT NULL,
    bodyContent TEXT NOT NULL,
    user_id INT(11) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`);

  if (createdNotesTable[0].serverStatus === 2)
    console.log(`Table ${notesTable} created or already exists`);
    
    const createdUserTable = await connection.query(`CREATE TABLE IF NOT EXISTS \`${userTable}\`(
      id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      pass varchar(255) NOT NULL
      ), ENGINE=InnoDB DEFAULT CHARSET=utf8`);
      
  if(createdUserTable[0].serverStatus === 2) {
    console.log(`Table ${userTable} created or already exists`);
  }

  

} catch (error) {
  console.error(error);
}

export default connection;
