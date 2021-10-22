import controller from "../controllers/user.controller.js";

const routes = (app) => {
  app.get("/user/:id", controller.get);
  app.put("/user/:id", controller.update);
  app.delete("/user/:id", controller.delete);
  app.post("/register", controller.register);
  app.post("/login", controller.login);
  app.patch("/api/*", (req, res) =>
    res
      .status(403)
      .send(
        "Server does not support PATCH requests. Please send all update requests through PUT instead."
      )
  );
};

export default routes;
