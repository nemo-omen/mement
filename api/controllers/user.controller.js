import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import service from "../services/user.service.js";

export default class UserController {
  static async get(req, res) {
    res.status(200).send({ ok: true, data: { message: "Okay!" } });
  }

  static async update(req, res) {
    res.status(200).send({ ok: true, data: { message: "Okay!" } });
  }

  static async delete(req, res) {
    res.status(200).send({ ok: true, data: { message: "Okay!" } });
  }

  static async register(req, res) {
    try {
      const { name, userName, email, password } = req.body;

      const salt = await bcrypt.genSalt(10);

      if (!(name && email && password && userName)) {
        throw new Error("Registration fields cannot be empty.");
      }

      const user = new User(
        name,
        userName,
        email,
        await bcrypt.hash(password, salt)
      );

      const existingEmail = await service.getByEmail(user.email);
      const existingUserName = await service.getByUserName(user.userName);

      if (existingEmail[0].length > 0) {
        res.status(303).send({
          ok: false,
          message: "A user with that email already exists!",
          data: user.email,
        });
      } else if (existingUserName[0].length > 0) {
        res.status(409).send({
          ok: false,
          message: "A user with that user name already exists!",
          data: user.userName,
        });
      } else {
        const createResponse = await service.create({
          name: user.name,
          userName: user.userName,
          email: user.email,
          password: user.password,
        });

        if (createResponse[0].affectedRows < 1) {
          throw new Error("Something went wrong while saving that user!");
        } else {
          user.id = createResponse[0].insertId;

          const token = jwt.sign(
            {
              user_id: user.id,
              email: user.email,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "15m",
            }
          );

          user.token = token;

          service.update(user);

          res.status(201).send({
            ok: true,
            message: "Registration successful.",
            data: {
              id: user.id,
              name: user.name,
              userName: user.userName,
              email: user.email,
              token: user.token,
            },
          });
        }
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      console.log(email);
      const response = await service.getByEmail(email);
      const data = response[0][0];

      console.log(data);

      if (!data) {
        res
          .status(401)
          .send({ message: `User with email ${email} not found.` });
      } else {
        if (
          // compare hashed password from db to password in request
          (await bcrypt.compare(password, data.password)) === false
        ) {
          res.status(400).send({ message: "Password does not match." });
        } else {
          res.status(200).send({
            ok: true,
            data: {
              name: data.name,
              userName: data.userName,
              email: data.email,
              token: data.token,
            },
          });
        }
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
