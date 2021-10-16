import express from "express";
import cors from "cors";
import { create, update } from "./controllers/note.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: `Get request received at ${req.url}` });
});

app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  res.send({
    message: `Get request received at ${req.url} for record ID: ${id}`,
  });
});

app.post("/api", create);

app.put("/api/:id", update);

app.delete("/api/:id", (req, res) => {
  res.send({ message: `DELETE request received at ${req.url}` });
});

app.listen("3030", () => {
  console.log("API server listening for requests at http://localhost:3030");
});
