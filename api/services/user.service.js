import db from "../db/db.js";

export default class NoteService {
  static async get(id) {
    try {
      return await db.query(`SELECT * FROM users WHERE id = ?`, id);
    } catch (error) {
      console.error(error);
    }
  }

  static async getByEmail(email) {
    try {
      return await db.query(`SELECT * FROM users WHERE email = ?`, email);
    } catch (error) {
      console.error(error);
    }
  }

  static async getByUserName(userName) {
    try {
      return await db.query(`SELECT * FROM users WHERE userName = ?`, userName);
    } catch (error) {
      console.error(error);
    }
  }

  static async create(user) {
    try {
      return await db.query(`INSERT INTO users SET ?`, user);
    } catch (error) {
      console.error(error);
    }
  }

  static async update(user) {
    try {
      return await db.query(`UPDATE users SET ? WHERE id = ?`, [user, user.id]);
    } catch (error) {
      console.error(error);
    }
  }

  static async delete(id) {
    try {
      return await db.query(`DELETE FROM users WHERE id = ?`, id);
    } catch (error) {
      console.error(error);
    }
  }
}
