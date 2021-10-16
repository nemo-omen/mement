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

export const update = (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }

  const {id, title, bodyContent} = req.body;

  const note = new Note();
  note.id = id;
  note.title = title;
  note.bodyContent = bodyContent;
  note.modified = new Date().toISOString().slice(0, 19).replace('T', ' ');

  console.log("Ready to update note: ", {id, title, bodyContent});

  note.update({
    id: note.id,
    title: note.title,
    modified: note.modified,
    bodyContent: note.bodyContent
  }, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while updating the note.",
      });
    } else {
      res.send(data);
    }
  })};