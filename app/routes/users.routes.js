module.exports = (app) => {
  const users = require('../controllers/user.controller.js');
  const checkAuth = require('../../middleware/check-auth');

  // Register Routes
  app.post('/users', users.create);

  app.get('/users', checkAuth , users.findAll);

  app.get('/users/:userId', users.findOne);

  app.put('/users/:UserId', users.update);

  app.delete('/users/:userId', users.delete);

  // Login Routes
  app.post('/users/login', users.login);

};