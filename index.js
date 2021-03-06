const express = require('express');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');

//Initializations
const app = express();
dotenv.config();
require('./database');
require('./config/passport');

//Importing routes
const indexRouter = require('./routes/index.router/index.router');
const userRouter = require('./routes/user.router/user.router');
const productRouter = require('./routes/products.router/product.router');
const categoryRouter = require('./routes/products.router/category.router');
const listRouter = require('./routes/products.router/list.router');

//Config
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    resave: true, // it does not save the session if it is not modified.
    saveUninitialized: true, // don't create a session until something is stored.
    secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', categoryRouter);
app.use('/', listRouter);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(app.get('port'), ()=>{
    console.log('Server on port: ', app.get('port'));
});

