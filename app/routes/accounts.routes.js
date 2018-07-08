const accounts =  require('../controllers/account.controller');

module.exports = (app) => {
    app.post('/account', accounts.create );

    app.get('/accounts/:id', accounts.findOne);
}