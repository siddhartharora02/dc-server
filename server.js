const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const checkAuth = require('./middleware/check-auth');
const helmet = require('helmet');



//create an express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// Cors to allow different website data flow
app.use(cors());
app.use(helmet());
// configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(dbConfig.url).then(()=>{
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


// define a simple route
app.get('/',checkAuth, (req,res)=>{
    res.json({
        "message" : "LoggedIn"
    })
});

require('./app/routes/contacts.routes.js')(app);
require('./app/routes/users.routes.js')(app);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server is running at "+ port)
});
