import { Test } from "../models/test.model.js";

export const create = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }

  const test = new Test(req.body.name, req.body.email);

  console.log("Ready to create person: ", test);

  test.create(test, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the test record.",
      });
    } else {
      res.send(data);
    }
  });
};
