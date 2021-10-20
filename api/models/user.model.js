export default class User {
  id = null;
  name;
  userName;
  email;
  password;
  constructor(name, userName, email, password) {
    this.name = name;
    this.email = email;
    this.userName = userName;
    this.password = password;
  }
}
