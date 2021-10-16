import db from '../db/db.js';
// import mdastTypes from '@types/mdast';

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
    this.created = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.modified = this.created;
    this.title = 'Untitled Note';
    this.bodyContent = '';
  }

  create(newNote, result) {

    db.query(`INSERT INTO notes SET ?`, newNote, (err, res) => {
      if (err) {
        console.error("Error inserting: ", err);
        result(err, null);
        return;
      }

      if(res.affectedRows > 0) {
        newNote.id = res.insertId
      }

      console.log("Created note in notes table: ", {
        id: res.insertId,
        ...newNote,
      });

      result(null, { id: res.insertId, ...newNote });
    });
  }

  update(note, result) {

    db.query( 
      `UPDATE notes SET title = ?, modified = ?, bodyContent = ? WHERE id = ?`,
      [
        note.title,
        note.modified,
        note.bodyContent,
        note.id
    ],
      (err, res, fields) => {
        if (err) {
          console.error("Error inserting: ", err);
          result(err, null);
          return;
        }

        if(res.affectedRows > 0) {
          console.log(`Affected rows: ${res.affectedRows}`);
        }
        
        console.log("Updated note: ", {
          id: note.id,
          modified: note.modified,
          title: note.title,
          bodyContent: note.bodyContent
        });

        result(
          null, 
          {
            id: note.id, 
            modified: note.modified, 
            title: note.title, 
            bodyContent: note.bodyContent
          }
        );
      });
  }

} // end Note