module.exports = (app) => {
  const users = require('../controllers/user.controller.js');
  // Register Routes
  app.post('/users', users.create);

  app.get('/users' , users.findAll);

  app.get('/users/:userId', users.findOne);

  app.put('/users/:UserId', users.update);

  app.delete('/users/:userId', users.delete);

};