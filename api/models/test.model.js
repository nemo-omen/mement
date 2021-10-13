import { src_url_equal } from "svelte/internal";
import db from "../db/db.js";

export class Test {
  #name;
  #email;
  constructor(testObject) {
    this.#name = testObject.name;
    this.#email = testObject.email;
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

  create(newTest, result) {
    sql.query("INSERT INTO test SET ?", newTest, (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }

      console.log("Created test: ", { id: res.insertId, ...newTest });
      result(null, { id: res.insertId, ...newTest });
    });
  }
}
