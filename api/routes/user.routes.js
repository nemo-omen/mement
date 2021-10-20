import controller from "../controllers/user.controller.js";

const routes = (app) => {
  app.post("/register", controller.register);
  app.post("/login", controller.login);
};

export default routes;
