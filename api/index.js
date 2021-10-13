import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  // console.log(req);
  res.send({ message: "Hello, from the api!" });
});

app.listen("3030", () => {
  console.log("API server listening for requests at http://localhost:3030");
});
