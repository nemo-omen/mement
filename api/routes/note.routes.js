import controller from "../controllers/note.controller.js";
import auth from "../middleware/auth.js";

const routes = (app) => {
  app.get("/api", auth, controller.getAll);
  app.get("/api/:id", auth, controller.get);
  app.post("/api", auth, controller.create);
  app.patch("/api/*", (req, res) =>
    res
      .status(403)
      .send(
        "Server does not support PATCH requests. Please send all update requests through PUT instead."
      )
  );
  app.put("/api/:id", auth, controller.update);
  app.delete("/api/:id", auth, controller.delete);
};

export default routes;
