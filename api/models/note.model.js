export default class Note {
  id;
  title;
  created;
  modified;
  bodyContent;

  constructor(
    title = "Untitled Note",
    created = new Date().toISOString().slice(0, 19).replace("T", " "),
    modified = new Date().toISOString().slice(0, 19).replace("T", " "),
    bodyContent = ""
  ) {
    this.title = title;
    this.created = created;
    this.modified = modified;
    this.bodyContent = bodyContent;
  }

  setId(id) {
    this.id = id;
  }

  setCreated(date) {
    this.created = new Date(date).toISOString().slice(0, 19).replace("T", " ");
  }

  setModified() {
    this.modified = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  setTitle(title) {
    this.title = title;
  }

  setBodyContent(bodyContent) {
    this.bodyContent = bodyContent;
  }
}
