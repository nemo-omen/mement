export default class Note {
  id;
  title;
  bodyContent;
  created_at;
  updated_at;
  user_id;

  constructor(title = "Untitled Note", bodyContent = "", user_id) {
    this.title = title;
    this.bodyContent = bodyContent;
    this.user_id = user_id;
  }

  setId(id) {
    this.id = id;
  }

  setTitle(title) {
    this.title = title;
  }

  setBodyContent(bodyContent) {
    this.bodyContent = bodyContent;
  }
}
