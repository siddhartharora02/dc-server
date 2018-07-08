const uploads = require('../controllers/upload.controller.js');

module.exports = (app) => {

    app.post('/upload/:id', uploads.create)
};