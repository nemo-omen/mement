import db from '../db/db.js';
import mdastTypes from '@types/mdast';

/**
 * @typedef {{
 * id: number,
 * created: Date,
 * modified: Date,  
 * title: String
 * bodyContent: String // use MDAst in browser?
 * }} Note
 */

export class Note {
  id
  created
  modified
  title
  bodyContent
  constructor() {
    this.created = new Date(); // convert for db insertion! .toISOString().slice(0, 19).replace('T', ' ');
    this.modified = this.created;
    this.title = 'Untitled Note';
    this.bodyContent = '';
  }

  create() {
    const newNote = new Note();
    db.query(`INSERT INTO notes SET ?`, newNote, (err, res) => {
      if (err) {
        console.error("Error inserting: ", err);
        result(err, null);
        return;
      }

      console.log("Created note in notes table: ", {
        id: res.insertId,
        ...newNote,
      });

      result(null, { id: res.insertId, ...newNote });
    });
  }
}