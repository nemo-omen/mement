import { Note } from '../models/note.model.js';

// export const getOne = (req, res) => {
//   if(!req.params.id) {
//     res.status(400).send({message: "Can't get a note with no id param."})
//   }

//   const note = new Note();

// }

export const create = (req, res) => {
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
  console.log('params: ', req.params);
  
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }

  const id = req.params.id;
  const {title, bodyContent} = req.body;

  const note = new Note();

  console.log("Ready to update note: ", {id, title, bodyContent});

  note.update({
    id: id,
    title: title,
    modified: new Date().toISOString().slice(0, 19).replace('T', ' '),
    bodyContent: bodyContent
  }, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while updating the note.",
      });
    } else {
      res.send(data);
    }
  }
  )};