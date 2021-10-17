import db from '../db/db.js';

export default class NoteService {
  static async getAll() {
    try {
      return await db.query(`SELECT * FROM notes`);
    } catch(error) {
      console.error(error);
    }
  }

  static async get(id) {
    try {
      return await db.query(`SELECT * FROM notes WHERE id = ?`, id);
    } catch(error) {
      console.error(error);
    }
  }

  static async create(note) {
    try {
      return await db.query(`INSERT INTO notes SET ?`, note);
    } catch(error) {
      console.error(error);
    }
  }

  static async update(note) {
    try {
        return await db.query(`UPDATE notes SET ? WHERE id = ?`, [note, note.id]);
    } catch(error) {
      console.error(error);
    }
  }

  static async delete(id) {
    try {
      return await db.query(`DELETE FROM notes WHERE id = ?`, id);
    } catch(error) {
      console.error(error);
    }
  }
}