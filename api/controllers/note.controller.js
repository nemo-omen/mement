
import Note from '../models/note.model.js';
import service from '../services/note.service.js';

export default class NoteController {
  static async getAll(req, res, next) {
    try {
      const data = await service.getAll();
      res.status(200).send(data[0]);
    } catch(error) {
      res.status(500).send({message: error.message});
    }
  }

  static async get(req, res, next) {
    try {
      const id = req.params.id;
      res.status(200).send({message: `Request received for id: ${id}`})
    } catch(error) {
      res.status(500).send({message: error.message});
    }
  }

  static async create(req, res, next) {
    try {
      res.status(200).send({message: `Request received to create note.`});
    } catch(error) {
      res.status(500).send({message: error.message});
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      res.status(200).send({message: `Request received to update id: ${id}`});
    } catch(error) {
      res.status(500).send({message: error.message});
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      res.status(200).send({message: `Request received to delete id: ${id}`});
    }catch(error) {
      res.status(500).send({message: error.message});
    }
  }
}