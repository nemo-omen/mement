import mysql from "mysql2/promise";
import dbConfig from "./db.config.js";
import { testUsers, testNotes } from "./demo.data.js";

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

  await connection.query(`DROP TABLE IF EXISTS \`${notesTable}\``);
  await connection.query(`DROP TABLE IF EXISTS \`${userTable}\``);

  console.log(`Attempting to create empty tables ${notesTable}, ${userTable}`);

  const createdUserTable =
    await connection.query(`CREATE TABLE IF NOT EXISTS \`${userTable}\`(
      id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      userName varchar(255) NOT NULL UNIQUE,
      email varchar(255) NOT NULL UNIQUE,
      password varchar(255) NOT NULL,
      token varchar(255)
      )ENGINE=InnoDB`);

  if (createdUserTable[0].serverStatus === 2) {
    console.log(`Table ${userTable} created`);
    for (const user of testUsers) {
      await connection.query(`INSERT INTO \`${userTable}\` SET ?`, user);
    }
  }

  const createdNotesTable =
    await connection.query(`CREATE TABLE IF NOT EXISTS \`${notesTable}\` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    bodyContent TEXT NOT NULL,
    user_id INT(11) NOT NULL,
    CONSTRAINT \`Note_USERId_fkey\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
    )ENGINE=InnoDB`);

  if (createdNotesTable[0].serverStatus === 2) {
    console.log(`Table ${notesTable} created`);
    for (const note of testNotes) {
      await connection.query(`INSERT INTO \`${notesTable}\` SET ?`, note);
    }
  }
} catch (error) {
  console.error(error);
}

export default connection;
