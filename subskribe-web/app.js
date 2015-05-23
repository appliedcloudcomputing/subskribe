GLOBAL.Parse = require('parse').Parse;
Parse.initialize("ivDEfuaBrK5EJFnenmqzrIKAiCeD7dH5hLGjLMRG", "6T4gqzOw8BiFkfA7o95sIPqnNWii0CreFCS10Lvk");


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


/*GLOBAL.Parse = require('parse').Parse;
if(process && process.env && process.env.APPLICATION_ID && process.env.JAVASCRIPT_KEY && process.env.MASTER_KEY) {
    Parse.initialize(process.env.APPLICATION_ID, process.env.JAVASCRIPT_KEY, process.env.MASTER_KEY);
} else {
    Parse.initialize("ivDEfuaBrK5EJFnenmqzrIKAiCeD7dH5hLGjLMRG", "6T4gqzOw8BiFkfA7o95sIPqnNWii0CreFCS10Lvk", "01oxOl98OXgIinTAZvUfD6qHwGQ2wutFxB7O63IX");
}*/


var routes = require('./routes/index');
var login = require('./routes/login');
//var client = require('./routes/client');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var cwd = require('./routes/cwd');

var editform = require('./routes/editform');

var feedback = require('./routes/feedback');
var myprofile = require('./routes/myprofile')
//var adminreg = require('./routes/adminreg');
var chngpkg  = require('./routes/chngpkg');
var creatpkg = require('./routes/creatpkg');
var userlist = require('./routes/userlist');
var admindashboard = require('./routes/admindashboard');
var adminfeedbacklist = require('./routes/adminfeedbacklist');
var adminfaq = require('./routes/adminfaq');
var userfaq = require('./routes/userfaq');
var speedtest = require('./routes/speedtest');
var customercare = require('./routes/customercare');
var adduser = require('./routes/adduser');
var adminquerylist = require('./routes/adminquerylist');
var homepage = require('./routes/homepage');
var adminlogin = require('./routes/adminlogin');
//var userenquiry = require('./routes/userenquiry');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'ivDEfuaBrK5EJFnenmqzrIKAiCeD7dH5hLGjLMRG',
                resave: true,
                saveUninitialized: false}));

app.use('/', routes);
app.use('/login', login);
//app.use('/client', client);
app.use('/users', users);
app.use('/dashboard', dashboard);
app.use('/cwd',cwd);
app.use('/editform',editform);
app.use('/feedback',feedback);
//app.use('/adminreg',adminreg);
app.use('/chngpkg',chngpkg);
app.use('/creatpkg',creatpkg);
app.use('/userlist',userlist);
app.use('/myprofile',myprofile);
app.use('/admindashboard',admindashboard);
app.use('/adminfeedbacklist',adminfeedbacklist);
app.use('/adminfaq',adminfaq);
app.use('/userfaq',userfaq);
//app.use('/userenquiry',userenquiry);
app.use('/speedtest',speedtest);
app.use('/customercare',customercare);
app.use('/adduser',adduser);
app.use('/adminquerylist',adminquerylist);
app.use('/homepage',homepage);
app.use('/adminlogin',adminlogin); 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
   
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log("----------------------------------------------ERROR OBJECT: " + JSON.stringify(err));
        console.log("----------------------------------------------ERROR MESSAGE: " + err.message);
        console.log("----------------------------------------------REQUEST URL: " + req.url);
        if(req.session.user){            
            res.render('404', {
                message: err.message,
                error: err,
                loggedIn: "true"
            });
        } else {            
            res.render('404', {
                message: err.message,
                error: err     
            });            
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("----------------------------------------------ERROR OBJECT: " + JSON.stringify(err));
    console.log("----------------------------------------------ERROR MESSAGE: " + err.message);
    console.log("----------------------------------------------REQUEST URL: " + req.url);
    res.render('404', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
