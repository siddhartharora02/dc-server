const users = require('../controllers/user.controller.js');

module.exports = (app) => {
  // Register Routes
  app.post('/users', users.create);

  app.post('/upload/:id', users.upload);

  app.get('/uploads/:id', users.fetchUploads);

  app.post('/account', users.createBankAccount );

  app.get('/accounts/:id', users.findBankAccounts);

  app.get('/user/:id', users.findData);


};