
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
      res.status(200).send({message: `Request received to update id: ${id}`});
    } catch(error) {
      res.status(500).send({message: error.message});
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      res.status(200).send({message: `Request received to delete id: ${id}`});
    }catch(error) {
      res.status(500).send({message: error.message});
    }
  }
}