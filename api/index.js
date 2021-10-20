import dotenv from "dotenv";
import express from "express";
import notes from "./routes/note.routes.js";
import users from "./routes/user.routes.js";

dotenv.config();

const port = process.env.PORT || "3030";

const app = express();

app.use(express.json());

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.disable("x-powered-by");

notes(app);
users(app);

app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

app.listen(port, () => {
  console.log(`API server listening for requests at http://localhost:${port}`);
});
