// import mysql from "mysql2-promise";
import mysql from "mysql";
import dbConfig from "./db.config.js";

const { host, user, password, database, table } = dbConfig;

const connection = mysql.createConnection({ host, user, password });

connection.connect((error) => {
  if (error) throw error;
  console.log(`Connected to database ${database} at ${host}`);
});

connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);

connection.query(`USE ${database}`);

console.log(`Attempting to create table ${table}`);

connection.query(`CREATE TABLE IF NOT EXISTS \`${table}\` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  created DATETIME NOT NULL,
  modified DATETIME NOT NULL,
  bodyContent TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8`);

export default connection;
