import controller from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import verify from "../middleware/verify.js";

const routes = (app) => {
  app.get("/user/:id", controller.get);
  app.put("/user/:id", controller.update);
  app.delete("/user/:id", controller.delete);
  app.get("/user/:id/auth", verify);
  app.post("/register", controller.register);
  app.post("/login", controller.login);
  app.patch("/user/*", (req, res) =>
    res
      .status(403)
      .send(
        "Server does not support PATCH requests. Please send all update requests through PUT instead."
      )
  );
};

export default routes;
