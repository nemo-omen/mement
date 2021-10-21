import Note from "../models/note.model.js";
import service from "../services/note.service.js";

export default class NoteController {
  static async getAll(req, res) {
    try {
      const data = await service.getAll();
      res.status(200).send({ ok: true, data: data[0] });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const id = req.params.id;
      const data = await service.get(id);
      res.status(200).send({ ok: true, data: data[0] });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const data = req.body;
      const note = new Note();

      if (data.title) note.title = data.title;
      if (data.bodyContent) note.bodyContent = data.bodyContent;
      if (data.user_id) note.user_id = data.user_id;

      const createResponse = await service.create(note);

      if (createResponse[0].length < 1) {
        throw new Error("Something went wrong while saving that note!");
      } else {
        note.id = createResponse[0].insertId;

        const response = await service.get(note.id);

        const data = response[0][0];

        note.setCreatedAt(data.created_at);
        note.setUpdatedAt(data.updated_at);

        res.status(201).send({
          ok: true,
          data: note,
        });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const updated = req.body;

      const note = new Note(
        updated.title,
        updated.bodyContent,
        updated.user_id
      );

      note.id = id;

      // Get the data from the target record
      // so we can include the created_at timestamp from the database
      // when we send the update so it will always remain the same
      const targetResponse = await service.get(note.id);

      const targetNote = targetResponse[0][0];

      note.created_at = targetNote.created_at;

      const updateResponse = await service.update(note);

      if (updateResponse[0].affectedRows > 0) {
        const response = await service.get(note.id);

        const data = response[0][0];

        note.setCreatedAt(data.created_at);
        note.setUpdatedAt(data.updated_at);

        res.status(200).send({
          ok: true,
          data: note,
        });
      } else {
        res.status(400).send({ ok: false, message: "Database not updated." });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const delResponse = await service.delete(id);
      if (delResponse[0].affectedRows > 0) {
        res.status(200).send({
          ok: true,
          data: {
            affectedRows: delResponse[0].affectedRows,
            message: `Deleted record with id: ${id}`,
          },
        });
      } else {
        res.status(400).send({
          ok: false,
          message: `Problem deleting record with id: ${id}`,
        });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
