export default class Note {
  id;
  title;
  created;
  modified;
  bodyContent;

  constructor() {
    this.created = new Date().toLocaleString().slice(0, 19).replace('T', ' ');
    this.modified = this.created;
    this.title = 'Untitled Note';
    this.bodyContent = '';
  }
}