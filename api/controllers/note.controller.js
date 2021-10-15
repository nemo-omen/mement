import { Note } from '../models/note.model.js';

export const create = (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }

  const note = new Note();

  console.log("Ready to create note: ", note);

  note.create(note, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the note.",
      });
    } else {
      res.send(data);
    }
  })};