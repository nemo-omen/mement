
import Note from '../models/note.model.js';
import service from '../services/note.service.js';

export default class NoteController {
  static async getAll(req, res) {
    try {
      const data = await service.getAll();
      res.status(200).send(data[0]);
    } catch(error) {
      res.status(500).send({message: error.message});
    }
  }

  static async get(req, res) {
    try {
      const id = req.params.id;
      const data = await service.get(id);
      res.status(200).send(data[0]);
    } catch(error) {
      res.status(500).send({message: error.message});
    }
  }

  static async create(req, res) {
    try {
      const data = req.body;
      const note = new Note();
      if(data.title) note.title = data.title;
      if(data.bodyContent) note.bodyContent = data.bodyContent;

      const createResponse = service.create(note);

      res.status(200).send(createResponse);
    } catch(error) {
      res.status(500).send({message: error.message});
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const updated = req.body;

      const note = new Note(
        updated.title, 
        updated.created, 
        new Date().toISOString().slice(0, 19).replace('T', ' '), 
        updated.bodyContent
      );

      note.setId(id);

      const updateResponse = await service.update(note);
      if(updateResponse[0].affectedRows > 0) {
        res.status(200).send({ok: true, response: updateResponse[0]});
      } else {
        res.status(400).send({ok: false, message: 'Database not updated.'});
      }
    } catch(error) {
      res.status(500).send({message: error.message});
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const delResponse = await service.delete(id);
      if(delResponse[0].affectedRows > 0) {
        res.status(200).send({ok: true, message: `Deleted record with id: ${id}`});
      } else {
        res.status(400).send({ok: false, message: `Problem deleting record with id: ${id}`});
      }
    }catch(error) {
      res.status(500).send({message: error.message});
    }
  }
}