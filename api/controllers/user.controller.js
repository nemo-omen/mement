import bcrypt from "bcrypt";
import service from '../services/user.service.js';

export default class UserController {
  static async register(req, res) {
    try {
      const { name, userName, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      if(!(name && email && password && userName)) {
        throw new Error("Registration fields cannot be empty.")
      }


      const user = {
        name,
        userName,
        email,
        password: await bcrypt.hash(password, salt),
      };

      const existingEmail = await service.getByEmail(user.email);
      const existingUserName = await service.getByUserName(user.userName);

      if(existingEmail[0].length > 0) {
        res.status(303)
        .send({ ok: false, message: "A user with that email already exists!", data: user.email });
      } else if(existingUserName[0].length > 0) {
          res.status(303)
        .send({ ok: false, message: "A user with that user name already exists!", data: user.userName });
      } else {
        const createResponse = await service.create(user);

        if(createResponse[0].affectedRows < 1) {
          throw new Error('Something went wrong while saving that user!');
        } else { 
          res.status(200)
          .send({ 
            ok: true, 
            message: "Registration successful.", 
            data: {
              id: createResponse[0].insertId, 
              name: user.name, 
              userName: user.userName, 
              email: user.email
            } });
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
