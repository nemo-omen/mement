import bcrypt from "bcrypt";

export default class UserController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);

      const user = {
        name,
        email,
        password: await bcrypt.hash(password, salt),
      };

      res
        .status(200)
        .send({ ok: true, message: "Registration successful.", data: user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      res.status(200).send({ ok: true, message: "You are logged in!!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
