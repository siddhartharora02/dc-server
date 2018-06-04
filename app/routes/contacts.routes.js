module.exports = (app) => {
  const contacts = require('../controllers/contact.controller.js');
  const checkAuth = require('../../middleware/check-auth');

  app.post('/contacts', contacts.create);

  app.get('/contacts',checkAuth, contacts.findAll);

  app.get('/contacts/:contactId', contacts.findOne);

  app.put('/contacts/:contactId', contacts.update);

  app.delete('/contacts/:contactId', contacts.delete);
};