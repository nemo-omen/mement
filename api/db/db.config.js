import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASS || "";

const dbConfig = {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: "mement",
  notesTable: "notes",
  userTable: "users",
};

export default dbConfig;
