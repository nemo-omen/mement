import bcrypt from "bcrypt";
import service from '../services/user.service.js';

export default class UserController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      if(!(name && email && password)) {
        throw new Error("Registration fields cannot be empty.")
      }


      const user = {
        name,
        email,
        password: await bcrypt.hash(password, salt),
      };

      const existing = await service.getByEmail(user.email);

      if(existing[0].length > 0) {
        res.status(303)
          .send({ ok: false, message: "A user with that email already exists!", data: user.email });
      } else {
        const createResponse = await service.create(user);

        if(createResponse[0].affectedRows < 1) {
          throw new Error('Something went wrong while saving that user!');
        } else { 
          console.log(createResponse[0]);
          res.status(200)
          .send({ ok: true, message: "Registration successful.", data: {id: createResponse[0].insertId, name: user.name, email: user.email} });
        }
      }

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
