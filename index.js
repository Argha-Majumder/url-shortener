const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const db = require('./config/mongoose');
const session = require('express-session'); // used for session cookies
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.static("./assets")); // using static pages
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts); // for adding layouts

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'URL shortener',
    secret: process.env.SESSION_COOKIE_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*60)
    },
    store: MongoStore.create(
        {
            mongoUrl: process.env.DATABASE_URL,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log('connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes')); // use express router

app.listen(port, (err)=> {
    if (err) {
        console.log('Error occurred', err);
    }
    console.log(`Server is running on port ${port}`);
});