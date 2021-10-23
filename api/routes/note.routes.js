import controller from "../controllers/note.controller.js";
import auth from "../middleware/auth.js";
import verify from "../middleware/verify.js";

const routes = (app) => {
  app.get("/api", verify, controller.getAll);
  app.get("/api/:id", verify, controller.get);
  app.post("/api", verify, controller.create);
  app.patch("/api/*", (req, res) =>
    res
      .status(403)
      .send(
        "Server does not support PATCH requests. Please send all update requests through PUT instead."
      )
  );
  app.put("/api/:id", verify, controller.update);
  app.delete("/api/:id", verify, controller.delete);
};

export default routes;
