import mysql from "mysql2/promise";
import dbConfig from "./db.config.js";

const { host, user, password, database, table } = dbConfig;

const connection = await mysql.createConnection({ host, user, password });
connection.connect((error) => {
  if (error) throw error;
  console.log(`Connected to database ${database} at ${host}`);
});

try {
  const create = await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${database}`
  );

  const use = await connection.query(`USE ${database}`);

  console.log(`Attempting to create table ${table}`);

  const createdTable =
    await connection.query(`CREATE TABLE IF NOT EXISTS \`${table}\` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    created DATETIME NOT NULL,
    modified DATETIME NOT NULL,
    bodyContent TEXT NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`);

  if (create[0].serverStatus === 2)
    console.log(`Database ${database} created or already exists.`);

  if (use[0].serverStatus === 2) console.log(`Using database ${database}`);

  if (createdTable[0].serverStatus === 2)
    console.log(`Table ${table} created or already exists`);
} catch (error) {
  console.error(error);
}

export default connection;
