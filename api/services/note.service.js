import db from '../db/db.js';

export default class NoteService {
  static async getAll() {
    try {
      return await db.query(`SELECT * FROM notes`);
    } catch(error) {
      console.error(error);
    }
  }
}