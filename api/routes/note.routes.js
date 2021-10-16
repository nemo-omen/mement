import controller from '../controllers/note.controller.js';

const routes = (app) => {
  app.get('/api', controller.getAll);
  app.get('/api/:id', controller.get);
  app.post('/api', controller.create);
  app.put('/api/:id', controller.update);
  app.delete('/api/:id', controller.delete);
}

export default routes;