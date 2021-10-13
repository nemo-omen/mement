export class Test {
  #name;
  #email;
  constructor(name, email) {
    this.#name = name;
    this.#email = email;
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
}
