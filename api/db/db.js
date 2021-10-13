// import mysql from "mysql2-promise";
import mysql from "mysql";
import dbConfig from "./db.config.js";

const { host, user, password, database } = dbConfig;

const connection = mysql.createConnection({ host, user, password });

connection.connect((error) => {
  if (error) throw error;
  console.log(`Connected to database ${dbConfig.database} at ${dbConfig.host}`);
});

connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);

connection.query(`USE ${database}`);

connection.query(`CREATE TABLE IF NOT EXISTS \`people\` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8`);

export default connection;
