const users = require('../controllers/user.controller.js');

module.exports = (app) => {
  // Register Routes
  app.post('/users', users.create);

};