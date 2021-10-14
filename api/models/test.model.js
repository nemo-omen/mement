import db from "../db/db.js";

export class Test {
  #name;
  #email;
  constructor(name, email) {
    this.setName(name);
    this.setEmail(email);
  }

  getName() {
    return this.#name;
  }

  setName(name) {
    this.#name = name;
  }

  getEmail() {
    return this.#email;
  }

  setEmail(email) {
    // TODO: you're really going to want some kind of validation here!
    this.#email = email;
  }

  create(testObject, result) {
    const newTest = {
      name: testObject.getName(),
      email: testObject.getEmail(),
    };

    db.query(`INSERT INTO people SET ?`, newTest, (err, res) => {
      if (err) {
        console.error("Error inserting: ", err);
        result(err, null);
        return;
      }

      console.log("Created person in test db: ", {
        id: res.insertId,
        ...newTest,
      });

      result(null, { id: res.insertId, ...newTest });
    });
  }
}
