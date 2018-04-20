const express = require ('express');
const bodyParser = require('body-parser');

//create an express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:true }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

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
app.get('/', (req,res)=>{
    res.json({
        "message" : "Welcome"
    })
});

require('./app/routes/contacts.routes.js')(app);

app.listen(3000, ()=>{
    console.log("Server is running at http://localhost:3000/")
});