const express = require('express');
const session = require("express-session");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
require('./auth');
const jsonFile = require('./about.json');

function isLoggedin(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

//PAssport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;
const { response } = require('express');

// Connect to Mongo
mongoose.connect(db,{ useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// BACKGROUND IMG
app.use(express.static("public"));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//API
app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRediret: '/auth/failure',
    })
)

app.get('/auth/failure', (req, res) => {
    res.send('something went wrong'); 
});

app.get('/index', isLoggedin, (req, res) => {

});

// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//Return Json file
app.get('/about.json', function (req, res) {
    res.send(jsonFile);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));